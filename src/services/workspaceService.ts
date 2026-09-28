import { firebaseConfig } from '../firebase';

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/forms.responses.readonly',
].join(' ');

const WORKSPACE_OAUTH_CLIENT_ID =
  '301575896064-rbe51rpthogf7dt31krnklmab6os2glg.apps.googleusercontent.com';

export function requestWorkspaceAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services script has not loaded yet.'));
      return;
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: WORKSPACE_OAUTH_CLIENT_ID || firebaseConfig.oAuthClientId,
      scope: WORKSPACE_SCOPES,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error || 'Failed to obtain access token.'));
        } else {
          resolve(response.access_token);
        }
      },
    });
    client.requestAccessToken();
  });
}

/**
 * 1. Google Drive: Export NASA Scientific Analysis Report to Google Drive
 */
export async function exportReportToGoogleDrive(
  accessToken: string,
  title: string,
  reportText: string
): Promise<{ id: string; name: string; webViewLink?: string }> {
  const metadata = {
    name: `${title}.txt`,
    mimeType: 'text/plain',
    description: 'NASA Exoplanet & Nebula Scientific Analysis Report exported from NASA Dashboard.',
  };

  const boundary = 'nasa_report_multipart_boundary';
  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset=UTF-8\r\n\r\n` +
    `${reportText}\r\n` +
    `--${boundary}--`;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!res.ok) {
    throw new Error(`Google Drive export failed (${res.status})`);
  }
  return res.json();
}

/**
 * 2. Gmail: Read recent messages & Send NASA Scientific Report via Gmail
 */
export async function fetchRecentSpaceEmails(
  accessToken: string
): Promise<{ id: string; snippet: string }[]> {
  const listRes = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=3&q=NASA OR space OR science',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (!listRes.ok) {
    throw new Error(`Gmail fetch failed (${listRes.status})`);
  }
  const data = await listRes.json();
  const messages: { id: string; snippet: string }[] = [];
  for (const item of data.messages || []) {
    const detailRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=minimal`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (detailRes.ok) {
      const detail = await detailRes.json();
      messages.push({ id: item.id, snippet: detail.snippet || 'No snippet' });
    }
  }
  return messages;
}

export async function sendNasaReportEmail(
  accessToken: string,
  recipientEmail: string,
  subject: string,
  bodyText: string
): Promise<{ id: string }> {
  const mimeMessage = [
    `To: ${recipientEmail}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    bodyText,
  ].join('\r\n');

  const raw = btoa(unescape(encodeURIComponent(mimeMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    throw new Error(`Gmail send failed (${res.status})`);
  }
  return res.json();
}

/**
 * 3. Google Tasks: List and Create NASA Observation Tasks
 */
export interface NasaTaskItem {
  id: string;
  title: string;
  notes?: string;
  status: string;
}

export async function listNasaObservationTasks(accessToken: string): Promise<NasaTaskItem[]> {
  const res = await fetch('https://tasks.googleapis.com/tasks/v1/lists/@default/tasks?maxResults=10', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Google Tasks fetch failed (${res.status})`);
  }
  const data = await res.json();
  return data.items || [];
}

export async function createNasaObservationTask(
  accessToken: string,
  title: string,
  notes: string
): Promise<NasaTaskItem> {
  const res = await fetch('https://tasks.googleapis.com/tasks/v1/lists/@default/tasks', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, notes }),
  });
  if (!res.ok) {
    throw new Error(`Google Tasks create failed (${res.status})`);
  }
  return res.json();
}

/**
 * 4. Google Forms: Create a NASA Exoplanet Peer Review Form & Fetch Responses
 */
export async function createNasaObservationForm(
  accessToken: string,
  formTitle: string
): Promise<{ formId: string; responderUri: string; responseCount: number }> {
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
        documentTitle: formTitle,
      },
    }),
  });

  if (!createRes.ok) {
    throw new Error(`Google Forms creation failed (${createRes.status})`);
  }
  const createdForm = await createRes.json();
  const formId = createdForm.formId as string;

  await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: 'Exoplanet Atmospheric Biosignature Confidence Rating (JWST NIRSpec)',
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: 'RADIO',
                    options: [
                      { value: 'High Confidence (>5 Sigma H2O + CH4 + O2 Detection)' },
                      { value: 'Moderate Confidence (3-5 Sigma Spectral Fit)' },
                      { value: 'Requires Additional Transit Spectroscopy' },
                    ],
                  },
                },
              },
            },
            location: { index: 0 },
          },
        },
      ],
    }),
  });

  const responsesRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  let responseCount = 0;
  if (responsesRes.ok) {
    const respData = await responsesRes.json();
    responseCount = (respData.responses || []).length;
  }

  return {
    formId,
    responderUri: createdForm.responderUri || `https://docs.google.com/forms/d/${formId}/viewform`,
    responseCount,
  };
}
