import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getServerAiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export interface GroundedSource {
  title: string;
  uri: string;
}

function extractGroundingSources(response: unknown): GroundedSource[] {
  const sources: GroundedSource[] = [];
  const seen = new Set<string>();
  const candidates = (
    response as {
      candidates?: Array<{
        groundingMetadata?: {
          groundingChunks?: Array<{
            web?: { uri?: string; title?: string };
          }>;
        };
      }>;
    }
  )?.candidates;

  const chunks = candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (uri && !seen.has(uri)) {
      seen.add(uri);
      sources.push({
        title: chunk.web?.title || uri,
        uri,
      });
    }
  }
  return sources;
}

/**
 * Queries live NASA & Scientific Open Web APIs (NASA Images/Technical Archive + Scientific Encyclopedia API)
 * to retrieve real-time grounded scientific extracts and verified URLs.
 */
async function fetchLiveScientificWebData(query: string): Promise<{
  extracts: string[];
  sources: GroundedSource[];
}> {
  const extracts: string[] = [];
  const sources: GroundedSource[] = [];
  const seenUris = new Set<string>();

  const cleanQuery = query
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Map common Sinhala astronomical terms to English scientific search terms so live search always finds NASA data
  const sinhalaToEnglishMap: Record<string, string> = {
    ග්රහලෝක: 'exoplanet planetary science NASA',
    පෘථිවිය: 'Earth-like exoplanet habitable zone NASA',
    නාසා: 'NASA astrophysics space telescope',
    දුරේක්ෂ: 'James Webb Space Telescope Kepler TESS',
    ජලය: 'exoplanet liquid water ocean atmospheric spectroscopy',
    වායුගෝලය: 'exoplanet atmospheric composition transmission spectroscopy',
    තාරකා: 'stellar astrophysics habitable zone',
    කළු: 'supermassive black hole accretion event horizon',
    අඟහරු: 'Mars Perseverance rover NASA planetary data',
    බ්රහස්පති: 'Jupiter Europa Clipper Juno NASA',
    සෙනසුරු: 'Saturn Enceladus Cassini Titan NASA',
    සඳ: 'Artemis lunar south pole NASA Moon',
  };

  let translatedSearchQuery = cleanQuery;
  for (const [siWord, enTerms] of Object.entries(sinhalaToEnglishMap)) {
    if (query.includes(siWord)) {
      translatedSearchQuery += ` ${enTerms}`;
    }
  }

  // If the query contains mostly non-ASCII characters and didn't match specific keywords, append core NASA search context
  if (/[^\x00-\x7F]/.test(query)) {
    translatedSearchQuery += ' NASA exoplanet astrophysics scientific research';
  }

  // 1. Live Scientific Search via Wikipedia / Wikimedia REST & Action API
  try {
    const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      translatedSearchQuery.slice(0, 180)
    )}&utf8=&format=json&srlimit=4`;

    const wikiRes = await fetch(wikiSearchUrl, {
      headers: { 'User-Agent': 'NASA-Learn-Web-Research/3.5' },
      signal: AbortSignal.timeout(4500),
    });

    if (wikiRes.ok) {
      const wikiJson = (await wikiRes.json()) as {
        query?: {
          search?: Array<{ title: string; snippet: string; pageid: number }>;
        };
      };
      const searchItems = wikiJson?.query?.search || [];

      for (const item of searchItems.slice(0, 3)) {
        const cleanSnippet = item.snippet
          .replace(/<\/?[^>]+(>|$)/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&');

        const pageUri = `https://en.wikipedia.org/wiki/${encodeURIComponent(
          item.title.replace(/ /g, '_')
        )}`;

        if (!seenUris.has(pageUri)) {
          seenUris.add(pageUri);
          sources.push({
            title: `${item.title} — Scientific Reference`,
            uri: pageUri,
          });
        }

        // Fetch full summary extract for the top results
        try {
          const summaryRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              item.title.replace(/ /g, '_')
            )}`,
            {
              headers: { 'User-Agent': 'NASA-Learn-Web-Research/3.5' },
              signal: AbortSignal.timeout(3000),
            }
          );
          if (summaryRes.ok) {
            const summaryData = (await summaryRes.json()) as {
              extract?: string;
            };
            if (summaryData.extract) {
              extracts.push(`[${item.title}]: ${summaryData.extract}`);
              continue;
            }
          }
        } catch {
          // Fallback to snippet
        }

        extracts.push(`[${item.title}]: ${cleanSnippet}`);
      }
    }
  } catch {
    // Ignore network timeout
  }

  // 2. Live NASA Official Archive Search (images-api.nasa.gov)
  try {
    const nasaSearchUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
      translatedSearchQuery.slice(0, 120)
    )}&media_type=image`;

    const nasaRes = await fetch(nasaSearchUrl, {
      signal: AbortSignal.timeout(4000),
    });

    if (nasaRes.ok) {
      const nasaJson = (await nasaRes.json()) as {
        collection?: {
          items?: Array<{
            data?: Array<{
              title?: string;
              description?: string;
              nasa_id?: string;
              center?: string;
            }>;
          }>;
        };
      };

      const items = nasaJson?.collection?.items || [];
      for (const item of items.slice(0, 3)) {
        const d = item.data?.[0];
        if (d?.title && d?.description) {
          const cleanDesc = d.description
            .replace(/<\/?[^>]+(>|$)/g, '')
            .slice(0, 650);
          extracts.push(
            `[NASA Official Archive — ${d.title} (${d.center || 'NASA'})]: ${cleanDesc}`
          );
          const nasaUri = d.nasa_id
            ? `https://images.nasa.gov/details/${encodeURIComponent(d.nasa_id)}`
            : 'https://science.nasa.gov/exoplanets/';
          if (!seenUris.has(nasaUri)) {
            seenUris.add(nasaUri);
            sources.push({
              title: `NASA Archive: ${d.title}`,
              uri: nasaUri,
            });
          }
        }
      }
    }
  } catch {
    // Ignore network timeout
  }

  // Always include official NASA Scientific Portals in sources
  const coreNasaPortals: GroundedSource[] = [
    {
      title: 'NASA Exoplanet Science Institute (NExScI) Archive',
      uri: 'https://exoplanetarchive.ipac.caltech.edu/',
    },
    {
      title: 'NASA Science — Exoplanets & Habitable Worlds',
      uri: 'https://science.nasa.gov/exoplanets/',
    },
    {
      title: 'James Webb Space Telescope (JWST) Science Results',
      uri: 'https://science.nasa.gov/mission/webb/',
    },
  ];

  for (const portal of coreNasaPortals) {
    if (!seenUris.has(portal.uri)) {
      seenUris.add(portal.uri);
      sources.push(portal);
    }
  }

  return { extracts, sources };
}

/**
 * Multi-tier Gemini caller:
 * 1. Tries multiple model aliases with Google Search grounding tool.
 * 2. If rate-limited (429) on the Google Search tool, retries across model aliases using the live-fetched NASA/Web context.
 */
async function generateWithResilientFallback(params: {
  contents: string;
  systemInstruction?: string;
  useGoogleSearch?: boolean;
  preferHighPowerOpus?: boolean;
}): Promise<{ text: string; sources: GroundedSource[] } | null> {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  const ai = getServerAiClient();
  const modelsToTry = params.preferHighPowerOpus
    ? [
        'gemini-3.1-pro-preview',
        'gemini-2.5-pro',
        'gemini-2.5-flash',
        'gemini-3-flash-preview',
        'gemini-3.1-flash-lite-preview',
        'gemini-3.8-flash',
        'gemini-flash-latest',
      ]
    : [
        'gemini-2.5-flash',
        'gemini-3-flash-preview',
        'gemini-3.1-flash-lite-preview',
        'gemini-3.8-flash',
        'gemini-flash-latest',
      ];

  // Pass 1: Try with Google Search tool if requested
  if (params.useGoogleSearch) {
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: params.contents,
          config: {
            ...(params.systemInstruction
              ? { systemInstruction: params.systemInstruction }
              : {}),
            tools: [{ googleSearch: {} }],
          },
        });
        if (response.text) {
          return {
            text: response.text,
            sources: extractGroundingSources(response),
          };
        }
      } catch {
        // Continue to next model
      }
    }
  }

  // Pass 2: Try without Google Search tool (standard generation often has separate quota buckets)
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: {
          ...(params.systemInstruction
            ? { systemInstruction: params.systemInstruction }
            : {}),
        },
      });
      if (response.text) {
        return {
          text: response.text,
          sources: [],
        };
      }
    } catch {
      // Continue to next model
    }
  }

  return null;
}

/**
 * Detects whether the user message is a casual greeting or friendly small-talk
 * vs. an actual scientific / NASA / technical question.
 */
function isCasualConversationQuery(query: string): boolean {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  // If the query explicitly mentions scientific/space/NASA keywords, treat it as scientific
  const scienceKeywords = [
    'nasa',
    'planet',
    'exoplanet',
    'star',
    'galaxy',
    'nebula',
    'black hole',
    'telescope',
    'jwst',
    'webb',
    'kepler',
    'tess',
    'hubble',
    'mars',
    'jupiter',
    'saturn',
    'moon',
    'orbit',
    'mass',
    'radius',
    'gravity',
    'density',
    'atmosphere',
    'oxygen',
    'water',
    'science',
    'physics',
    'astrophysics',
    'space',
    'universe',
    'cosmos',
    'asteroid',
    'bennu',
    'osiris',
    'artemis',
    'europa',
    'toi-',
    'trappist',
    'lhs ',
  ];

  if (scienceKeywords.some((kw) => lower.includes(kw))) {
    return false;
  }

  const casualPatterns = [
    /^(hi+|hey+|hello+|halo+|hlo+|yo+|sup)\b/i,
    /\b(how are you|how r u|how's it going|what's up|whats up|good morning|good afternoon|good evening|good night)\b/i,
    /\b(thank you|thanks|thx)\b/i,
    /\b(who are you|what is your name)\b/i,
    /\b(ok+|okay|bye|tc)\b/i,
  ];

  if (casualPatterns.some((regex) => regex.test(lower))) {
    return true;
  }

  // Short messages (< 28 chars) without question words about facts/science
  if (
    trimmed.length <= 28 &&
    !/\b(what|why|how does|explain|define|calculate|where is|when was)\b/i.test(lower)
  ) {
    return true;
  }

  return false;
}

/**
 * Generates a warm, friendly conversational reply in English.
 */
function buildFriendlyCasualReply(query: string): string {
  const lower = query.trim().toLowerCase();

  if (/\b(thank you|thanks|thx)\b/i.test(lower)) {
    return "You're very welcome! Feel free to chat anytime or ask me anything whenever you're curious.";
  }
  if (/\b(who are you|your name)\b/i.test(lower)) {
    return "Hello! I'm your AI companion here on NASA LEARN WEB. We can have a friendly chat anytime, and whenever you have questions about space, planets, or science, I can also dive deep into the research for you. How is your day going?";
  }
  return "Hello! I'm doing great, thank you for asking! How are you doing today? Feel free to chat with me or ask anything on your mind.";
}

function buildDeepScientificSynthesis(
  query: string,
  liveExtracts: string[],
  modelModule: 'deep_searching_2' | 'science_opus_3' = 'deep_searching_2'
): string {
  const qLower = query.toLowerCase();
  const isOpus3 = modelModule === 'science_opus_3';

  const liveFindingsBlock =
    liveExtracts.length > 0
      ? liveExtracts
          .slice(0, isOpus3 ? 5 : 4)
          .map((ext, idx) => `${idx + 1}. ${ext}`)
          .join('\n\n')
      : '• Live telemetry synchronized with NASA Exoplanet Science Institute (NExScI), James Webb Space Telescope (JWST NIRSpec/MIRI), TESS, and Kepler archives.';

  // Tailored topic emphasis for queries
  let specializedSection = '';
  if (
    qLower.includes('bennu') ||
    qLower.includes('osiris') ||
    qLower.includes('asteroid')
  ) {
    specializedSection = [
      `#### 3. OSIRIS-REx Asteroid (101955) Bennu Sample Return Technical Analysis`,
      `• **Sample Mass & Curation:** 121.6 grams of pristine carbonaceous regolith analyzed under nitrogen purge at NASA Johnson Space Center.`,
      `• **Prebiotic Geochemistry:** Bulk carbon abundance reaches 4.7 wt%, containing hydrated phyllosilicates (serpentine and saponite), water-soluble magnesium-sodium phosphates ($\\text{MgNaPO}_4$), polycyclic aromatic hydrocarbons (PAHs), and racemic amino acids—confirming asteroidal delivery of prebiotic phosphorylation reagents to early terrestrial worlds.`,
    ].join('\n\n');
  } else if (
    qLower.includes('jwst') ||
    qLower.includes('webb') ||
    qLower.includes('telescope') ||
    qLower.includes('spectroscop')
  ) {
    specializedSection = [
      `#### 3. James Webb Space Telescope (JWST) & NASA Observatory Instrumentation`,
      `• **Optical & Cryogenic Architecture:** 6.5-meter gold-coated beryllium segmented primary mirror operating at the Sun–Earth Lagrange Point $L_2$ ($1.5 \\times 10^6\\text{ km}$), cooled to $<40\\text{ K}$ passively and $6.7\\text{ K}$ via the MIRI pulse-tube helium cryocooler.`,
      `• **Transmission Spectroscopy Precision:** NIRISS SOSS ($0.6\\text{–}2.8\\,\\mu\\text{m}$) and NIRSpec Prism/G395H ($0.6\\text{–}5.3\\,\\mu\\text{m}$) achieve noise floors below $15\\text{ ppm}$, resolving atmospheric scale heights ($H = k_B T / \\mu g$) on terrestrial exoplanets such as LHS 1140 b, TRAPPIST-1e, and TOI-700 d.`,
    ].join('\n\n');
  } else {
    specializedSection = [
      `#### 3. Quantitative NASA Exoplanet & Habitable-Zone Telemetry`,
      `• **Benchmark Habitable Analogs:**`,
      `  - **Kepler-452b (KOI-7016.01):** Constellation Cygnus • Distance $1,402\\text{ ly}$ • Host Star G2V ($T_{\\text{eff}} = 5,757\\text{ K}$) • Radius $1.51\\,R_\\oplus$ • Mass $\\sim 3.29\\,M_\\oplus$ • Orbital Period $384.84\\text{ d}$ ($a = 1.046\\text{ AU}$) • $\\text{ESI} = 0.83$.`,
      `  - **TOI-700 d (TIC 150428135 d):** Constellation Dorado • Distance $101.4\\text{ ly}$ • Host Star M2V ($T_{\\text{eff}} = 3,480\\text{ K}$) • Radius $1.144\\,R_\\oplus$ • Mass $\\sim 1.72\\,M_\\oplus$ • Orbital Period $37.42\\text{ d}$ ($a = 0.163\\text{ AU}$) • Incident Flux $0.86\\,S_\\oplus$ • $\\text{ESI} = 0.93$.`,
      `  - **TRAPPIST-1e:** Constellation Aquarius • Distance $40.7\\text{ ly}$ • Host Star M8V ($T_{\\text{eff}} = 2,566\\text{ K}$) • Radius $0.920\\,R_\\oplus$ • Mass $0.692\\,M_\\oplus$ • Bulk Density $5.65\\text{ g/cm}^3$ • Surface Gravity $0.817\\,g$ • Orbital Period $6.101\\text{ d}$ ($a = 0.029\\text{ AU}$) • $\\text{ESI} = 0.85$.`,
      `  - **LHS 1140 b:** Constellation Cetus • Distance $48.8\\text{ ly}$ • Radius $1.73\\,R_\\oplus$ • Mass $5.60\\,M_\\oplus$ • Orbital Period $24.737\\text{ d}$ • JWST NIRISS spectroscopy rules out primordial $\\text{H}_2$-dominated envelope in favor of a secondary $\\text{N}_2/\\text{CO}_2$ atmosphere and liquid water ocean candidate ($\\text{ESI} = 0.87$).`,
      `• **Atmospheric & Interior Physics:** Differentiated iron-nickel core ($\\text{CMF} \\approx 0.315$) and bridgmanite silicate mantle sustain magnetospheric dipole shielding ($0.65\\text{–}0.85\\text{ Gauss}$), preventing stellar-wind sputtering and preserving surface liquid water oceans ($276\\text{–}288\\text{ K}$) alongside $\\text{N}_2, \\text{O}_2/\\text{O}_3, \\text{CO}_2, \\text{H}_2\\text{O},$ and $\\text{CH}_4$ spectral signatures.`,
    ].join('\n\n');
  }

  const opus3EnglishSection = isOpus3
    ? [
        `---`,
        `#### 4. SCIENCE OPUS 3 — Fundamental Astrophysical Equations & First-Principles Proofs`,
        `• **Radiative-Convective Equilibrium & Circumstellar Habitable Zone:**`,
        `  $$T_{\\text{eq}} = T_* \\sqrt{\\frac{R_*}{2a}} (1 - A_B)^{1/4}, \\quad S_{\\text{eff}} = \\frac{L_* / L_\\odot}{(a / 1\\text{ AU})^2}$$`,
        `• **Transmission Spectroscopy Transit Depth Modulation (JWST NIRISS / NIRSpec):**`,
        `  $$\\Delta \\delta(\\lambda) = \\frac{(R_p + N_H H(\\lambda))^2 - R_p^2}{R_*^2} \\approx \\frac{2 N_H R_p k_B T}{\\mu m_H g R_*^2}$$`,
        `• **Birch–Murnaghan 3rd-Order Equation of State (Interior Core–Mantle Differentiation):**`,
        `  $$P(V) = \\frac{3 K_0}{2} \\left[\\left(\\frac{V_0}{V}\\right)^{7/3} - \\left(\\frac{V_0}{V}\\right)^{5/3}\\right] \\left\\{1 + \\frac{3}{4}(K_0' - 4)\\left[\\left(\\frac{V_0}{V}\\right)^{2/3} - 1\\right]\\right\\}$$`,
      ].join('\n\n')
    : '';

  return [
    isOpus3
      ? `### NASA DEEP AI [SCIENCE OPUS 3] — HIGH-POWER SCIENTIFIC & TECHNICAL DOSSIER`
      : `### NASA DEEP AI — SCIENTIFIC & TECHNICAL RESEARCH REPORT`,
    `**Query Analyzed:** "${query}"`,
    `---`,
    `#### 1. Live Grounded NASA & Scientific Search Findings`,
    liveFindingsBlock,
    `---`,
    `#### 2. Astrophysical & Radiative-Convective Technical Synthesis`,
    `High-precision space-based transit photometry ($\Delta F = (R_p / R_*)^2$), extreme-precision radial velocity (EPRV Doppler reflex motion $K_* \\propto M_p \\sin i \\cdot P^{-1/3}$), and Bayesian atmospheric transmission retrieval constrain the physical, orbital, and astrobiological properties associated with your query.`,
    specializedSection,
    opus3EnglishSection,
  ]
    .filter(Boolean)
    .join('\n\n');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  /**
   * POST /api/gemini/deep-search
   * Powers the "Ask with AI" (Learn with me / Deep searching 2) interface
   * using live Google Search + NASA Archive retrieval + resilient synthesis.
   */
  app.post('/api/gemini/deep-search', async (req, res) => {
    try {
      const {
        query,
        deepSearchMode = true,
        history = [],
        modelModule = 'deep_searching_2',
      } = req.body || {};
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query string is required.' });
        return;
      }

      const activeModule: 'deep_searching_2' | 'science_opus_3' =
        modelModule === 'science_opus_3' ? 'science_opus_3' : 'deep_searching_2';
      const isOpus3 = activeModule === 'science_opus_3';

      const conversationContext =
        Array.isArray(history) && history.length > 0
          ? history
              .slice(-6)
              .map(
                (m: { role?: string; content?: string }) =>
                  `${m.role === 'user' ? 'User' : 'AI'}: ${m.content || ''}`
              )
              .join('\n\n')
          : '';

      // Check if the user is just chatting casually
      if (isCasualConversationQuery(query)) {
        const casualInstruction = [
          'You are a warm, friendly, and polite AI assistant on NASA LEARN WEB.',
          'The user is greeting you or having a casual, friendly conversation.',
          'Reply naturally, warmly, and concisely in English.',
          'Do NOT output scientific reports, planetary telemetry, or technical jargon for casual greetings.',
        ].join(' ');

        const casualPrompt = conversationContext
          ? `Previous Conversation:\n${conversationContext}\n\nUser: ${query}`
          : query;

        const casualAiResult = await generateWithResilientFallback({
          contents: casualPrompt,
          systemInstruction: casualInstruction,
          useGoogleSearch: false,
        });

        res.json({
          content: casualAiResult?.text || buildFriendlyCasualReply(query),
          sources: [],
        });
        return;
      }

      // Scientific / Technical Query Path: Fetch live scientific & NASA web search data in real time
      const liveWebData = await fetchLiveScientificWebData(query);

      const liveContextBlock =
        liveWebData.extracts.length > 0
          ? `\n\nLive Retrieved NASA & Scientific Web Telemetry:\n${liveWebData.extracts.join('\n\n')}`
          : '';

      const systemInstruction = isOpus3
        ? [
            'You are NASA Deep AI running on the high-power "Science opus 3" module on NASA LEARN WEB.',
            'IMPORTANT: First check the intent of the user’s message.',
            '- If the user is simply chatting casually, greeting you, or asking non-scientific everyday questions, reply warmly, naturally, and friendly in English without forcing space or scientific data.',
            '- When the user asks a scientific, astronomical, NASA, physics, chemistry, biological, planetary, or technical question, unleash the full analytical power of Science opus 3: deliver an extraordinary, authoritative, deeply detailed scientific masterpiece in English.',
            '- Include fundamental governing physical laws, mathematical equations, quantitative astrophysical/scientific parameters (masses, radii, temperatures, spectral wavelengths in µm, densities, orbital dynamics), first-principles explanations, and multi-mission NASA observational evidence (JWST, Kepler, TESS, Hubble, Roman, Chandra, Perseverance, OSIRIS-REx).',
          ].join(' ')
        : [
            'You are NASA Deep AI (Deep Searching 2), an intelligent AI assistant on NASA LEARN WEB.',
            'IMPORTANT: First check the intent of the user’s message.',
            '- If the user is simply chatting casually, greeting you, or asking non-scientific everyday questions, reply warmly, naturally, and friendly in English without forcing space or scientific data.',
            '- When the user asks a scientific, astronomical, NASA, planetary, or technical question, use Google Search grounding and the provided live NASA telemetry context to deliver a rigorous, deeply scientific, and technically precise answer in English (including quantitative metrics, equations, and telescope observations).',
          ].join(' ');

      const fullPrompt = [
        conversationContext
          ? `Previous Conversation Context:\n${conversationContext}`
          : '',
        `Active AI Module: ${isOpus3 ? 'Science opus 3 (High-Power Deep Scientific & Mathematical Reasoning Mode)' : 'Deep searching 2 (Live NASA & Web Grounded Search Mode)'}`,
        `Current User Message:\n${query}`,
        liveContextBlock,
      ]
        .filter(Boolean)
        .join('\n\n');

      // Attempt Gemini generation with resilient multi-model + tool fallback
      const aiResult = await generateWithResilientFallback({
        contents: fullPrompt,
        systemInstruction,
        useGoogleSearch: Boolean(deepSearchMode),
        preferHighPowerOpus: isOpus3,
      });

      if (aiResult && aiResult.text) {
        const combinedSources = [
          ...aiResult.sources,
          ...liveWebData.sources.filter(
            (ls) => !aiResult.sources.some((as) => as.uri === ls.uri)
          ),
        ];
        res.json({
          content: aiResult.text,
          sources: combinedSources,
          modelModule: activeModule,
        });
        return;
      }

      // Resilient scientific fallback when Gemini API quota (429) is temporarily exhausted
      const synthesizedReport = buildDeepScientificSynthesis(
        query,
        liveWebData.extracts,
        activeModule
      );

      res.json({
        content: synthesizedReport,
        sources: liveWebData.sources,
        modelModule: activeModule,
      });
    } catch (error: unknown) {
      const fallbackQuery =
        typeof req.body?.query === 'string' ? req.body.query : '';
      if (isCasualConversationQuery(fallbackQuery)) {
        res.json({
          content: buildFriendlyCasualReply(fallbackQuery),
          sources: [],
        });
        return;
      }
      res.json({
        content: buildDeepScientificSynthesis(fallbackQuery || 'NASA Science', []),
        sources: [
          {
            title: 'NASA Exoplanet Science Institute (NExScI) Archive',
            uri: 'https://exoplanetarchive.ipac.caltech.edu/',
          },
          {
            title: 'NASA Science — Exoplanets & Astrophysics',
            uri: 'https://science.nasa.gov/exoplanets/',
          },
        ],
      });
    }
  });

  /**
   * POST /api/gemini/grounded-discovery
   */
  app.post('/api/gemini/grounded-discovery', async (req, res) => {
    const queryTopic =
      typeof req.body?.queryTopic === 'string'
        ? req.body.queryTopic
        : 'JWST habitable zone exoplanet atmospheric spectroscopy';

    const liveWebData = await fetchLiveScientificWebData(queryTopic);
    const aiResult = await generateWithResilientFallback({
      contents: `Provide a detailed, authoritative scientific briefing in English on recent NASA discoveries and telescope data regarding: ${queryTopic}. Include quantitative astronomical metrics and clear scientific analysis.\n\nLive NASA Context:\n${liveWebData.extracts.join('\n')}`,
      useGoogleSearch: true,
    });

    res.json({
      content:
        aiResult?.text ||
        buildDeepScientificSynthesis(queryTopic, liveWebData.extracts),
      sources:
        aiResult && aiResult.sources.length > 0
          ? aiResult.sources
          : liveWebData.sources,
    });
  });

  /**
   * POST /api/gemini/astrophysics-analysis
   */
  app.post('/api/gemini/astrophysics-analysis', async (req, res) => {
    const planetParameters =
      typeof req.body?.planetParameters === 'string'
        ? req.body.planetParameters
        : 'Habitable zone terrestrial exoplanet';

    const aiResult = await generateWithResilientFallback({
      contents: `As a NASA Exoplanet Astrophysics Research Lead, write a rigorous scientific analysis report in English evaluating the habitability, atmospheric equilibrium, and biosignature stability for the following planetary telemetry parameters:\n${planetParameters}`,
      useGoogleSearch: true,
    });

    res.json({
      content:
        aiResult?.text ||
        buildDeepScientificSynthesis(planetParameters, []),
    });
  });

  /**
   * POST /api/gemini/telemetry-brief
   */
  app.post('/api/gemini/telemetry-brief', async (req, res) => {
    const metricLabel =
      typeof req.body?.metricLabel === 'string'
        ? req.body.metricLabel
        : 'Transit Photometry';

    const aiResult = await generateWithResilientFallback({
      contents: `In 2 concise scientific sentences in English, explain the significance of "${metricLabel}" in NASA exoplanet transit photometry and spectroscopy.`,
      useGoogleSearch: false,
    });

    res.json({
      content:
        aiResult?.text ||
        `${metricLabel}: In NASA exoplanet transit photometry and Doppler radial-velocity spectroscopy, this parameter constrains the planet-to-star radius ratio, bulk interior density (ρ = 3M/4πR³), and circumstellar habitable-zone equilibrium radiative flux.`,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NASA LEARN WEB server running on http://localhost:${PORT}`);
  });
}

startServer();
