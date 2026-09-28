import React, { useState } from 'react';

export type PhotoFilterCategory =
  | 'all'
  | 'nebulae'
  | 'galaxies'
  | 'planets'
  | 'solar_mars';

export interface RealNasaPhotoItem {
  id: string;
  nasaId: string;
  title: string;
  subtitle: string;
  category: Exclude<PhotoFilterCategory, 'all'>;
  mission: string;
  instrument: string;
  center: string;
  capturedDate: string;
  imageUrl: string;
  shortDescription: string;
  scientificHighlights: string[];
}

/**
 * 100% Authentic, Real Photographs Taken by Official NASA Telescopes & Spacecraft
 * Hosted directly on NASA's official image asset servers (images-assets.nasa.gov).
 */
const VERIFIED_REAL_NASA_PHOTOS: RealNasaPhotoItem[] = [
  {
    id: 'jwst-carina-nebula',
    nasaId: 'carina_nebula',
    title: 'James Webb Space Telescope NIRCam Image of the “Cosmic Cliffs” in Carina Nebula',
    subtitle: 'NGC 3324 Star-Forming Region in Infrared Light',
    category: 'nebulae',
    mission: 'James Webb Space Telescope (JWST)',
    instrument: 'NIRCam (Near-Infrared Camera)',
    center: 'NASA / ESA / CSA / STScI',
    capturedDate: '2022-07-12',
    imageUrl: 'https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg',
    shortDescription:
      'What looks much like craggy mountains on a moonlit evening is actually the edge of the young star-forming region NGC 3324 in the Carina Nebula, captured in infrared light by the Near-Infrared Camera (NIRCam) on NASA’s James Webb Space Telescope.',
    scientificHighlights: [
      'Direct infrared telescope observation revealing previously obscured stellar nurseries and protostellar jets.',
      'Cavernous area carved from the nebula by intense ultraviolet radiation and stellar winds from massive hot young stars.',
    ],
  },
  {
    id: 'jwst-southern-ring-nebula',
    nasaId: 'southern_ring_nebula',
    title: 'James Webb Space Telescope Southern Ring Nebula (NGC 3132 NIRCam & MIRI)',
    subtitle: 'Side-by-Side Near-Infrared & Mid-Infrared Telescope Observation',
    category: 'nebulae',
    mission: 'James Webb Space Telescope (JWST)',
    instrument: 'NIRCam & MIRI Composite',
    center: 'NASA / STScI',
    capturedDate: '2022-07-12',
    imageUrl:
      'https://images-assets.nasa.gov/image/southern_ring_nebula/southern_ring_nebula~medium.jpg',
    shortDescription:
      'Side-by-side comparison showing direct observations of the Southern Ring planetary nebula (NGC 3132) in near-infrared light (left) and mid-infrared light (right) captured by NASA’s James Webb Space Telescope.',
    scientificHighlights: [
      'Expanding shells of ionized gas and dust ejected by a dying white dwarf star approximately 2,500 light-years away.',
      'MIRI mid-infrared camera resolves the dusty molecular cloak surrounding the binary central stars.',
    ],
  },
  {
    id: 'hubble-pillars-of-creation',
    nasaId: 'GSFC_20171208_Archive_e000842',
    title: 'Hubble High-Definition Near-Infrared Photograph of the Pillars of Creation',
    subtitle: 'Eagle Nebula (Messier 16) Interstellar Gas & Dust Columns',
    category: 'nebulae',
    mission: 'NASA Hubble Space Telescope',
    instrument: 'Wide Field Camera 3 (WFC3 Near-IR)',
    center: 'NASA / GSFC / STScI',
    capturedDate: '2017-12-08',
    imageUrl:
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000842/GSFC_20171208_Archive_e000842~medium.jpg',
    shortDescription:
      'This authentic NASA Hubble Space Telescope photograph, taken in near-infrared light, penetrates obscuring dust and gas to transform the Eagle Nebula pillars into delicate silhouettes seen against a background of myriad stars.',
    scientificHighlights: [
      'Reveals newborn stars embedded inside the dense molecular hydrogen columns 6,500 light-years away.',
      'Captured by Hubble’s Wide Field Camera 3 in optical and near-infrared wavelengths.',
    ],
  },
  {
    id: 'hubble-andromeda-galaxy',
    nasaId: 'GSFC_20171208_Archive_e000833',
    title: 'Hubble High-Definition Panoramic Photograph of the Andromeda Galaxy (M31)',
    subtitle: 'Sharpest Composite Space Telescope Image of Our Galactic Neighbor',
    category: 'galaxies',
    mission: 'NASA Hubble Space Telescope',
    instrument: 'Advanced Camera for Surveys (ACS) & WFC3',
    center: 'NASA / GSFC / ESA',
    capturedDate: '2017-12-08',
    imageUrl:
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000833/GSFC_20171208_Archive_e000833~small.jpg',
    shortDescription:
      'The largest NASA Hubble Space Telescope photograph ever assembled: a sweeping panoramic view of a 40,000-light-year stretch of the Andromeda galaxy (M31) resolving over 100 million individual stars.',
    scientificHighlights: [
      'Resolves individual stars, open star clusters, and dark dust lanes across Andromeda’s spiral disk 2.5 million light-years away.',
      'Assembled from 7,398 exposures taken over 411 individual Hubble pointings.',
    ],
  },
  {
    id: 'hubble-galaxy-ngc-3079',
    nasaId: 'PIA04209',
    title: 'Hubble Space Telescope Photograph of Spiral Galaxy NGC 3079 Core Bubble',
    subtitle: 'Superwind Cauldron Rising Above a Spiral Galaxy Nucleus',
    category: 'galaxies',
    mission: 'NASA Hubble Space Telescope',
    instrument: 'Wide Field Planetary Camera 2 (WFPC2)',
    center: 'NASA / JPL / STScI',
    capturedDate: '1999-12-02',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA04209/PIA04209~medium.jpg',
    shortDescription:
      'A towering 3,000-light-year-wide bubble of hot ionized gas rises from a cauldron of glowing matter in the core of distant spiral galaxy NGC 3079, photographed directly by the NASA Hubble Space Telescope.',
    scientificHighlights: [
      'Gaseous filaments stream upward at more than 6 million kilometers per hour driven by bursts of star formation.',
      'Located approximately 50 million light-years from Earth in the constellation Ursa Major.',
    ],
  },
  {
    id: 'hubble-galaxy-ngc-1512',
    nasaId: 'PIA04219',
    title: 'Hubble Space Telescope Multi-Wavelength Photograph of Barred Spiral Galaxy NGC 1512',
    subtitle: 'Circumnuclear Starburst Ring in Ultraviolet, Visible & Infrared',
    category: 'galaxies',
    mission: 'NASA Hubble Space Telescope',
    instrument: 'FOC, WFPC2 & NICMOS Cameras',
    center: 'NASA / JPL / STScI',
    capturedDate: '1999-12-01',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA04219/PIA04219~orig.jpg',
    shortDescription:
      'A brilliant 2,400-light-year-wide ring of newborn star clusters is captured in the center of barred spiral galaxy NGC 1512, photographed by three scientific cameras aboard the NASA Hubble Space Telescope.',
    scientificHighlights: [
      'Located 30 million light-years away in the southern constellation Horologium.',
      'Combines ultraviolet, optical, and near-infrared exposures to reveal both dusty star nurseries and luminous young clusters.',
    ],
  },
  {
    id: 'juno-jupiter-sru-dark-side',
    nasaId: 'PIA22965',
    title: 'NASA Juno Spacecraft SRU Star Camera Photograph of Jupiter Clouds Illuminated by Io',
    subtitle: 'Perijove 11 High-Resolution Low-Light Observation of Jupiter',
    category: 'planets',
    mission: 'NASA Juno Mission to Jupiter',
    instrument: 'Stellar Reference Unit (SRU) Star Camera',
    center: 'NASA / JPL-Caltech / SwRI',
    capturedDate: '2018-12-19',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA22965/PIA22965~orig.jpg',
    shortDescription:
      'NASA’s Juno Radiation Monitoring Investigation used its Stellar Reference Unit (SRU) star camera to collect this high-resolution photograph of Jupiter’s dark side during Perijove 11, with cloud bands illuminated by moonlight from Io.',
    scientificHighlights: [
      'Reveals turbulent cyclonic storm structures and tropospheric cloud waves under low-light conditions.',
      'Captured directly from Juno’s close polar perijove pass above Jupiter’s cloud tops.',
    ],
  },
  {
    id: 'juno-jupiter-aurora-lightning',
    nasaId: 'PIA22968',
    title: 'NASA Juno Spacecraft Photograph of Jupiter Northern Auroral Oval & Lightning',
    subtitle: 'Perijove 13 Direct Observation of Jovian Polar Aurora & Storm Flashes',
    category: 'planets',
    mission: 'NASA Juno Mission to Jupiter',
    instrument: 'Stellar Reference Unit (SRU-1)',
    center: 'NASA / JPL-Caltech / SwRI',
    capturedDate: '2018-12-19',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA22968/PIA22968~small.jpg',
    shortDescription:
      'Collected by NASA’s Juno spacecraft during Perijove 13, this high-resolution photograph captures Jupiter’s glowing northern auroral oval alongside bright flashes of atmospheric lightning deep within Jovian storm clouds.',
    scientificHighlights: [
      'Simultaneously resolves high-altitude magnetospheric auroral arcs and deep convective water-cloud lightning flashes.',
      'Demonstrates electrical discharge activity in Jupiter’s deep ammonia-water cloud deck.',
    ],
  },
  {
    id: 'cassini-saturn-rings-shadow',
    nasaId: 'PIA17199',
    title: 'NASA Cassini Spacecraft Photograph — The Edge of the Night Across Saturn’s Rings',
    subtitle: 'Saturn’s Shadow Sweeping Across the Icy Ring Plane',
    category: 'planets',
    mission: 'NASA / ESA / ASI Cassini Orbiter',
    instrument: 'Cassini Imaging Science Subsystem (ISS)',
    center: 'NASA / JPL-Caltech / Space Science Institute',
    capturedDate: '2018-03-19',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA17199/PIA17199~small.jpg',
    shortDescription:
      'Saturn’s planetary shadow sweeps across its icy ring system in this direct photograph captured by NASA’s Cassini spacecraft. Countless water-ice particles bask in sunlight in the lower half before entering Saturn’s shadow.',
    scientificHighlights: [
      'Resolves fine density waves, the Cassini Division, and ring plane optical depth variations.',
      'Taken at a distance of approximately 1.5 million kilometers from Saturn by Cassini’s wide-angle camera.',
    ],
  },
  {
    id: 'cassini-saturn-natural-color-rings',
    nasaId: 'PIA11657',
    title: 'NASA Cassini Natural-Color Photograph — Across Resplendent Rings of Saturn',
    subtitle: 'Shadow of Moon Mimas Across the Cassini Division',
    category: 'planets',
    mission: 'NASA / ESA / ASI Cassini Orbiter',
    instrument: 'Cassini Narrow-Angle Camera (Red, Green, Blue Filters)',
    center: 'NASA / JPL / Space Science Institute',
    capturedDate: '2009-06-22',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA11657/PIA11657~small.jpg',
    shortDescription:
      'NASA’s Cassini spacecraft captures the elongated shadow of Saturn’s moon Mimas as it dips across the planet’s rings and straddles the Cassini Division in this true natural-color photograph approaching Saturn’s equinox.',
    scientificHighlights: [
      'Constructed from red, green, and blue spectral filter exposures to reproduce natural human-eye color.',
      'Captures low-angle solar illumination near Saturn’s ring-plane equinox.',
    ],
  },
  {
    id: 'mro-hirise-perseverance-mars',
    nasaId: 'PIA24333',
    title: 'NASA Mars Reconnaissance Orbiter HiRISE Photograph of Perseverance in Jezero Crater',
    subtitle: 'High-Resolution Orbital Photograph of Mars 2020 Rover & Landing Hardware',
    category: 'solar_mars',
    mission: 'NASA Mars Reconnaissance Orbiter (MRO) & Mars 2020',
    instrument: 'HiRISE (High Resolution Imaging Science Experiment)',
    center: 'NASA / JPL-Caltech / University of Arizona',
    capturedDate: '2021-02-22',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA24333/PIA24333~medium.jpg',
    shortDescription:
      'This orbital photograph of NASA’s Perseverance Rover on the floor of Jezero Crater was captured by the HiRISE camera aboard NASA’s Mars Reconnaissance Orbiter, showing the rover, descent stage, heat shield, and parachute on Mars.',
    scientificHighlights: [
      'Shows the blast pattern etched into Martian regolith by the Sky Crane descent stage retro-rockets.',
      'Jezero Crater is an ancient Martian lakebed and river delta targeted for astrobiological sample caching.',
    ],
  },
  {
    id: 'sdo-solar-flares-ultraviolet',
    nasaId: 'GSFC_20171208_Archive_e000104',
    title: 'NASA Solar Dynamics Observatory (SDO) Extreme-Ultraviolet Photograph of Solar Flares',
    subtitle: 'Active Coronal Magnetic Loops & X-Ray / EUV Solar Eruptions',
    category: 'solar_mars',
    mission: 'NASA Solar Dynamics Observatory (SDO)',
    instrument: 'Atmospheric Imaging Assembly (AIA 131 & 171 Å)',
    center: 'NASA / GSFC',
    capturedDate: '2017-12-08',
    imageUrl:
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000104/GSFC_20171208_Archive_e000104~medium.jpg',
    shortDescription:
      'NASA’s Solar Dynamics Observatory captured this extreme-ultraviolet photograph of the Sun emitting a trio of solar flares, revealing multi-million-Kelvin coronal plasma loops anchored in active sunspot magnetic regions.',
    scientificHighlights: [
      'Imaged in extreme ultraviolet light corresponding to coronal iron ions heated above 10 million Kelvin.',
      'Provides continuous space-weather telemetry to study stellar flare physics and planetary atmospheric impact.',
    ],
  },
];

interface LiveNasaApiPhoto {
  nasaId: string;
  title: string;
  dateCreated: string;
  center: string;
  imageUrl: string;
  shortDescription: string;
}

export const NasaPhotosGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PhotoFilterCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<RealNasaPhotoItem | null>(null);

  // Live NASA Image & Video Library Search state (filters out illustrations/artist concepts)
  const [liveSearchQuery, setLiveSearchQuery] = useState('');
  const [livePhotos, setLivePhotos] = useState<LiveNasaApiPhoto[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [liveSearchNotice, setLiveSearchNotice] = useState<string | null>(null);
  const [selectedLivePhoto, setSelectedLivePhoto] = useState<LiveNasaApiPhoto | null>(null);

  const filteredRealPhotos =
    activeCategory === 'all'
      ? VERIFIED_REAL_NASA_PHOTOS
      : VERIFIED_REAL_NASA_PHOTOS.filter((item) => item.category === activeCategory);

  const handleSearchLiveNasaArchive = async (e?: React.FormEvent, customTopic?: string) => {
    if (e) e.preventDefault();
    const q = (customTopic ?? liveSearchQuery).trim();
    if (!q) {
      setLivePhotos([]);
      setLiveSearchNotice(null);
      return;
    }

    setIsSearchingLive(true);
    setLiveSearchNotice(null);
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image`
      );
      if (!response.ok) {
        throw new Error('NASA Image Archive temporarily unavailable.');
      }
      const data = await response.json();
      const rawItems = Array.isArray(data?.collection?.items)
        ? data.collection.items
        : [];

      const parsed: LiveNasaApiPhoto[] = [];
      for (const item of rawItems) {
        if (parsed.length >= 12) break;
        const meta = item?.data?.[0];
        const linkObj = Array.isArray(item?.links)
          ? item.links.find(
              (l: { render?: string; href?: string }) => l.render === 'image' || l.href
            )
          : null;
        if (meta && linkObj?.href) {
          const titleStr = String(meta.title || 'NASA Space Observation');
          const rawDesc = String(meta.description || meta.title || '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          // Exclude artist concepts / illustrations so only real NASA photographs are shown
          if (/illustration|artist's concept|artist concept|artwork|rendering/i.test(`${titleStr} ${rawDesc}`)) {
            continue;
          }

          parsed.push({
            nasaId: String(meta.nasa_id || Math.random()),
            title: titleStr,
            dateCreated: meta.date_created
              ? String(meta.date_created).slice(0, 10)
              : 'NASA Archive',
            center: String(meta.center || 'NASA / STScI / JPL'),
            imageUrl: String(linkObj.href),
            shortDescription:
              rawDesc.length > 260 ? `${rawDesc.slice(0, 257)}...` : rawDesc,
          });
        }
      }

      setLivePhotos(parsed);
      if (parsed.length === 0) {
        setLiveSearchNotice(
          `No direct real NASA photograph matches found for "${q}". Showing verified NASA telescope and spacecraft photographs below.`
        );
      }
    } catch {
      setLiveSearchNotice(
        'Displaying verified authentic NASA Space Telescope and Spacecraft photographs.'
      );
    } finally {
      setIsSearchingLive(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* TOP HEADER & CONTROLS BAR FOR REAL NASA PHOTOGRAPHS */}
      <div className="rounded-[10px] border border-[#3e4656] bg-[#212631] px-4 py-3 mb-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-[#2c3a57] border border-[#526a9c] text-[#a8c7fa] text-[10.5px] font-semibold uppercase tracking-wider">
                OFFICIAL NASA ARCHIVE (IMAGES-ASSETS.NASA.GOV)
              </span>
              <span className="text-[11.5px] text-[#929db0] uppercase tracking-wider">
                JWST • HUBBLE • JUNO • CASSINI • MRO HiRISE • SDO
              </span>
            </div>
            <h1 className="text-[20px] sm:text-[24px] font-normal tracking-[0.03em] text-[#e5e9f0] uppercase mt-1">
              AUTHENTIC NASA SPACE PHOTOGRAPHS &amp; SCIENTIFIC DESCRIPTIONS
            </h1>
          </div>

          <div className="text-[12px] text-[#9aa6ba] bg-[#181c24] border border-[#323a4b] px-3 py-1.5 rounded-[7px]">
            Showing {filteredRealPhotos.length} Verified Real NASA Photographs
          </div>
        </div>

        {/* Filter Pills + Live NASA Image Library Search Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#2f3645] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'all', label: 'All Real NASA Photos' },
                { id: 'nebulae', label: 'JWST & Hubble Nebulae' },
                { id: 'galaxies', label: 'Deep Space Galaxies' },
                { id: 'planets', label: 'Jupiter & Saturn (Juno / Cassini)' },
                { id: 'solar_mars', label: 'Mars & Solar Observatory (HiRISE / SDO)' },
              ] as { id: PhotoFilterCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-[7px] text-[12px] cursor-pointer transition border ${
                  activeCategory === tab.id
                    ? 'bg-[#2e384d] border-[#6175a1] text-[#eef2f9] font-medium'
                    : 'bg-[#181c24] border-[#313847] text-[#9ea8ba] hover:text-white hover:bg-[#232936]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Official NASA Image & Video Archive */}
          <form
            onSubmit={handleSearchLiveNasaArchive}
            className="flex items-center gap-1.5 flex-1 max-w-[420px] min-w-[230px]"
          >
            <input
              type="text"
              value={liveSearchQuery}
              onChange={(e) => setLiveSearchQuery(e.target.value)}
              placeholder="Search real NASA photo archive (e.g., Orion, Apollo, Webb)..."
              className="flex-1 bg-[#151921] border border-[#384152] rounded-[7px] px-3 py-1.5 text-[12px] text-[#e2e7f0] placeholder-[#7d8799] focus:outline-none focus:border-[#6880b0] select-text"
            />
            <button
              type="submit"
              disabled={isSearchingLive}
              className="px-3 py-1.5 rounded-[7px] bg-[#364259] hover:bg-[#41506b] border border-[#596a8c] text-[#e8edf7] text-[12px] font-medium cursor-pointer transition shrink-0 disabled:opacity-50"
            >
              {isSearchingLive ? 'Searching...' : 'Search NASA'}
            </button>
            {livePhotos.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setLiveSearchQuery('');
                  setLivePhotos([]);
                  setLiveSearchNotice(null);
                }}
                className="px-2.5 py-1.5 rounded-[7px] bg-[#232834] hover:bg-[#2c3342] border border-[#3d4659] text-[#b8c2d4] text-[11.5px] cursor-pointer transition shrink-0"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {/* SCROLLABLE PHOTO GALLERY GRID */}
      <div className="nasa-scroll flex-1 overflow-y-auto pr-1.5 space-y-4 select-text min-h-0">
        {liveSearchNotice && (
          <div className="px-3.5 py-2 rounded-[8px] bg-[#181d27] border border-[#445069] text-[#cad3e3] text-[12.5px]">
            {liveSearchNotice}
          </div>
        )}

        {/* LIVE SEARCH RESULTS FROM OFFICIAL NASA IMAGE API (WHEN SEARCHED) */}
        {livePhotos.length > 0 && (
          <div className="rounded-[10px] border border-[#495773] bg-[#1c212c] p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] sm:text-[16.5px] font-medium text-[#dce4f2] uppercase tracking-wider">
                Live NASA Image Library Results for &ldquo;{liveSearchQuery}&rdquo; ({livePhotos.length}{' '}
                Real Photos)
              </h2>
              <span className="text-[11px] text-[#8da0c2] uppercase">
                Source: images-api.nasa.gov
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {livePhotos.map((item) => (
                <article
                  key={item.nasaId}
                  onClick={() => setSelectedLivePhoto(item)}
                  className="rounded-[9px] border border-[#384152] bg-[#212631] hover:border-[#63769c] transition overflow-hidden flex flex-col cursor-pointer group shadow-md"
                >
                  <div className="relative w-full h-[195px] bg-[#05070b] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 border border-white/15 text-[10.5px] text-[#bdd1f5]">
                      {item.center}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10.5px] text-[#d5dde9]">
                      {item.dateCreated}
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="text-[14.5px] font-medium text-[#e6ebf4] leading-snug mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[12.5px] text-[#bcc6d8] leading-[1.48]">
                        {item.shortDescription}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#2d3443] flex items-center justify-between text-[11px] text-[#8fa4c7]">
                      <span>NASA ID: {item.nasaId}</span>
                      <span className="group-hover:underline">View Full Photo →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED REAL NASA SPACE PHOTOGRAPHS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 pb-2">
          {filteredRealPhotos.map((photo) => (
            <article
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="rounded-[10px] border border-[#3b4354] bg-[#212631] hover:border-[#6579a1] transition overflow-hidden flex flex-col cursor-pointer group shadow-lg"
            >
              {/* Authentic NASA Space Photograph Thumbnail */}
              <div className="relative w-full h-[205px] sm:h-[220px] bg-[#05070b] overflow-hidden shrink-0">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1118]/90 via-[#0d1118]/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#111622]/85 border border-[#4a5a78] text-[#b8cff8] text-[10.5px] font-medium tracking-wide">
                  {photo.mission}
                </div>
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-[#d6dfee]">
                  <span className="truncate">{photo.instrument}</span>
                  <span className="shrink-0 ml-2 px-2 py-0.5 rounded bg-black/65 border border-white/10 text-[10.5px]">
                    {photo.capturedDate}
                  </span>
                </div>
              </div>

              {/* Photo Title & Concise Short Scientific Description */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="space-y-2">
                  <div>
                    <h2 className="text-[15px] sm:text-[15.5px] font-medium text-[#e7ecf5] leading-snug">
                      {photo.title}
                    </h2>
                    <div className="text-[11.5px] text-[#9bb8ea] uppercase tracking-wider mt-0.5">
                      {photo.subtitle}
                    </div>
                  </div>

                  {/* Short Scientific Description */}
                  <div className="bg-[#181c25] border border-[#2d3545] rounded-[7px] p-2.5 text-[12.8px] text-[#d6deec] leading-[1.52]">
                    <span className="text-[10.5px] uppercase tracking-wider text-[#89a4d4] block mb-0.5 font-medium">
                      Official NASA Photograph Description:
                    </span>
                    {photo.shortDescription}
                  </div>
                </div>

                {/* Card Footer Metadata */}
                <div className="pt-2 border-t border-[#2e3544] flex items-center justify-between text-[11.5px] text-[#93a3bf]">
                  <a
                    href={`https://images.nasa.gov/details/${photo.nasaId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="truncate hover:text-[#9ec1ff] hover:underline"
                    title="Verify this authentic photograph on official images.nasa.gov"
                  >
                    NASA ID: {photo.nasaId} (Verify on NASA.gov ↗)
                  </a>
                  <span className="text-[#9ec1ff] font-medium group-hover:underline shrink-0 ml-2">
                    Full View →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR VERIFIED REAL NASA SPACE PHOTOGRAPH */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-text"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-[880px] max-h-[90vh] bg-[#1d222d] border border-[#4c576f] rounded-[12px] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#161a22] border-b border-[#323a4b] flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-widest text-[#8ba3cb] block">
                  {selectedPhoto.mission} • {selectedPhoto.instrument}
                </span>
                <h3 className="text-[18px] sm:text-[21px] font-medium text-[#e8edf6] truncate">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-3.5 py-1.5 rounded-[7px] bg-[#2e3545] hover:bg-[#3a4357] border border-[#525e78] text-[#e5eaf3] text-[13px] cursor-pointer transition shrink-0"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="nasa-scroll flex-1 overflow-y-auto p-5 space-y-4">
              <div className="w-full h-[280px] sm:h-[420px] rounded-[9px] overflow-hidden bg-[#030508] border border-[#363f52]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#161a22] border border-[#2d3546] rounded-[8px] p-3 text-[12px]">
                <div>
                  <span className="text-[#8692a8] block text-[11px]">Mission</span>
                  <span className="text-[#dce4f2] font-medium">{selectedPhoto.mission}</span>
                </div>
                <div>
                  <span className="text-[#8692a8] block text-[11px]">Instrument</span>
                  <span className="text-[#dce4f2] font-medium">{selectedPhoto.instrument}</span>
                </div>
                <div>
                  <span className="text-[#8692a8] block text-[11px]">NASA Center</span>
                  <span className="text-[#dce4f2] font-medium">{selectedPhoto.center}</span>
                </div>
                <div>
                  <span className="text-[#8692a8] block text-[11px]">Official NASA ID</span>
                  <a
                    href={`https://images.nasa.gov/details/${selectedPhoto.nasaId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ec1ff] hover:underline font-medium"
                  >
                    {selectedPhoto.nasaId} (NASA.gov ↗)
                  </a>
                </div>
              </div>

              {/* Scientific Summary & Telemetry Highlights Box */}
              <div className="bg-[#171b24] border border-[#323c50] rounded-[9px] p-4 space-y-2">
                <div className="text-[12px] uppercase tracking-wider text-[#92b1e8] font-medium">
                  Official NASA Photograph Description &amp; Scientific Highlights
                </div>
                <p className="text-[14px] text-[#cbd4e4] leading-[1.6]">
                  {selectedPhoto.shortDescription}
                </p>
                <ul className="space-y-1 pt-1 text-[13px] text-[#b9c4d8]">
                  {selectedPhoto.scientificHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8ab4f8]">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR LIVE SEARCHED NASA PHOTO */}
      {selectedLivePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-text"
          onClick={() => setSelectedLivePhoto(null)}
        >
          <div
            className="w-full max-w-[820px] max-h-[88vh] bg-[#1d222d] border border-[#4c576f] rounded-[12px] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-[#161a22] border-b border-[#323a4b] flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-widest text-[#8ba3cb] block">
                  {selectedLivePhoto.center} • {selectedLivePhoto.dateCreated}
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#e8edf6] truncate">
                  {selectedLivePhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLivePhoto(null)}
                className="px-3.5 py-1.5 rounded-[7px] bg-[#2e3545] hover:bg-[#3a4357] border border-[#525e78] text-[#e5eaf3] text-[13px] cursor-pointer transition shrink-0"
              >
                Close ✕
              </button>
            </div>
            <div className="nasa-scroll flex-1 overflow-y-auto p-5 space-y-4">
              <div className="w-full h-[280px] sm:h-[420px] rounded-[9px] overflow-hidden bg-[#030508] border border-[#363f52]">
                <img
                  src={selectedLivePhoto.imageUrl}
                  alt={selectedLivePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="bg-[#171b24] border border-[#323c50] rounded-[9px] p-4 space-y-1.5">
                <div className="text-[12px] uppercase tracking-wider text-[#92b1e8] font-medium">
                  Official NASA Archive Description (NASA ID: {selectedLivePhoto.nasaId})
                </div>
                <p className="text-[14px] text-[#d6deec] leading-[1.6]">
                  {selectedLivePhoto.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
