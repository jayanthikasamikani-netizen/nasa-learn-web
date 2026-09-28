import React from 'react';

export const NasaLogoSvg: React.FC = () => (
  <svg width="46" height="40" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    {/* Deep blue NASA meatball sphere */}
    <circle cx="30" cy="28" r="22" fill="#0B3D91" />
    {/* Subtle star field dots */}
    <circle cx="20" cy="16" r="0.9" fill="#FFFFFF" />
    <circle cx="25" cy="14" r="0.7" fill="#FFFFFF" />
    <circle cx="38" cy="15" r="0.9" fill="#FFFFFF" />
    <circle cx="18" cy="36" r="0.8" fill="#FFFFFF" />
    <circle cx="35" cy="41" r="0.9" fill="#FFFFFF" />
    <circle cx="42" cy="35" r="0.7" fill="#FFFFFF" />
    {/* Orbital white ellipse */}
    <ellipse
      cx="31"
      cy="28"
      rx="25"
      ry="8.5"
      transform="rotate(-24 31 28)"
      stroke="#DCE3F0"
      strokeWidth="1.4"
      fill="none"
    />
    {/* Red vector chevron wing */}
    <path
      d="M8 36 C22 25, 36 18, 56 10 C42 20, 31 27, 25 43 C23 33, 18 32, 8 36 Z"
      fill="#E03C31"
    />
    {/* NASA Bold White Typography */}
    <text
      x="30"
      y="31.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="12.5"
      fontWeight="800"
      fontFamily="Inter, sans-serif"
      letterSpacing="0.8"
    >
      NASA
    </text>
  </svg>
);

export const ScienceDataIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M4 4V24H24" stroke="#C5CDD9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="7" y="14" width="2.8" height="7.5" stroke="#C5CDD9" strokeWidth="1.3" />
    <rect x="11.5" y="9" width="2.8" height="12.5" stroke="#C5CDD9" strokeWidth="1.3" />
    <rect x="16" y="15.5" width="2.8" height="6" stroke="#C5CDD9" strokeWidth="1.3" />
    <rect x="20.5" y="7.5" width="2.8" height="14" stroke="#C5CDD9" strokeWidth="1.3" />
  </svg>
);

export const PlanetDataIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="14" cy="14" r="7.5" stroke="#D5DCE8" strokeWidth="1.5" />
    <path d="M10 9.5C12 10.5 14.5 10.5 17 8.8" stroke="#D5DCE8" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse
      cx="14"
      cy="14"
      rx="12.5"
      ry="4.2"
      transform="rotate(-28 14 14)"
      stroke="#D5DCE8"
      strokeWidth="1.5"
    />
  </svg>
);

export const LiveTelescopeIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    {/* Tripod base */}
    <path d="M9 24L13.5 16.5L18 24" stroke="#C5CDD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 24H19.5" stroke="#C5CDD9" strokeWidth="1.5" strokeLinecap="round" />
    {/* Dish arc */}
    <path
      d="M8.5 9.5C6.5 13 8.5 17.5 12.5 18.5C16.5 19.5 20.5 17 21.5 13.5L8.5 9.5Z"
      stroke="#C5CDD9"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Antenna feed & waves */}
    <path d="M15 14L19.5 7.5" stroke="#C5CDD9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.5 5.5C20.5 6 22 7.5 22.5 9.5" stroke="#C5CDD9" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M20.5 3.5C23 4.2 24.8 6.2 25.5 8.8" stroke="#C5CDD9" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const PhotosIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect x="3.5" y="7.5" width="21" height="15" rx="2.5" stroke="#C5CDD9" strokeWidth="1.5" />
    <path d="M9.5 7.5L11.2 5H16.8L18.5 7.5" stroke="#C5CDD9" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="14" cy="15" r="4.8" stroke="#C5CDD9" strokeWidth="1.5" />
    <circle cx="14" cy="15" r="2.6" stroke="#C5CDD9" strokeWidth="1.2" />
    <circle cx="20.5" cy="10.8" r="1" fill="#C5CDD9" />
  </svg>
);

export const NasaApisIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle
      cx="14"
      cy="14"
      r="10.5"
      stroke="#C5CDD9"
      strokeWidth="1.5"
      strokeDasharray="4 2.5"
    />
    <path d="M10.5 11.2L7.5 14L10.5 16.8" stroke="#C5CDD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 11.2L20.5 14L17.5 16.8" stroke="#C5CDD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.2 10L12.8 18" stroke="#C5CDD9" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const AskWithResearchIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12.5" cy="12.5" r="8" stroke="#C5CDD9" strokeWidth="1.5" />
    <path d="M18.5 18.5L24 24" stroke="#C5CDD9" strokeWidth="2" strokeLinecap="round" />
    {/* DNA double helix inside lens */}
    <path d="M9.5 9.5C11.5 9.5 13.5 15.5 15.5 15.5" stroke="#C5CDD9" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9.5 15.5C11.5 15.5 13.5 9.5 15.5 9.5" stroke="#C5CDD9" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="10.8" y1="11" x2="10.8" y2="14" stroke="#C5CDD9" strokeWidth="1" />
    <line x1="14.2" y1="11" x2="14.2" y2="14" stroke="#C5CDD9" strokeWidth="1" />
  </svg>
);

export const SparkleAiIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    {/* Main 4-point concave sparkle star */}
    <path
      d="M11 3.5C11.3 7.8 13.2 9.7 17.5 10C13.2 10.3 11.3 12.2 11 16.5C10.7 12.2 8.8 10.3 4.5 10C8.8 9.7 10.7 7.8 11 3.5Z"
      stroke="#DCE3F2"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* Top right small sparkle */}
    <path d="M18.5 3V6M17 4.5H20" stroke="#DCE3F2" strokeWidth="1.3" strokeLinecap="round" />
    {/* Bottom right small sparkle */}
    <path d="M18.5 14.5V17.5M17 16H20" stroke="#DCE3F2" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const TransitLightCurveSvg: React.FC = () => (
  <div className="flex items-center gap-1.5 my-2.5 select-none">
    {/* Left axis tick marks matching the image */}
    <div className="flex flex-col justify-between h-[36px] py-0.5 text-[#6d7687] text-[9px] leading-none font-mono">
      <div className="flex items-center justify-end gap-0.5">
        <span className="w-2 h-[1px] bg-[#6d7687] inline-block" />
      </div>
      <div className="flex items-center justify-end gap-0.5">
        <span className="w-1 h-1 rounded-full bg-[#6d7687] inline-block" />
        <span className="w-2 h-[1px] bg-[#6d7687] inline-block" />
      </div>
      <div className="flex items-center justify-end gap-0.5">
        <span className="w-2 h-[1px] bg-[#6d7687] inline-block" />
      </div>
    </div>

    {/* Main plot frame */}
    <div className="flex-1 h-[36px] bg-[#1a1f28] border border-[#444c5c] rounded-[2px] relative overflow-hidden">
      <svg
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle horizontal reference grid lines */}
        <line x1="0" y1="8" x2="600" y2="8" stroke="#2c3342" strokeWidth="1" />
        <line x1="0" y1="30" x2="600" y2="30" stroke="#2c3342" strokeWidth="1" />
        {/* Faint secondary continuum curve */}
        <path
          d="M0 10 L185 10 L215 29 L520 29 L545 20 L600 20"
          stroke="#485062"
          strokeWidth="1"
          fill="none"
        />
        {/* Primary white/silver noisy exoplanet transit light curve matching the reference image */}
        <path
          d="M0 9 L12 8.5 L24 9.5 L38 8 L52 9.2 L66 8.4 L82 9 L96 8.2 L112 9.4 L128 8.6 L144 9.1 L160 8.5 L175 9.3 L188 11 L196 16 L203 19 L210 27.5 L224 28.2 L240 27.8 L258 28.5 L276 28.1 L295 28.4 L315 27.9 L335 28.3 L355 28.0 L375 28.4 L395 27.8 L415 28.2 L435 28.5 L455 27.9 L475 28.3 L495 28.1 L512 28.0 L525 27.5 L535 19.5 L546 20.2 L558 19.2 L572 19.8 L586 19.4 L600 19.6"
          stroke="#AEB7C6"
          strokeWidth="1.35"
          fill="none"
        />
      </svg>
    </div>
  </div>
);
