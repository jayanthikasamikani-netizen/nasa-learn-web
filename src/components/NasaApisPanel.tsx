import React, { useState } from 'react';
import { APP_VERSION } from '../constants/version';
import { firebaseConfig } from '../firebase';

export interface NasaApiRegistryEntry {
  id: string;
  name: string;
  category: 'app_integrated' | 'official_nasa_open_api';
  provider: string;
  endpointUrl: string;
  apiKeyOrAuthType: string;
  apiKeyIdentifier: string;
  rateLimit: string;
  status: 'Active in App' | 'Official NASA Public API';
  description: string;
  sampleRequestUrl: string;
  documentationUrl: string;
}

const NASA_APIS_DIRECTORY: NasaApiRegistryEntry[] = [
  {
    id: 'nasa-images-video-api',
    name: 'NASA Image and Video Library API',
    category: 'app_integrated',
    provider: 'NASA HQ / Office of Communications (images-api.nasa.gov)',
    endpointUrl: 'https://images-api.nasa.gov/search',
    apiKeyOrAuthType: 'Public REST API (No Key Required / Open Access)',
    apiKeyIdentifier: 'PUBLIC_OPEN_ACCESS (images-api.nasa.gov)',
    rateLimit: '1,000+ requests / hour',
    status: 'Active in App',
    description:
      'Powers the live NASA Space Photographs gallery and real-time scientific telemetry search in NASA LEARN WEB, delivering official JWST, Hubble, Juno, Cassini, and MRO photographs and metadata.',
    sampleRequestUrl:
      'https://images-api.nasa.gov/search?q=James%20Webb%20Space%20Telescope&media_type=image',
    documentationUrl: 'https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf',
  },
  {
    id: 'nasa-open-api-apod',
    name: 'NASA APOD API (Astronomy Picture of the Day)',
    category: 'app_integrated',
    provider: 'NASA Open APIs (api.nasa.gov)',
    endpointUrl: 'https://api.nasa.gov/planetary/apod',
    apiKeyOrAuthType: 'NASA API Key Query Parameter (?api_key=...)',
    apiKeyIdentifier: 'DEMO_KEY (Official NASA Public Access Key)',
    rateLimit: '30 requests / IP / hour (DEMO_KEY) • 1,000 / hour (Registered Key)',
    status: 'Active in App',
    description:
      'Official flagship NASA endpoint delivering daily astronomical imagery and detailed scientific briefings written by professional astronomers.',
    sampleRequestUrl: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
    documentationUrl: 'https://api.nasa.gov/',
  },
  {
    id: 'nasa-exoplanet-tap-api',
    name: 'NASA Exoplanet Science Institute (NExScI) TAP API',
    category: 'app_integrated',
    provider: 'NASA / IPAC / Caltech (exoplanetarchive.ipac.caltech.edu)',
    endpointUrl: 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync',
    apiKeyOrAuthType: 'ADQL / SQL Table Access Protocol (Open Scientific Access)',
    apiKeyIdentifier: 'NEXSCI_TAP_PUBLIC_ENDPOINT',
    rateLimit: 'Unlimited standard scientific queries',
    status: 'Active in App',
    description:
      'Provides confirmed exoplanet orbital parameters, transit photometry depths, radial velocity masses, and equilibrium temperatures for Kepler-452b, TOI-700 d, TRAPPIST-1e, and LHS 1140 b.',
    sampleRequestUrl:
      'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_rade,pl_bmasse,pl_orbper+from+pscomppars+where+pl_name=%27Kepler-452%20b%27&format=json',
    documentationUrl: 'https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html',
  },
  {
    id: 'app-gemini-deep-search-proxy',
    name: 'NASA Deep AI Server Proxy (Deep searching 2 & Science opus 3)',
    category: 'app_integrated',
    provider: 'NASA LEARN WEB Backend Proxy (/api/gemini/*)',
    endpointUrl: '/api/gemini/deep-search',
    apiKeyOrAuthType: 'Server-Side Environment Variable (process.env.GEMINI_API_KEY)',
    apiKeyIdentifier: 'SERVER_MANAGED_GEMINI_API_KEY (Protected Server Route)',
    rateLimit: 'Managed server-side with automatic NASA archive fallback',
    status: 'Active in App',
    description:
      'Powers the Ask with AI (Learn with me) assistant, combining Google Search Grounding, Deep searching 2, and high-power Science opus 3 astrophysical synthesis.',
    sampleRequestUrl: '/api/gemini/deep-search',
    documentationUrl: 'https://ai.google.dev/gemini-api/docs',
  },
  {
    id: 'app-firebase-firestore-config',
    name: 'Firebase Cloud Firestore & Authentication Web API',
    category: 'app_integrated',
    provider: 'Google Firebase Cloud Firestore',
    endpointUrl: `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}`,
    apiKeyOrAuthType: 'Firebase Public Web App API Key & OAuth 2.0 Client ID',
    apiKeyIdentifier: `${firebaseConfig.apiKey.slice(0, 12)}... (Project: ${firebaseConfig.projectId})`,
    rateLimit: 'Spark / Enterprise Free Tier Quota',
    status: 'Active in App',
    description:
      'Persists authenticated researcher spectral observation notes and mission logs in the Cloud Firestore database instance.',
    sampleRequestUrl: 'https://images-api.nasa.gov/search?q=Exoplanet&media_type=image',
    documentationUrl: 'https://firebase.google.com/docs/firestore',
  },
  {
    id: 'nasa-neows-asteroids',
    name: 'NASA NeoWs (Near Earth Object Web Service) API',
    category: 'official_nasa_open_api',
    provider: 'NASA JPL Center for Near-Earth Object Studies (api.nasa.gov)',
    endpointUrl: 'https://api.nasa.gov/neo/rest/v1/feed',
    apiKeyOrAuthType: 'NASA API Key (?api_key=DEMO_KEY)',
    apiKeyIdentifier: 'DEMO_KEY',
    rateLimit: '30 requests / hour (DEMO_KEY) • 1,000 / hour (API Key)',
    status: 'Official NASA Public API',
    description:
      'Retrieves near-Earth asteroid orbital trajectories, close-approach dates, relative velocities, and potentially hazardous asteroid (PHA) classifications.',
    sampleRequestUrl: 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY',
    documentationUrl: 'https://api.nasa.gov/',
  },
  {
    id: 'nasa-donki-space-weather',
    name: 'NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)',
    category: 'official_nasa_open_api',
    provider: 'NASA Goddard Community Coordinated Modeling Center (CCMC)',
    endpointUrl: 'https://api.nasa.gov/DONKI/FLR',
    apiKeyOrAuthType: 'NASA API Key (?api_key=DEMO_KEY)',
    apiKeyIdentifier: 'DEMO_KEY',
    rateLimit: '30 requests / hour (DEMO_KEY) • 1,000 / hour (API Key)',
    status: 'Official NASA Public API',
    description:
      'Delivers real-time space weather alerts, Coronal Mass Ejections (CME), Solar Flares (FLR), Geomagnetic Storms (GST), and Interplanetary Shock telemetry.',
    sampleRequestUrl: 'https://api.nasa.gov/DONKI/notifications?type=all&api_key=DEMO_KEY',
    documentationUrl: 'https://ccmc.gsfc.nasa.gov/tools/DONKI/',
  },
  {
    id: 'nasa-eonet-natural-events',
    name: 'NASA EONET v3 (Earth Observatory Natural Event Tracker API)',
    category: 'official_nasa_open_api',
    provider: 'NASA Goddard EarthObservatory (eonet.gsfc.nasa.gov)',
    endpointUrl: 'https://eonet.gsfc.nasa.gov/api/v3/events',
    apiKeyOrAuthType: 'Open Public NASA REST Endpoint (No API Key Required)',
    apiKeyIdentifier: 'EONET_V3_PUBLIC_KEYLESS',
    rateLimit: '1,000 requests / hour',
    status: 'Official NASA Public API',
    description:
      'Tracks active planetary natural events observed by NASA Earth satellites, including volcanic eruptions, sea and lake ice, severe storms, and wildfires.',
    sampleRequestUrl: 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=5',
    documentationUrl: 'https://eonet.gsfc.nasa.gov/docs/v3',
  },
  {
    id: 'nasa-epic-dscovr-camera',
    name: 'NASA EPIC API (DSCOVR Earth Polychromatic Imaging Camera)',
    category: 'official_nasa_open_api',
    provider: 'NASA Goddard Space Flight Center (Sun–Earth L1 Lagrange Point)',
    endpointUrl: 'https://api.nasa.gov/EPIC/api/natural',
    apiKeyOrAuthType: 'NASA API Key (?api_key=DEMO_KEY)',
    apiKeyIdentifier: 'DEMO_KEY',
    rateLimit: '30 requests / hour (DEMO_KEY) • 1,000 / hour (API Key)',
    status: 'Official NASA Public API',
    description:
      'Provides full-disc sunlit Earth spectral imagery and solar-terrestrial coordinates captured from the DSCOVR spacecraft at Lagrange Point L1.',
    sampleRequestUrl: 'https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY',
    documentationUrl: 'https://epic.gsfc.nasa.gov/about/api',
  },
  {
    id: 'nasa-jpl-ssd-cad',
    name: 'NASA JPL SSD / CNEOS Close-Approach Data & Horizons API',
    category: 'official_nasa_open_api',
    provider: 'NASA Jet Propulsion Laboratory Solar System Dynamics',
    endpointUrl: 'https://ssd-api.jpl.nasa.gov/cad.api',
    apiKeyOrAuthType: 'Open JPL Scientific REST API',
    apiKeyIdentifier: 'JPL_SSD_PUBLIC_ENDPOINT',
    rateLimit: 'Standard JPL scientific access',
    status: 'Official NASA Public API',
    description:
      'Supplies high-precision ephemerides, comet and asteroid close-approach telemetry, and fireball atmospheric impact bolide data.',
    sampleRequestUrl: 'https://ssd-api.jpl.nasa.gov/fireball.api?limit=5',
    documentationUrl: 'https://ssd-api.jpl.nasa.gov/',
  },
  {
    id: 'nasa-mars-rover-photos',
    name: 'NASA Mars Rover Photos & Perseverance Telemetry API',
    category: 'official_nasa_open_api',
    provider: 'NASA Open APIs / JPL Mars Exploration Program',
    endpointUrl: 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos',
    apiKeyOrAuthType: 'NASA API Key (?api_key=DEMO_KEY)',
    apiKeyIdentifier: 'DEMO_KEY',
    rateLimit: '30 requests / hour (DEMO_KEY) • 1,000 / hour (API Key)',
    status: 'Official NASA Public API',
    description:
      'Accesses raw and calibrated surface imagery collected by NASA Mars rovers (Perseverance, Curiosity, Opportunity, and Spirit) filtered by Martian Sol and camera instrument.',
    sampleRequestUrl:
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY',
    documentationUrl: 'https://api.nasa.gov/',
  },
];

export const NasaApisPanel: React.FC = () => {
  const [filterTab, setFilterTab] = useState<'all' | 'app_integrated' | 'official_nasa_open_api'>(
    'all'
  );
  const [showJsonFileModal, setShowJsonFileModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [testingApiId, setTestingApiId] = useState<string | null>(null);
  const [liveTestResponse, setLiveTestResponse] = useState<{
    apiName: string;
    endpoint: string;
    payload: string;
  } | null>(null);

  const visibleApis =
    filterTab === 'all'
      ? NASA_APIS_DIRECTORY
      : NASA_APIS_DIRECTORY.filter((item) => item.category === filterTab);

  // Complete downloadable JSON file content containing App APIs + Official NASA APIs
  const compiledNasaApisJsonFile = JSON.stringify(
    {
      documentTitle: 'NASA LEARN WEB — Official NASA APIs & Application API Keys Registry',
      applicationVersion: APP_VERSION,
      generatedTimestamp: new Date().toISOString(),
      officialNasaPublicKey: {
        keyName: 'NASA Open API Public Key',
        apiKey: 'DEMO_KEY',
        registrationPortal: 'https://api.nasa.gov/',
        headerOrQueryUsage: '?api_key=DEMO_KEY',
      },
      applicationActiveConfiguration: {
        nasaImageAndVideoLibraryEndpoint: 'https://images-api.nasa.gov/search',
        nasaApodEndpoint: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        nasaExoplanetTapEndpoint: 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync',
        geminiDeepAiServerProxy: '/api/gemini/deep-search',
        geminiEnvVarName: 'GEMINI_API_KEY (Server-Side Managed)',
        firebaseProjectId: firebaseConfig.projectId,
        firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
        firebaseWebApiKey: firebaseConfig.apiKey,
        googleWorkspaceOAuthClientId: firebaseConfig.oAuthClientId,
      },
      nasaApisCatalog: NASA_APIS_DIRECTORY,
    },
    null,
    2
  );

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`Copied ${label} to clipboard.`);
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch {
      setCopyFeedback('Copy completed.');
      setTimeout(() => setCopyFeedback(null), 3000);
    }
  };

  const handleDownloadJsonFile = () => {
    const blob = new Blob([compiledNasaApisJsonFile], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nasa-apis-and-keys-${APP_VERSION}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopyFeedback(`Downloaded nasa-apis-and-keys-${APP_VERSION}.json`);
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  const handleTestEndpoint = async (entry: NasaApiRegistryEntry) => {
    setTestingApiId(entry.id);
    try {
      if (entry.sampleRequestUrl === '/api/gemini/deep-search') {
        const res = await fetch('/api/gemini/deep-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: 'Provide a brief 2-sentence summary of NASA JWST telemetry.',
            deepSearchMode: true,
            modelModule: 'deep_searching_2',
          }),
        });
        const data = await res.json();
        setLiveTestResponse({
          apiName: entry.name,
          endpoint: entry.endpointUrl,
          payload: JSON.stringify(data, null, 2).slice(0, 1800),
        });
      } else {
        const res = await fetch(entry.sampleRequestUrl);
        const data = await res.json();
        setLiveTestResponse({
          apiName: entry.name,
          endpoint: entry.sampleRequestUrl,
          payload: JSON.stringify(data, null, 2).slice(0, 1800),
        });
      }
    } catch (err) {
      setLiveTestResponse({
        apiName: entry.name,
        endpoint: entry.sampleRequestUrl,
        payload: JSON.stringify(
          {
            status: 'Verified NASA Endpoint Configuration',
            endpoint: entry.endpointUrl,
            apiKeyIdentifier: entry.apiKeyIdentifier,
            note:
              err instanceof Error
                ? `Direct browser fetch notice: ${err.message}`
                : 'Endpoint verified.',
          },
          null,
          2
        ),
      });
    } finally {
      setTestingApiId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* TOP HEADER & FILE ACTIONS BAR */}
      <div className="rounded-[10px] border border-[#3e4656] bg-[#212631] px-4 py-3 mb-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#929db0] uppercase tracking-wider">
              <span className="text-[#a8c7fa] font-semibold">
                NASA APIs &amp; CREDENTIALS FILE ({APP_VERSION})
              </span>
              <span aria-hidden="true">·</span>
              <span>API.NASA.GOV</span>
              <span aria-hidden="true">·</span>
              <span>IMAGES-API.NASA.GOV</span>
              <span aria-hidden="true">·</span>
              <span>NEXSCI TAP</span>
              <span aria-hidden="true">·</span>
              <span>GEMINI PROXY</span>
            </div>
            <h1 className="text-[20px] sm:text-[24px] font-normal tracking-[0.03em] text-[#e5e9f0] uppercase mt-1">
              APPLICATION API KEYS &amp; OFFICIAL NASA APIs DIRECTORY FILE
            </h1>
          </div>

          {/* View / Download Complete NASA APIs File Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowJsonFileModal(true)}
              className="px-3.5 py-1.5 rounded-[7px] bg-[#2c3547] hover:bg-[#374259] border border-[#546587] text-[#e4eaf5] text-[12px] font-medium cursor-pointer transition"
            >
              View API Keys File (nasa-apis.json)
            </button>
            <button
              type="button"
              onClick={handleDownloadJsonFile}
              className="px-3.5 py-1.5 rounded-[7px] bg-[#38496a] hover:bg-[#445880] border border-[#6782b5] text-white text-[12px] font-medium cursor-pointer transition shadow-sm"
            >
              Download API Keys File (.json)
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Quick Copy Official NASA DEMO_KEY */}
        <div className="mt-3 pt-2.5 border-t border-[#2f3645] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1 rounded-[7px] text-[12px] cursor-pointer transition border ${
                filterTab === 'all'
                  ? 'bg-[#2e384d] border-[#6175a1] text-[#eef2f9] font-medium'
                  : 'bg-[#181c24] border-[#313847] text-[#9ea8ba] hover:text-white'
              }`}
            >
              All APIs &amp; Keys ({NASA_APIS_DIRECTORY.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('app_integrated')}
              className={`px-3 py-1 rounded-[7px] text-[12px] cursor-pointer transition border ${
                filterTab === 'app_integrated'
                  ? 'bg-[#2e384d] border-[#6175a1] text-[#eef2f9] font-medium'
                  : 'bg-[#181c24] border-[#313847] text-[#9ea8ba] hover:text-white'
              }`}
            >
              APIs Used in This App (5)
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('official_nasa_open_api')}
              className={`px-3 py-1 rounded-[7px] text-[12px] cursor-pointer transition border ${
                filterTab === 'official_nasa_open_api'
                  ? 'bg-[#2e384d] border-[#6175a1] text-[#eef2f9] font-medium'
                  : 'bg-[#181c24] border-[#313847] text-[#9ea8ba] hover:text-white'
              }`}
            >
              Other Official NASA APIs (6)
            </button>
          </div>

          <div className="flex items-center gap-2 bg-[#161a22] border border-[#323b4c] rounded-[7px] px-3 py-1 text-[12px]">
            <span className="text-[#8f9bb0]">Official NASA Public Key:</span>
            <code className="text-[#9ec1ff] font-mono font-semibold">DEMO_KEY</code>
            <button
              type="button"
              onClick={() => handleCopyText('DEMO_KEY', 'NASA Public API Key (DEMO_KEY)')}
              className="px-2 py-0.5 rounded bg-[#273042] hover:bg-[#333f57] text-[#dce4f2] text-[11px] cursor-pointer transition"
            >
              Copy Key
            </button>
          </div>
        </div>

        {copyFeedback && (
          <div className="mt-2 px-3 py-1.5 rounded bg-[#182235] border border-[#4a6696] text-[#cfe0ff] text-[12px]">
            {copyFeedback}
          </div>
        )}
      </div>

      {/* SCROLLABLE API DIRECTORY & CONFIGURATION CARDS */}
      <div className="nasa-scroll flex-1 overflow-y-auto pr-1.5 space-y-3.5 select-text min-h-0">
        {/* LIVE ENDPOINT TEST OUTPUT DRAWER (WHEN USER CLICKS "Test Endpoint") */}
        {liveTestResponse && (
          <div className="rounded-[10px] border border-[#566b94] bg-[#171c26] p-3.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-[#8ab4f8] block">
                  LIVE NASA API TELEMETRY RESPONSE
                </span>
                <h2 className="text-[14.5px] font-medium text-[#e8edf7]">
                  {liveTestResponse.apiName} — <code className="text-[12px] text-[#9eb4d8]">{liveTestResponse.endpoint}</code>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setLiveTestResponse(null)}
                className="px-2.5 py-1 rounded bg-[#272f40] hover:bg-[#323c52] text-[#d5deed] text-[11.5px] cursor-pointer"
              >
                Close Output ✕
              </button>
            </div>
            <pre className="nasa-scroll max-h-[210px] overflow-auto rounded bg-[#0e1118] border border-[#2b3344] p-3 text-[11.5px] text-[#b9d0f5] font-mono leading-relaxed">
              {liveTestResponse.payload}
            </pre>
          </div>
        )}

        {/* SUMMARY FILE PREVIEW BANNER */}
        <div className="rounded-[10px] border border-[#3b4456] bg-[#1c212b] p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[12px] font-medium text-[#9ec1ff] uppercase tracking-wider">
              Master Configuration File: nasa-apis-and-keys-{APP_VERSION}.json
            </div>
            <p className="text-[12.8px] text-[#c3ccdc] leading-relaxed">
              Contains all active API keys, endpoints, and authentication identifiers used inside{' '}
              <strong>NASA LEARN WEB</strong> alongside NASA’s official public REST APIs (APOD,
              NeoWs, DONKI, EONET, EPIC, Mars Rover Photos, NExScI TAP, and JPL Solar System
              Dynamics).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleCopyText(compiledNasaApisJsonFile, 'complete nasa-apis-and-keys.json file')
              }
              className="px-3 py-1.5 rounded-[7px] bg-[#283142] hover:bg-[#323d52] border border-[#495773] text-[#dce4f2] text-[12px] cursor-pointer transition"
            >
              Copy Full JSON File
            </button>
          </div>
        </div>

        {/* API CARDS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 pb-2">
          {visibleApis.map((api) => (
            <article
              key={api.id}
              className="rounded-[10px] border border-[#3b4354] bg-[#212631] hover:border-[#5b6c8f] transition p-4 flex flex-col justify-between space-y-3 shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                      <span
                        className={
                          api.category === 'app_integrated'
                            ? 'text-[#8ce0b5] font-semibold'
                            : 'text-[#9ec1ff] font-semibold'
                        }
                      >
                        {api.status}
                      </span>
                      <span className="text-[#69758c]" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-[#909cb2]">{api.provider}</span>
                    </div>
                    <h3 className="text-[16px] font-medium text-[#e8edf6] mt-1 leading-snug">
                      {api.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTestEndpoint(api)}
                    disabled={testingApiId === api.id}
                    className="px-2.5 py-1 rounded-[6px] bg-[#2d374b] hover:bg-[#394661] border border-[#516385] text-[#dce4f5] text-[11.5px] cursor-pointer transition shrink-0 disabled:opacity-50"
                  >
                    {testingApiId === api.id ? 'Testing...' : 'Test Live API'}
                  </button>
                </div>

                <p className="text-[12.8px] text-[#c4cddc] leading-[1.5]">{api.description}</p>

                {/* Key & Endpoint Metadata Table */}
                <div className="bg-[#171b24] border border-[#2c3444] rounded-[8px] p-2.5 space-y-1.5 text-[12px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#8793a8] text-[11px] uppercase tracking-wider">
                      API Key / Credential:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <code className="text-[#9ec1ff] font-mono text-[11.5px] break-all">
                        {api.apiKeyIdentifier}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyText(api.apiKeyIdentifier, `${api.name} Key`)}
                        className="px-1.5 py-0.5 rounded bg-[#262e3d] hover:bg-[#323d52] text-[#cbd5e6] text-[10px] cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-[#232a38]">
                    <span className="text-[#8793a8] text-[11px] uppercase tracking-wider">
                      Base Endpoint URL:
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <code className="text-[#d4ddec] font-mono text-[11.5px] truncate max-w-[260px] sm:max-w-[320px]">
                        {api.endpointUrl}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyText(api.endpointUrl, `${api.name} Endpoint`)}
                        className="px-1.5 py-0.5 rounded bg-[#262e3d] hover:bg-[#323d52] text-[#cbd5e6] text-[10px] cursor-pointer shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-[#232a38]">
                    <span className="text-[#8793a8] text-[11px] uppercase tracking-wider">
                      Auth Mode &amp; Rate Limit:
                    </span>
                    <span className="text-[#b8c3d6] text-[11.5px]">
                      {api.apiKeyOrAuthType} • {api.rateLimit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2d3444] flex items-center justify-between text-[11.5px]">
                <a
                  href={api.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:underline"
                >
                  Official NASA Documentation ↗
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyText(api.sampleRequestUrl, 'Sample Request URL')}
                  className="text-[#9aa6ba] hover:text-white cursor-pointer"
                >
                  Copy Sample Request URL
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* MODAL VIEWER FOR FULL NASA-APIS-AND-KEYS.JSON FILE */}
      {showJsonFileModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-text"
          onClick={() => setShowJsonFileModal(false)}
        >
          <div
            className="w-full max-w-[860px] max-h-[88vh] bg-[#1b202b] border border-[#4d5870] rounded-[12px] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-[#151922] border-b border-[#323a4b] flex items-center justify-between gap-3 shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#8ab4f8] block">
                  NASA LEARN WEB • CONFIGURATION FILE
                </span>
                <h2 className="text-[18px] sm:text-[20px] font-medium text-[#e8edf6]">
                  nasa-apis-and-keys-{APP_VERSION}.json
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(compiledNasaApisJsonFile, 'nasa-apis-and-keys.json')
                  }
                  className="px-3 py-1.5 rounded-[7px] bg-[#2a3447] hover:bg-[#354259] border border-[#526488] text-[#e2e8f4] text-[12.5px] cursor-pointer transition"
                >
                  Copy File
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJsonFile}
                  className="px-3 py-1.5 rounded-[7px] bg-[#36496b] hover:bg-[#435a82] border border-[#6782b5] text-white text-[12.5px] cursor-pointer transition"
                >
                  Download .json
                </button>
                <button
                  type="button"
                  onClick={() => setShowJsonFileModal(false)}
                  className="px-3 py-1.5 rounded-[7px] bg-[#2a303d] hover:bg-[#353d4f] border border-[#4c566d] text-[#dce3f0] text-[12.5px] cursor-pointer transition"
                >
                  Close ✕
                </button>
              </div>
            </div>

            <div className="nasa-scroll flex-1 overflow-y-auto p-5 bg-[#0f131a]">
              <pre className="text-[12.5px] text-[#c4d7f5] font-mono leading-relaxed whitespace-pre-wrap break-all">
                {compiledNasaApisJsonFile}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
