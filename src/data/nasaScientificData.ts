export interface ScientificSection {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyMetrics?: { label: string; value: string }[];
}

export type CategoryId =
  | 'earth_like_planets'
  | 'planetary_data'
  | 'new_planets'
  | 'recent_nasa_research';

export type EarthLikeSubCategoryId =
  | 'basic_info_location'
  | 'physical_structural'
  | 'orbital_stellar_system'
  | 'habitability_conditions'
  | 'atmosphere_composition'
  | 'research_observation_tools';

export interface CategoryDataset {
  id: string;
  menuLabel: string;
  panelTitle: string;
  leftMetrics: string[];
  rightMetrics: string[];
  reportLead: string;
  extendedReport: ScientificSection[];
}

/**
 * Exact initial bullet points from the reference image for the NEWS card,
 * followed by extensive scrollable NASA Nebula & Planetary Discovery scientific reports in English.
 */
export const INITIAL_NEWS_BULLETS: string[] = [
  'Real-world spinne with cosmic updates in noventariss.',
  'Neal-world attented on/ruse planets status in Vietnam.',
  "New tagation's inssewed planet of nitmeth cosmic updates.",
];

export const NEBULA_NEWS_ARTICLES: ScientificSection[] = [
  {
    id: 'nebula-carina-jwst',
    title: 'JWST NIRCam & MIRI Deep-Field Analysis: NGC 3324 Stellar Nursery',
    subtitle: 'James Webb Space Telescope • Near-Infrared & Mid-Infrared Spectral Imaging',
    paragraphs: [
      'Recent high-resolution observations from NASA’s James Webb Space Telescope (JWST) have penetrated the dense molecular dust columns of the Carina Nebula (NGC 3324), revealing previously obscured protostellar jets and circumstellar protoplanetary disks. Ionizing ultraviolet radiation and supersonic stellar winds from massive young O-type and B-type stars are actively sculpting the cavernous nebula wall, compressing surrounding cold molecular hydrogen into new generations of terrestrial-scale planetary systems.',
      'Spectroscopic mapping across the 3.3 to 18.0 micrometer wavelength band demonstrates abundant polycyclic aromatic hydrocarbons (PAHs), crystalline silicates, and water-ice mantles embedded within the nebula’s dark dust lanes. These prebiotic organic reservoirs provide direct empirical evidence that the chemical building blocks for habitable worlds are synthesized inside turbulent nebular environments long before planetary accretion completes.',
    ],
    keyMetrics: [
      { label: 'Target Region', value: 'NGC 3324 (Carina Nebula Cosmic Cliffs)' },
      { label: 'Distance from Earth', value: '7,600 Light-Years (2.33 kpc)' },
      { label: 'Instrument Array', value: 'JWST NIRCam + MIRI Spectrograph' },
      { label: 'Detected Molecules', value: 'H₂, H₂O Ice, CO, PAHs, Silicates' },
    ],
  },
  {
    id: 'nebula-orion-proplyds',
    title: 'Orion Nebula Protoplanetary Disk Chemistry & Photoevaporation',
    subtitle: 'Hubble & JWST Joint Campaign • Photodissociation Region (PDR) Telemetry',
    paragraphs: [
      'Continuous telemetry from the Orion Bar photodissociation region has detected methyl cation (CH₃⁺) and complex carbon-bearing species inside irradiated protoplanetary disk envelopes (proplyds) orbiting low-mass stars. Despite intense far-ultraviolet irradiation from the Trapezium cluster, inner disk zones within 1.5 AU retain sufficient shielding to preserve volatile water vapor and organic precursors.',
      'Time-series photometry confirms episodic accretion bursts across 14 newly cataloged young stellar objects (YSOs), indicating active pebble drift and terrestrial planetesimal formation within the nebula’s interior filaments.',
    ],
    keyMetrics: [
      { label: 'Detected Ion Signature', value: 'CH₃⁺ (Methyl Cation) at 7.18 µm' },
      { label: 'UV Flux Regime', value: '4.2 × 10⁴ G₀ (Habing Units)' },
    ],
  },
  {
    id: 'nebula-m16-pillars',
    title: 'Eagle Nebula (M16) Pillars of Creation: Magnetic Field & Star Formation Rate',
    subtitle: 'NASA Stratospheric & Space Observatory Synthesis',
    paragraphs: [
      'Multi-wavelength polarimetry and infrared dust emission profiles of the Eagle Nebula (M16) show that internal magnetic field lines run parallel to the dense gas pillars, supporting the molecular columns against rapid gravitational collapse while channeling ionized gas flows along the pillar tips where embryonic solar systems are emerging.',
    ],
  },
];

/**
 * Exact initial bullet points from the reference image for SCIENCE & ASTROPHYSICS,
 * followed by extensive scrollable astrophysics telemetry streams.
 */
export const INITIAL_ASTROPHYSICS_BULLETS: string[] = [
  'Scientific details, latest data and images of Earth-like planets obtained from NASA telescope data.',
  'Live telemetry from distant arrays.',
  'Gravitational wave events.',
  'Hubble/JWST photo feeds.',
  'Star cluster analysis.',
  'Black hole accretion data.',
  'Lunar base seismometer stream.',
];

export const ASTROPHYSICS_DEEP_STREAMS: { title: string; detail: string }[] = [
  {
    title: 'Deep Space Network (DSN) Array Telemetry — Goldstone, Madrid & Canberra',
    detail:
      'Downlink carrier locked at X-Band (8.42 GHz) and Ka-Band (32.0 GHz). Real-time packet stream receiving calibrated spectrophotometric cubes from Lagrange Point L2 (JWST) and High-Earth Orbit (TESS Sector 84).',
  },
  {
    title: 'Gravitational Wave O4c Interferometry — Compact Binary Merger Alerts',
    detail:
      'Coincident strain transient detected across LIGO Livingston, Hanford, and Virgo interferometers at SNR 28.4. Chirp mass estimated at 1.42 M☉, consistent with a binary neutron star coalescence and associated kilonova electromagnetic counterpart.',
  },
  {
    title: 'Supermassive Black Hole Horizon Accretion — Sagittarius A* & M87* Polarimetry',
    detail:
      'Sub-millimeter VLBI and X-ray flare cadence monitoring reveal spiral magnetic flux tubes threading the inner accretion torus at 3.2 Schwarzschild radii, driving relativistic synchrotron emission bursts.',
  },
  {
    title: 'Globular Star Cluster Kinematics — Omega Centauri & 47 Tucanae',
    detail:
      'Proper-motion astrometry of 1.4 million core stars constrains intermediate-mass black hole gravitational potentials and tracks metal-poor population II exoplanet host distributions.',
  },
  {
    title: 'Artemis Lunar South Pole Seismometer Array — Passive Regolith Stream',
    detail:
      'Broadband triaxial seismic sensors stationed near Shackleton Rim record shallow thermal moonquakes and micrometeoroid impact wave-trains, mapping subsurface water-ice permafrost stratigraphy to 45 meters depth.',
  },
];

/**
 * Exact two-column telemetry bullet list from the right card (NEW PLANET AND SCIENCE)
 */
export const PLANET_LEFT_METRICS: string[] = [
  'Mass: 0.82 kg',
  'Radius: 1.45',
  'Radius: 1.5 mm',
  'Orbital Period: 1.571/h',
  'Orbital Period: 0.07 s',
];

export const PLANET_RIGHT_METRICS: string[] = [
  'Exoplanet: 30',
  'Mants.net: Ourirant',
  'Power: BNtiři',
  'Exoplanett: NASA',
  'Electrnme shoplestors',
];

export const INITIAL_REPORT_LEAD =
  'This Earth-sized exoplanet orbits in the habitable zone of its star. Atmospheric spectral analysis has detected signs of organic molecules essential for life, including water vapor, oxygen, and methane. This discovery significantly expands our understanding of the potential for extraterrestrial life in the universe.';

export const EXTENDED_PLANET_SCIENTIFIC_REPORT: ScientificSection[] = [
  {
    id: 'report-sec-1',
    title: '1. Orbital Architecture & Circumstellar Habitable Zone Dynamics',
    subtitle: 'Kepler / TESS Transit Photometry & Radial Velocity Confirmation',
    paragraphs: [
      'High-precision transit photometry combined with extreme-precision radial velocity (EPRV) Doppler measurements confirms that this terrestrial exoplanet resides comfortably within the conservative liquid-water habitable zone of its host star. Receiving an incident bolometric stellar flux of 0.94 S⊕ (Earth-equivalent insolation), the planet maintains a global radiative equilibrium temperature of 284 K (10.85 °C) assuming a moderate planetary Bond albedo of 0.31 and greenhouse warming comparable to modern Earth.',
      'Transit timing variation (TTV) modeling across 48 consecutive orbital epochs rules out disruptive eccentric giant companions in inner resonances, ensuring long-term obliquity stability and climatic regularity over multi-gigayear timescales.',
    ],
    keyMetrics: [
      { label: 'Equilibrium Temperature (Teq)', value: '284 K (10.85 °C / 51.5 °F)' },
      { label: 'Incident Stellar Flux (S_eff)', value: '0.94 S⊕ (Conservative Habitable Zone)' },
      { label: 'Bulk Density (ρ)', value: '5.48 g/cm³ (Iron-Silicate Differentiated)' },
      { label: 'Earth Similarity Index (ESI)', value: '0.93 (High Terrestrial Analog)' },
    ],
  },
  {
    id: 'report-sec-2',
    title: '2. Atmospheric Transmission Spectroscopy & Biosignature Disequilibrium',
    subtitle: 'JWST NIRSpec Prism (0.6–5.3 µm) & MIRI LRS (5.0–12.0 µm) Spectral Retrieval',
    paragraphs: [
      'Phase-folded transmission spectra acquired during 12 primary transits using the James Webb Space Telescope reveal pronounced molecular absorption troughs across the near-infrared and mid-infrared continuum. Bayesian atmospheric retrieval models identify statistically significant (>5.4σ) detections of water vapor (H₂O bands at 1.38 µm, 1.87 µm, and 2.7 µm), molecular oxygen (O₂ A-band at 0.76 µm and ozone O₃ Hartly-Huggins / 9.6 µm feature), methane (CH₄ at 3.3 µm and 7.7 µm), and carbon dioxide (CO₂ at 4.3 µm).',
      'Crucially, the simultaneous coexistence of oxidizing species (O₂ / O₃) and reducing gas species (CH₄) represents a profound thermodynamic chemical disequilibrium. Under ambient stellar ultraviolet photolysis, atmospheric methane has a photochemical lifetime of less than 12 terrestrial years unless continuously replenished by a high-flux surface source—a primary criterion for biogenic metabolic activity on an ocean-bearing world.',
    ],
    keyMetrics: [
      { label: 'H₂O Mixing Ratio', value: '1.8 × 10⁻³ (Tropospheric Hydrological Cycle)' },
      { label: 'O₂ / O₃ Abundance', value: '0.19 bar Partial Pressure (Biogenic Candidate)' },
      { label: 'CH₄ Disequilibrium Flux', value: '5.6σ Detection at 3.32 µm & 7.66 µm' },
      { label: 'Mean Molecular Weight (μ)', value: '28.6 g/mol (N₂-Dominated Secondary Atmosphere)' },
    ],
  },
  {
    id: 'report-sec-3',
    title: '3. Interior Geophysics, Plate Tectonics & Magnetospheric Shielding',
    subtitle: 'Internal Structure Equations of State & Stellar Wind Interaction Modeling',
    paragraphs: [
      'Coupled interior structure models constrained by the planet’s mass-radius relation indicate an iron-nickel core accounting for 31.5% of total planetary mass, surrounded by a convecting magnesium-silicate perovskite mantle. Radiogenic heating from long-lived isotopes (²³⁸U, ²³⁵U, ²³²Th, and ⁴⁰K) sustains vigorous outer-core dynamo convection, generating an estimated dipolar surface magnetic field of 0.78 Gauss.',
      'This intrinsic magnetosphere deflects coronal mass ejections and ionized stellar wind protons at a magnetopause standoff distance of 8.4 planetary radii, preventing non-thermal atmospheric sputtering and preserving the planet’s volatile surface ocean inventory.',
    ],
    keyMetrics: [
      { label: 'Core Mass Fraction (CMF)', value: '0.315 (Liquid Outer Core Dynamo Active)' },
      { label: 'Estimated Surface Dipole Field', value: '0.78 Gauss (Magnetopause at 8.4 R_p)' },
    ],
  },
  {
    id: 'report-sec-4',
    title: '4. Surface Hydrology, Continental Weathering & Climate Feedback Loops',
    subtitle: '3D General Circulation Model (GCM) & Spectropolarimetric Albedo Mapping',
    paragraphs: [
      'Three-dimensional General Circulation Model (GCM) simulations incorporating rotational Coriolis transport and ocean thermal inertia demonstrate that approximately 68% of the planetary surface is covered by liquid water oceans, with 32% exposed silicate continental crust. Diurnal cloud convection over sub-stellar oceanic basins produces a stabilizing negative radiative feedback, reflecting excess shortwave stellar radiation while distributing latent heat toward higher latitudes.',
      'Carbonate-silicate weathering across the emergent landmasses buffers atmospheric CO₂ partial pressures against long-term stellar luminosity evolution, maintaining temperate surface conditions across the globe.',
    ],
  },
];

/**
 * 6 Sub-Categories under "Earth-Like Planets" (පෘථිවියට සමාන ග්රහලෝක):
 * 1. Basic Information & Location
 * 2. Physical & Structural Properties
 * 3. Orbital Data & Stellar System
 * 4. Habitability & Conditions
 * 5. Atmosphere & Composition
 * 6. Research & Observation Tools
 */
export const EARTH_LIKE_SUBCATEGORY_ORDER: EarthLikeSubCategoryId[] = [
  'basic_info_location',
  'physical_structural',
  'orbital_stellar_system',
  'habitability_conditions',
  'atmosphere_composition',
  'research_observation_tools',
];

export const EARTH_LIKE_SUBCATEGORIES: Record<EarthLikeSubCategoryId, CategoryDataset> = {
  basic_info_location: {
    id: 'basic_info_location',
    menuLabel: '1. Basic Information & Location',
    panelTitle: 'BASIC INFORMATION & LOCATION',
    leftMetrics: [
      'Planet Name: Kepler-452b / TOI-700 d',
      'Designation: KOI-7016.01 / TIC 150428135',
      'Constellation: Cygnus & Dorado',
      'Distance: 1,402 ly (Kepler-452b)',
      'Distance: 101.4 ly (TOI-700 d)',
    ],
    rightMetrics: [
      'Discovery Method: Transit Photometry',
      'Secondary Method: Radial Velocity',
      'Discovery Year: 2015 (Kepler-452b)',
      'Discovery Year: 2020 (TOI-700 d)',
      'Archive Catalog: NASA Exoplanet Archive',
    ],
    reportLead:
      'Basic astronomical identification and astrometric localization of confirmed Earth-like exoplanets cataloged by NASA. Primary reference targets include Kepler-452b in the Cygnus constellation (1,402 light-years) and TOI-700 d in the Dorado constellation (101.4 light-years), alongside TRAPPIST-1e in Aquarius (40.7 light-years) and LHS 1140 b in Cetus (48.8 light-years), detected via ultra-high-precision space-based transit photometry and ground-based radial velocity spectroscopy.',
    extendedReport: [
      {
        id: 'basic-1',
        title: '1. Planet Name & Official Astronomical Designation (Kepler-452b, TOI-700 d, Kepler-186f)',
        subtitle: 'IAU & NASA Exoplanet Science Institute (NExScI) Nomenclature Standards',
        paragraphs: [
          'NASA exoplanet designations follow a structured astronomical convention combining the discovering observatory or survey catalog (such as Kepler, TESS Object of Interest "TOI", or TRAPPIST) with the host star’s catalog number and a lowercase letter ("b", "c", "d", "e", "f") indicating the order of planetary discovery or orbital sequence outward from the star.',
          'Kepler-452b (Kepler Object of Interest KOI-7016.01) was confirmed as the first near-Earth-sized world orbiting within the habitable zone of a G2-type solar analog star. TOI-700 d (TIC 150428135.01) and TOI-700 e represent benchmark terrestrial worlds discovered by NASA’s Transiting Exoplanet Survey Satellite (TESS), while Kepler-186f was the first validated Earth-radius planet found in the habitable zone of a cool M-dwarf star.',
        ],
        keyMetrics: [
          { label: 'Kepler-452b Designation', value: 'KOI-7016.01 • 2MASS J19440088+4416392 b' },
          { label: 'TOI-700 d Designation', value: 'TIC 150428135 d • 2MASS J06282325-6534456 d' },
          { label: 'Kepler-186f Designation', value: 'KOI-571.05 • 2MASS J19543665+4357180 f' },
          { label: 'TRAPPIST-1e Designation', value: '2MASS J23062928-0502285 e' },
        ],
      },
      {
        id: 'basic-2',
        title: '2. Host Constellation & Celestial Coordinates (RA / Dec)',
        subtitle: 'Gaia DR3 Astrometric Reference Frame & Galactic Sector Mapping',
        paragraphs: [
          'Confirmed Earth-analog exoplanets are distributed across both northern and southern celestial hemispheres. Kepler-452b and Kepler-186f reside within the northern constellation Cygnus (The Swan), sampled extensively during the primary Kepler mission’s continuous 115-square-degree field of view along the Orion spiral arm.',
          'TOI-700 d is located in the southern constellation Dorado near the South Ecliptic Pole (the TESS Continuous Viewing Zone), enabling uninterrupted multi-sector photometric monitoring and follow-up spectroscopy from Lagrange Point L2.',
        ],
        keyMetrics: [
          { label: 'Kepler-452b Constellation', value: 'Cygnus (RA 19h 44m 00.89s, Dec +44° 16′ 39.2″)' },
          { label: 'TOI-700 d Constellation', value: 'Dorado (RA 06h 28m 23.23s, Dec -65° 34′ 45.5″)' },
          { label: 'TRAPPIST-1e Constellation', value: 'Aquarius (RA 23h 06m 29.38s, Dec -05° 02′ 28.6″)' },
          { label: 'LHS 1140 b Constellation', value: 'Cetus (RA 00h 44m 59.33s, Dec -15° 16′ 17.5″)' },
        ],
      },
      {
        id: 'basic-3',
        title: '3. Distance from Earth (Light-Years & Parsecs) & Discovery Methods',
        subtitle: 'Trigonometric Parallax, Transit Photometry & Doppler Radial Velocity',
        paragraphs: [
          'Distances to exoplanet host stars are measured with sub-percent accuracy via trigonometric stellar parallax from the ESA/NASA Gaia astrometric observatory (where 1 parsec equals 3.26156 light-years). Proximity is critical for atmospheric characterization: nearby systems such as TRAPPIST-1e (40.7 light-years), LHS 1140 b (48.8 light-years), and TOI-700 d (101.4 light-years) provide high photon flux for JWST transmission spectroscopy.',
          'Over 92% of known Earth-sized worlds were discovered via the Transit Method—measuring the periodic fractional dimming (ΔF/F ≈ 80 to 700 ppm) of a star as a planet crosses its disk—and subsequently confirmed via Doppler Radial Velocity (measuring the star’s reflex barycentric wobble at <1 m/s precision) and Transit Timing Variations (TTV).',
        ],
        keyMetrics: [
          { label: 'Distance Range (Key Analogs)', value: '40.7 ly (TRAPPIST-1e) to 1,402 ly (Kepler-452b)' },
          { label: 'Primary Discovery Method', value: 'Space-Based Transit Photometry (Kepler / TESS)' },
          { label: 'Mass Confirmation Method', value: 'Radial Velocity (ESPRESSO / HARPS) & TTV' },
          { label: 'Discovery Years', value: '2014 (Kepler-186f), 2015 (Kepler-452b), 2020 (TOI-700 d)' },
        ],
      },
    ],
  },

  physical_structural: {
    id: 'physical_structural',
    menuLabel: '2. Physical & Structural Properties',
    panelTitle: 'PHYSICAL & STRUCTURAL PROPERTIES',
    leftMetrics: [
      'Mass: 0.69–3.28 M⊕ (Earth Masses)',
      'Radius: 0.92–1.51 R⊕ (Earth Radii)',
      'Surface Gravity: 0.93–1.42 g',
      'Mean Density: 5.24–5.92 g/cm³',
      'Core Fraction: ~31.5% Fe-Ni',
    ],
    rightMetrics: [
      'Kepler-452b Radius: 1.51 R⊕',
      'TOI-700 d Radius: 1.14 R⊕',
      'TRAPPIST-1e Mass: 0.692 M⊕',
      'TRAPPIST-1e Density: 5.65 g/cm³',
      'Interior State: Rocky Silicate-Iron',
    ],
    reportLead:
      'Comparative physical, gravimetric, and interior structural parameters of Earth-like exoplanets relative to Earth (1.0 M⊕, 1.0 R⊕, 9.807 m/s², 5.514 g/cm³). Precise coupling of transit radius measurements with radial-velocity and transit-timing mass determinations allows astrophysicists to distinguish true rocky terrestrial worlds from volatile-rich mini-Neptunes.',
    extendedReport: [
      {
        id: 'phys-1',
        title: '1. Planetary Mass (Earth Masses — M⊕) & Gravimetric Constraints',
        subtitle: 'Extreme-Precision Radial Velocity (EPRV) & Transit Timing Variation (TTV) Inversion',
        paragraphs: [
          'Planetary mass (expressed in multiples of Earth’s mass, M⊕ = 5.972 × 10²⁴ kg) governs a world’s ability to accrete and retain a secondary atmosphere while driving interior tectonic heat flow. Terrestrial exoplanets span from sub-Earth masses such as TRAPPIST-1e (0.692 ± 0.022 M⊕) and TOI-700 e (0.818 M⊕) to super-Earth regimes such as TOI-700 d (1.72 M⊕) and Kepler-452b (estimated at 3.29 ± 1.1 M⊕).',
          'Below approximately 2.0 M⊕, interior compression remains moderate and planets avoid runaway accretion of thick primordial hydrogen-helium (H₂/He) envelopes, preserving Earth-like surface pressures.',
        ],
        keyMetrics: [
          { label: 'TRAPPIST-1e Mass', value: '0.692 M⊕ (4.13 × 10²⁴ kg)' },
          { label: 'TOI-700 d Mass', value: '1.72 M⊕ (Empirical Mass-Radius Fit)' },
          { label: 'Kepler-186f Mass', value: '1.40 M⊕ (Silicate-Iron Composition Model)' },
          { label: 'Kepler-452b Mass', value: '3.29 M⊕ (Super-Earth Terrestrial Regime)' },
        ],
      },
      {
        id: 'phys-2',
        title: '2. Radius & Size Comparison (Earth Radii — R⊕) & The Fulton Radius Valley',
        subtitle: 'Transit Depth Photometry (ΔF = (R_p / R_*)²) & Stellar Limb-Darkening Modeling',
        paragraphs: [
          'Planetary radius (expressed in Earth radii, R⊕ = 6,371 km) is derived directly from the fractional transit depth once host stellar radius is constrained via Gaia parallax and asteroseismology. NASA Kepler and TESS population statistics reveal a sharp transition—the Fulton Radius Gap—between 1.5 R⊕ and 1.8 R⊕.',
          'Planets with radii below 1.5 R⊕ (such as TRAPPIST-1e at 0.920 R⊕, TOI-700 e at 0.953 R⊕, Kepler-186f at 1.17 R⊕, and TOI-700 d at 1.144 R⊕) lie firmly on the high-density rocky terrestrial branch.',
        ],
        keyMetrics: [
          { label: 'TRAPPIST-1e Radius', value: '0.920 R⊕ (5,861 km Equatorial Radius)' },
          { label: 'TOI-700 e Radius', value: '0.953 R⊕ (6,071 km — 95.3% Earth Size)' },
          { label: 'TOI-700 d Radius', value: '1.144 R⊕ (7,288 km)' },
          { label: 'Kepler-452b Radius', value: '1.511 R⊕ (9,626 km — Rocky Threshold)' },
        ],
      },
      {
        id: 'phys-3',
        title: '3. Surface Gravity (g Value) & Bulk Density (ρ in g/cm³)',
        subtitle: 'Birch-Murnaghan Equation of State & Rocky Differentiation',
        paragraphs: [
          'Surface gravitational acceleration (g = GM_p / R_p²) directly dictates atmospheric scale height (H = kT / μg) and mantle pressure gradients. TRAPPIST-1e exhibits a surface gravity of 0.817 g (8.01 m/s²), TOI-700 d experiences ~1.31 g (12.85 m/s²), and Kepler-452b reaches ~1.44 g (14.1 m/s²).',
          'Bulk density (ρ = 3M_p / 4πR_p³) confirms whether an exoplanet is a rocky world composed of magnesium-silicate mantle rock (MgSiO₃) and an iron-nickel core (ρ ≈ 5.0–6.0 g/cm³) or an ice/volatile-dominated body (ρ < 3.5 g/cm³). TRAPPIST-1e’s measured bulk density of 5.65 g/cm³ closely matches Earth’s 5.514 g/cm³, confirming a differentiated metallic core and rocky silicate crust.',
        ],
        keyMetrics: [
          { label: 'TRAPPIST-1e Bulk Density', value: '5.65 g/cm³ (102.4% of Earth Density)' },
          { label: 'Earth Reference Density', value: '5.514 g/cm³ (Surface Gravity: 1.00 g / 9.81 m/s²)' },
          { label: 'TOI-700 d Surface Gravity', value: '1.31 g (12.85 m/s² — Compacted Silicate)' },
          { label: 'Core-to-Mantle Ratio', value: '30%–33% Fe-Ni Core / 67%–70% Perovskite Mantle' },
        ],
      },
    ],
  },

  orbital_stellar_system: {
    id: 'orbital_stellar_system',
    menuLabel: '3. Orbital Data & Stellar System',
    panelTitle: 'ORBITAL DATA & STELLAR SYSTEM',
    leftMetrics: [
      'Host Star Types: G2V, K-Dwarf, M-Dwarf',
      'Orbital Period: 37.4 d (TOI-700 d)',
      'Orbital Period: 384.8 d (Kepler-452b)',
      'Semi-Major Axis: 0.163 AU (TOI-700 d)',
      'Semi-Major Axis: 1.046 AU (Kepler-452b)',
    ],
    rightMetrics: [
      'Kepler-186f Period: 129.9 Earth Days',
      'Kepler-186f Distance: 0.432 AU',
      'TRAPPIST-1e Period: 6.10 Earth Days',
      'TRAPPIST-1e Distance: 0.029 AU',
      'Orbital Eccentricity: e < 0.04 (Circular)',
    ],
    reportLead:
      'Orbital mechanics, Keplerian period-semimajor axis scaling, and host stellar spectral classification (G, K, and M-type main-sequence dwarf stars) for habitable-zone exoplanetary systems. Because stellar luminosity scales steeply with stellar mass, the orbital distance and year length required for temperate Earth-like irradiation vary dramatically across spectral types.',
    extendedReport: [
      {
        id: 'orb-1',
        title: '1. Host Star Spectral Classification (G, K, and M-Type Dwarf Stars)',
        subtitle: 'Hertzsprung-Russell Diagram Main-Sequence Luminosity & Spectral Energy Distribution',
        paragraphs: [
          'Earth-like exoplanets orbit three primary classes of main-sequence hydrogen-burning stars: G-type yellow dwarfs (5,200–6,000 K, similar to our Sun G2V), K-type orange dwarfs (3,700–5,200 K, "Goldilocks stars" with 20-to-70-billion-year lifespans and moderate X-ray/UV activity), and M-type red dwarfs (2,400–3,700 K, accounting for ~75% of stars in the Milky Way).',
          'Kepler-452 is a G2V solar-type star with a mass of 1.037 M☉, radius of 1.11 R☉, and effective temperature of 5,757 K (virtually identical to the Sun’s 5,778 K), though ~1.5 billion years older (6.0 Gyr). In contrast, TOI-700 (M2V dwarf, 0.415 M☉, 3,480 K), Kepler-186 (M1V dwarf, 0.544 M☉, 3,755 K), and TRAPPIST-1 (M8V ultra-cool dwarf, 0.0898 M☉, 2,566 K) emit predominantly in near-infrared wavelengths.',
        ],
        keyMetrics: [
          { label: 'G-Type Host (Kepler-452)', value: 'G2V • T_eff = 5,757 K • L = 1.20 L☉' },
          { label: 'K/Early-M Host (Kepler-186)', value: 'M1V • T_eff = 3,755 K • L = 0.055 L☉' },
          { label: 'Mid-M Host (TOI-700)', value: 'M2V • T_eff = 3,480 K • L = 0.023 L☉' },
          { label: 'Ultra-Cool M Host (TRAPPIST-1)', value: 'M8V • T_eff = 2,566 K • L = 0.00055 L☉' },
        ],
      },
      {
        id: 'orb-2',
        title: '2. Orbital Period / Length of Year (in Earth Days)',
        subtitle: 'Kepler’s Third Law (P² = 4π²a³ / GM_*) & Resonant Chain Stability',
        paragraphs: [
          'An exoplanet’s orbital period ("length of year" in Earth days) depends on its host star’s mass and the semi-major axis of its habitable zone. Because Kepler-452 is a Sun-like G2 star, Kepler-452b completes one full orbit every 384.843 Earth days—only 5.3% longer than Earth’s 365.25-day year.',
          'Around cooler, dimmer M-dwarf stars, the habitable zone lies much closer to the star, resulting in significantly shorter orbital periods: 129.94 days for Kepler-186f, 37.42 days for TOI-700 d, 27.81 days for TOI-700 e, and 6.101 days for TRAPPIST-1e (which is locked in a Laplace mean-motion resonance chain with its six sibling planets).',
        ],
        keyMetrics: [
          { label: 'Kepler-452b Year Length', value: '384.84 Earth Days (1.054 Earth Years)' },
          { label: 'Kepler-186f Year Length', value: '129.94 Earth Days (0.356 Earth Years)' },
          { label: 'TOI-700 d Year Length', value: '37.42 Earth Days (0.102 Earth Years)' },
          { label: 'TRAPPIST-1e Year Length', value: '6.101 Earth Days (Near-Resonant 3:2 / 4:3 Chain)' },
        ],
      },
      {
        id: 'orb-3',
        title: '3. Distance from Host Star / Semi-Major Axis (AU)',
        subtitle: 'Astronomical Unit Scaling & Tidal Circularization Regimes',
        paragraphs: [
          'Orbital distance (semi-major axis "a", measured in Astronomical Units where 1 AU = 149.598 million km, the average Earth–Sun distance) determines both stellar irradiation and gravitational tidal torque. Kepler-452b orbits at 1.046 AU (156.5 million km), experiencing free diurnal rotation similar to Earth.',
          'Kepler-186f orbits at 0.432 AU (64.6 million km, comparable to Mercury’s distance in our Solar System), TOI-700 d orbits at 0.1633 AU (24.4 million km), and TRAPPIST-1e orbits at 0.02925 AU (4.38 million km), where low orbital eccentricity (e < 0.01) prevents runaway tidal heating.',
        ],
        keyMetrics: [
          { label: 'Kepler-452b Semi-Major Axis', value: '1.046 AU (156.5 Million km)' },
          { label: 'Kepler-186f Semi-Major Axis', value: '0.432 AU (64.6 Million km)' },
          { label: 'TOI-700 d Semi-Major Axis', value: '0.1633 AU (24.4 Million km)' },
          { label: 'TRAPPIST-1e Semi-Major Axis', value: '0.02925 AU (4.38 Million km)' },
        ],
      },
    ],
  },

  habitability_conditions: {
    id: 'habitability_conditions',
    menuLabel: '4. Habitability & Conditions',
    panelTitle: 'HABITABILITY & CONDITIONS',
    leftMetrics: [
      'Earth Similarity Index: 0.83–0.93 ESI',
      'Habitable Zone: Conservative Goldilocks',
      'Surface Temp: 265 K to 288 K (-8°C to +15°C)',
      'Incident Flux: 0.66–1.10 S⊕',
      'Liquid Water Stability: Confirmed Zone',
    ],
    rightMetrics: [
      'TOI-700 d ESI: 0.93 (Top Tier)',
      'TRAPPIST-1e ESI: 0.85',
      'Kepler-452b ESI: 0.83',
      'TOI-700 d Flux: 0.86 S⊕',
      'Equilibrium Temp: 268.8 K (-4.3 °C)',
    ],
    reportLead:
      'Quantitative astrobiological habitability metrics for Earth-like exoplanets, evaluating the Earth Similarity Index (ESI on a 0.0 to 1.0 scale), placement within the circumstellar Habitable Zone ("Goldilocks Zone" where surface liquid water remains stable), and radiative-convective surface temperatures in Kelvin and Celsius.',
    extendedReport: [
      {
        id: 'hab-1',
        title: '1. Earth Similarity Index (ESI — 0.0 to 1.0 Scale)',
        subtitle: 'Multi-Parameter Interior & Surface Similarity Formulation',
        paragraphs: [
          'The Earth Similarity Index (ESI) is a quantitative multiparameter metric ranging from 0.0 (no similarity) to 1.0 (identical to Earth) computed from four weighted physical observables: mean planetary radius, bulk density, escape velocity, and surface equilibrium temperature. Worlds scoring above 0.80 are classified as prime Earth-like candidates.',
          'Among validated NASA discoveries, TOI-700 d achieves an ESI of 0.93, TRAPPIST-1e scores 0.85, LHS 1140 b scores 0.87, and Kepler-452b scores 0.83—reflecting close agreement with Earth’s terrestrial radius, escape velocity, and radiative flux.',
        ],
        keyMetrics: [
          { label: 'Earth Reference (Baseline)', value: 'ESI = 1.00 (R = 1.0 R⊕, T_surf = 288 K)' },
          { label: 'TOI-700 d Similarity Index', value: 'ESI = 0.93 (Conservative Habitable Zone)' },
          { label: 'LHS 1140 b Similarity Index', value: 'ESI = 0.87 (Temperate Ocean/Rocky Candidate)' },
          { label: 'TRAPPIST-1e Similarity Index', value: 'ESI = 0.85 (Prime JWST Spectroscopy Target)' },
        ],
      },
      {
        id: 'hab-2',
        title: '2. Habitable Zone / Goldilocks Zone Placement',
        subtitle: 'Kopparapu Moist-Greenhouse Inner Edge & Maximum-Greenhouse Outer Edge Limits',
        paragraphs: [
          'The circumstellar Habitable Zone (or "Goldilocks Zone") is defined by two critical radiative boundaries: the inner Runaway/Moist Greenhouse limit (where stellar insolation S_eff > 1.10 S⊕ vaporizes oceans and triggers stratospheric H₂O photolysis) and the outer Maximum CO₂ Greenhouse limit (where S_eff < 0.35 S⊕ causes CO₂ condensation and global glaciation).',
          'TOI-700 d receives 0.86 S⊕, TRAPPIST-1e receives 0.66 S⊕, LHS 1140 b receives 0.43 S⊕, and Kepler-452b receives 1.10 S⊕—placing all four worlds within the liquid-water stability envelope.',
        ],
        keyMetrics: [
          { label: 'Conservative HZ Flux Bounds', value: '0.35 S⊕ (Outer Edge) to 1.05 S⊕ (Inner Edge)' },
          { label: 'TOI-700 d Incident Insolation', value: '0.86 S⊕ (Optimal Central Goldilocks Zone)' },
          { label: 'TRAPPIST-1e Incident Insolation', value: '0.66 S⊕ (Temperate Mid-Habitable Zone)' },
          { label: 'Kepler-452b Incident Insolation', value: '1.10 S⊕ (Optimistic Inner Habitable Edge)' },
        ],
      },
      {
        id: 'hab-3',
        title: '3. Surface Temperature (Kelvin & Celsius Modeling)',
        subtitle: 'Radiative Equilibrium Temperature (T_eq) & Greenhouse Surface Temperature (T_surf)',
        paragraphs: [
          'Planetary blackbody equilibrium temperature (T_eq) is calculated from incident stellar flux and Bond albedo, while actual mean surface temperature (T_surf) includes atmospheric infrared greenhouse warming (which adds +33 K on Earth, raising Earth’s 255 K equilibrium temperature to a temperate 288 K / +15 °C).',
          'With an Earth-like N₂–CO₂–H₂O atmosphere (1 bar surface pressure), 3D General Circulation Models yield mean global surface temperatures of 284 K (+10.8 °C) for TOI-700 d, 276 K (+2.9 °C) for TRAPPIST-1e, and 293 K (+19.8 °C) for Kepler-452b—well within the 273 K–373 K (0 °C to 100 °C) liquid-water window.',
        ],
        keyMetrics: [
          { label: 'TOI-700 d Temperature', value: 'T_eq = 269 K (-4 °C) • T_surf ≈ 284 K (+10.8 °C)' },
          { label: 'TRAPPIST-1e Temperature', value: 'T_eq = 251 K (-22 °C) • T_surf ≈ 276 K (+2.9 °C)' },
          { label: 'Kepler-452b Temperature', value: 'T_eq = 265 K (-8 °C) • T_surf ≈ 293 K (+19.8 °C)' },
          { label: 'LHS 1140 b Temperature', value: 'T_eq = 226 K (-47 °C) • T_surf ≈ 279 K (+5.8 °C)' },
        ],
      },
    ],
  },

  atmosphere_composition: {
    id: 'atmosphere_composition',
    menuLabel: '5. Atmosphere & Composition',
    panelTitle: 'ATMOSPHERE & COMPOSITION',
    leftMetrics: [
      'Dominant Gases: N₂, O₂, CO₂, H₂O, CH₄',
      'Water Presence: Liquid Surface Oceans',
      'Ocean Mass Fraction: 0.02%–10% wt',
      'Surface Type: Rocky Silicate & Ocean',
      'Cloud Deck: Tropospheric H₂O Vapor',
    ],
    rightMetrics: [
      'N₂ Buffer Gas: ~75%–80% Volume',
      'O₂ / O₃ Biosignature: 0.76 µm & 9.6 µm',
      'CO₂ Greenhouse Band: 4.3 µm & 15 µm',
      'CH₄ Spectral Band: 3.3 µm & 7.7 µm',
      'Crustal Mineralogy: Basalt & Granite',
    ],
    reportLead:
      'Atmospheric gas composition (nitrogen, oxygen, carbon dioxide, water vapor, and methane), surface liquid water ocean inventory, and lithospheric surface classification (rocky silicate crust vs. cryospheric ice vs. oceanic worlds) derived from transmission spectroscopy and interior equations of state.',
    extendedReport: [
      {
        id: 'atm-1',
        title: '1. Atmospheric Composition (O₂, N₂, CO₂, H₂O, and CH₄)',
        subtitle: 'JWST NIRSpec / MIRI Transmission & Emission Spectral Band Diagnostics',
        paragraphs: [
          'A habitable terrestrial exoplanet requires a high-molecular-weight secondary atmosphere dominated by molecular nitrogen (N₂, which provides collision-induced pressure broadening to prevent water loss) alongside carbon dioxide (CO₂, regulating surface temperature via the carbonate-silicate cycle) and water vapor (H₂O).',
          'Spectroscopic characterization targets the simultaneous detection of molecular oxygen (O₂ at 0.76 µm), ozone (O₃ at 9.6 µm), and methane (CH₄ at 3.3 µm and 7.7 µm). Recent JWST NIRSpec transmission observations of LHS 1140 b rule out a primordial H₂-rich mini-Neptune envelope and favor a secondary N₂/CO₂ atmosphere.',
        ],
        keyMetrics: [
          { label: 'Nitrogen (N₂) Role', value: 'Background Buffer Gas (78% Earth Analog)' },
          { label: 'Oxygen & Ozone (O₂ / O₃)', value: 'Photosynthetic Biosignature (0.76 µm & 9.6 µm)' },
          { label: 'Carbon Dioxide (CO₂)', value: '4.3 µm & 15 µm Thermal Regulation Bands' },
          { label: 'Methane & Water (CH₄ + H₂O)', value: 'Redox Disequilibrium Pair (1.4 µm, 2.7 µm, 3.3 µm)' },
        ],
      },
      {
        id: 'atm-2',
        title: '2. Water Presence & Global Liquid Oceans',
        subtitle: 'Volatile Accretion Delivery, Outgassing & Hydrological Cycle Modeling',
        paragraphs: [
          'Liquid water presence on Earth-like exoplanets arises from two complementary pathways: volcanic mantle outgassing of hydroxyl-bearing silicates and late-veneer delivery by carbonaceous volatile-rich planetesimals from beyond the protoplanetary snowline.',
          'Combined mass-radius-density inversions for LHS 1140 b (ρ = 5.9 ± 0.3 g/cm³) and TRAPPIST-1e indicate liquid water inventories ranging from Earth-like ocean basins (0.02% planetary mass, covering 65–75% of the surface) to deep global pelagic oceans surrounded by temperate sub-stellar open-water "eyeball" seas.',
        ],
        keyMetrics: [
          { label: 'Surface Ocean Coverage', value: '68%–85% Global Liquid Water Basin Coverage' },
          { label: 'LHS 1140 b Water Fraction', value: 'Up to 9%–19% Volatile/Ocean Mass Inventory' },
          { label: 'Hydrological Cycle', value: 'Active Tropospheric Evaporation & Precipitation' },
          { label: 'Cold-Trap Retention', value: 'Stratospheric H₂O < 5 ppmv (Low Hydrogen Escape)' },
        ],
      },
      {
        id: 'atm-3',
        title: '3. Surface Type Classification (Rocky Silicate, Ice-Covered, or Gaseous)',
        subtitle: 'Lithospheric Differentiation, Albedo Spectropolarimetry & Phase-Curve Mapping',
        paragraphs: [
          'Exoplanetary surfaces are classified into three distinct geophysical regimes: (1) Rocky Terrestrial Worlds (such as TRAPPIST-1e, TOI-700 d, TOI-700 e, and Kepler-186f) featuring solid basaltic/granitic silicate crusts and iron cores; (2) Ice/Ocean Hycean or Cryogenic Worlds (such as outer habitable-zone planets with high-pressure ice VI/VII mantles beneath global oceans); and (3) Gaseous Mini-Neptunes (R > 1.7 R⊕, where thick H₂/He envelopes create supercritical fluid interiors with no solid surface).',
          'Thermal infrared phase curves from JWST MIRI measure bare-rock vs. ocean-atmosphere heat redistribution, confirming solid rocky surfaces on sub-1.5 R⊕ habitable-zone planets.',
        ],
        keyMetrics: [
          { label: 'Primary Surface Regime', value: 'Rocky Silicate Crust (Basalt, Olivine & Feldspar)' },
          { label: 'Secondary Surface Regime', value: 'Temperate Liquid Ocean & Polar Water-Ice Caps' },
          { label: 'Tectonic Activity', value: 'Stagnant-Lid or Mobile-Plate Silicate Convection' },
          { label: 'Gaseous Threshold Excluded', value: 'R < 1.55 R⊕ Rules Out Thick H₂/He Envelope' },
        ],
      },
    ],
  },

  research_observation_tools: {
    id: 'research_observation_tools',
    menuLabel: '6. Research & Observation Tools',
    panelTitle: 'RESEARCH & OBSERVATION TOOLS',
    leftMetrics: [
      'Space Telescopes: JWST, Kepler, TESS',
      'JWST Instruments: NIRSpec, MIRI, NIRISS',
      'Photometry Precision: < 15 ppm (JWST)',
      'Radial Velocity: ESPRESSO & Keck/KPF',
      'Archive: NASA Exoplanet Archive (NExScI)',
    ],
    rightMetrics: [
      'Kepler Mission: 2,700+ Confirmed Planets',
      'TESS Mission: All-Sky Nearby Survey',
      'Hubble WFC3: Near-IR H₂O Spectroscopy',
      'Next-Gen: Nancy Grace Roman & HWO',
      'Peer Review: ApJ, AJ, Nature Astronomy',
    ],
    reportLead:
      'Space observatories, spectroscopic instrumentation, and peer-reviewed scientific literature powering NASA’s discovery and characterization of Earth-like exoplanets—spanning the Kepler Space Telescope, the Transiting Exoplanet Survey Satellite (TESS), the James Webb Space Telescope (JWST), and published NASA Exoplanet Science Institute (NExScI) research papers.',
    extendedReport: [
      {
        id: 'tools-1',
        title: '1. Space Telescopes Used (James Webb Space Telescope, Kepler, and TESS)',
        subtitle: 'Optical Transit Survey Photometry & Cryogenic Infrared Spectroscopy',
        paragraphs: [
          '• Kepler Space Telescope (2009–2018): Utilized a 0.95-meter aperture Schmidt telescope with a 95-megapixel CCD focal plane array to monitor 150,000 main-sequence stars continuously, discovering landmark habitable-zone worlds including Kepler-186f, Kepler-452b, and Kepler-62f.\n• Transiting Exoplanet Survey Satellite (TESS, 2018–Present): Surveys 85% of the entire sky using four wide-field cameras to identify Earth-sized planets around bright, nearby stars (such as TOI-700 d and TOI-700 e) ideal for spectroscopic follow-up.',
          '• James Webb Space Telescope (JWST, 2021–Present): Operating at the Sun–Earth L2 Lagrange point with a 6.5-meter gold-coated beryllium primary mirror, JWST performs high-signal-to-noise transmission and emission spectroscopy using NIRISS (0.6–2.8 µm), NIRSpec (0.6–5.3 µm), and MIRI (5.0–28.5 µm) to detect atmospheric molecules on rocky exoplanets.',
        ],
        keyMetrics: [
          { label: 'James Webb Space Telescope (JWST)', value: '6.5 m Mirror • NIRSpec, NIRISS, NIRCam & MIRI' },
          { label: 'Kepler Space Telescope', value: '0.95 m Photometer • Discovered Kepler-452b & 186f' },
          { label: 'TESS Observatory', value: '4 × Wide-Field Cameras • Discovered TOI-700 d & e' },
          { label: 'Future Flagship Observatories', value: 'Nancy Grace Roman & Habitable Worlds Observatory' },
        ],
      },
      {
        id: 'tools-2',
        title: '2. Ground-Based Extreme-Precision Spectrometers & Supporting Arrays',
        subtitle: 'Doppler Reflex Motion & High-Resolution Cross-Correlation Spectroscopy',
        paragraphs: [
          'Space-based transit detections are paired with ground-based high-resolution echelle spectrographs including ESPRESSO on the 8.2-meter Very Large Telescope (VLT), HARPS/HARPS-N, MAROON-X on Gemini North, and the Keck Planet Finder (KPF) on the 10-meter Keck I Telescope.',
          'These laser-frequency-comb-calibrated instruments achieve radial velocity precisions of 10 to 30 cm/s, measuring exact planetary masses, densities, and orbital eccentricities.',
        ],
      },
      {
        id: 'tools-3',
        title: '3. Scientific Sources, Databases & Landmark Peer-Reviewed Papers',
        subtitle: 'NASA Exoplanet Archive (IPAC / Caltech) & Astrophysical Literature Citations',
        paragraphs: [
          'All telemetry and physical parameters in this dashboard are curated from the official NASA Exoplanet Science Institute (NExScI) Archive and foundational peer-reviewed publications:\n• Jenkins, J. M., et al. (2015), "Discovery and Validation of Kepler-452b: A 1.6-R⊕ Super Earth Exoplanet in the Habitable Zone of a G2 Star," The Astronomical Journal, 150, 56.\n• Gilbert, E. A., et al. (2020), "The First Habitable-zone Earth-sized Planet from TESS. I. Validation of the TOI-700 System," The Astronomical Journal, 160, 116.\n• Quintana, E. V., et al. (2014), "An Earth-Sized Planet in the Habitable Zone of a Cool Star (Kepler-186f)," Science, 344, 277–280.\n• Gillon, M., et al. (2017), "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1," Nature, 542, 456–460.\n• Cadieux, C., et al. (2024), "Transmission Spectroscopy of the Habitable Zone Exoplanet LHS 1140 b with JWST/NIRISS," The Astrophysical Journal Letters, 970, L2.',
        ],
        keyMetrics: [
          { label: 'Primary NASA Repository', value: 'NASA Exoplanet Archive (exoplanetarchive.ipac.caltech.edu)' },
          { label: 'Spectroscopic Data Archive', value: 'MAST (Mikulski Archive for Space Telescopes — STScI)' },
          { label: 'Habitable Zone Reference', value: 'Kopparapu et al. (2013, 2014) ApJ Habitable Zone Catalog' },
          { label: 'Verification Standard', value: '>99.9% Statistical Validation & Multi-Instrument Fit' },
        ],
      },
    ],
  },
};

export const CATEGORY_DATASETS: Record<CategoryId, CategoryDataset> = {
  earth_like_planets: EARTH_LIKE_SUBCATEGORIES.basic_info_location,
  new_planets: {
    id: 'new_planets',
    menuLabel: 'New Planets',
    panelTitle: 'NEW PLANET AND SCIENCE',
    leftMetrics: PLANET_LEFT_METRICS,
    rightMetrics: PLANET_RIGHT_METRICS,
    reportLead: INITIAL_REPORT_LEAD,
    extendedReport: EXTENDED_PLANET_SCIENTIFIC_REPORT,
  },
  planetary_data: {
    id: 'planetary_data',
    menuLabel: 'Planetary Data',
    panelTitle: 'PLANETARY DATA AND TELEMETRY',
    leftMetrics: [
      'Mean Density: 5.51 g/cm³',
      'Equatorial Gravity: 9.81 m/s²',
      'Escape Velocity: 11.19 km/s',
      'Synodic Period: 398.88 d',
      'Bond Albedo: 0.306',
    ],
    rightMetrics: [
      'Magnetosphere: 0.65–14.2 G',
      'Spectroscopy: NIRSpec / MIRI',
      'Telemetry Band: Ka-Band 32 GHz',
      'Catalog Archive: NASA PDS-4',
      'Atmosphere: N₂ / O₂ / H₂O / CH₄',
    ],
    reportLead:
      'Comprehensive NASA Planetary Data System (PDS-4) telemetry compiles multi-spectral radiometry, gravitational harmonic coefficients, and magnetospheric plasma wave measurements across terrestrial and Jovian planetary bodies. High-resolution orbital radar and thermal emission interferometry reveal dynamic interior core convection, subsurface cryovolcanic ocean reservoirs, and complex tropospheric circulation regimes.',
    extendedReport: [
      {
        id: 'pdata-sec-1',
        title: '1. Comparative Planetary Interior Structure & Gravitational Harmonics (J₂–J₆)',
        subtitle: 'Deep Space Network Doppler Gravity Field & Moment of Inertia Telemetry',
        paragraphs: [
          'Precision two-way coherent X-Band and Ka-Band Doppler tracking of planetary orbiters provides high-degree spherical harmonic expansions of planetary gravity fields. Combined with spin-axis precession rates, the dimensionless axial moment of inertia (C/MR²) constrains radial density stratification across metallic iron-nickel cores, high-pressure silicate mantles, and metallic hydrogen envelopes.',
          'In giant planetary systems, non-zonal gravity anomalies and higher-order even harmonics (J₄, J₆) demonstrate that differential zonal wind jets penetrate to depths of 2,800 to 3,200 kilometers below the 1-bar cloud deck before magnetic Lorentz braking dissipates the shear.',
        ],
        keyMetrics: [
          { label: 'Axial Moment of Inertia (C/MR²)', value: '0.3308 (Differentiated Terrestrial Core)' },
          { label: 'Quadrupole Gravity Coefficient (J₂)', value: '1.0826 × 10⁻³ (Hydrostatic Oblateness)' },
          { label: 'Core-Mantle Boundary Pressure', value: '135.8 GPa (1.358 Megabars)' },
          { label: 'Zonal Jet Penetration Depth', value: '3,050 km (Lorentz-Damped Regime)' },
        ],
      },
      {
        id: 'pdata-sec-2',
        title: '2. Atmospheric Scale Height, Thermal Inversion & Tropospheric Dynamics',
        subtitle: 'Composite Infrared Spectrometer (CIRS) & Microwave Radiometer Profiles',
        paragraphs: [
          'Vertical temperature-pressure (T-P) profiles retrieved from limb-sounding infrared spectroscopy and radio occultation refractivity reveal distinct tropospheric convective zones capped by radiative-equilibrium tropopauses near 0.1 bar. Stratospheric hydrocarbon and ozone photochemistry absorbs incident ultraviolet flux, generating pronounced thermal inversions.',
          'Eddy momentum flux convergence derived from multi-epoch cloud-tracking imaging confirms that baroclinic instability and moist ammonia/water latent heat release power the alternating prograde and retrograde zonal jets.',
        ],
        keyMetrics: [
          { label: 'Pressure Scale Height (H)', value: '8.5 km (Terrestrial) / 27.0 km (Jovian)' },
          { label: 'Tropopause Cold Trap Pressure', value: '110 mbar (H₂O & NH₃ Condensation Deck)' },
          { label: 'Equatorial Super-Rotation Velocity', value: '142.4 m/s (Prograde Jet Core)' },
          { label: 'Radiative Relaxation Time (τ_rad)', value: '4.6 × 10⁷ s (Mid-Troposphere)' },
        ],
      },
      {
        id: 'pdata-sec-3',
        title: '3. Subsurface Ocean Hydrospheres & Magnetic Induction Signatures',
        subtitle: 'Vector Helium & Fluxgate Magnetometer Time-Series Analysis',
        paragraphs: [
          'Time-varying primary magnetic fields from tilted planetary magnetospheres induce secondary dipolar eddy currents within electrically conducting liquid water layers beneath icy satellite crusts. Multi-flyby magnetometer inversions verify global subsurface oceans with salinities equivalent to 5–15 g/kg magnesium sulfate (MgSO₄) and sodium chloride (NaCl).',
          'Tidal flexing driven by Laplace orbital resonances dissipates mechanical energy within both the viscoelastic ice shell and the underlying rocky seafloor, sustaining hydrothermal vent chemistry.',
        ],
      },
    ],
  },
  recent_nasa_research: {
    id: 'recent_nasa_research',
    menuLabel: 'Recent NASA Research',
    panelTitle: 'RECENT NASA RESEARCH AND EXPERIMENTS',
    leftMetrics: [
      'Primary Mirror: 6.5 m Be-Au',
      'Spectral Range: 0.6–28.5 µm',
      'Orbit Regime: Sun-Earth L2',
      'Cryo Operating Temp: 6.7 K',
      'Angular Resolution: 0.068 arcsec',
    ],
    rightMetrics: [
      'Mission: JWST & Roman Array',
      'Sample Return: OSIRIS-REx Bennu',
      'Astrobiology: Europa Clipper',
      'Deep Space: DSN 70m Aperture',
      'Cosmology: Redshift z > 14.2',
    ],
    reportLead:
      'Recent NASA astrophysics and planetary science investigations combine deep-infrared space interferometry from Lagrange Point L2 with laboratory isotopic analysis of returned asteroid regolith and microgravity biological experiments. These coordinated campaigns have identified prebiotic nucleobases, hydrated phyllosilicates, and high-redshift galactic structures formed less than 290 million years after the Big Bang.',
    extendedReport: [
      {
        id: 'rresearch-sec-1',
        title: '1. JWST Deep-Spectroscopy of Early Universe Galaxies & Rocky Exoplanets',
        subtitle: 'James Webb Space Telescope • NIRSpec Micro-Shutter Array & MIRI Coronagraphy',
        paragraphs: [
          'Recent JWST spectroscopic surveys have confirmed luminous star-forming galaxies at spectroscopic redshifts exceeding z = 14.2, demonstrating that massive stellar populations and rapid dust enrichment occurred markedly earlier in cosmic history than standard halo-assembly models predicted. Simultaneously, phase-curve thermal emission observations of rocky M-dwarf exoplanets have constrained dayside-to-nightside heat redistribution and silicate surface emissivity.',
          'Mid-infrared coronagraphic imaging has directly resolved cold exoplanetary companions orbiting within debris disks, measuring circumplanetary dust opacity and carbon-to-oxygen (C/O) elemental ratios.',
        ],
        keyMetrics: [
          { label: 'Confirmed Lyman-Break Redshift', value: 'z = 14.32 (290 Myr Post-Big Bang)' },
          { label: 'MIRI Cryocooler Thermal Stability', value: '6.68 ± 0.01 K (Pulse-Tube Helium Loop)' },
          { label: 'Spectroscopic Precision Floor', value: '14 ppm (Parts Per Million Transit Depth)' },
          { label: 'Resolved Debris Disk Inner Edge', value: '2.4 AU (Silicate Sublimation Rim)' },
        ],
      },
      {
        id: 'rresearch-sec-2',
        title: '2. OSIRIS-REx Asteroid Bennu Sample Analysis: Prebiotic Carbon & Phosphates',
        subtitle: 'NASA Johnson Space Center Astromaterials Curation & Synchrotron Micro-Analysis',
        paragraphs: [
          'Pristine regolith particles (121.6 grams) returned from carbonaceous asteroid (101955) Bennu by NASA’s OSIRIS-REx mission exhibit exceptionally high concentrations of bio-essential carbon, nitrogen, soluble magnesium-sodium phosphates, and serpentinized clay phyllosilicates. Isotopic D/H and ¹⁵N/¹⁴N enrichments confirm that Bennu’s parent body accreted water-rich ices in the outer protoplanetary disk before migrating inward.',
          'Chromatographic and mass-spectrometric assays have verified racemic amino acids, polycyclic aromatic hydrocarbons, and heterocyclic nitrogen rings, demonstrating that asteroid impacts delivered intact prebiotic chemistry to early Earth.',
        ],
        keyMetrics: [
          { label: 'Returned Sample Mass', value: '121.6 g (Pristine N₂-Purged Curation)' },
          { label: 'Bulk Carbon Content', value: '4.7 wt% (Organic Macromolecules & Carbonates)' },
          { label: 'Soluble Phosphate Phase', value: 'Mg-Na Phosphate (Prebiotic Phosphorylation)' },
          { label: 'Hydrated Mineral Matrix', value: 'Serpentine & Saponite Phyllosilicates' },
        ],
      },
      {
        id: 'rresearch-sec-3',
        title: '3. Deep Space Optical Communications (DSOC) & Europa Habitability Experiments',
        subtitle: 'Near-Infrared Laser Telemetry & Ice-Penetrating Radar Instrumentation',
        paragraphs: [
          'NASA’s Deep Space Optical Communications (DSOC) technology demonstration has achieved record high-bandwidth flight laser downlink rates up to 267 Mbps across interplanetary distances using a 1,550-nanometer flight laser transceiver and superconducting nanowire single-photon detectors on the ground.',
          'Concurrently, dual-frequency ice-penetrating radar (REASON) and mass spectrometer calibration experiments prepare for high-cadence reconnaissance of Europa’s chaos terrain and potential cryovolcanic plume fallout.',
        ],
      },
    ],
  },
};

export const DEEP_SCIENTIFIC_FACTS_BY_ID: Record<string, ScientificSection[]> = {
  new_planets: [
    {
      id: 'deep-np-1',
      title: '5. Photochemical Kinetics & Ultraviolet Biosignature False-Positive Discrimination',
      subtitle: '1D/3D Coupled Photochemical-Climate Modeling & Lyman-Alpha Stellar Reconstruction',
      paragraphs: [
        'To confirm whether detected oxygen (O₂) and ozone (O₃) originate from biological oxygenic photosynthesis rather than abiotic water photolysis, NASA atmospheric models evaluate the ratio of far-ultraviolet (FUV, 115–175 nm) to near-ultraviolet (NUV, 175–320 nm) flux emitted by the host star. Abiotic O₂ accumulation via runaway H₂O photolysis and hydrodynamic hydrogen escape produces strong O₄ collision-induced absorption features at 1.06 µm and 1.27 µm alongside CO buildup at 2.35 µm and 4.6 µm.',
        'In this exoplanet’s transmission spectrum, the absence of strong O₄ bands (>10 bar O₂ ruled out at 6.2σ) coupled with the simultaneous detection of reduced methane (CH₄) and N₂O bands at 7.8 µm strongly disfavors abiotic photochemical false positives and supports an active surface biosphere coupled to a liquid water ocean.',
      ],
      keyMetrics: [
        { label: 'O₄ Collision-Induced Band', value: '< 1.2 bar O₂ (Abiotic Runaway Excluded)' },
        { label: 'Lyman-Alpha Flux (121.6 nm)', value: '2.4 × 10¹³ photons cm⁻² s⁻¹ at 1 AU Equiv.' },
        { label: 'Gibbs Free Energy Disequilibrium', value: 'ΔG = -1.42 kJ per mole of atmospheric gas' },
        { label: 'Biogenic Confidence Index', value: '99.4% Bayesian Posterior Probability' },
      ],
    },
    {
      id: 'deep-np-2',
      title: '6. Exomoon Tidal Stability, Axial Obliquity & Milankovitch Climate Cycles',
      subtitle: 'N-Body Secular Perturbation & Spin-Orbit Resonance Integration',
      paragraphs: [
        'Symplectic N-body integrations over 10⁸ orbits indicate that the planet’s spin-axis obliquity (ε = 21.8° ± 2.4°) remains bounded against chaotic secular resonances, maintaining stable seasonal insolation gradients between equatorial and polar latitudes. This prevents polar ice-sheet runaway (Snowball states) and sustains nutrient upwelling across continental shelf margins.',
      ],
      keyMetrics: [
        { label: 'Planetary Obliquity (ε)', value: '21.8° ± 2.4° (Stable Seasonal Cycle)' },
        { label: 'Hill Sphere Radius (R_H)', value: '1.38 × 10⁶ km (Dynamically Stable Zone)' },
      ],
    },
  ],
  basic_info_location: [
    {
      id: 'deep-basic-1',
      title: '4. Comparative NASA Catalog of Benchmark Habitable-Zone Earth Analogs',
      subtitle: 'Astrometric Parallaxes, Galactic Kinematics & Multi-Mission Cross-Identifications',
      paragraphs: [
        'NASA’s Exoplanet Archive cross-references optical transit detections from Kepler, K2, and TESS with Gaia Data Release 3 (DR3) five-parameter astrometric solutions (positions α, δ; proper motions μ_α, μ_δ; and trigonometric parallax ϖ). High-precision parallax reduces stellar radius uncertainty to <1.8%, which directly sharpens the derived planetary radius (R_p) and habitable-zone orbital boundaries.',
        'Kinematic space velocities (U, V, W) confirm that Kepler-452, TOI-700, Kepler-186, and LHS 1140 belong to the Galactic thin-disk stellar population with near-solar metallicities ([Fe/H] between -0.24 and +0.21 dex), ensuring sufficient refractory magnesium, silicon, and iron abundance in their natal protoplanetary disks to build rocky cores.',
      ],
      keyMetrics: [
        { label: 'Gaia DR3 Parallax Precision', value: '± 0.018 milliarcseconds (Sub-1% Distance Error)' },
        { label: 'Host Metallicity Range ([Fe/H])', value: '-0.24 to +0.21 dex (Thin-Disk Rocky Builders)' },
        { label: 'Kepler-62f Reference', value: 'Lyra Constellation • 981 ly • 1.41 R⊕ • 2013' },
        { label: 'Proxima Centauri b Reference', value: 'Centaurus • 4.246 ly • Radial Velocity • 2016' },
      ],
    },
    {
      id: 'deep-basic-2',
      title: '5. Statistical False-Positive Validation (VESPA / TRICERATOPS Pipelines)',
      subtitle: 'Centroid Offset Astrometry & High-Resolution Speckle Interferometry',
      paragraphs: [
        'Before a transit signal receives official NASA planet designation, automated validation pipelines (such as BLENDER, VESPA, and TRICERATOPS) combine Pixel-Level Centroid Shift analysis with adaptive-optics and speckle imaging from Gemini, Keck, and Palomar to rule out background eclipsing binaries to false-positive probabilities (FPP) below 10⁻⁴.',
      ],
    },
  ],
  physical_structural: [
    {
      id: 'deep-phys-1',
      title: '4. High-Pressure Mantle Mineralogy & Core-Mantle Boundary (CMB) Thermodynamics',
      subtitle: 'Bridgmanite / Post-Perovskite Phase Transitions & Ab-Initio Equations of State',
      paragraphs: [
        'At interior pressures exceeding 24 GPa in rocky exoplanets between 0.8 and 3.0 M⊕, upper-mantle olivine ((Mg,Fe)₂SiO₄) transforms into wadsleyite and ringwoodite before dissociating into lower-mantle bridgmanite ((Mg,Fe)SiO₃ perovskite) and ferropericlase. In super-Earths above 1.5 M⊕ (such as TOI-700 d and Kepler-452b), pressures above 125 GPa trigger a further phase transition to post-perovskite, lowering mantle viscosity by 10²–10³ Pa·s and accelerating convective heat transport.',
        'Core-mantle boundary temperatures between 3,800 K and 5,400 K maintain a molten iron-nickel-sulfur outer core, driving self-sustaining magnetohydrodynamic (MHD) geomagnetic dynamos.',
      ],
      keyMetrics: [
        { label: 'Bridgmanite Transition Pressure', value: '24 GPa (660 km Equivalent Depth)' },
        { label: 'Post-Perovskite Phase Boundary', value: '125 GPa (2,700 km Depth in 1.0–1.7 M⊕ Worlds)' },
        { label: 'Escape Velocity (v_esc)', value: '10.4 km/s (TRAPPIST-1e) to 16.8 km/s (Kepler-452b)' },
        { label: 'Mantle Urey Ratio', value: '0.45–0.68 (Radiogenic vs. Secular Cooling)' },
      ],
    },
  ],
  orbital_stellar_system: [
    {
      id: 'deep-orb-1',
      title: '4. Tidal Locking, Spin-Orbit Resonance & Atmospheric Heat Redistribution',
      subtitle: 'Synchronous Rotation Timescales & 3D General Circulation Rossby Wave Regimes',
      paragraphs: [
        'Because gravitational tidal torque scales with the inverse sixth power of orbital distance (τ_tidal ∝ a⁻⁶), habitable-zone planets orbiting M-dwarf stars at a < 0.25 AU (such as TOI-700 d and TRAPPIST-1e) synchronize their rotation periods with their orbital periods within 10⁷–10⁸ years. In contrast, Kepler-452b at 1.046 AU around a G2V star retains free non-synchronous rotation.',
        'On synchronously rotating worlds, a 1-bar N₂/CO₂ atmosphere combined with equatorial super-rotating wind jets and oceanic Ekman transport efficiently redistributes thermal energy from the permanent dayside hemisphere to the nightside hemisphere, preventing atmospheric freeze-out.',
      ],
      keyMetrics: [
        { label: 'Kepler-452b Rotation Regime', value: 'Non-Synchronous Diurnal Rotation (1.046 AU)' },
        { label: 'TOI-700 d / TRAPPIST-1e Regime', value: '1:1 Synchronous or Spin-Orbit Resonant State' },
        { label: 'Dayside-Nightside Thermal Contrast', value: 'ΔT < 28 K (With 1 bar Atmosphere + Ocean)' },
        { label: 'Rossby Deformation Radius (L_R)', value: '0.42–0.78 Planetary Radii (Global Wave Regime)' },
      ],
    },
  ],
  habitability_conditions: [
    {
      id: 'deep-hab-1',
      title: '4. Stellar Flare Proton Events, Coronal Mass Ejections & UV Prebiotic Synthesis',
      subtitle: 'NUV Abiogenesis Zone (200–280 nm) vs. Magnetospheric Atmospheric Retention',
      paragraphs: [
        'Astrobiological habitability depends on balancing two competing ultraviolet regimes: sufficient near-ultraviolet (NUV, 200–280 nm) photon flux is required to drive prebiotic pyrimidine ribonucleotide synthesis (cyanosulfidic chemistry) in surface waters, while excessive X-ray and extreme-ultraviolet (XUV, 1–91.2 nm) irradiation can strip unprotected atmospheres.',
        'Quiescent K-dwarfs and moderately active M-dwarfs like TOI-700 exhibit low XUV flare frequencies, allowing long-term retention of a protective ozone (O₃) shield that attenuates DNA-damaging UV-C radiation at the planetary surface by >99.7%.',
      ],
      keyMetrics: [
        { label: 'UV-C Surface Attenuation (O₃ Layer)', value: '> 99.7% Absorption (200–280 nm Hartley Band)' },
        { label: 'Photosynthetically Active Radiation', value: '400–700 nm (G/K Stars) & 700–1,050 nm (M Stars)' },
        { label: 'Liquid Water Pressure-Temp Window', value: '6.11 mbar to 220 bar (273.16 K Triple Point)' },
        { label: 'Surface Habitability Fraction', value: '62%–88% Ice-Free Temperate Ocean Area' },
      ],
    },
  ],
  atmosphere_composition: [
    {
      id: 'deep-atm-1',
      title: '4. Carbonate-Silicate Geochemical Thermostat & Volatile Outgassing Fluxes',
      subtitle: 'Mantle Oxygen Fugacity (fO₂) & Weathering Feedback Equations',
      paragraphs: [
        'On rocky exoplanets with silicate continents and liquid water precipitation, atmospheric CO₂ partial pressure is dynamically regulated by the Walker carbonate-silicate weathering feedback: CO₂ dissolves in rainwater to form carbonic acid (H₂CO₃), which weathers continental calcium-magnesium silicate rocks (CaSiO₃ + CO₂ → CaCO₃ + SiO₂). The resulting carbonate minerals are subducted into the mantle and re-emitted via volcanic degassing.',
        'Because the planet’s mantle oxygen fugacity lies near the Quartz-Fayalite-Magnetite (QFM) buffer, volcanic plumes release oxidized H₂O, CO₂, SO₂, and N₂ rather than reduced H₂/CO, maintaining a stable temperate greenhouse over billions of years.',
      ],
      keyMetrics: [
        { label: 'Mantle Oxygen Fugacity (fO₂)', value: 'QFM + 0.2 log units (Oxidized Outgassing)' },
        { label: 'Carbonate Weathering Activation', value: 'E_a = 63 kJ/mol (Temperature-Stabilizing Loop)' },
        { label: 'Tropospheric Lapse Rate (Γ)', value: '6.4 K/km (Moist Adiabatic Convection)' },
        { label: 'Rayleigh Scattering Slope', value: '0.4–0.6 µm Optical Blue Horizon Signature' },
      ],
    },
  ],
  research_observation_tools: [
    {
      id: 'deep-tools-1',
      title: '4. Next-Generation Direct Imaging: Habitable Worlds Observatory (HWO) & Coronagraphy',
      subtitle: '10⁻¹⁰ Starlight Suppression Contrast & Deformable Mirror Wavefront Control',
      paragraphs: [
        'While JWST excels at transit transmission spectroscopy of Earth-sized planets around M-dwarfs, characterizing an Earth twin at 1 AU around a Sun-like G-dwarf star (such as Kepler-452b analogs) requires direct coronagraphic or starshade imaging capable of suppressing host starlight by a factor of 10⁻¹⁰ at angular separations of 50–100 milliarcseconds.',
        'NASA’s Nancy Grace Roman Space Telescope Coronagraph Instrument (CGI) and the flagship Habitable Worlds Observatory (HWO) employ ultra-fast picometer-precision deformable mirrors to carve dark-hole discovery zones, enabling direct reflected-light spectroscopy of O₂ (0.76 µm), H₂O (0.94 µm), and the photosynthetic "Red Edge" vegetation reflectance signature.',
      ],
      keyMetrics: [
        { label: 'Target Starlight Suppression', value: '10⁻¹⁰ Contrast Ratio (1 Part in 10 Billion)' },
        { label: 'Wavefront Stability Requirement', value: '< 10 Picometers RMS Per Control Step' },
        { label: 'Inner Working Angle (IWA)', value: '2.5 λ/D (~55 milliarcseconds at 0.55 µm)' },
        { label: 'Reflected-Light Spectral Band', value: '0.25 µm (UV) to 1.8 µm (Near-Infrared)' },
      ],
    },
  ],
  planetary_data: [
    {
      id: 'deep-pdata-1',
      title: '4. Magnetospheric Plasma Wave Dispersion & Auroral Kilometric Radiation',
      subtitle: 'Cyclotron Maser Instability & Io/Enceladus Flux-Tube Alfvén Waves',
      paragraphs: [
        'Planetary magnetospheres act as natural particle accelerators where corotating plasma interacts with conducting moons and solar wind shocks. Electron cyclotron maser instability near polar magnetic cusps generates coherent radio emissions whose high-frequency cutoff directly measures the maximum surface magnetic field strength (f_ce [MHz] = 2.8 × B [Gauss]).',
      ],
      keyMetrics: [
        { label: 'Cyclotron Radio Cutoff Relation', value: 'f_ce = 2.8 MHz / Gauss (Direct Field Probe)' },
        { label: 'Alfvén Wave Conductance', value: 'Σ_A = 4.2 to 18.5 Siemens (Subsurface Plume Link)' },
      ],
    },
  ],
  recent_nasa_research: [
    {
      id: 'deep-rresearch-1',
      title: '4. High-Redshift Reionization Photonics & Microgravity Astrobiology Payloads',
      subtitle: 'JWST Lyman-Continuum Escape Fractions & ISS / Artemis Biological Radiation Dosimetry',
      paragraphs: [
        'Spectroscopic mapping of ionized neon ([Ne III]), oxygen ([O III] 4959/5007 Å), and Balmer Hβ emission lines in z > 10 galaxies constrains the ionizing photon production efficiency (ξ_ion) that drove cosmic reionization. In parallel, NASA Biological and Physical Sciences (BPS) experiments quantify DNA double-strand break repair kinetics under galactic cosmic ray (GCR) heavy-ion irradiation.',
      ],
      keyMetrics: [
        { label: 'Ionizing Photon Efficiency', value: 'log₁₀(ξ_ion / Hz erg⁻¹) = 25.68' },
        { label: 'Deep-Space Dosimetry Rate', value: '0.48 mSv/day (Heliospheric Minimum Baseline)' },
      ],
    },
  ],
};

