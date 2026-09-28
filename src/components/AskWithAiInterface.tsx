import React, { useState, useRef, useEffect } from 'react';
import {
  queryNasaDeepAi,
  NasaDeepChatTurn,
  NasaAiModuleId,
} from '../services/geminiService';
import aiOrbImg from '../assets/images/nasa_ai_iridescent_orb_1790430678639.jpg';
import { APP_VERSION } from '../constants/version';

interface AskWithAiInterfaceProps {
  onBackToDashboard: () => void;
}

const StaggeredMenuIconSvg: React.FC = () => (
  <svg
    width="30"
    height="24"
    viewBox="0 0 30 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="3"
      y1="5"
      x2="21"
      y2="5"
      stroke="#969694"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="3"
      y1="12"
      x2="27"
      y2="12"
      stroke="#969694"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="3"
      y1="19"
      x2="13"
      y2="19"
      stroke="#969694"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const GhostOutlineIconSvg: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 15C7 9.47715 11.0294 5 16 5C20.9706 5 25 9.47715 25 15V25.2C25 25.9 24.1 26.3 23.5 25.8L21.3 23.9C20.7 23.4 19.8 23.4 19.2 23.9L17.1 25.7C16.5 26.2 15.5 26.2 14.9 25.7L12.8 23.9C12.2 23.4 11.3 23.4 10.7 23.9L8.5 25.8C7.9 26.3 7 25.9 7 25.2V15Z"
      stroke="#CCCCC9"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="13" cy="15.5" r="1.5" fill="#CCCCC9" />
    <circle cx="19" cy="15.5" r="1.5" fill="#CCCCC9" />
  </svg>
);

const SUGGESTED_NASA_QUERIES: string[] = [
  'What are the latest JWST atmospheric spectroscopy findings on habitable-zone exoplanets like LHS 1140 b and TRAPPIST-1e?',
  'Explain Kepler-452b and TOI-700 d orbital mechanics, ESI index, and liquid water habitability using NASA data.',
  'What prebiotic organic molecules and phosphates did NASA OSIRIS-REx discover in Asteroid Bennu samples?',
  'How does NASA measure exoplanet mass, radius, bulk density, and biosignature gases using transit photometry and radial velocity?',
];

export const AskWithAiInterface: React.FC<AskWithAiInterfaceProps> = ({
  onBackToDashboard,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedModule, setSelectedModule] =
    useState<NasaAiModuleId>('deep_searching_2');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showTopLeftMenu, setShowTopLeftMenu] = useState(false);
  const [chatHistory, setChatHistory] = useState<NasaDeepChatTurn[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const resultsEndRef = useRef<HTMLDivElement | null>(null);

  const hasStartedChat = chatHistory.length > 0 || isSearching;

  useEffect(() => {
    if (hasStartedChat) {
      resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory.length, isSearching, hasStartedChat]);

  const handleRunDeepSearch = async (overrideQuery?: string) => {
    const queryText = (overrideQuery ?? promptInput).trim();
    if (!queryText || isSearching) return;

    setErrorMsg(null);
    setShowPlusMenu(false);
    setIsSearching(true);

    const userTurn: NasaDeepChatTurn = {
      role: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedHistory = [...chatHistory, userTurn];
    setChatHistory(updatedHistory);
    if (!overrideQuery) {
      setPromptInput('');
    }

    try {
      const result = await queryNasaDeepAi(
        queryText,
        true,
        updatedHistory.map((m) => ({ role: m.role, content: m.content })),
        selectedModule
      );

      const assistantTurn: NasaDeepChatTurn = {
        role: 'assistant',
        content: result.content,
        sources: result.sources,
        modelModule: result.modelModule || selectedModule,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatHistory((prev) => [...prev, assistantTurn]);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to complete NASA Deep Search query.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRunDeepSearch();
    }
  };

  return (
    <div
      className="nasa-ai-shell h-screen w-full bg-[#1a1916] text-[#e8e7e3] flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 28%, rgba(40, 39, 34, 0.55) 0%, rgba(24, 23, 20, 0.96) 65%, rgba(18, 17, 15, 1) 100%)',
      }}
    >
      {/* TOP BAR: Exact Staggered Menu Icon on Left + Ghost Icon on Right */}
      <header className="w-full px-5 sm:px-14 pt-5 sm:pt-8 pb-2 flex items-center justify-between shrink-0 relative z-30">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTopLeftMenu((prev) => !prev)}
            title="Menu / Back to NASA Dashboard"
            className="p-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
          >
            <StaggeredMenuIconSvg />
          </button>

          {showTopLeftMenu && (
            <div className="absolute left-0 mt-2 w-60 rounded-[14px] bg-[#23221f] border border-[#35342f] shadow-2xl py-1.5 z-50">
              <button
                type="button"
                onClick={onBackToDashboard}
                className="w-full px-4 py-2.5 text-left text-[13.5px] text-[#e8e7e3] hover:bg-[#2e2d29] flex items-center justify-between cursor-pointer transition"
              >
                <span>← Back to NASA Dashboard</span>
              </button>
              {hasStartedChat && (
                <button
                  type="button"
                  onClick={() => {
                    setChatHistory([]);
                    setErrorMsg(null);
                    setShowTopLeftMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-[13.5px] text-[#b8b7b2] hover:bg-[#2e2d29] hover:text-white cursor-pointer transition border-t border-[#2f2e2a]"
                >
                  New Chat (Reset View)
                </button>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onBackToDashboard}
          title="Return to NASA Dashboard"
          className="p-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
        >
          <GhostOutlineIconSvg />
        </button>
      </header>

      {/* MAIN WORKSPACE: Gemini-style layout where initial state shows Orb + (Learn with me),
          and once chatting starts, Orb + (Learn with me) disappear and chat messages appear ABOVE the prompt box */}
      <main
        onClick={() => {
          if (showTopLeftMenu) setShowTopLeftMenu(false);
          if (showPlusMenu) setShowPlusMenu(false);
        }}
        className={`nasa-ai-workspace flex-1 w-full max-w-[1060px] mx-auto px-5 sm:px-10 flex flex-col min-h-0 ${
          hasStartedChat ? 'justify-between pt-2 pb-3' : 'justify-center pb-10'
        }`}
      >
        {/* 1. INITIAL EMPTY STATE ONLY: Iridescent AI Sphere Orb + "(Learn with me)" */}
        {!hasStartedChat && (
          <div className="relative flex flex-col items-center mb-3">
            <div className="nasa-ai-orb relative w-[118px] h-[118px] sm:w-[136px] sm:h-[136px] rounded-full overflow-hidden shadow-[0_14px_36px_rgba(0,0,0,0.75)] flex items-center justify-center bg-[#0e0c1a]">
              <img
                src={aiOrbImg}
                alt="AI"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-[1.16]"
              />
            </div>

            {/* Exact "(Learn with me)" Serif Subtitle */}
            <h1
              className="nasa-ai-subtitle mt-4 text-[29px] sm:text-[37px] font-normal text-[#eae9e5] tracking-[0.01em] leading-tight text-center"
              style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            >
              (Learn with me)
            </h1>
          </div>
        )}

        {/* 2. ACTIVE CHAT STATE: Scrollable Chat Conversation Stream ABOVE the Prompt Box */}
        {hasStartedChat && (
          <div className="nasa-ai-chat-stream flex-1 w-full max-w-[960px] mx-auto overflow-y-auto nasa-scroll pr-2 space-y-5 pb-4 select-text min-h-0">
            {chatHistory.map((turn, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  turn.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {turn.role === 'user' ? (
                  /* User Message Bubble on Upper Right (Gemini style) */
                  <div className="max-w-[82%] sm:max-w-[75%] rounded-[22px] rounded-tr-[6px] bg-[#2c2b27] border border-[#3d3b36] px-5 py-3.5 text-[#f0efe9] text-[15.5px] sm:text-[16.5px] leading-[1.5]">
                    {turn.content}
                  </div>
                ) : (
                  /* Assistant Response on Left (Gemini style with ΛI orb avatar) */
                  <div className="w-full flex items-start gap-3.5 py-1">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#0e0c1a] shadow-md mt-0.5">
                      <img
                        src={aiOrbImg}
                        alt="AI"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover scale-[1.16]"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] sm:text-[16px] leading-[1.7] whitespace-pre-wrap text-[#e8e7e2]">
                        {turn.content}
                      </div>

                      {turn.sources && turn.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#32312c]">
                          <div className="text-[11px] uppercase tracking-wider text-[#94938e] mb-2">
                            Verified NASA &amp; Google Search Sources:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {turn.sources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] px-3 py-1 rounded-full bg-[#161614] border border-[#34332e] text-[#b5c8e8] hover:text-white hover:border-[#596882] transition max-w-[300px] truncate"
                              >
                                {src.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isSearching && (
              <div className="py-3 pl-1 flex items-center">
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-[0_0_24px_rgba(139,92,246,0.65)] animate-pulse bg-[#0e0c1a] flex items-center justify-center">
                  <img
                    src={aiOrbImg}
                    alt="AI"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-[1.16]"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="w-full px-5 py-3 rounded-[16px] bg-[#2b1d1d] border border-[#5c3535] text-[#f2c6c6] text-[13.5px]">
                {errorMsg}
              </div>
            )}

            <div ref={resultsEndRef} />
          </div>
        )}

        {/* 3. PROMPT BOX: Centered initially, docked at bottom below the chat when chatting */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`nasa-ai-prompt-box w-full max-w-[960px] mx-auto rounded-[26px] bg-[#23221f] border border-[#2c2b27]/80 shadow-[0_18px_50px_rgba(0,0,0,0.45)] px-6 sm:px-9 flex flex-col justify-between relative shrink-0 transition-all ${
            hasStartedChat
              ? 'pt-5 sm:pt-6 pb-4 sm:pb-5 mt-2'
              : 'pt-12 sm:pt-16 pb-5 sm:pb-6 mt-4 sm:mt-6'
          }`}
        >
          {/* Input Field ("chat with NASA deep AI...") */}
          <div className={hasStartedChat ? 'w-full mb-4 sm:mb-5' : 'w-full mb-7 sm:mb-9'}>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="chat with NASA deep AI..."
              className="nasa-ai-input w-full bg-transparent text-[#eae9e5] placeholder-[#7f7e7a] text-[20px] sm:text-[25px] font-normal tracking-[0.01em] focus:outline-none select-text"
            />
          </div>

          {/* Bottom Controls Row inside Prompt Box: [+] [Deep searching 2] [Science opus 3] ............ [→] */}
          <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 relative">
              {/* Circular Dark "+" Button */}
              <button
                type="button"
                onClick={() => setShowPlusMenu((prev) => !prev)}
                title="Sample NASA Deep Search Prompts"
                className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full bg-[#131311] hover:bg-[#1a1a17] text-[#e7e6e2] flex items-center justify-center text-[26px] font-light leading-none cursor-pointer transition shrink-0"
              >
                +
              </button>

              {/* Module 1: Dark Pill "Deep searching 2" Button */}
              <button
                type="button"
                onClick={() => setSelectedModule('deep_searching_2')}
                title="Deep searching 2 — Live Google Search & NASA Archive Discovery"
                className={`nasa-ai-pill-btn px-5 sm:px-6 py-2.5 rounded-full text-[15px] sm:text-[17.5px] font-normal tracking-[0.01em] cursor-pointer transition flex items-center gap-2 ${
                  selectedModule === 'deep_searching_2'
                    ? 'bg-[#131311] text-[#f0efe9] border border-[#4a4842] shadow-[0_0_12px_rgba(255,255,255,0.06)]'
                    : 'bg-[#171614] text-[#8f8e89] hover:text-[#d5d4cf] border border-transparent'
                }`}
              >
                <span>Deep searching 2</span>
              </button>

              {/* Module 2: Dark Pill "Science opus 3" Button (High-Power Scientific Facts & Reasoning) */}
              <button
                type="button"
                onClick={() => setSelectedModule('science_opus_3')}
                title="Science opus 3 — High-Power Scientific Facts, Equations & Deep NASA Analysis"
                className={`nasa-ai-pill-btn px-5 sm:px-6 py-2.5 rounded-full text-[15px] sm:text-[17.5px] font-normal tracking-[0.01em] cursor-pointer transition flex items-center gap-2 ${
                  selectedModule === 'science_opus_3'
                    ? 'bg-[#131311] text-[#f2f0ff] border border-[#7c6df2]/75 shadow-[0_0_16px_rgba(124,109,242,0.28)]'
                    : 'bg-[#171614] text-[#8f8e89] hover:text-[#d5d4cf] border border-transparent'
                }`}
              >
                <span>Science opus 3</span>
              </button>

              {/* Quick NASA Scientific Prompt Picker when "+" is clicked */}
              {showPlusMenu && (
                <div className="absolute left-0 bottom-14 w-[320px] sm:w-[440px] max-w-[calc(100vw-3rem)] rounded-[16px] bg-[#1c1b18] border border-[#363530] shadow-2xl p-2.5 z-40 space-y-1">
                  <div className="px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#8e8d88]">
                    NASA Deep Search Scientific Queries
                  </div>
                  {SUGGESTED_NASA_QUERIES.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPromptInput(q);
                        handleRunDeepSearch(q);
                      }}
                      className="w-full text-left px-3 py-2 rounded-[10px] text-[12.5px] text-[#d8d7d2] hover:bg-[#2a2925] hover:text-white transition cursor-pointer leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Off-White Circular Submit Arrow Button ("→") */}
            <button
              type="button"
              onClick={() => handleRunDeepSearch()}
              disabled={isSearching}
              title="Run NASA Deep Search"
              className="w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-full bg-[#e8e7e3] hover:bg-white disabled:opacity-60 text-[#181816] flex items-center justify-center cursor-pointer transition shrink-0"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="#181816"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Subtle Bottom-Right Version Label */}
      <footer className="w-full px-6 pb-2.5 flex justify-end shrink-0 pointer-events-none">
        <span className="text-[#6e6d68] text-[12px] tracking-[0.04em]">
          {APP_VERSION}
        </span>
      </footer>
    </div>
  );
};
