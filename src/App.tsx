/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  NasaLogoSvg,
  ScienceDataIcon,
  PlanetDataIcon,
  LiveTelescopeIcon,
  PhotosIcon,
  NasaApisIcon,
  AskWithResearchIcon,
  SparkleAiIcon,
  TransitLightCurveSvg,
} from './components/NasaIcons';
import {
  INITIAL_NEWS_BULLETS,
  NEBULA_NEWS_ARTICLES,
  INITIAL_ASTROPHYSICS_BULLETS,
  ASTROPHYSICS_DEEP_STREAMS,
  CATEGORY_DATASETS,
  CategoryId,
  EARTH_LIKE_SUBCATEGORIES,
  EARTH_LIKE_SUBCATEGORY_ORDER,
  EarthLikeSubCategoryId,
  CategoryDataset,
  DEEP_SCIENTIFIC_FACTS_BY_ID,
} from './data/nasaScientificData';
import { ResearchCloudTools } from './components/ResearchCloudTools';
import { OpeningInterface } from './components/OpeningInterface';
import { AskWithAiInterface } from './components/AskWithAiInterface';
import { NasaPhotosGallery } from './components/NasaPhotosGallery';
import { NasaApisPanel } from './components/NasaApisPanel';
import {
  SCIENCE_DATA_WORKSPACE,
  LIVE_TELESCOPE_DATA_WORKSPACE,
  ScienceCategoryId,
  LiveTelescopeCategoryId,
} from './data/nasaScienceAndTelescopeData';
import earthLikeExoplanetImg from './assets/images/earth_like_exoplanet_1790401976173.jpg';
import cosmicNebulaImg from './assets/images/cosmic_nebula_news_1790401993412.jpg';
import planetaryDataSystemImg from './assets/images/nasa_planetary_data_system_1790415019167.jpg';
import recentNasaResearchImg from './assets/images/nasa_recent_research_jwst_1790415034331.jpg';
import exoplanetInteriorImg from './assets/images/exoplanet_interior_structure_1790419842656.jpg';
import exoplanetOrbitalImg from './assets/images/exoplanet_orbital_habitable_zone_1790419859166.jpg';
import exoplanetAtmosphereImg from './assets/images/exoplanet_atmosphere_oceans_1790419880591.jpg';
import aiOrbImg from './assets/images/nasa_ai_iridescent_orb_1790430678639.jpg';
import { APP_VERSION } from './constants/version';

const CATEGORY_IMAGES: Record<CategoryId, string> = {
  earth_like_planets: earthLikeExoplanetImg,
  new_planets: earthLikeExoplanetImg,
  planetary_data: planetaryDataSystemImg,
  recent_nasa_research: recentNasaResearchImg,
};

const EARTH_LIKE_SUBCATEGORY_IMAGES: Record<EarthLikeSubCategoryId, string> = {
  basic_info_location: earthLikeExoplanetImg,
  physical_structural: exoplanetInteriorImg,
  orbital_stellar_system: exoplanetOrbitalImg,
  habitability_conditions: earthLikeExoplanetImg,
  atmosphere_composition: exoplanetAtmosphereImg,
  research_observation_tools: recentNasaResearchImg,
};

export default function App() {
  const [showOpeningInterface, setShowOpeningInterface] = useState(true);
  const [showAskWithAi, setShowAskWithAi] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<
    'science_data' | 'planet_data' | 'live_telescope_data' | 'photos' | 'nasa_apis'
  >('planet_data');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('new_planets');
  const [selectedEarthSubCategory, setSelectedEarthSubCategory] =
    useState<EarthLikeSubCategoryId>('basic_info_location');
  const [selectedScienceCategory, setSelectedScienceCategory] =
    useState<ScienceCategoryId>('heliophysics_solar');
  const [selectedTelescopeCategory, setSelectedTelescopeCategory] =
    useState<LiveTelescopeCategoryId>('jwst_live_telemetry');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isEarthSubMenuExpanded, setIsEarthSubMenuExpanded] = useState(true);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const noticeTimerRef = useRef<number | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const planetCategoryData: CategoryDataset =
    selectedCategory === 'earth_like_planets'
      ? EARTH_LIKE_SUBCATEGORIES[selectedEarthSubCategory]
      : CATEGORY_DATASETS[selectedCategory];

  const planetHeroImage: string =
    selectedCategory === 'earth_like_planets'
      ? EARTH_LIKE_SUBCATEGORY_IMAGES[selectedEarthSubCategory]
      : CATEGORY_IMAGES[selectedCategory];

  const activeCategoryData: CategoryDataset =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.categoriesMap[selectedScienceCategory]
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.categoriesMap[selectedTelescopeCategory]
      : planetCategoryData;

  const activeHeroImage: string =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.categoriesMap[selectedScienceCategory].heroImage
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.categoriesMap[selectedTelescopeCategory].heroImage
      : planetHeroImage;

  const activeDeepFacts =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.categoriesMap[selectedScienceCategory].deepFacts
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.categoriesMap[selectedTelescopeCategory].deepFacts
      : DEEP_SCIENTIFIC_FACTS_BY_ID[activeCategoryData.id] || [];

  const activeNewsHeroImage =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.newsHeroImage
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.newsHeroImage
      : cosmicNebulaImg;

  const activeNewsSubheading =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.newsSubheading
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.newsSubheading
      : 'Planet news!';

  const activeNewsBullets =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.newsBullets
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.newsBullets
      : INITIAL_NEWS_BULLETS;

  const activeNewsArticles =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.newsArticles
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.newsArticles
      : NEBULA_NEWS_ARTICLES;

  const activeBottomLeftTitle =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.bottomLeftCardTitle
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.bottomLeftCardTitle
      : 'SCIENCE & ASTROPHYSICS';

  const activeBottomLeftBullets =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.bottomLeftBullets
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.bottomLeftBullets
      : INITIAL_ASTROPHYSICS_BULLETS;

  const activeBottomLeftStreams =
    activeSidebarTab === 'science_data'
      ? SCIENCE_DATA_WORKSPACE.bottomLeftStreams
      : activeSidebarTab === 'live_telescope_data'
      ? LIVE_TELESCOPE_DATA_WORKSPACE.bottomLeftStreams
      : ASTROPHYSICS_DEEP_STREAMS;

  const triggerUpcomingUpdateNotice = (featureLabel: string) => {
    if (noticeTimerRef.current) {
      window.clearTimeout(noticeTimerRef.current);
    }
    setLockedNotice(
      `"${featureLabel}" is currently disabled and will be available in the upcoming update.`
    );
    noticeTimerRef.current = window.setTimeout(() => {
      setLockedNotice(null);
    }, 3800);
  };

  const handleSelectMainCategory = (catId: CategoryId) => {
    if (catId === 'earth_like_planets') {
      setSelectedCategory('earth_like_planets');
      setIsEarthSubMenuExpanded((prev) => !prev);
      return;
    }
    setSelectedCategory(catId);
    setIsCategoriesOpen(false);
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectEarthSubCategory = (subId: EarthLikeSubCategoryId) => {
    setSelectedCategory('earth_like_planets');
    setSelectedEarthSubCategory(subId);
    setIsCategoriesOpen(false);
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const fullCompiledReportText = [
    `NASA DASHBOARD — ${activeCategoryData.panelTitle}`,
    'SCIENTIFIC ANALYSIS REPORT',
    activeCategoryData.reportLead,
    ...activeCategoryData.extendedReport.map(
      (sec) => `\n${sec.title}\n${sec.subtitle}\n${sec.paragraphs.join('\n\n')}`
    ),
  ].join('\n\n');

  if (showOpeningInterface) {
    return <OpeningInterface onGetStarted={() => setShowOpeningInterface(false)} />;
  }

  if (showAskWithAi) {
    return <AskWithAiInterface onBackToDashboard={() => setShowAskWithAi(false)} />;
  }

  return (
    <div className="nasa-dashboard-outer min-h-screen w-full bg-[#0e1117] flex items-stretch justify-center p-0 select-none">
      {/* Main NASA Dashboard Frame matching the exact layout, colors, and proportions across full-screen viewports */}
      <div className="nasa-dashboard-shell w-full h-screen bg-[#1b202a] flex overflow-hidden relative">
        {/* Non-intrusive status banner when user clicks disabled/upcoming-update buttons */}
        {lockedNotice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed sm:absolute top-3 right-3 sm:right-4 z-50 bg-[#151922]/95 border border-[#525d76] text-[#dce3f1] px-3.5 py-2 rounded-[8px] shadow-xl text-[12.5px] flex items-center gap-2.5 backdrop-blur-sm max-w-[calc(100vw-1.5rem)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#7c8ba6] shrink-0" />
            <span>{lockedNotice}</span>
            <button
              type="button"
              onClick={() => setLockedNotice(null)}
              className="text-[#8d98ad] hover:text-white ml-1 text-[11px] uppercase tracking-wider cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* LEFT SIDEBAR */}
        <aside className="nasa-sidebar w-[185px] sm:w-[205px] bg-[#181c24] border-r border-[#2b313e] flex flex-col shrink-0 py-5 select-none">
          {/* NASA Logo + DASHBOARD title (click to return to Opening Interface) */}
          <button
            type="button"
            onClick={() => setShowOpeningInterface(true)}
            title="Return to NASA LEARN WEB Opening Interface"
            className="nasa-sidebar-brand px-3.5 pb-6 flex items-center gap-2 text-left cursor-pointer hover:opacity-90 transition"
          >
            <NasaLogoSvg />
            <span className="text-[#4b6a9b] text-[15px] sm:text-[15.5px] font-medium tracking-[0.04em] uppercase">
              DASHBOARD
            </span>
          </button>

          {/* Navigation Options */}
          <nav className="nasa-sidebar-nav nasa-scroll flex-1 px-2.5 flex flex-col justify-between max-h-[540px]">
            {/* 1. SCIENCE DATA (Unlocked — Full NASA Science & Astrophysics Telemetry) */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('science_data');
                setIsCategoriesOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-[7px] text-left transition cursor-pointer ${
                activeSidebarTab === 'science_data'
                  ? 'bg-[#2f3542] text-[#b8c1d0] shadow-inner'
                  : 'text-[#9ea7b6] hover:bg-[#232834]/60'
              }`}
              title="Open NASA Science Data & Scientific Analysis"
            >
              <ScienceDataIcon />
              <span className="text-[13.5px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                SCIENCE
                <br />
                DATA
              </span>
            </button>

            {/* 2. PLANET DATA */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('planet_data');
                setIsCategoriesOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-[7px] text-left transition cursor-pointer ${
                activeSidebarTab === 'planet_data'
                  ? 'bg-[#2f3542] text-[#b8c1d0] shadow-inner'
                  : 'text-[#9ea7b6] hover:bg-[#232834]/60'
              }`}
              title="Open NASA Planet Data & Scientific Analysis"
            >
              <PlanetDataIcon />
              <span className="text-[14px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                PLANET
                <br />
                DATA
              </span>
            </button>

            {/* 3. LIVE TELESCOPE DATA (Unlocked — JWST, Hubble, Chandra & TESS Live Telemetry) */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('live_telescope_data');
                setIsCategoriesOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-[7px] text-left transition cursor-pointer ${
                activeSidebarTab === 'live_telescope_data'
                  ? 'bg-[#2f3542] text-[#b8c1d0] shadow-inner'
                  : 'text-[#9ea7b6] hover:bg-[#232834]/60'
              }`}
              title="Open NASA Live Telescope Data & Observatory Telemetry"
            >
              <LiveTelescopeIcon />
              <span className="text-[13.5px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                LIVE
                <br />
                TELESCOPE
                <br />
                DATA
              </span>
            </button>

            {/* 4. PHOTOS (Unlocked — Recent NASA Space Photographs & Descriptions) */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('photos')}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-[7px] text-left transition cursor-pointer ${
                activeSidebarTab === 'photos'
                  ? 'bg-[#2f3542] text-[#b8c1d0] shadow-inner'
                  : 'text-[#9ea7b6] hover:bg-[#232834]/60'
              }`}
              title="Open Recent NASA Space Photographs & Scientific Descriptions"
            >
              <PhotosIcon />
              <span className="text-[13.5px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                PHOTOS
              </span>
            </button>

            {/* 5. NASA APIs (Unlocked — Application API Keys & Official NASA APIs File) */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('nasa_apis')}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-[7px] text-left transition cursor-pointer ${
                activeSidebarTab === 'nasa_apis'
                  ? 'bg-[#2f3542] text-[#b8c1d0] shadow-inner'
                  : 'text-[#9ea7b6] hover:bg-[#232834]/60'
              }`}
              title="Open Application API Keys & Official NASA APIs Directory File"
            >
              <NasaApisIcon />
              <span className="text-[13.5px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                NASA
                <br />
                APIs
              </span>
            </button>

            {/* 6. ASK WITH RESEARCH */}
            <button
              type="button"
              onClick={() => setShowAskWithAi(true)}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-[7px] text-left text-[#9ea7b6] hover:bg-[#232834]/60 transition cursor-pointer"
              title="Open NASA Deep AI Research Interface"
            >
              <AskWithResearchIcon />
              <span className="text-[13.5px] leading-[1.22] tracking-[0.03em] uppercase font-normal">
                ASK
                <br />
                WITH
                <br />
                RESEARCH
              </span>
            </button>
          </nav>
        </aside>

        {/* MAIN RIGHT WORKSPACE */}
        <main className="nasa-main-workspace flex-1 flex flex-col bg-[#1d222c] px-3.5 sm:px-4 pt-3.5 pb-2 overflow-hidden">
          {activeSidebarTab === 'photos' ? (
            <NasaPhotosGallery />
          ) : activeSidebarTab === 'nasa_apis' ? (
            <NasaApisPanel />
          ) : (
            /* Two-Column Content Grid */
            <div className="nasa-content-grid flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 min-h-0">
            {/* LEFT COLUMN: NEWS + SCIENCE & ASTROPHYSICS */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 min-h-0">
              {/* TOP CARD: NEWS */}
              <section className="flex-[1.22] flex flex-col rounded-[10px] border border-[#3e4656] bg-[#212631] pt-3 px-3.5 pb-2.5 min-h-0">
                <h2 className="text-[23px] sm:text-[25px] leading-none font-normal tracking-[0.03em] text-[#e5e9f0] mb-2.5 uppercase shrink-0">
                  NEWS
                </h2>

                {/* Nebula / Science / Telescope Image with centered "image" label exactly as in the reference design */}
                <div className="nasa-news-hero relative w-full h-[135px] sm:h-[155px] rounded-[8px] overflow-hidden bg-[#0a0d13] mb-2.5 shrink-0">
                  <img
                    src={activeNewsHeroImage}
                    alt={activeNewsSubheading}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <span className="text-[#f3f6fb] text-[25px] sm:text-[27px] font-normal tracking-[0.01em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      image
                    </span>
                  </div>
                </div>

                {/* Subheading + Read More button */}
                <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                  <h3 className="text-[22px] sm:text-[24px] leading-tight font-normal text-[#e5e9f0]">
                    {activeNewsSubheading}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsNewsModalOpen(true)}
                    className="px-2.5 py-1 rounded-[6px] border border-[#4f5970] bg-[#2f3646] hover:bg-[#3b4459] text-[#dce3f1] text-[12px] font-medium tracking-wide cursor-pointer transition shrink-0"
                  >
                    Read More
                  </button>
                </div>

                {/* Scrollable News & Scientific Details */}
                <div className="nasa-scroll nasa-news-scroll flex-1 overflow-y-auto pr-2.5 space-y-2.5 text-[#c7cfdd] text-[13.5px] leading-[1.35] select-text">
                  <ul className="space-y-2.5">
                    {activeNewsBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#d8dfe9] mt-[1px]">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setIsNewsModalOpen(true)}
                      className="w-full py-1.5 px-3 rounded-[6px] border border-[#4b5468] bg-[#2a3140] hover:bg-[#343d50] text-[#dce3f1] text-[12.5px] font-medium tracking-wide cursor-pointer transition text-center"
                    >
                      Read More — View Full Scientific News Report
                    </button>
                  </div>

                  {/* Deep scrollable NASA scientific articles below */}
                  <div className="pt-3 mt-2 border-t border-[#323948] space-y-4">
                    {activeNewsArticles.map((article) => (
                      <article key={article.id} className="space-y-1.5">
                        <h4 className="text-[#e2e7f0] font-medium text-[13.5px] leading-snug">
                          {article.title}
                        </h4>
                        <div className="text-[11.5px] text-[#8d98ab] uppercase tracking-wider">
                          {article.subtitle}
                        </div>
                        {article.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-[#bcc5d6] text-[12.8px] leading-[1.48]">
                            {p}
                          </p>
                        ))}
                        {article.keyMetrics && (
                          <div className="bg-[#191d26] border border-[#2f3645] rounded p-2 mt-1.5 space-y-1 text-[11.8px]">
                            {article.keyMetrics.map((m, mIdx) => (
                              <div key={mIdx} className="flex justify-between gap-2">
                                <span className="text-[#8e99ad]">{m.label}:</span>
                                <span className="text-[#d5dce8] font-medium text-right">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* BOTTOM CARD: SCIENCE & ASTROPHYSICS / LIVE OBSERVATORY STREAMS */}
              <section className="flex-[0.95] flex flex-col rounded-[10px] border border-[#3e4656] bg-[#212631] pt-3 px-3.5 pb-2.5 min-h-0">
                <h2 className="text-[16px] sm:text-[17px] leading-tight font-normal tracking-[0.03em] text-[#dce2ec] mb-2 uppercase shrink-0">
                  {activeBottomLeftTitle}
                </h2>

                {/* Scrollable List + Deep Telemetry Logs */}
                <div className="nasa-scroll nasa-astro-scroll flex-1 overflow-y-auto pr-2.5 space-y-1 text-[#c6cedc] text-[13px] leading-[1.33] select-text">
                  <ul className="space-y-1">
                    {activeBottomLeftBullets.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#d8dfe9] mt-[1px]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional scrollable NASA Telemetry Streams */}
                  <div className="pt-3 mt-2.5 border-t border-[#323948] space-y-3">
                    {activeBottomLeftStreams.map((stream, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <div className="text-[#dce2ec] font-medium text-[12.5px]">
                          • {stream.title}
                        </div>
                        <p className="text-[#aeb8ca] text-[12px] leading-[1.42] pl-3">
                          {stream.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: TOP CONTROLS + ACTIVE CATEGORY SCIENTIFIC PANEL */}
            <div className="lg:col-span-7 flex flex-col gap-2.5 min-h-0">
              {/* Top Action Row: CATEGORIES ▼ Dropdown and Ask with AI ✨ */}
              <div className="nasa-top-actions flex items-center gap-3 shrink-0 relative z-30">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoriesOpen((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-[8px] border border-[#4b5365] bg-[#222733] text-[#9ea7b7] hover:text-[#dce3f1] text-[16px] sm:text-[18px] font-normal tracking-[0.04em] uppercase flex items-center gap-2.5 cursor-pointer hover:bg-[#282e3d] transition"
                    title="Select NASA Scientific Category"
                  >
                    <span>CATEGORIES</span>
                    <span
                      className={`text-[11px] text-[#9ea7b7] transition-transform duration-150 ${
                        isCategoriesOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Menu for CATEGORIES (adapts to Science Data, Planet Data, or Live Telescope Data) */}
                  {isCategoriesOpen && (
                    <div className="absolute left-0 mt-1.5 w-[310px] sm:w-[340px] max-w-[calc(100vw-2rem)] max-h-[75vh] overflow-y-auto nasa-scroll rounded-[10px] border border-[#4d566b] bg-[#181d27] shadow-[0_18px_48px_rgba(0,0,0,0.92)] py-1.5 z-50">
                      <div className="px-3.5 py-1.5 text-[10.5px] uppercase tracking-widest text-[#828ea3] border-b border-[#2b3242]">
                        {activeSidebarTab === 'science_data'
                          ? 'Select NASA Science Category'
                          : activeSidebarTab === 'live_telescope_data'
                          ? 'Select Live Telescope Stream'
                          : 'Select NASA Planet Category'}
                      </div>

                      {activeSidebarTab === 'science_data' ? (
                        SCIENCE_DATA_WORKSPACE.categoriesOrder.map((sciId) => {
                          const sciItem = SCIENCE_DATA_WORKSPACE.categoriesMap[sciId];
                          const isSciActive = selectedScienceCategory === sciId;
                          return (
                            <button
                              key={sciId}
                              type="button"
                              onClick={() => {
                                setSelectedScienceCategory(sciId as ScienceCategoryId);
                                setIsCategoriesOpen(false);
                                if (rightScrollRef.current) {
                                  rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
                              className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer border-b border-[#262c3a] last:border-b-0 ${
                                isSciActive
                                  ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                  : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                              }`}
                            >
                              <span>{sciItem.menuLabel}</span>
                              {isSciActive && (
                                <span className="w-2 h-2 rounded-full bg-[#8ab4f8]" />
                              )}
                            </button>
                          );
                        })
                      ) : activeSidebarTab === 'live_telescope_data' ? (
                        LIVE_TELESCOPE_DATA_WORKSPACE.categoriesOrder.map((telId) => {
                          const telItem = LIVE_TELESCOPE_DATA_WORKSPACE.categoriesMap[telId];
                          const isTelActive = selectedTelescopeCategory === telId;
                          return (
                            <button
                              key={telId}
                              type="button"
                              onClick={() => {
                                setSelectedTelescopeCategory(telId as LiveTelescopeCategoryId);
                                setIsCategoriesOpen(false);
                                if (rightScrollRef.current) {
                                  rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
                              className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer border-b border-[#262c3a] last:border-b-0 ${
                                isTelActive
                                  ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                  : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                              }`}
                            >
                              <span>{telItem.menuLabel}</span>
                              {isTelActive && (
                                <span className="w-2 h-2 rounded-full bg-[#8ab4f8]" />
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <>
                          {/* 1. Primary Category: Earth-Like Planets (with 6 expandable sub-categories) */}
                          <div className="border-b border-[#262c3a]">
                            <button
                              type="button"
                              onClick={() => handleSelectMainCategory('earth_like_planets')}
                              className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer ${
                                selectedCategory === 'earth_like_planets'
                                  ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                  : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                              }`}
                            >
                              <span>Earth-Like Planets</span>
                              <span className="text-[11px] text-[#8ab4f8]">
                                {isEarthSubMenuExpanded ? '▲' : '▼'}
                              </span>
                            </button>

                            {isEarthSubMenuExpanded && (
                              <div className="bg-[#131720] py-1 px-2 space-y-0.5 border-t border-[#252b39]">
                                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#738096]">
                                  Earth-Like Planets Sub-Categories:
                                </div>
                                {EARTH_LIKE_SUBCATEGORY_ORDER.map((subId) => {
                                  const subItem = EARTH_LIKE_SUBCATEGORIES[subId];
                                  const isSubActive =
                                    selectedCategory === 'earth_like_planets' &&
                                    selectedEarthSubCategory === subId;
                                  return (
                                    <button
                                      key={subId}
                                      type="button"
                                      onClick={() => handleSelectEarthSubCategory(subId)}
                                      className={`w-full px-2.5 py-2 rounded-[6px] text-left text-[12.5px] flex items-center justify-between transition cursor-pointer ${
                                        isSubActive
                                          ? 'bg-[#313b52] text-white font-medium border border-[#526285]'
                                          : 'text-[#aeb8cb] hover:bg-[#1f2634] hover:text-[#e4e9f2]'
                                      }`}
                                    >
                                      <span>{subItem.menuLabel}</span>
                                      {isSubActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8] shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* 2. Planetary Data */}
                          <button
                            type="button"
                            onClick={() => handleSelectMainCategory('planetary_data')}
                            className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer border-b border-[#262c3a] ${
                              selectedCategory === 'planetary_data'
                                ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                            }`}
                          >
                            <span>Planetary Data</span>
                            {selectedCategory === 'planetary_data' && (
                              <span className="w-2 h-2 rounded-full bg-[#8ab4f8]" />
                            )}
                          </button>

                          {/* 3. New Planets */}
                          <button
                            type="button"
                            onClick={() => handleSelectMainCategory('new_planets')}
                            className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer border-b border-[#262c3a] ${
                              selectedCategory === 'new_planets'
                                ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                            }`}
                          >
                            <span>New Planets</span>
                            {selectedCategory === 'new_planets' && (
                              <span className="w-2 h-2 rounded-full bg-[#8ab4f8]" />
                            )}
                          </button>

                          {/* 4. Recent NASA Research */}
                          <button
                            type="button"
                            onClick={() => handleSelectMainCategory('recent_nasa_research')}
                            className={`w-full px-3.5 py-2.5 text-left text-[13.5px] flex items-center justify-between transition cursor-pointer ${
                              selectedCategory === 'recent_nasa_research'
                                ? 'bg-[#2c3446] text-[#e8edf7] font-medium'
                                : 'text-[#c4cde0] hover:bg-[#232937] hover:text-white'
                            }`}
                          >
                            <span>Recent NASA Research</span>
                            {selectedCategory === 'recent_nasa_research' && (
                              <span className="w-2 h-2 rounded-full bg-[#8ab4f8]" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAskWithAi(true)}
                  className="px-4 py-1.5 rounded-[8px] border border-[#596480] bg-[#464e65] text-[#d7deec] text-[17px] sm:text-[19.5px] font-normal flex items-center gap-2.5 cursor-pointer hover:bg-[#4f5973] transition"
                  title="Open NASA Deep AI (Learn with me)"
                >
                  <span>Ask with AI</span>
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-[#0e0c1a] shadow-[0_0_10px_rgba(139,92,246,0.55)] flex items-center justify-center shrink-0">
                    <img
                      src={aiOrbImg}
                      alt="AI"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover scale-[1.16]"
                    />
                  </span>
                </button>
              </div>

              {/* MAIN RIGHT DATA CARD: DISPLAYS SELECTED CATEGORY / SUB-CATEGORY IN EXACT SAME SCIENTIFIC FORMAT */}
              <section
                onClick={() => {
                  if (isCategoriesOpen) setIsCategoriesOpen(false);
                }}
                className="flex-1 flex flex-col rounded-[10px] border border-[#3e4656] bg-[#212631] pt-3.5 pl-4 pr-2 pb-2.5 min-h-0"
              >
                {/* Scrollable Container for the Selected Category View & Full Scientific Analysis Report */}
                <div
                  ref={rightScrollRef}
                  className="nasa-scroll nasa-panel-scroll flex-1 overflow-y-auto pr-3 select-text"
                >
                  <h1 className="text-[20px] sm:text-[24px] leading-tight font-normal tracking-[0.03em] text-[#e3e8f0] mb-2 uppercase">
                    {activeCategoryData.panelTitle}
                  </h1>

                  {/* Quick Topic Selector Strip for Science Data, Live Telescope Data, or Earth-Like Planets */}
                  {activeSidebarTab === 'science_data' && (
                    <div className="mb-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#181c24] border border-[#333b4b] rounded-[8px] p-2">
                      {SCIENCE_DATA_WORKSPACE.categoriesOrder.map((sciId) => {
                        const sciItem = SCIENCE_DATA_WORKSPACE.categoriesMap[sciId];
                        const active = selectedScienceCategory === sciId;
                        return (
                          <button
                            key={sciId}
                            type="button"
                            onClick={() => setSelectedScienceCategory(sciId as ScienceCategoryId)}
                            className={`px-2.5 py-1.5 rounded-[6px] text-left text-[11.5px] transition cursor-pointer truncate ${
                              active
                                ? 'bg-[#323c52] text-white font-medium border border-[#58688c]'
                                : 'bg-[#202531] text-[#aeb8ca] hover:bg-[#283040] hover:text-white border border-transparent'
                            }`}
                          >
                            {sciItem.menuLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeSidebarTab === 'live_telescope_data' && (
                    <div className="mb-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#181c24] border border-[#333b4b] rounded-[8px] p-2">
                      {LIVE_TELESCOPE_DATA_WORKSPACE.categoriesOrder.map((telId) => {
                        const telItem = LIVE_TELESCOPE_DATA_WORKSPACE.categoriesMap[telId];
                        const active = selectedTelescopeCategory === telId;
                        return (
                          <button
                            key={telId}
                            type="button"
                            onClick={() =>
                              setSelectedTelescopeCategory(telId as LiveTelescopeCategoryId)
                            }
                            className={`px-2.5 py-1.5 rounded-[6px] text-left text-[11.5px] transition cursor-pointer truncate ${
                              active
                                ? 'bg-[#323c52] text-white font-medium border border-[#58688c]'
                                : 'bg-[#202531] text-[#aeb8ca] hover:bg-[#283040] hover:text-white border border-transparent'
                            }`}
                          >
                            {telItem.menuLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeSidebarTab === 'planet_data' &&
                    selectedCategory === 'earth_like_planets' && (
                    <div className="mb-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#181c24] border border-[#333b4b] rounded-[8px] p-2">
                      {EARTH_LIKE_SUBCATEGORY_ORDER.map((subId) => {
                        const subItem = EARTH_LIKE_SUBCATEGORIES[subId];
                        const active = selectedEarthSubCategory === subId;
                        return (
                          <button
                            key={subId}
                            type="button"
                            onClick={() => handleSelectEarthSubCategory(subId)}
                            className={`px-2.5 py-1.5 rounded-[6px] text-left text-[11.5px] transition cursor-pointer truncate ${
                              active
                                ? 'bg-[#323c52] text-white font-medium border border-[#58688c]'
                                : 'bg-[#202531] text-[#aeb8ca] hover:bg-[#283040] hover:text-white border border-transparent'
                            }`}
                          >
                            {subItem.menuLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Category / Sub-Category Hero Image */}
                  <div className="nasa-category-hero w-full h-[180px] sm:h-[210px] rounded-[8px] overflow-hidden bg-[#020306] mb-2">
                    <img
                      src={activeHeroImage}
                      alt={activeCategoryData.panelTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Spectral / Transit Light-Curve Telemetry Graph */}
                  <TransitLightCurveSvg />

                  {/* Two-Column Telemetry Bullet List in the exact same format */}
                  <div className="nasa-telemetry-cols grid grid-cols-2 gap-x-4 sm:gap-x-8 my-2 text-[#ced5e2] text-[13px] sm:text-[13.8px] leading-[1.36]">
                    {/* Left Telemetry Metrics */}
                    <ul className="space-y-0.5">
                      {activeCategoryData.leftMetrics.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#dce2ec]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Right Telemetry Metrics */}
                    <ul className="space-y-0.5">
                      {activeCategoryData.rightMetrics.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            if (
                              activeSidebarTab === 'planet_data' &&
                              selectedCategory === 'new_planets'
                            ) {
                              triggerUpcomingUpdateNotice(item);
                            }
                          }}
                          className={`flex items-start gap-2 ${
                            activeSidebarTab === 'planet_data' &&
                            selectedCategory === 'new_planets'
                              ? 'cursor-not-allowed hover:text-white transition'
                              : ''
                          }`}
                        >
                          <span className="text-[#dce2ec]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SCIENTIFIC ANALYSIS REPORT */}
                  <div className="mt-3 pt-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h2 className="text-[18.5px] sm:text-[20px] leading-tight font-normal tracking-[0.03em] text-[#e3e8f0] uppercase">
                        SCIENTIFIC ANALYSIS REPORT
                      </h2>
                      <button
                        type="button"
                        onClick={() => setIsReportModalOpen(true)}
                        className="px-2.5 py-1 rounded-[6px] border border-[#4f5970] bg-[#2f3646] hover:bg-[#3b4459] text-[#dce3f1] text-[12px] font-medium tracking-wide cursor-pointer transition shrink-0"
                      >
                        Read More
                      </button>
                    </div>

                    {/* Opening Lead Paragraph */}
                    <p className="text-[#c5cddb] text-[13.2px] sm:text-[13.6px] leading-[1.36] mb-4">
                      {activeCategoryData.reportLead}
                    </p>

                    {/* Extended Multi-Section NASA Scientific Analysis Report (Scrollable down) */}
                    <div className="space-y-4 pt-3 border-t border-[#323948]">
                      {activeCategoryData.extendedReport.map((section) => (
                        <article key={section.id} className="space-y-1.5">
                          <h3 className="text-[#e2e7f0] font-medium text-[14.5px] leading-snug">
                            {section.title}
                          </h3>
                          <div className="text-[11.5px] text-[#8d98ab] uppercase tracking-wider">
                            {section.subtitle}
                          </div>
                          {section.paragraphs.map((paragraph, pIdx) => (
                            <p
                              key={pIdx}
                              className="text-[#c0c8d8] text-[13px] leading-[1.5] whitespace-pre-line"
                            >
                              {paragraph}
                            </p>
                          ))}
                          {section.keyMetrics && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#181c25] border border-[#2f3645] rounded p-2.5 mt-1.5 text-[11.8px]">
                              {section.keyMetrics.map((metric, mIdx) => (
                                <div key={mIdx} className="flex flex-col">
                                  <span className="text-[#8994a8] text-[11px]">
                                    {metric.label}
                                  </span>
                                  <span className="text-[#d6deec] font-medium">
                                    {metric.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </article>
                      ))}

                      {/* Bottom "Read More" Button for Deep Scientific Facts as user scrolls down */}
                      <div className="pt-2 pb-1">
                        <button
                          type="button"
                          onClick={() => setIsReportModalOpen(true)}
                          className="w-full py-2 px-4 rounded-[7px] border border-[#525e78] bg-[#2c3446] hover:bg-[#374158] text-[#e6ebf5] text-[13px] font-medium tracking-wide cursor-pointer transition flex items-center justify-center gap-2 shadow-sm"
                        >
                          <span>Read More — Explore Deep Scientific Facts &amp; Full Report</span>
                        </button>
                      </div>
                    </div>

                    {/* Integrated Firebase, Gemini Search Grounding, and Google Workspace Research Tools */}
                    <ResearchCloudTools fullReportText={fullCompiledReportText} />
                  </div>
                </div>
              </section>
            </div>
          </div>
          )}

          {/* BOTTOM COPYRIGHT FOOTER */}
          <footer className="nasa-footer-bar pt-2 pb-0.5 px-1 shrink-0 flex items-center justify-between text-[#9ba4b4] text-[13.5px] sm:text-[15.5px] tracking-[0.01em]">
            <span>© copyright (NASA) | Live Telescope Data and other Database.</span>
            <span className="text-[#9ba4b4] text-[13px] sm:text-[14px] font-medium tracking-[0.03em] shrink-0 sm:ml-3">
              {APP_VERSION}
            </span>
          </footer>
        </main>

        {/* FULL VIEW MODAL FOR "NEWS — Planet news!" WHEN "Read More" IS CLICKED */}
        {isNewsModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-text"
            onClick={() => setIsNewsModalOpen(false)}
          >
            <div
              className="w-full max-w-[820px] max-h-[88vh] bg-[#1e232e] border border-[#4a5368] rounded-[12px] shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 bg-[#181c24] border-b border-[#343c4d] flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#8894a8] block">
                    NASA DASHBOARD • FULL SCIENTIFIC DISPATCH
                  </span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#e5e9f0] tracking-wide">
                    NEWS — {activeNewsSubheading} &amp; Scientific Observations
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-[7px] bg-[#2f3646] hover:bg-[#3c4559] border border-[#525d75] text-[#e2e7f0] text-[13px] cursor-pointer transition"
                >
                  Close ✕
                </button>
              </div>

              {/* Modal Scrollable Full Description Content */}
              <div className="nasa-scroll flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-[#cfd6e3]">
                {/* Full-width Hero Banner */}
                <div className="relative w-full h-[210px] sm:h-[250px] rounded-[9px] overflow-hidden border border-[#384052] bg-[#090c12]">
                  <img
                    src={activeNewsHeroImage}
                    alt={activeNewsSubheading}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <span className="text-[#f3f6fb] text-[28px] font-normal tracking-[0.02em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      image
                    </span>
                  </div>
                </div>

                {/* Highlighted News Summary Box */}
                <div className="bg-[#181c25] border border-[#333b4b] rounded-[9px] p-4 space-y-2.5">
                  <h3 className="text-[20px] font-normal text-[#e5e9f0]">
                    {activeNewsSubheading} — Key Mission Updates
                  </h3>
                  <ul className="space-y-2 text-[14.5px] leading-relaxed text-[#d0d7e4]">
                    {activeNewsBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#8ab4f8] mt-[2px]">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complete Scientific Articles */}
                <div className="space-y-5">
                  {activeNewsArticles.map((article) => (
                    <article
                      key={article.id}
                      className="bg-[#181c25] border border-[#333b4b] rounded-[9px] p-4 sm:p-5 space-y-3"
                    >
                      <div>
                        <h4 className="text-[#e6ebf4] font-medium text-[17px] leading-snug">
                          {article.title}
                        </h4>
                        <div className="text-[12px] text-[#8d98ab] uppercase tracking-wider mt-0.5">
                          {article.subtitle}
                        </div>
                      </div>

                      {article.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-[#c5cede] text-[14.2px] leading-[1.65]">
                          {p}
                        </p>
                      ))}

                      {article.keyMetrics && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#13171f] border border-[#2c3342] rounded-[7px] p-3 mt-2 text-[13px]">
                          {article.keyMetrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="text-[#8b96aa] text-[11.5px]">{m.label}</span>
                              <span className="text-[#dce3f0] font-medium">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL VIEW MODAL FOR "SCIENTIFIC ANALYSIS REPORT" & DEEP SCIENTIFIC FACTS WHEN "Read More" IS CLICKED */}
        {isReportModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-text"
            onClick={() => setIsReportModalOpen(false)}
          >
            <div
              className="w-full max-w-[860px] max-h-[90vh] bg-[#1e232e] border border-[#4a5368] rounded-[12px] shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 bg-[#181c24] border-b border-[#343c4d] flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#8894a8] block">
                    NASA LEARN WEB • EXTENDED SCIENTIFIC DOSSIER
                  </span>
                  <h2 className="text-[19px] sm:text-[22px] font-normal text-[#e5e9f0] tracking-wide uppercase">
                    {activeCategoryData.panelTitle} — Deep Scientific Report
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-[7px] bg-[#2f3646] hover:bg-[#3c4559] border border-[#525d75] text-[#e2e7f0] text-[13px] cursor-pointer transition shrink-0"
                >
                  Close ✕
                </button>
              </div>

              {/* Modal Scrollable Full Scientific Content */}
              <div className="nasa-scroll flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-[#cfd6e3]">
                {/* Hero Image */}
                <div className="w-full h-[210px] sm:h-[250px] rounded-[9px] overflow-hidden border border-[#384052] bg-[#04060a]">
                  <img
                    src={activeHeroImage}
                    alt={activeCategoryData.panelTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Two-Column Telemetry Summary Box */}
                <div className="bg-[#181c25] border border-[#333b4b] rounded-[9px] p-4 space-y-2.5">
                  <div className="text-[12px] uppercase tracking-wider text-[#8d98ab]">
                    Primary NASA Telemetry Parameters
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[14px] text-[#d5dce9]">
                    <ul className="space-y-1">
                      {activeCategoryData.leftMetrics.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8ab4f8]">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1">
                      {activeCategoryData.rightMetrics.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8ab4f8]">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Executive Scientific Summary */}
                <div className="bg-[#181c25] border border-[#333b4b] rounded-[9px] p-4 sm:p-5 space-y-2">
                  <h3 className="text-[18px] font-medium text-[#e6ebf4] uppercase tracking-wide">
                    SCIENTIFIC ANALYSIS REPORT — EXECUTIVE SUMMARY
                  </h3>
                  <p className="text-[#c8d1e0] text-[14.5px] leading-[1.65]">
                    {activeCategoryData.reportLead}
                  </p>
                </div>

                {/* Primary & Extended Deep Scientific Sections */}
                <div className="space-y-5">
                  {[...activeCategoryData.extendedReport, ...activeDeepFacts].map((section) => (
                    <article
                      key={section.id}
                      className="bg-[#181c25] border border-[#333b4b] rounded-[9px] p-4 sm:p-5 space-y-3"
                    >
                      <div>
                        <h4 className="text-[#e6ebf4] font-medium text-[17px] leading-snug">
                          {section.title}
                        </h4>
                        <div className="text-[12px] text-[#8d98ab] uppercase tracking-wider mt-0.5">
                          {section.subtitle}
                        </div>
                      </div>

                      {section.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[#c5cede] text-[14.2px] leading-[1.65] whitespace-pre-line"
                        >
                          {p}
                        </p>
                      ))}

                      {section.keyMetrics && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#13171f] border border-[#2c3342] rounded-[7px] p-3 mt-2 text-[13px]">
                          {section.keyMetrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="text-[#8b96aa] text-[11.5px]">{m.label}</span>
                              <span className="text-[#dce3f0] font-medium">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
