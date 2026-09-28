import { CategoryDataset, ScientificSection } from './nasaScientificData';

export type ScienceCategoryId =
  | 'heliophysics_solar'
  | 'astrophysics_cosmology'
  | 'earth_climate_science'
  | 'biological_physical_space';

export type LiveTelescopeCategoryId =
  | 'jwst_live_telemetry'
  | 'hubble_orbital_stream'
  | 'chandra_xray_array'
  | 'tess_dsn_exoplanet_feed';

export interface WorkspaceModeData {
  newsCardTitle: string;
  newsSubheading: string;
  newsHeroImage: string;
  newsHeroAlt: string;
  newsBullets: string[];
  newsArticles: ScientificSection[];
  bottomLeftCardTitle: string;
  bottomLeftBullets: string[];
  bottomLeftStreams: { title: string; detail: string }[];
  categoriesOrder: string[];
  categoriesMap: Record<string, CategoryDataset & { heroImage: string; deepFacts: ScientificSection[] }>;
}

export const SCIENCE_DATA_WORKSPACE: WorkspaceModeData = {
  newsCardTitle: 'NEWS',
  newsSubheading: 'Science news!',
  newsHeroImage:
    'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000104/GSFC_20171208_Archive_e000104~medium.jpg',
  newsHeroAlt: 'NASA Solar Dynamics Observatory Extreme Ultraviolet Coronal Loops',
  newsBullets: [
    'Parker Solar Probe perihelion pass records Alfvén critical surface magnetic switchbacks at 9.86 solar radii.',
    'OSIRIS-REx Asteroid Bennu carbon-rich regolith analysis confirms hydrated phyllosilicates, phosphates, and prebiotic amino acids.',
    'SWOT & GRACE-FO Earth gravity and ocean altimetry satellites map sub-mesoscale eddy heat transport across global basins.',
    'Cold Atom Lab aboard the International Space Station achieves dual-species Bose-Einstein condensate quantum interferometry in microgravity.',
  ],
  newsArticles: [
    {
      id: 'sci-news-bennu-sample',
      title: 'OSIRIS-REx Sample Return Analysis: Prebiotic Volatiles & Phosphate Crusts on (101955) Bennu',
      subtitle: 'NASA Astromaterials Research & Exploration Science (ARES) • Johnson Space Center',
      paragraphs: [
        'High-precision inductively coupled plasma mass spectrometry (ICP-MS) and synchrotron X-ray diffraction of pristine regolith grains returned from near-Earth B-type asteroid (101955) Bennu reveal abundant magnesium-sodium phosphate minerals alongside serpentinized clay matrices. These mineralogical assemblages prove that Bennu’s parent planetesimal hosted alkaline, carbonate-rich hydrothermal fluid circulation within the first 10 million years of Solar System history.',
        'Solvent extracts analyzed at NASA Goddard’s Astrobiology Analytical Laboratory confirm a racemic suite of 14 proteinogenic and non-proteinogenic amino acids, nucleobase precursors, and insoluble macromolecular organic carbon (4.7 wt% total carbon), establishing carbonaceous asteroids as primary delivery vectors for Earth’s prebiotic inventory.',
      ],
      keyMetrics: [
        { label: 'Returned Sample Mass', value: '121.6 grams (TAGSAM Collector Head)' },
        { label: 'Bulk Carbon Content', value: '4.5–4.7 wt% (Organic + Carbonate)' },
        { label: 'Hydrogen Isotope Ratio (δD)', value: '+340‰ (Outer Protoplanetary Disk Origin)' },
        { label: 'Key Detected Minerals', value: 'Serpentine, Magnetite, Mg-Na Phosphates' },
      ],
    },
    {
      id: 'sci-news-parker-coronal',
      title: 'Parker Solar Probe Perihelion 21: Coronal Heating & Magnetic Reconnection Jets',
      subtitle: 'NASA Heliophysics Division • FIELDS & SWEAP Instrument Suites',
      paragraphs: [
        'In-situ plasma and electromagnetic field measurements collected by NASA’s Parker Solar Probe inside the sub-Alfvénic solar corona demonstrate that interchange magnetic reconnection at the base of coronal funnels launches high-velocity Alfvénic wave packets. These switchback structures carry sufficient Poynting flux (10⁵ W/m²) to heat the nascent solar wind past 1.5 × 10⁶ K and accelerate proton beams to 700 km/s.',
      ],
      keyMetrics: [
        { label: 'Heliocentric Distance', value: '0.046 AU (9.86 Solar Radii)' },
        { label: 'Orbital Velocity', value: '176.5 km/s (635,000 km/h)' },
        { label: 'Coronal Magnetic Field (|B|)', value: '1,420 nT (Sub-Alfvénic Regime)' },
      ],
    },
  ],
  bottomLeftCardTitle: 'SCIENCE & ASTROPHYSICS',
  bottomLeftBullets: [
    'Heliophysics & Solar Dynamics Observatory (SDO) EUV magnetogram streams.',
    'OSIRIS-REx & Lucy Trojan asteroid astromaterials spectrometry.',
    'Earth System Observatory (PACE, SWOT, ICESat-2, NISAR) climate telemetry.',
    'Fermi Gamma-Ray & NICER neutron star equation-of-state timing.',
    'ISS Microgravity Physical Sciences & Cold Atom Quantum Laboratory.',
    'Cosmic Microwave Background (CMB) polarization & baryon acoustic oscillations.',
    'Lunar Reconnaissance Orbiter (LRO) polar volatile neutron spectroscopy.',
  ],
  bottomLeftStreams: [
    {
      title: 'Solar Dynamics Observatory (SDO/AIA & HMI) — Real-Time Coronal Magnetogram',
      detail:
        'Full-disk 4096×4096 pixel EUV filtergrams across 10 wavelength channels (94 Å to 1700 Å) at 12-second cadence. Active Region AR3842 exhibits β-γ-δ magnetic complexity with 1.8 × 10³² erg free magnetic energy.',
    },
    {
      title: 'PACE (Plankton, Aerosol, Cloud, ocean Ecosystem) — Hyperspectral Ocean Radiometry',
      detail:
        'Ocean Color Instrument (OCI) scanning from 340 nm to 890 nm at 5 nm spectral resolution, quantifying global marine phytoplankton carbon fixation and tropospheric sulfate/black-carbon aerosol radiative forcing.',
    },
    {
      title: 'NICER X-Ray Timing Explorer — Millisecond Pulsar PSR J0030+0451',
      detail:
        'Soft X-ray (0.2–12 keV) pulse-profile modeling constrains neutron star equatorial radius to R = 12.71 ± 1.14 km for M = 1.34 M☉, ruling out ultra-soft hyperon core equations of state.',
    },
  ],
  categoriesOrder: [
    'heliophysics_solar',
    'astrophysics_cosmology',
    'earth_climate_science',
    'biological_physical_space',
  ],
  categoriesMap: {
    heliophysics_solar: {
      id: 'heliophysics_solar',
      menuLabel: 'Heliophysics & Solar Physics',
      panelTitle: 'HELIOPHYSICS & SOLAR MAGNETOHYDRODYNAMICS',
      heroImage:
        'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000104/GSFC_20171208_Archive_e000104~medium.jpg',
      leftMetrics: [
        'Solar Luminosity: 3.828 × 10²⁶ W',
        'Corona Temp: 1.8 × 10⁶ K',
        'Solar Wind Speed: 485 km/s',
        'IMF Bz Component: -8.4 nT',
        'X-Ray Flux (GOES): M4.2 Class',
      ],
      rightMetrics: [
        'Observatory: SDO / Parker Probe',
        'EUV Wavelength: 171 Å / 131 Å',
        'Alfvén Surface: 13.8 R☉',
        'CME Velocity: 1,140 km/s',
        'Sunspot Number (SSN): 164',
      ],
      reportLead:
        'NASA Heliophysics missions—including the Solar Dynamics Observatory (SDO), Parker Solar Probe, Solar Orbiter, and MMS—investigate the coupled solar-terrestrial magnetic system, from dynamo magnetic flux generation inside the solar tachocline to coronal mass ejections (CMEs) and magnetospheric reconnection at Earth.',
      extendedReport: [
        {
          id: 'helio-sec-1',
          title: '1. Coronal Magnetic Reconnection, Nanoflare Heating & Alfvén Wave Turbulence',
          subtitle: 'SDO/AIA Extreme-Ultraviolet Imaging & Parker Solar Probe In-Situ Telemetry',
          paragraphs: [
            'The solar corona maintains temperatures exceeding 1.5 to 3.0 million Kelvin despite overlying a photosphere of only 5,772 K. High-cadence extreme-ultraviolet (EUV) observations from SDO’s Atmospheric Imaging Assembly (AIA) in the Fe IX (171 Å) and Fe XVIII (94 Å) emission lines demonstrate that photospheric granular convective motions continuously braid coronal magnetic flux tubes.',
            'When magnetic shear exceeds critical topological thresholds, impulsive Petschek-type and tearing-mode magnetic reconnection releases stored magnetic energy (B²/2μ₀) as non-thermal electron beams, Joule dissipation, and outward-propagating Alfvén waves.',
          ],
          keyMetrics: [
            { label: 'Coronal Heating Flux Requirement', value: '3 × 10³ to 1 × 10⁴ W/m² (Active Regions)' },
            { label: 'Fe XVIII / Fe XXI Flare Plasma Temp', value: '10.8 × 10⁶ K (X-Class Reconnection Core)' },
            { label: 'Photospheric Flux Emergence Rate', value: '2.4 × 10²¹ Mx/day' },
            { label: 'Solar Dynamo Cycle Period', value: '11.04 Years (22-Year Hale Magnetic Cycle)' },
          ],
        },
        {
          id: 'helio-sec-2',
          title: '2. Coronal Mass Ejections (CMEs), Interplanetary Shocks & Geomagnetic Storms',
          subtitle: 'SOHO/LASCO Coronagraphs, STEREO-A & Magnetospheric Multiscale (MMS) Array',
          paragraphs: [
            'Eruptive magnetic flux ropes expelled during X-class and M-class solar flares accelerate 10¹² to 10¹³ kg of magnetized coronal plasma into interplanetary space at velocities reaching 2,500 km/s. When a southward-oriented interplanetary magnetic field (IMF Bz < -10 nT) impinges upon Earth’s dayside magnetopause, magnetic reconnection couples solar wind kinetic energy directly into the terrestrial magnetosphere-ionosphere ring current.',
          ],
          keyMetrics: [
            { label: 'Typical CME Kinetic Energy', value: '10²⁴ to 10²⁵ Joules (10³¹–10³² ergs)' },
            { label: 'Magnetopause Reconnection Rate', value: 'Dimensionless M_A ≈ 0.12 (MMS Electron Diffusion)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'helio-deep-1',
          title: '3. Heliospheric Current Sheet & Galactic Cosmic Ray Modulation',
          subtitle: 'Voyager 1 & 2 Interstellar Mission + IBEX Heliopause Mapping',
          paragraphs: [
            'At the outer boundary of the heliosphere (119–122 AU), solar wind ram pressure balances the interstellar medium magnetic and thermal pressure at the heliopause. Voyager plasma wave sensors confirm an interstellar magnetic field strength of 0.48 nT draped across the heliospheric nose.',
          ],
          keyMetrics: [
            { label: 'Heliopause Distance', value: '121.6 AU (Voyager 1 Crossing)' },
            { label: 'Interstellar Electron Density', value: '0.08 to 0.12 cm⁻³' },
          ],
        },
      ],
    },
    astrophysics_cosmology: {
      id: 'astrophysics_cosmology',
      menuLabel: 'Astrophysics & High-Energy Cosmology',
      panelTitle: 'ASTROPHYSICS, RELATIVISTIC JETS & COSMOLOGY',
      heroImage: 'https://images-assets.nasa.gov/image/PIA04209/PIA04209~medium.jpg',
      leftMetrics: [
        'Hubble Constant H₀: 73.04 km/s/Mpc',
        'Dark Energy Ω_Λ: 0.6847',
        'Matter Density Ω_m: 0.3153',
        'CMB Temperature: 2.72548 K',
        'Redshift Horizon: z = 14.32',
      ],
      rightMetrics: [
        'Observatories: JWST / Hubble / Fermi',
        'X-Ray Band: 0.5–10 keV (Chandra)',
        'Gamma-Ray Band: 20 MeV–300 GeV',
        'SMBH Mass (M87*): 6.5 × 10⁹ M☉',
        'Baryon Fraction Ω_b: 0.0493',
      ],
      reportLead:
        'NASA Astrophysics Division probes the physical laws governing the universe at extreme energies and cosmic epochs—spanning supermassive black hole accretion disks, galactic superwinds, reionization-era galaxies at z > 14, and precision ΛCDM cosmological parameters.',
      extendedReport: [
        {
          id: 'astro-sec-1',
          title: '1. Galactic Superwinds, Active Galactic Nuclei (AGN) & SMBH Feedback',
          subtitle: 'Hubble WFPC2 / WFC3, Chandra X-Ray Observatory & JWST Integral Field Spectroscopy',
          paragraphs: [
            'In starburst and Seyfert galaxies such as NGC 3079, concerted core-collapse supernova shockwaves and Eddington-limited accretion onto central supermassive black holes drive multiphase galactic superwinds. Towering 3,000-light-year bubbles of 10⁷ K X-ray-emitting plasma and ionized Hα filaments erupt perpendicular to the galactic disk at velocities exceeding 1,500 km/s.',
            'This mechanical and radiative AGN feedback quenches runaway star formation in massive halos while enriching the circumgalactic and intergalactic medium (CGM/IGM) with alpha-elements (O, Mg, Si, Fe).',
          ],
          keyMetrics: [
            { label: 'Superbubble Diameter (NGC 3079)', value: '3,000 Light-Years (0.92 kpc)' },
            { label: 'Outflow Terminal Velocity', value: '1,650 km/s (6.0 × 10⁶ km/h)' },
            { label: 'Hot Gas Plasma Temperature', value: '6.8 × 10⁶ K (Thermal Bremsstrahlung)' },
            { label: 'Mass Outflow Rate (dM/dt)', value: '12.4 M☉ / year' },
          ],
        },
        {
          id: 'astro-sec-2',
          title: '2. High-Redshift Reionization Galaxies & First-Generation Population III Candidates',
          subtitle: 'JWST Advanced Deep Extragalactic Survey (JADES) NIRSpec Telemetry',
          paragraphs: [
            'Spectroscopic Lyman-alpha break confirmations of galaxies such as JADES-GS-z14-0 at redshift z = 14.32 reveal luminous, compact stellar systems existing just 290 million years after the Big Bang. Strong doubly ionized oxygen ([O III] 5007 Å) and carbon ([C III] 1909 Å) emission lines indicate rapid chemical enrichment by massive early stars.',
          ],
          keyMetrics: [
            { label: 'Confirmed Spectroscopic Redshift', value: 'z = 14.32 (Lookback Time: 13.5 Gyr)' },
            { label: 'UV Absolute Magnitude (M_UV)', value: '-20.81 mag (Half-Light Radius: 260 pc)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'astro-deep-1',
          title: '3. Hubble Tension & Dark Energy Equation of State (w₀, w_a)',
          subtitle: 'SH0ES Cepheid-SNIa Distance Ladder vs. Planck CMB Acoustic Scale',
          paragraphs: [
            'Joint HST and JWST observations of Cepheid variable stars and Tip of the Red Giant Branch (TRGB) calibrators yield a local expansion rate of H₀ = 73.04 ± 1.04 km/s/Mpc, maintaining a >5σ cosmological tension with early-universe ΛCDM projections (67.4 ± 0.5 km/s/Mpc).',
          ],
        },
      ],
    },
    earth_climate_science: {
      id: 'earth_climate_science',
      menuLabel: 'Earth System & Climate Science',
      panelTitle: 'EARTH SYSTEM OBSERVATORY & RADIATIVE TELEMETRY',
      heroImage: 'https://images-assets.nasa.gov/image/PIA11657/PIA11657~small.jpg',
      leftMetrics: [
        'Solar Irradiance: 1,361 W/m²',
        'Energy Imbalance: +1.12 W/m²',
        'Atmospheric CO₂: 424.8 ppm',
        'Global Mean Sea Rise: +3.4 mm/yr',
        'Arctic Ice Mass Trend: -270 Gt/yr',
      ],
      rightMetrics: [
        'Satellites: SWOT / PACE / GRACE-FO',
        'Altimetry Precision: ±1.2 cm (KaRIn)',
        'Ocean Heat Storage: 91% of Excess',
        'Methane Mixing Ratio: 1,929 ppb',
        ' Stratospheric O₃: 284 Dobson Units',
      ],
      reportLead:
        'NASA’s Earth System Observatory monitors our home planet as an integrated thermodynamic and biogeochemical system, measuring top-of-atmosphere radiative energy flux (CERES), global sea surface topography (SWOT), cryospheric mass balance (GRACE-FO & ICESat-2), and atmospheric trace gases (OCO-2/3).',
      extendedReport: [
        {
          id: 'earth-sec-1',
          title: '1. Planetary Radiative Energy Imbalance & Ocean Heat Content (OHC)',
          subtitle: 'CERES Radiometer Suite & SWOT Ka-Band Radar Interferometry',
          paragraphs: [
            'Continuous top-of-atmosphere (TOA) broadband radiometry from NASA’s Clouds and the Earth’s Radiant Energy System (CERES) sensors combined with Argo profiling floats demonstrates a net positive Earth Energy Imbalance (EEI) of +1.12 ± 0.18 W/m². Over 90% of this trapped thermal energy accumulates within the upper 2,000 meters of the global ocean, driving thermosteric sea-level rise and intensifying marine heatwaves.',
          ],
          keyMetrics: [
            { label: 'Net TOA Radiative Forcing', value: '+1.12 W/m² (CERES EBAF Edition 4.2)' },
            { label: 'Upper Ocean Heat Uptake', value: '+14.8 Zettajoules / year (0–2000 m)' },
            { label: 'SWOT Swath Resolution', value: '120 km Wide Ka-Band Interferometric Swath' },
            { label: 'Global Albedo Reflectance', value: '0.294 (Shortwave Outgoing Flux)' },
          ],
        },
        {
          id: 'earth-sec-2',
          title: '2. Cryospheric Gravity Anomalies & Global Carbon Cycle Fluxes',
          subtitle: 'GRACE-FO Laser Ranging Interferometer & OCO-2 Solar-Induced Fluorescence',
          paragraphs: [
            'Twin GRACE Follow-On satellites track month-to-month variations in Earth’s geopotential field with micrometer-scale laser ranging precision, quantifying ice-sheet mass loss across Greenland (-270 ± 20 Gt/yr) and West Antarctica (-145 ± 25 Gt/yr).',
          ],
          keyMetrics: [
            { label: 'OCO-2 XCO₂ Column Precision', value: '< 0.5 ppm Single-Sounding Accuracy' },
            { label: 'ICESat-2 ATLAS Laser Pulse Rate', value: '10,000 Pulses / sec (532 nm Green Laser)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'earth-deep-1',
          title: '3. Stratospheric Ozone Recovery, Phytoplankton Carbon Export & NISAR Radar',
          subtitle: 'Aura MLS, PACE Ocean Color Instrument (OCI) & Dual-Frequency SAR Interferometry',
          paragraphs: [
            'Hyperspectral radiometry from NASA’s PACE spacecraft resolves global chlorophyll-a distributions and coccolithophore/diatom community shifts, quantifying the marine biological carbon pump (~10–12 Gt C/yr export to the mesopelagic zone). Concurrently, L-band and S-band synthetic aperture radar interferometry tracks millimeter-scale crustal deformation along tectonic fault zones and permafrost thaw subsidence.',
          ],
          keyMetrics: [
            { label: 'Marine Biological Carbon Export', value: '10.8 Gt Carbon / Year (Mesopelagic Flux)' },
            { label: 'Crustal Deformation Sensitivity', value: '3–5 mm Sub-Centimeter InSAR Precision' },
          ],
        },
      ],
    },
    biological_physical_space: {
      id: 'biological_physical_space',
      menuLabel: 'Planetary Geology & Space Biology',
      panelTitle: 'PLANETARY GEOLOGY, ASTROBIOLOGY & MICROGRAVITY',
      heroImage: 'https://images-assets.nasa.gov/image/PIA24333/PIA24333~medium.jpg',
      leftMetrics: [
        'Jezero Crater Lat: 18.38° N',
        'Martian Surface Pressure: 6.1 mbar',
        'Sample Tubes Sealed: 24 Cores',
        'ISS Microgravity: 10⁻⁶ g₀',
        'BEC Condensate Temp: 100 pK',
      ],
      rightMetrics: [
        'Missions: Perseverance / MRO / ISS',
        'Spectrometer: SHERLOC & PIXL',
        'Organic Ring Detection: 248.6 nm UV',
        'Radiation Dose (Mars): 230 mSv/yr',
        'MOXIE O₂ Output: 12.2 g/hr Peak',
      ],
      reportLead:
        'Combining robotic surface exploration in Jezero Crater on Mars with fundamental microgravity physics and space biology experiments aboard the International Space Station, NASA investigates how geological environments preserve ancient biosignatures and how biological systems adapt to deep space.',
      extendedReport: [
        {
          id: 'bio-sec-1',
          title: '1. Jezero Crater Fluvial-Lacustrine Stratigraphy & Organic Biosignature Caching',
          subtitle: 'Mars 2020 Perseverance SHERLOC Raman/Fluorescence & PIXL X-Ray Lithochemistry',
          paragraphs: [
            'Across the western fan delta and Bright Angel formation (Neretva Vallis channel) in Jezero Crater, NASA’s Perseverance rover has cored fine-grained mudstones and carbonate-rimmed sandstones deposited in a Noachian-Hesperian lake system ~3.7 billion years ago. Deep-ultraviolet resonance Raman and fluorescence spectroscopy (SHERLOC) detects single- and double-ring aromatic organic carbon compounds co-located with iron-phosphate (vivianite) and iron-sulfide (greigite) reaction fronts.',
          ],
          keyMetrics: [
            { label: 'Key Sample Core ("Cheyava Falls")', value: 'Sapphire Canyon Core #25 (Leopard Spots)' },
            { label: 'PIXL Elemental Resolution', value: '120 µm X-Ray Fluorescence Micro-Beam' },
            { label: 'Depositional Environment', value: '3.7 Ga Fluvial-Deltaic Lacustrine Basin' },
            { label: 'In-Situ Resource Utilization (MOXIE)', value: '98% Pure O₂ Electrolysis from Martian CO₂' },
          ],
        },
        {
          id: 'bio-sec-2',
          title: '2. Microgravity Quantum Matter, Fluid Physics & Spaceflight Multi-Omics',
          subtitle: 'ISS Cold Atom Laboratory (CAL), GeneLab OSDR & Artemis Radiation Dosimetry',
          paragraphs: [
            'Aboard the International Space Station, the Cold Atom Laboratory cools rubidium-87 and potassium-41 gases via optical molasses and radio-frequency evaporative cooling to 100 picokelvins, sustaining free-fall Bose-Einstein condensates (BECs) for over 10 seconds to test the Einstein Equivalence Principle. Simultaneously, NASA GeneLab multi-omics assays map mitochondrial oxidative stress, telomere dynamics, and bone mineral homeostasis under galactic cosmic ray (GCR) exposure.',
          ],
          keyMetrics: [
            { label: 'Ultracold Quantum Temperature', value: '100 pK (10⁻¹⁰ Kelvin Free-Expansion BEC)' },
            { label: 'Deep Space GCR Dose Equivalent', value: '0.66 ± 0.12 mSv / day (MSL RAD Cruise)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'bio-deep-1',
          title: '3. Europa Clipper & Dragonfly Ocean World Astrobiology Instrumentation',
          subtitle: 'MASPEX Mass Spectrometer, SUDA Dust Analyzer & REASON Ice-Penetrating Radar',
          paragraphs: [
            'Dual-frequency (9 MHz and 60 MHz) ice-penetrating radar and high-resolution mass spectrometry (MASPEX, mass resolution m/Δm > 25,000) are engineered to sample cryovolcanic plume ejecta and subsurface brine lenses on Jupiter’s moon Europa and prebiotic organic dunes on Saturn’s moon Titan.',
          ],
        },
      ],
    },
  },
};

export const LIVE_TELESCOPE_DATA_WORKSPACE: WorkspaceModeData = {
  newsCardTitle: 'NEWS',
  newsSubheading: 'Telescope news!',
  newsHeroImage: 'https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg',
  newsHeroAlt: 'James Webb Space Telescope NIRCam Observation of Carina Nebula',
  newsBullets: [
    'JWST Sun-Earth Lagrange Point L2 downlink locked on Deep Space Network Station 63 (Madrid Ka-Band 28 Mbps).',
    'Hubble Space Telescope Wide Field Camera 3 (WFC3) completes ultraviolet transit spectroscopy of warm Neptune GJ 436 b.',
    'Chandra X-Ray Observatory ACIS-S array resolves relativistic pulsar wind nebula filaments in Crab & Vela remnants.',
    'TESS Sector 85 All-Sky Transit Photometry pipeline flags 42 new terrestrial planet candidates around nearby M-dwarfs.',
  ],
  newsArticles: [
    {
      id: 'tel-news-jwst-l2-telemetry',
      title: 'James Webb Space Telescope Cycle 3 Cryogenic Optical Bench & MIRI Telemetry Status',
      subtitle: 'Space Telescope Science Institute (STScI) & NASA Goddard Flight Operations',
      paragraphs: [
        'Fine Guidance Sensor (FGS) closed-loop pointing telemetry from Lagrange Point L2 (1.5 million km from Earth) confirms wavefront RMS stability below 62 nanometers across all 18 gold-coated beryllium primary mirror segments. The Mid-Infrared Instrument (MIRI) closed-cycle helium pulse-tube cryocooler maintains Si:As Impurity Band Conduction detector arrays at a nominal operating temperature of 6.42 Kelvin.',
        'Simultaneous NIRSpec Micro-Shutter Array (MSA) multi-object spectroscopy and NIRISS Single Object Slitless Spectroscopy (SOSS) continue delivering photon-noise-limited transmission spectra of transiting rocky exoplanets down to 15 ppm transit depth precision.',
      ],
      keyMetrics: [
        { label: 'Primary Mirror Wavefront Error', value: '61.8 nm RMS (Diffraction-Limited at 1.1 µm)' },
        { label: 'MIRI Cryocooler Detector Temp', value: '6.42 K (-266.73 °C)' },
        { label: 'NIRCam / NIRSpec Bench Temp', value: '38.5 K (Passive Five-Layer Sunshield)' },
        { label: 'Fine Guidance Pointing Jitter', value: '1.2 milliarcseconds (mas) RMS' },
      ],
    },
    {
      id: 'tel-news-dsn-downlink',
      title: 'Deep Space Network (DSN) 70-Meter & 34-Meter Beam-Waveguide Array Status',
      subtitle: 'NASA Jet Propulsion Laboratory Interplanetary Network Directorate',
      paragraphs: [
        'Coherent X-band (8.4 GHz) and Ka-band (32.0 GHz) telemetry streams across Goldstone (DSS-14), Madrid (DSS-63/65), and Canberra (DSS-43) are actively downlinking calibrated science frames from JWST, TESS, Chandra, Juno, and Voyager 1/2.',
      ],
      keyMetrics: [
        { label: 'JWST Ka-Band Downlink Rate', value: '28.0 Mbps (57.2 GB / Day Science Volume)' },
        { label: 'Voyager 1 S/X-Band Distance', value: '165.4 AU (22h 56m One-Way Light Time)' },
      ],
    },
  ],
  bottomLeftCardTitle: 'LIVE OBSERVATORY TELEMETRY STREAMS',
  bottomLeftBullets: [
    'JWST L2 Orbit — NIRCam / NIRSpec / MIRI / NIRISS active science queue.',
    'Hubble Space Telescope (LEO 515 km) — WFC3 & COS UV/Optical target lock.',
    'Chandra X-Ray Observatory (HEO) — ACIS & HRC 0.1–10 keV photon event stream.',
    'TESS (P/2 High-Earth Resonance) — 4-Camera CCD 2-minute cadence photometry.',
    'Nancy Grace Roman Space Telescope — Wide Field Instrument (WFI) integration logs.',
    'Deep Space Network (DSN) — Goldstone, Madrid & Canberra dish carrier lock.',
    'Fermi Large Area Telescope (LAT) — All-sky gamma-ray transient monitor.',
  ],
  bottomLeftStreams: [
    {
      title: 'JWST NIRSpec / NIRCam Active Queue — Program GO-4892 (Exoplanet Transit)',
      detail:
        'BOTS (Bright Object Time Series) mode locked on TRAPPIST-1 system. Grism G395H (2.87–5.14 µm) recording 4,820 consecutive integrations to isolate CO₂ (4.3 µm) and SO₂ (4.05 µm) atmospheric absorption features.',
    },
    {
      title: 'Hubble Space Telescope (HST) — ULLYSES Ultraviolet Legacy Library Stream',
      detail:
        'Cosmic Origins Spectrograph (COS) G130M grating acquiring far-ultraviolet (1150–1450 Å) Lyman-alpha profiles of K-type and M-type exoplanet host stars.',
    },
    {
      title: 'Chandra X-Ray Observatory — High-Energy Transmission Grating (HETG)',
      detail:
        'Apogee altitude 134,500 km above Earth’s radiation belts. Resolving Fe-Kα (6.4–6.7 keV) fluorescence lines from active galactic nuclei and supernova shock fronts.',
    },
  ],
  categoriesOrder: [
    'jwst_live_telemetry',
    'hubble_orbital_stream',
    'chandra_xray_array',
    'tess_dsn_exoplanet_feed',
  ],
  categoriesMap: {
    jwst_live_telemetry: {
      id: 'jwst_live_telemetry',
      menuLabel: 'JWST Infrared Observatory (L2)',
      panelTitle: 'JAMES WEBB SPACE TELESCOPE (JWST) LIVE TELEMETRY',
      heroImage:
        'https://images-assets.nasa.gov/image/southern_ring_nebula/southern_ring_nebula~medium.jpg',
      leftMetrics: [
        'Orbit: Sun-Earth L2 Halo (1.5M km)',
        'Primary Mirror: 6.5 m (18 Segments)',
        'Spectral Range: 0.6 – 28.5 µm',
        'Wavefront RMS: 61.8 nm',
        'Pointing Stability: 1.2 mas',
      ],
      rightMetrics: [
        'Instruments: NIRCam / NIRSpec / MIRI',
        'MIRI Cryo Temp: 6.42 K',
        'Sunshield Passive Temp: 38.5 K',
        'Ka-Band Downlink: 28.0 Mbps',
        'Photometric Precision: ~14 ppm',
      ],
      reportLead:
        'Operating in a halo orbit around the Sun-Earth second Lagrange point (L2) 1.5 million kilometers from Earth, NASA’s James Webb Space Telescope (JWST) utilizes a 6.5-meter segmented gold-coated beryllium primary mirror and four cryogenic infrared instruments (NIRCam, NIRSpec, MIRI, and NIRISS) to observe cosmic dawn, stellar nurseries, and exoplanet atmospheres.',
      extendedReport: [
        {
          id: 'jwst-sec-1',
          title: '1. Active Wavefront Sensing & Cryogenic Optical Bench Telemetry',
          subtitle: '18 Hexagonal Beryllium Segments (A1–C6) & 132 Hexapod Nano-Actuators',
          paragraphs: [
            'JWST’s Optical Telescope Element (OTE) comprises 18 hexagonal gold-coated beryllium mirror segments providing 25.4 m² of collecting area. Every 48 hours, Dispersed Hartmann Sensor (DHS) and phase-retrieval wavefront measurements inside NIRCam evaluate segment piston, tip, tilt, and radius of curvature with sub-nanometer sensitivity.',
            'Cryogenic hexapod actuators adjust segment alignment in 7.5-nanometer increments, maintaining a total telescope wavefront error of ~61.8 nm RMS—substantially outperforming the 150 nm design requirement and enabling diffraction-limited imaging down to 1.1 µm.',
          ],
          keyMetrics: [
            { label: 'Collecting Area', value: '25.4 m² (Gold-Coated Beryllium, 100 nm Au Layer)' },
            { label: 'Actuator Step Resolution', value: '7.5 nanometers (6 Degrees of Freedom + ROC)' },
            { label: 'Hot-Side / Cold-Side ΔT', value: '+358 K (Sun-Facing) to 38 K (Telescope Side)' },
            { label: 'Propellant Life Expectancy', value: '> 20 Years (L2 Station-Keeping Hydrazine/N₂O₄)' },
          ],
        },
        {
          id: 'jwst-sec-2',
          title: '2. Spectroscopic Modes: NIRSpec Micro-Shutter Array & MIRI Medium Resolution',
          subtitle: 'Simultaneous Multi-Object Spectroscopy & Mid-Infrared Integral Field Units',
          paragraphs: [
            'The Near-Infrared Spectrograph (NIRSpec) employs four programmable quadrants of 62,000 micro-shutters (each 100 × 200 µm), allowing simultaneous slit spectroscopy of up to 100 high-redshift galaxies in a single 9.6 arcmin² field of view. For exoplanet time-series observations, the 1.6 × 1.6 arcsec Fixed Slit and Bright Object Time Series (BOTS) prism/grating modes prevent detector saturation on bright host stars.',
          ],
          keyMetrics: [
            { label: 'NIRSpec Resolving Power (R)', value: 'R ≈ 100 (Prism), R ≈ 1,000 (M), R ≈ 2,700 (H)' },
            { label: 'MIRI MRS IFU Wavelengths', value: '4.9 to 27.9 µm Across 4 Spectral Channels' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'jwst-deep-1',
          title: '3. Coronagraphic Direct Exoplanet Imaging (NIRCam & MIRI 4QPM)',
          subtitle: 'Four-Quadrant Phase Masks & Lyot Stops for Young Giant Planets',
          paragraphs: [
            'Using MIRI Four-Quadrant Phase Mask (4QPM) coronagraphs at 10.65 µm, 11.4 µm, and 15.5 µm alongside NIRCam Lyot coronagraphs, JWST achieves star-to-planet contrast ratios of 10⁻⁵ to 10⁻⁶ at angular separations < 1.0 arcsecond, directly imaging super-Jupiters such as HIP 65426 b and ε Indi Ab.',
          ],
        },
      ],
    },
    hubble_orbital_stream: {
      id: 'hubble_orbital_stream',
      menuLabel: 'Hubble Space Telescope (UV/Optical)',
      panelTitle: 'HUBBLE SPACE TELESCOPE (HST) ORBITAL TELEMETRY',
      heroImage:
        'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000842/GSFC_20171208_Archive_e000842~medium.jpg',
      leftMetrics: [
        'Low-Earth Orbit: 515 km Altitude',
        'Orbital Period: 95.1 Minutes',
        'Primary Mirror: 2.4 m Ritchey-Chrétien',
        'Spectral Band: 115 nm – 1,700 nm',
        'Angular Resolution: 0.043 arcsec',
      ],
      rightMetrics: [
        'Instruments: WFC3 / ACS / COS / STIS',
        'Pointing Mode: Reduced-Gyro + FGS',
        'Pointing Lock: ±0.007 arcsec',
        'Orbital Inclination: 28.47°',
        'Archive Volume: > 1.6 Million Exposures',
      ],
      reportLead:
        'Orbiting above Earth’s ultraviolet-absorbing atmosphere at 27,300 km/h, the NASA/ESA Hubble Space Telescope provides unmatched far-ultraviolet, visible, and near-infrared spatial resolution (0.043 arcseconds), working in synergy with JWST to span the electromagnetic spectrum from 115 nm to 28.5 µm.',
      extendedReport: [
        {
          id: 'hst-sec-1',
          title: '1. Wide Field Camera 3 (WFC3) & Cosmic Origins Spectrograph (COS) Telemetry',
          subtitle: 'UVIS (200–1000 nm) CCD & IR (800–1700 nm) HgCdTe Focal Plane Arrays',
          paragraphs: [
            'Hubble’s Wide Field Camera 3 (WFC3) operates dual optical channels: a 4096 × 4096 pixel UVIS back-illuminated CCD detector sensitive down to 200 nm, and a 1024 × 1024 pixel HgCdTe near-infrared detector cooled thermoelectrically to 145 K. Spatial scanning mode—where the spacecraft slews perpendicularly across detector rows during exoplanet transits—achieves 25 ppm spectrophotometric precision across the 1.4 µm water absorption band.',
          ],
          keyMetrics: [
            { label: 'WFC3 UVIS Pixel Scale', value: '0.0395 arcsec/pixel (162 × 162 arcsec FOV)' },
            { label: 'COS Far-UV Resolving Power', value: 'R = 16,000 to 24,000 (115–180 nm)' },
            { label: 'Fine Guidance Sensor Interferometry', value: 'Koesters Prism Dual-Axis Star Lock' },
            { label: 'Cumulative Scientific Orbits', value: '> 190,000 Earth Orbits Completed' },
          ],
        },
        {
          id: 'hst-sec-2',
          title: '2. OPAL Outer Planet Atmospheres Legacy & Deep Field Gravitational Lensing',
          subtitle: 'Annual Giant Planet Global Vortex Maps & Frontier Fields Cluster Lensing',
          paragraphs: [
            'Under the Outer Planet Atmospheres Legacy (OPAL) program, Hubble captures annual multi-filter global maps of Jupiter, Saturn, Uranus, and Neptune, tracking Great Red Spot wind-shear acceleration (+8% velocity increase along the high-speed convective ring between 2009 and 2024) and seasonal polar hood aerosol changes.',
          ],
          keyMetrics: [
            { label: 'Jovian Great Red Spot Rim Wind', value: '640 km/h Anticyclonic Shear Velocity' },
            { label: 'Gravitational Lensing Magnification', value: 'μ = 10× to 40× (Abell 2744 / MACS J0416)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'hst-deep-1',
          title: '3. Space Telescope Imaging Spectrograph (STIS) Coronagraphy & Ly-α Transit Escape',
          subtitle: 'Evaporating Exospheres of Hot Jupiters & Warm Neptunes',
          paragraphs: [
            'Far-ultraviolet Lyman-alpha (1215.67 Å) transit observations with STIS reveal giant comet-like hydrogen exospheric tails escaping close-in exoplanets (HD 209458 b, GJ 436 b) at rates of 10⁹ to 10¹⁰ g/s due to stellar XUV photoevaporation.',
          ],
        },
      ],
    },
    chandra_xray_array: {
      id: 'chandra_xray_array',
      menuLabel: 'Chandra & High-Energy X-Ray Array',
      panelTitle: 'CHANDRA X-RAY & FERMI HIGH-ENERGY TELEMETRY',
      heroImage: 'https://images-assets.nasa.gov/image/PIA04219/PIA04219~orig.jpg',
      leftMetrics: [
        'Apogee / Perigee: 134,500 / 16,000 km',
        'Orbital Period: 63.5 Hours',
        'X-Ray Energy Band: 0.1 – 10.0 keV',
        'Angular Resolution: 0.49 arcsec PSF',
        'Mirror Coating: Iridium (Ir) Grazing',
      ],
      rightMetrics: [
        'Detectors: ACIS-I/S & HRC-I/S',
        'Gratings: HETG & LETG Dispersive',
        'Focal Length: 10.0 Meters',
        'Effective Area: 800 cm² at 0.25 keV',
        'Time Resolution: 16 µs (HRC)',
      ],
      reportLead:
        'NASA’s Chandra X-Ray Observatory utilizes four nested pairs of iridium-coated Wolter Type-I grazing-incidence paraboloid/hyperboloid mirrors to focus high-energy X-ray photons (0.1–10 keV) with sub-arcsecond angular resolution, mapping supernova shock fronts, neutron star magnetospheres, and galaxy cluster intracluster plasma.',
      extendedReport: [
        {
          id: 'chandra-sec-1',
          title: '1. Wolter Type-I Grazing Incidence Optics & ACIS CCD Photon Counting',
          subtitle: 'High Resolution Mirror Assembly (HRMA) & Advanced CCD Imaging Spectrometer',
          paragraphs: [
            'Because energetic X-ray photons penetrate normal-incidence mirrors, Chandra’s High Resolution Mirror Assembly (HRMA) deflects X-rays at shallow grazing angles (~0.45° to 0.85°) off four concentric Zerodur glass shells polished to 3 Å surface smoothness. Each arriving photon recorded by the ACIS CCD array is time-tagged with its 2D sky coordinate (X, Y) and pulse-height energy (E), generating simultaneous 3D spatial-spectral data cubes.',
          ],
          keyMetrics: [
            { label: 'HRMA Surface Roughness', value: '< 3 Ångströms (0.3 nm) RMS Smoothness' },
            { label: 'HETG Spectral Resolution (E/ΔE)', value: 'Up to 1,000 over 0.4–10.0 keV Band' },
          ],
        },
        {
          id: 'chandra-sec-2',
          title: '2. Supernova Remnant Shock Acceleration, Pulsar Wind Nebulae & Cluster Mergers',
          subtitle: ' Cassiopeia A, Crab Nebula & Bullet Cluster (1E 0657-56) X-Ray Mapping',
          paragraphs: [
            'High-resolution Chandra X-ray mosaics of Cassiopeia A and Tycho’s Supernova Remnant trace non-thermal synchrotron filaments where diffusive shock acceleration boosts cosmic-ray electrons to TeV energies. In merging galaxy clusters such as 1E 0657-56, X-ray bremsstrahlung maps of 10⁸ K intracluster gas combined with weak gravitational lensing provide direct empirical proof of collisionless dark matter.',
          ],
          keyMetrics: [
            { label: 'Intracluster Medium Plasma Temp', value: '8.5 × 10⁷ to 1.6 × 10⁸ K (kT ≈ 7–14 keV)' },
            { label: 'Cas A Forward Shock Velocity', value: '5,200 km/s (Synchrotron X-Ray Rim)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'chandra-deep-1',
          title: '3. IXPE (Imaging X-Ray Polarimetry Explorer) & Fermi Gamma-Ray Synergy',
          subtitle: '2–8 keV Photoelectric X-Ray Polarimetry of Black Hole Coronae & Blazar Jets',
          paragraphs: [
            'Joint observations between Chandra and NASA’s Imaging X-Ray Polarimetry Explorer (IXPE) measure linear X-ray polarization degrees (PD = 4% to 18%), determining the 3D magnetic field geometry and coronal slab orientation around stellar-mass and supermassive black holes.',
          ],
        },
      ],
    },
    tess_dsn_exoplanet_feed: {
      id: 'tess_dsn_exoplanet_feed',
      menuLabel: 'TESS & Deep Space Network (DSN) Feed',
      panelTitle: 'TESS ALL-SKY TRANSIT & DEEP SPACE NETWORK TELEMETRY',
      heroImage: 'https://images-assets.nasa.gov/image/PIA22965/PIA22965~orig.jpg',
      leftMetrics: [
        'TESS Orbit: 2:1 Lunar Resonance (P/2)',
        'Field of View: 24° × 96° (4 Cameras)',
        'Cadence: 20 s / 120 s / 200 s FFI',
        'Bandpass: 600 – 1,000 nm (Red-Optical)',
        'Confirmed Planets: > 580 + 7,200 TOIs',
      ],
      rightMetrics: [
        'DSN Dishes: 70m & 34m BWG Arrays',
        'Stations: Goldstone / Madrid / Canberra',
        'Ka-Band Carrier: 31.8 – 32.3 GHz',
        'Maser Clock Stability: Δf/f < 10⁻¹⁵',
        'Sky Survey Coverage: > 93% Full Sky',
      ],
      reportLead:
        'Operating in a high-Earth 13.7-day lunar-resonant orbit, NASA’s Transiting Exoplanet Survey Satellite (TESS) monitors hundreds of thousands of bright nearby stars for planetary transits, transmitting full-frame calibrated CCD photometry through NASA’s Deep Space Network (DSN).',
      extendedReport: [
        {
          id: 'tess-sec-1',
          title: '1. Four-Camera Wide-Field CCD Array & Transit Search Pipeline (SPOC)',
          subtitle: 'MIT Lincoln Lab CCID-80 Back-Illuminated Detectors & NASA Ames SPOC',
          paragraphs: [
            'TESS carries four f/1.4 wide-field refractive lenses (105 mm entrance pupil), each coupled to a 4096 × 4096 pixel mosaic of four back-illuminated MIT/LL CCDs depleted to 100 µm thickness for enhanced near-infrared sensitivity around cool M-dwarf stars. During each 27.4-day observation sector, TESS steps across 24° × 96° sky strips, downlinking Full-Frame Images (FFIs) every 200 seconds at perigee via Ka-band.',
          ],
          keyMetrics: [
            { label: 'Total Detector Pixels', value: '67.1 Megapixels Across 16 CCDs (4 Cameras)' },
            { label: 'Perigee Ka-Band Downlink Rate', value: '100 Mbps to Deep Space Network' },
          ],
        },
        {
          id: 'tess-sec-2',
          title: '2. Deep Space Network (DSN) Hydrogen Maser Radioscience & Optical Comms (DSOC)',
          subtitle: 'Goldstone (DSS-14), Madrid (DSS-63), Canberra (DSS-43) & Psyche Laser Link',
          paragraphs: [
            'NASA’s Deep Space Network maintains continuous 360-degree interplanetary coverage via three complexes separated by ~120 degrees in longitude. Hydrogen maser frequency standards provide Doppler velocity tracking accuracy better than 0.05 mm/s for spacecraft gravity-field mapping, while the Deep Space Optical Communications (DSOC) near-infrared (1550 nm) laser transceiver demonstrates 267 Mbps high-definition telemetry across astronomical-unit distances.',
          ],
          keyMetrics: [
            { label: '70-Meter Antenna Gain (X-Band)', value: '74.3 dBi (Cryogenic HEMT Low-Noise Amp)' },
            { label: 'DSOC Laser Downlink Peak Rate', value: '267 Mbps (1550 nm Photon-Counting Array)' },
          ],
        },
      ],
      deepFacts: [
        {
          id: 'tess-deep-1',
          title: '3. Asteroseismology & Eclipsing Binary Stellar Astrophysics with TESS',
          subtitle: '20-Second Fast Cadence p-Mode & g-Mode Stellar Oscillation Frequencies',
          paragraphs: [
            'Beyond exoplanet transits, TESS 20-second cadence photometry resolves acoustic pressure modes (p-modes) and buoyancy gravity modes (g-modes) across hundreds of thousands of red giants, solar-like oscillators, and white dwarfs, determining fundamental stellar radii and ages to <3% precision.',
          ],
        },
      ],
    },
  },
};

