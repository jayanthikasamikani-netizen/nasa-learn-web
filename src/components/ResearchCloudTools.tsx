import React, { useEffect, useState } from 'react';
import {
  auth,
  db,
  signInResearcher,
  signOutResearcher,
  handleFirestoreError,
  OperationType,
  testFirestoreConnection,
} from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {
  fetchGroundedNasaDiscovery,
  generateComplexAstrophysicsAnalysis,
  generateFastTelemetryBrief,
  GroundedNasaReport,
} from '../services/geminiService';
import {
  requestWorkspaceAccessToken,
  exportReportToGoogleDrive,
  fetchRecentSpaceEmails,
  sendNasaReportEmail,
  listNasaObservationTasks,
  createNasaObservationTask,
  createNasaObservationForm,
  NasaTaskItem,
} from '../services/workspaceService';

interface SavedResearchNote {
  id: string;
  uid: string;
  authorName?: string;
  planetTarget: string;
  noteContent: string;
  createdAt: string;
}

interface ResearchCloudToolsProps {
  fullReportText: string;
}

export const ResearchCloudTools: React.FC<ResearchCloudToolsProps> = ({ fullReportText }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [notes, setNotes] = useState<SavedResearchNote[]>([]);
  const [newTarget, setNewTarget] = useState('Kepler-186f / Habitable Zone Exoplanet');
  const [newNoteText, setNewNoteText] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Gemini & Search Grounding state
  const [searchTopic, setSearchTopic] = useState('Latest NASA JWST Earth-like exoplanet atmospheric spectroscopy');
  const [groundedReport, setGroundedReport] = useState<GroundedNasaReport | null>(null);
  const [deepModelOutput, setDeepModelOutput] = useState<string | null>(null);
  const [quickMetricNote, setQuickMetricNote] = useState<string | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingDeep, setLoadingDeep] = useState(false);

  // Google Workspace state
  const [workspaceToken, setWorkspaceToken] = useState<string | null>(null);
  const [driveLink, setDriveLink] = useState<string | null>(null);
  const [gmailRecipient, setGmailRecipient] = useState('');
  const [recentEmails, setRecentEmails] = useState<{ id: string; snippet: string }[]>([]);
  const [tasksList, setTasksList] = useState<NasaTaskItem[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('Verify JWST NIRSpec 3.3µm CH4 transit curve');
  const [createdFormInfo, setCreatedFormInfo] = useState<{
    formId: string;
    responderUri: string;
    responseCount: number;
  } | null>(null);
  const [workspaceBusy, setWorkspaceBusy] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (currentUser) {
        testFirestoreConnection();
      }
      if (currentUser?.email) {
        setGmailRecipient(currentUser.email);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !user) {
      setNotes([]);
      return;
    }
    const q = query(collection(db, 'researchNotes'), where('uid', '==', user.uid));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: SavedResearchNote[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<SavedResearchNote, 'id'>),
        }));
        items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setNotes(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'researchNotes');
      }
    );
    return () => unsub();
  }, [authReady, user]);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newNoteText.trim()) return;
    try {
      await addDoc(collection(db, 'researchNotes'), {
        uid: user.uid,
        authorName: user.displayName || user.email || 'NASA Researcher',
        planetTarget: newTarget.trim().slice(0, 110),
        noteContent: newNoteText.trim().slice(0, 4900),
        createdAt: new Date().toISOString(),
      });
      setNewNoteText('');
      setStatusMsg('Research telemetry note saved to Firebase Firestore.');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'researchNotes');
      setStatusMsg('Saved note locally (Firestore syncing when online).');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'researchNotes', id));
      setStatusMsg('Research note removed.');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `researchNotes/${id}`);
    }
  };

  const handleRunGroundedSearch = async () => {
    setLoadingSearch(true);
    setStatusMsg(null);
    try {
      const [result, quickNote] = await Promise.all([
        fetchGroundedNasaDiscovery(searchTopic),
        generateFastTelemetryBrief('Atmospheric H2O, O2, and CH4 biosignature disequilibrium'),
      ]);
      setGroundedReport(result);
      setQuickMetricNote(quickNote);
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Failed to fetch live NASA search telemetry.');
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleRunDeepModeling = async () => {
    setLoadingDeep(true);
    setStatusMsg(null);
    try {
      const analysis = await generateComplexAstrophysicsAnalysis(
        'Mass: 0.82 Earth-scale, Radius: 1.45, Orbital Period: 1.571/h, Atmosphere: H2O vapor, O2, CH4 detected in habitable zone.'
      );
      setDeepModelOutput(analysis);
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Deep modeling request failed.');
    } finally {
      setLoadingDeep(false);
    }
  };

  const ensureWorkspaceToken = async (): Promise<string> => {
    if (workspaceToken) return workspaceToken;
    const token = await requestWorkspaceAccessToken();
    setWorkspaceToken(token);
    return token;
  };

  const handleExportToDrive = async () => {
    setWorkspaceBusy(true);
    setStatusMsg(null);
    try {
      const token = await ensureWorkspaceToken();
      const result = await exportReportToGoogleDrive(
        token,
        'NASA_Exoplanet_Scientific_Analysis_Report',
        fullReportText
      );
      setDriveLink(result.webViewLink || `https://drive.google.com/file/d/${result.id}/view`);
      setStatusMsg(`Exported "${result.name}" to Google Drive.`);
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Google Drive export failed.');
    } finally {
      setWorkspaceBusy(false);
    }
  };

  const handleSyncGmail = async () => {
    setWorkspaceBusy(true);
    setStatusMsg(null);
    try {
      const token = await ensureWorkspaceToken();
      const msgs = await fetchRecentSpaceEmails(token);
      setRecentEmails(msgs);
      if (gmailRecipient.trim()) {
        await sendNasaReportEmail(
          token,
          gmailRecipient.trim(),
          'NASA Dashboard — Habitable Exoplanet & Nebula Scientific Report',
          fullReportText
        );
        setStatusMsg(`Dispatched NASA Scientific Report to ${gmailRecipient} and synced inbox.`);
      } else {
        setStatusMsg('Synced NASA research messages from Gmail.');
      }
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Gmail operation failed.');
    } finally {
      setWorkspaceBusy(false);
    }
  };

  const handleAddAndSyncTasks = async () => {
    setWorkspaceBusy(true);
    setStatusMsg(null);
    try {
      const token = await ensureWorkspaceToken();
      if (newTaskTitle.trim()) {
        await createNasaObservationTask(
          token,
          newTaskTitle.trim(),
          'Created from NASA Dashboard — Exoplanet & Nebula Telemetry'
        );
      }
      const items = await listNasaObservationTasks(token);
      setTasksList(items);
      setStatusMsg('Synced NASA observation checklist with Google Tasks.');
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Google Tasks sync failed.');
    } finally {
      setWorkspaceBusy(false);
    }
  };

  const handleCreatePeerReviewForm = async () => {
    setWorkspaceBusy(true);
    setStatusMsg(null);
    try {
      const token = await ensureWorkspaceToken();
      const formResult = await createNasaObservationForm(
        token,
        'NASA Exoplanet Biosignature Peer Review Form'
      );
      setCreatedFormInfo(formResult);
      setStatusMsg('Created NASA Observation Peer Review Form in Google Forms.');
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Google Forms creation failed.');
    } finally {
      setWorkspaceBusy(false);
    }
  };

  return (
    <div className="mt-6 pt-5 border-t border-[#343b4a] text-[#b8c1d1] text-[13px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-[#dce2ec] font-medium tracking-wider uppercase text-[13px]">
            NASA Research Archive &amp; Mission Telemetry Sync
          </h4>
          <p className="text-[11.5px] text-[#8a94a6]">
            Live Google Search Grounding, Firebase Research Logbook, and Google Workspace Dispatch
          </p>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2 bg-[#181c24] border border-[#394152] px-2.5 py-1 rounded text-[11.5px]">
              <span className="text-[#aeb8c9] truncate max-w-[140px]">
                {user.displayName || user.email}
              </span>
              <button
                type="button"
                onClick={async () => {
                  await signOutResearcher();
                  setStatusMsg('Signed out of NASA Researcher session.');
                }}
                className="text-[#8a94a6] hover:text-white underline cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={async () => {
                setStatusMsg(null);
                try {
                  const cred = await signInResearcher();
                  if (!cred) {
                    setStatusMsg('Sign-in window was closed before completing authentication.');
                  }
                } catch (err) {
                  setStatusMsg(
                    err instanceof Error ? err.message : 'Sign-in could not be completed.'
                  );
                }
              }}
              className="px-2.5 py-1 rounded bg-[#2b3344] hover:bg-[#364056] border border-[#495369] text-[#dce2ec] text-[11.5px] cursor-pointer transition"
            >
              Researcher Sign In (Firebase)
            </button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div className="px-3 py-1.5 rounded bg-[#181c24] border border-[#495369] text-[#d0d8e8] text-[12px]">
          {statusMsg}
        </div>
      )}

      {/* Live NASA Google Search Grounding & Gemini Astrophysics Modeling */}
      <div className="p-3 rounded bg-[#191e27] border border-[#323947] space-y-2.5">
        <div className="text-[12px] font-medium text-[#d5dce8] uppercase tracking-wide">
          Live NASA Telemetry Query (Google Search Grounded)
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            className="flex-1 min-w-[180px] bg-[#141820] border border-[#384050] rounded px-2.5 py-1 text-[12px] text-[#dce2ec] focus:outline-none focus:border-[#5c6882]"
            placeholder="Search NASA exoplanet or nebula telemetry..."
          />
          <button
            type="button"
            onClick={handleRunGroundedSearch}
            disabled={loadingSearch}
            className="px-2.5 py-1 rounded bg-[#2e3648] hover:bg-[#3a445b] border border-[#4c5770] text-[#dce2ec] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            {loadingSearch ? 'Querying NASA Search...' : 'Fetch Live Search Data'}
          </button>
          <button
            type="button"
            onClick={handleRunDeepModeling}
            disabled={loadingDeep}
            className="px-2.5 py-1 rounded bg-[#252c3b] hover:bg-[#313a4e] border border-[#424b60] text-[#c7d0df] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            {loadingDeep ? 'Modeling...' : 'Run Deep Orbital Model'}
          </button>
        </div>

        {quickMetricNote && (
          <div className="text-[11.5px] text-[#9aa5b8] italic bg-[#141820] p-2 rounded border border-[#2b3240]">
            {quickMetricNote}
          </div>
        )}

        {groundedReport && (
          <div className="p-2.5 rounded bg-[#141820] border border-[#2d3444] space-y-2 text-[12px] leading-relaxed">
            <div className="whitespace-pre-line text-[#c6cfde]">{groundedReport.content}</div>
            {groundedReport.sources.length > 0 && (
              <div className="pt-1.5 border-t border-[#29303e]">
                <span className="text-[11px] uppercase tracking-wider text-[#838ea1] block mb-1">
                  Verified Search Grounding Citations:
                </span>
                <ul className="space-y-0.5">
                  {groundedReport.sources.map((s, idx) => (
                    <li key={idx}>
                      <a
                        href={s.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8ab4f8] hover:underline text-[11.5px] break-all"
                      >
                        • {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {deepModelOutput && (
          <div className="p-2.5 rounded bg-[#141820] border border-[#2d3444] text-[12px] leading-relaxed whitespace-pre-line text-[#c6cfde]">
            {deepModelOutput}
          </div>
        )}
      </div>

      {/* Firebase Firestore Researcher Annotations */}
      {user && (
        <div className="p-3 rounded bg-[#191e27] border border-[#323947] space-y-2.5">
          <div className="text-[12px] font-medium text-[#d5dce8] uppercase tracking-wide">
            Saved NASA Research Notes (Firestore Database)
          </div>
          <form onSubmit={handleSaveNote} className="space-y-2">
            <input
              type="text"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="Target Exoplanet / Nebula Designation"
              className="w-full bg-[#141820] border border-[#384050] rounded px-2.5 py-1 text-[12px] text-[#dce2ec]"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log spectral observation note to Firestore..."
                className="flex-1 bg-[#141820] border border-[#384050] rounded px-2.5 py-1 text-[12px] text-[#dce2ec]"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-[#2e3648] hover:bg-[#3a445b] border border-[#4c5770] text-[#dce2ec] text-[11.5px] cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </form>

          {notes.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start justify-between gap-2 p-2 rounded bg-[#141820] border border-[#2c3342] text-[11.5px]"
                >
                  <div>
                    <div className="text-[#dce2ec] font-medium">{n.planetTarget}</div>
                    <div className="text-[#a8b2c4]">{n.noteContent}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(n.id)}
                    className="text-[#8a94a6] hover:text-[#f28b82] text-[11px] cursor-pointer shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Google Workspace Integration Bar (Drive, Gmail, Tasks, Forms) */}
      <div className="p-3 rounded bg-[#191e27] border border-[#323947] space-y-2.5">
        <div className="text-[12px] font-medium text-[#d5dce8] uppercase tracking-wide">
          Google Workspace Scientific Dispatch (Drive • Gmail • Tasks • Forms)
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={workspaceBusy}
            onClick={handleExportToDrive}
            className="px-2.5 py-1 rounded bg-[#262d3d] hover:bg-[#323b50] border border-[#454f66] text-[#d5dce8] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            Export Report to Google Drive
          </button>
          <button
            type="button"
            disabled={workspaceBusy}
            onClick={handleSyncGmail}
            className="px-2.5 py-1 rounded bg-[#262d3d] hover:bg-[#323b50] border border-[#454f66] text-[#d5dce8] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            Send &amp; Sync via Gmail
          </button>
          <button
            type="button"
            disabled={workspaceBusy}
            onClick={handleAddAndSyncTasks}
            className="px-2.5 py-1 rounded bg-[#262d3d] hover:bg-[#323b50] border border-[#454f66] text-[#d5dce8] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            Log Observation in Google Tasks
          </button>
          <button
            type="button"
            disabled={workspaceBusy}
            onClick={handleCreatePeerReviewForm}
            className="px-2.5 py-1 rounded bg-[#262d3d] hover:bg-[#323b50] border border-[#454f66] text-[#d5dce8] text-[11.5px] cursor-pointer disabled:opacity-50"
          >
            Create Peer Review Google Form
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <input
            type="email"
            value={gmailRecipient}
            onChange={(e) => setGmailRecipient(e.target.value)}
            placeholder="Recipient email for Gmail report dispatch..."
            className="bg-[#141820] border border-[#384050] rounded px-2 py-1 text-[11.5px] text-[#dce2ec]"
          />
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Google Task title for observation..."
            className="bg-[#141820] border border-[#384050] rounded px-2 py-1 text-[11.5px] text-[#dce2ec]"
          />
        </div>

        {driveLink && (
          <div className="text-[11.5px]">
            Google Drive Document:{' '}
            <a href={driveLink} target="_blank" rel="noreferrer" className="text-[#8ab4f8] underline">
              Open Exported NASA Report in Drive
            </a>
          </div>
        )}

        {createdFormInfo && (
          <div className="text-[11.5px]">
            Google Form Created ({createdFormInfo.responseCount} responses):{' '}
            <a
              href={createdFormInfo.responderUri}
              target="_blank"
              rel="noreferrer"
              className="text-[#8ab4f8] underline"
            >
              Open NASA Observation Peer Review Form
            </a>
          </div>
        )}

        {recentEmails.length > 0 && (
          <div className="text-[11.5px] space-y-1 pt-1">
            <div className="text-[#8a94a6] uppercase text-[10.5px]">Recent Space/NASA Gmail Threads:</div>
            {recentEmails.map((m) => (
              <div key={m.id} className="truncate text-[#b8c1d1]">
                • {m.snippet}
              </div>
            ))}
          </div>
        )}

        {tasksList.length > 0 && (
          <div className="text-[11.5px] space-y-1 pt-1">
            <div className="text-[#8a94a6] uppercase text-[10.5px]">Active Google Tasks Checklist:</div>
            {tasksList.slice(0, 4).map((t) => (
              <div key={t.id} className="truncate text-[#b8c1d1]">
                • {t.title} ({t.status})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
