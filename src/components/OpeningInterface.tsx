import React from 'react';
import heroHologramImg from '../assets/images/nasa_learning_hero_hologram_1790405198774.jpg';
import { APP_VERSION } from '../constants/version';

interface OpeningInterfaceProps {
  onGetStarted: () => void;
}

const NasaLearningLogoSvg: React.FC = () => (
  <svg
    width="62"
    height="54"
    viewBox="0 0 64 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    {/* Deep blue NASA meatball sphere */}
    <circle cx="30" cy="28" r="23" fill="#0B3D91" />
    {/* Star field dots */}
    <circle cx="19" cy="15" r="0.9" fill="#FFFFFF" />
    <circle cx="25" cy="13" r="0.7" fill="#FFFFFF" />
    <circle cx="39" cy="15" r="0.9" fill="#FFFFFF" />
    <circle cx="43" cy="20" r="0.6" fill="#FFFFFF" />
    <circle cx="17" cy="36" r="0.8" fill="#FFFFFF" />
    <circle cx="22" cy="42" r="0.7" fill="#FFFFFF" />
    <circle cx="35" cy="42" r="0.9" fill="#FFFFFF" />
    <circle cx="42" cy="36" r="0.7" fill="#FFFFFF" />
    {/* Orbital white ellipse */}
    <ellipse
      cx="31"
      cy="28"
      rx="26"
      ry="8.8"
      transform="rotate(-24 31 28)"
      stroke="#E6ECF8"
      strokeWidth="1.4"
      fill="none"
    />
    {/* Red vector chevron wing */}
    <path
      d="M7 36.5 C22 25, 36 17.5, 57 9.5 C42 19.5, 31 27, 24.5 44 C22.5 33.5, 17.5 32, 7 36.5 Z"
      fill="#E03C31"
    />
    {/* NASA Bold White Serif/Sans Typography */}
    <text
      x="30"
      y="31.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="13"
      fontWeight="800"
      fontFamily="Georgia, 'Times New Roman', serif"
      letterSpacing="0.9"
    >
      NASA
    </text>
  </svg>
);

const ExternalLaunchIconSvg: React.FC = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4H6.8C5.2536 4 4 5.2536 4 6.8V17.2C4 18.7464 5.2536 20 6.8 20H17.2C18.7464 20 20 18.7464 20 17.2V13"
      stroke="#0D1726"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 4H20M20 4V10M20 4L10 14"
      stroke="#0D1726"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OpeningInterface: React.FC<OpeningInterfaceProps> = ({ onGetStarted }) => {
  return (
    <div className="nasa-opening-outer min-h-screen w-full bg-[#05080f] flex items-stretch justify-center p-0 select-none">
      {/* Main Opening Interface Card matching the reference image across full-screen viewports */}
      <div className="nasa-opening-shell relative w-full h-screen overflow-hidden bg-[#02050d] flex flex-col justify-between">
        {/* Background Holographic Cosmic Nebula & 3D Wireframe Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroHologramImg}
            alt="NASA Scientific Hologram Visualization"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Top pitch-black gradient fade so header and headline have the exact contrast of the reference image */}
          <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#010308] via-[#01050e]/85 to-transparent" />
          {/* Subtle bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#020611]/90 via-[#030b1c]/40 to-transparent" />
        </div>

        {/* TOP BAR: NASA LEARNING + Top-Right Launch Button */}
        <header className="relative z-10 flex items-center justify-between px-4 sm:px-9 pt-5 sm:pt-7 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <NasaLearningLogoSvg />
            <span className="text-white text-[18px] sm:text-[27px] font-medium tracking-[0.03em] uppercase truncate">
              NASA LEARN WEB
            </span>
          </div>

          <button
            type="button"
            onClick={onGetStarted}
            title="Open NASA Dashboard"
            className="w-[44px] h-[44px] sm:w-[54px] sm:h-[54px] rounded-[12px] bg-white hover:bg-[#f0f4fa] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer transition transform hover:scale-105 shrink-0"
          >
            <ExternalLaunchIconSvg />
          </button>
        </header>

        {/* CENTER HEADLINE + HOLOGRAPHIC CALLOUT LABELS */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 px-4 pointer-events-none">
          <h1 className="nasa-opening-title text-center text-white text-[32px] sm:text-[48px] md:text-[54px] font-semibold leading-[1.16] tracking-[-0.01em] drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)] max-w-[820px]">
            NASA Scientific Data,
            <br />
            and Scientific Facts
          </h1>

          {/* Scientific Hologram Callout Labels matching the reference image */}
          <div className="relative w-full max-w-[980px] flex-1 hidden md:block">
            {/* Upper-Left: ORBITAL MECHANICS */}
            <div className="absolute top-[22%] left-[14%] text-left">
              <div className="text-[#9ec5e8] text-[9.5px] font-medium tracking-[0.08em] uppercase">
                ORBITAL MECHANICS
              </div>
              <div className="w-24 h-[1px] bg-[#4ea8de]/50 my-0.5" />
              <div className="text-[#6992b8] text-[7px] leading-[1.2] max-w-[105px]">
                Keplerian trajectory &amp; habitable zone resonance telemetry
              </div>
            </div>

            {/* Lower-Left: ASTRONOMICAL DATA */}
            <div className="absolute bottom-[12%] left-[15%] text-left">
              <div className="text-[#9ec5e8] text-[9.5px] font-medium tracking-[0.08em] uppercase">
                ASTRONOMICAL DATA
              </div>
              <div className="w-28 h-[1px] bg-[#4ea8de]/50 my-0.5" />
              <div className="text-[#6992b8] text-[7px] leading-[1.2] max-w-[115px]">
                Deep space spectrophotometric array stream &amp; transit curve
              </div>
            </div>

            {/* Upper-Right: ASTRONOMICAL DATA */}
            <div className="absolute top-[26%] right-[16%] text-left">
              <div className="text-[#9ec5e8] text-[9.5px] font-medium tracking-[0.08em] uppercase">
                ASTRONOMICAL DATA
              </div>
              <div className="w-24 h-[1px] bg-[#4ea8de]/50 my-0.5" />
              <div className="text-[#6992b8] text-[7px] leading-[1.2] max-w-[110px]">
                JWST NIRSpec / MIRI orbital sensor calibration
              </div>
            </div>

            {/* Far-Right: MICROBIAL ANALYSIS */}
            <div className="absolute top-[38%] right-[3%] text-left">
              <div className="text-[#9ec5e8] text-[9.5px] font-medium tracking-[0.08em] uppercase">
                MICROBIAL ANALYSIS
              </div>
              <div className="w-24 h-[1px] bg-[#4ea8de]/50 my-0.5" />
              <div className="text-[#6992b8] text-[7px] leading-[1.2] max-w-[110px]">
                Prebiotic organic &amp; astrobiological biosignature index
              </div>
            </div>

            {/* Lower-Right: MICROBIAL ANALYSIS */}
            <div className="absolute bottom-[13%] right-[16%] text-left">
              <div className="text-[#9ec5e8] text-[9.5px] font-medium tracking-[0.08em] uppercase">
                MICROBIAL ANALYSIS
              </div>
              <div className="w-28 h-[1px] bg-[#4ea8de]/50 my-0.5" />
              <div className="text-[#6992b8] text-[7px] leading-[1.2] max-w-[115px]">
                Atmospheric H₂O, O₂, and CH₄ molecular synthesis
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CENTER CTA: GET STARTED + Bottom-Right Version Label */}
        <div className="nasa-opening-footer relative z-10 pb-8 sm:pb-10 flex justify-center items-center px-4">
          <button
            type="button"
            onClick={onGetStarted}
            className="px-10 sm:px-14 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#f5f9ff] text-[#0d192b] text-[17px] sm:text-[22px] font-bold tracking-[0.02em] uppercase shadow-[0_0_38px_rgba(115,200,255,0.75)] hover:shadow-[0_0_52px_rgba(145,215,255,0.95)] cursor-pointer transition transform hover:scale-[1.02] active:scale-[0.99]"
          >
            GET STARTED
          </button>

          <span className="nasa-opening-version absolute right-5 sm:right-7 bottom-3.5 sm:bottom-4 text-[#9fb4d4] text-[12.5px] sm:text-[13.5px] font-medium tracking-[0.04em]">
            {APP_VERSION}
          </span>
        </div>
      </div>
    </div>
  );
};
