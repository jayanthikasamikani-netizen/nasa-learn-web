export type NasaAiModuleId = 'deep_searching_2' | 'science_opus_3';

export interface GroundedSource {
  title: string;
  uri: string;
}

export interface GroundedNasaReport {
  content: string;
  sources: GroundedSource[];
  modelModule?: NasaAiModuleId;
}

export interface NasaDeepChatTurn {
  role: 'user' | 'assistant';
  content: string;
  sources?: GroundedSource[];
  modelModule?: NasaAiModuleId;
  timestamp: string;
}

/**
 * Calls the server-side NASA Deep AI (Deep searching 2 / Science opus 3) endpoint.
 */
export async function queryNasaDeepAi(
  query: string,
  deepSearchMode = true,
  history: { role: 'user' | 'assistant'; content: string }[] = [],
  modelModule: NasaAiModuleId = 'deep_searching_2'
): Promise<GroundedNasaReport> {
  const response = await fetch('/api/gemini/deep-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, deepSearchMode, history, modelModule }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'NASA Deep Search request failed.');
  }

  return {
    content: data.content || 'No scientific response returned.',
    sources: Array.isArray(data.sources) ? data.sources : [],
    modelModule: data.modelModule || modelModule,
  };
}

/**
 * Fetches up-to-date NASA exoplanet, nebula, and telescope discoveries using server-side Google Search grounding.
 */
export async function fetchGroundedNasaDiscovery(
  queryTopic: string
): Promise<GroundedNasaReport> {
  const response = await fetch('/api/gemini/grounded-discovery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queryTopic }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Grounded NASA discovery request failed.');
  }

  return {
    content: data.content || 'No telemetry summary returned.',
    sources: Array.isArray(data.sources) ? data.sources : [],
  };
}

/**
 * Generates an advanced astrophysical modeling report via server-side endpoint.
 */
export async function generateComplexAstrophysicsAnalysis(
  planetParameters: string
): Promise<string> {
  const response = await fetch('/api/gemini/astrophysics-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planetParameters }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Astrophysics analysis request failed.');
  }

  return data.content || 'Analysis unavailable.';
}

/**
 * Generates a fast telemetry metric brief via server-side endpoint.
 */
export async function generateFastTelemetryBrief(
  metricLabel: string
): Promise<string> {
  const response = await fetch('/api/gemini/telemetry-brief', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metricLabel }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Telemetry brief request failed.');
  }

  return data.content || 'Telemetry note unavailable.';
}
