import React, { useState } from 'react';
import { Globe, ShieldCheck, Award, CheckCircle2, Plane, Building2, Truck } from 'lucide-react';
import worldPaths from './worldPaths.json';

interface CountryFeature {
  id: string;
  d: string;
  cx: number;
  cy: number;
  is_export: boolean;
  name: string | null;
  region: string | null;
  flag: string | null;
  is_origin?: boolean;
}

const COUNTRY_FLAGS: Record<string, string> = {
  // North America & Canada
  'Canada': '🇨🇦',
  'United States': '🇺🇸',
  'Mexico': '🇲🇽',
  // Central America
  'Costa Rica': '🇨🇷',
  'Panama': '🇵🇦',
  'Guatemala': '🇬🇹',
  'Dominican Republic': '🇩🇴',
  // Latin America
  'Brazil': '🇧🇷',
  'Colombia': '🇨🇴',
  'Peru': '🇵🇪',
  'Chile': '🇨🇱',
  'Argentina': '🇦🇷',
  // Europe
  'Germany': '🇩🇪',
  'United Kingdom': '🇬🇧',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Netherlands': '🇳🇱',
  'Poland': '🇵🇱',
  'Turkey': '🇹🇷',
  // African Continent
  'Kenya': '🇰🇪',
  'Nigeria': '🇳🇬',
  'South Africa': '🇿🇦',
  'Egypt': '🇪🇬',
  'Tanzania': '🇹🇿',
  'Ethiopia': '🇪🇹',
  'Ghana': '🇬🇭',
  'Uganda': '🇺🇬',
  // Middle East & Asia
  'UAE': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'Oman': '🇴🇲',
  'Vietnam': '🇻🇳',
  'Indonesia': '🇮🇩',
  'Thailand': '🇹🇭',
  'Malaysia': '🇲🇾',
  'Nepal': '🇳🇵',
  // Origin HQ
  'India': '🇮🇳',
  'India (Nagpur HQ)': '🇮🇳',
};

export interface ExportCountryFlagItem {
  name: string;
  code: string;
  flag: string;
}

export const EXPORT_COUNTRIES_LIST: ExportCountryFlagItem[] = [
  { name: 'Canada', code: 'ca', flag: '🇨🇦' },
  { name: 'United States', code: 'us', flag: '🇺🇸' },
  { name: 'Mexico', code: 'mx', flag: '🇲🇽' },
  { name: 'Costa Rica', code: 'cr', flag: '🇨🇷' },
  { name: 'Panama', code: 'pa', flag: '🇵🇦' },
  { name: 'Guatemala', code: 'gt', flag: '🇬🇹' },
  { name: 'Dominican Republic', code: 'do', flag: '🇩🇴' },
  { name: 'Brazil', code: 'br', flag: '🇧🇷' },
  { name: 'Colombia', code: 'co', flag: '🇨🇴' },
  { name: 'Peru', code: 'pe', flag: '🇵🇪' },
  { name: 'Chile', code: 'cl', flag: '🇨🇱' },
  { name: 'Argentina', code: 'ar', flag: '🇦🇷' },
  { name: 'Germany', code: 'de', flag: '🇩🇪' },
  { name: 'United Kingdom', code: 'gb', flag: '🇬🇧' },
  { name: 'France', code: 'fr', flag: '🇫🇷' },
  { name: 'Italy', code: 'it', flag: '🇮🇹' },
  { name: 'Spain', code: 'es', flag: '🇪🇸' },
  { name: 'Netherlands', code: 'nl', flag: '🇳🇱' },
  { name: 'Poland', code: 'pl', flag: '🇵🇱' },
  { name: 'Turkey', code: 'tr', flag: '🇹🇷' },
  { name: 'Kenya', code: 'ke', flag: '🇰🇪' },
  { name: 'Nigeria', code: 'ng', flag: '🇳🇬' },
  { name: 'South Africa', code: 'za', flag: '🇿🇦' },
  { name: 'Egypt', code: 'eg', flag: '🇪🇬' },
  { name: 'Tanzania', code: 'tz', flag: '🇹🇿' },
  { name: 'Ethiopia', code: 'et', flag: '🇪🇹' },
  { name: 'Ghana', code: 'gh', flag: '🇬🇭' },
  { name: 'Uganda', code: 'ug', flag: '🇺🇬' },
  { name: 'UAE', code: 'ae', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: 'sa', flag: '🇸🇦' },
  { name: 'Oman', code: 'om', flag: '🇴🇲' },
  { name: 'Vietnam', code: 'vn', flag: '🇻🇳' },
  { name: 'Indonesia', code: 'id', flag: '🇮🇩' },
  { name: 'Thailand', code: 'th', flag: '🇹🇭' },
  { name: 'Malaysia', code: 'my', flag: '🇲🇾' },
  { name: 'Nepal', code: 'np', flag: '🇳🇵' },
];

const SLIDING_FLAGS = [...EXPORT_COUNTRIES_LIST, ...EXPORT_COUNTRIES_LIST];

export const WorldMap: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(null);

  const allFeatures = worldPaths as CountryFeature[];
  const exportFeatures = allFeatures.filter((f) => f.is_export && Boolean(f.name));

  return (
    <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md relative overflow-hidden font-body">
      
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Section Header with UI/UX Stats Strip */}
        <div className="space-y-6 border-b border-slate-200 pb-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-brand-soft border border-brand-teal/30 rounded-full text-xs font-semibold text-brand-teal uppercase tracking-wider font-display">
                <Globe className="w-3.5 h-3.5 text-brand-teal" />
                <span>21-Year International Supply Chain (Est. 2004)</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                Global Export Footprint & Target Markets
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Direct B2B export and supply of ophthalmic equipment, instruments, and ioVue IOLs dispatched globally from Nagpur Zero-Mile HQ, India.
              </p>
            </div>

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-soft border border-brand-teal/30 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>ISO 13485:2016</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-soft border border-brand-teal/30 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                <Award className="w-4 h-4 text-brand-teal" />
                <span>CE Mark Dossiers</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-soft border border-brand-teal/30 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span>WHO-GMP Guidelines</span>
              </span>
            </div>
          </div>

          {/* 4 Creative Glassmorphic Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-1">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand-teal">21+ Years</span>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider font-display">Export Mastery</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-1">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">31+</span>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider font-display">Export Countries</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-1">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand-teal">400+</span>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider font-display">Catalog Items</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-1">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">Zero Mile</span>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider font-display">Nagpur Export HQ</p>
            </div>
          </div>

        </div>

        {/* Small Flags Sliding to the Right (Exactly 6 Visible at a Time) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-display flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-teal" />
              <span>International Export Markets ({EXPORT_COUNTRIES_LIST.length} Direct Destinations)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Hover any flag to pause & highlight on map
            </span>
          </div>

          <div className="relative overflow-hidden w-full bg-slate-50/90 py-2.5 px-1 rounded-2xl border border-slate-200">
            {/* Soft Edge Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <style>{`
              @keyframes slideFlagsToRight {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .animate-flags-slide-right {
                animation: slideFlagsToRight 40s linear infinite;
              }
              .animate-flags-slide-right:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div
              className="flex items-center animate-flags-slide-right"
              style={{ width: '1200%' }}
            >
              {SLIDING_FLAGS.map((c, idx) => {
                const countryFeature = allFeatures.find((f) => f.name === c.name);
                const isHovered = hoveredCountry?.name === c.name;

                return (
                  <div
                    key={`${c.code}-${idx}`}
                    style={{ width: `${100 / 72}%` }}
                    className="px-1.5 shrink-0"
                    onMouseEnter={() => countryFeature && setHoveredCountry(countryFeature)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <div
                      className={`flex items-center justify-center sm:justify-start space-x-2 px-2.5 py-1.5 bg-white rounded-xl border transition-all cursor-pointer shadow-2xs h-10 ${
                        isHovered
                          ? 'border-brand-teal bg-brand-soft ring-2 ring-brand-teal/30 shadow-xs'
                          : 'border-slate-200 hover:border-brand-teal'
                      }`}
                      title={c.name}
                    >
                      <img
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        srcSet={`https://flagcdn.com/w80/${c.code}.png 2x`}
                        alt={c.name}
                        className="w-5 h-3.5 object-cover rounded-xs border border-slate-200 shadow-2xs shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fb = e.currentTarget.nextElementSibling;
                          if (fb) fb.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden text-sm shrink-0 leading-none">{c.flag}</span>
                      <span className="text-xs font-bold text-slate-800 truncate font-display hidden sm:inline">
                        {c.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 100% REAL GEOGRAPHIC WORLD MAP (Flat Minimal 2D SaaS Style) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          <div className="flex flex-wrap justify-between items-center text-xs text-slate-600 mb-2 border-b border-slate-200 pb-3 gap-2">
            <div className="flex items-center space-x-2 font-display font-bold text-slate-800">
              <Globe className="w-4 h-4 text-brand-teal" />
              <span>Verified Geographic Map (Hover any marker or flag to reveal details)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-brand-teal inline-block" />
                <span className="text-slate-800 text-[11px] font-bold">Export Market</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 inline-block border border-slate-300" />
                <span className="text-slate-500 text-[11px]">Other Countries</span>
              </span>
              <span className="font-mono text-[11px] text-brand-teal font-bold bg-white border border-brand-teal/30 px-2.5 py-0.5 rounded shadow-2xs">
                Nagpur Export HQ
              </span>
            </div>
          </div>

          {/* Authentic Real SVG World Map */}
          <div className="relative w-full my-auto">
            <svg viewBox="0 0 960 480" className="w-full h-auto max-h-[420px]">
              
              {/* SVG Background - Clean Light Canvas */}
              <rect width="960" height="480" fill="#F8FAFC" rx="8" />

              {/* 177 REAL WORLD COUNTRY PATHS */}
              {allFeatures.map((country) => {
                const isExport = country.is_export;
                const isHovered = hoveredCountry?.id === country.id || hoveredCountry?.name === country.name;

                let fillColor = '#E2E8F0'; // Default non-export country (neutral light grey)
                if (isExport) {
                  fillColor = isHovered ? '#0D3666' : '#28B2A8'; // Solid uniform brand teal for all export markets
                }

                return (
                  <path
                    key={country.id}
                    d={country.d}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth="0.6"
                    className={`transition-colors duration-150 ${isExport ? 'cursor-pointer' : ''}`}
                    onMouseEnter={() => isExport && setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <title>{country.name || `Country ID: ${country.id}`}</title>
                  </path>
                );
              })}

              {/* CLEAN 2D COUNTRY PIN MARKERS WITH HOVER TOOLTIPS */}
              {exportFeatures.map((m) => {
                if (!m.cx || !m.cy || isNaN(m.cx) || isNaN(m.cy)) return null;
                const isHovered = hoveredCountry?.id === m.id;

                return (
                  <g 
                    key={`pin-${m.id}`}
                    onMouseEnter={() => setHoveredCountry(m)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    className="cursor-pointer"
                  >
                    {/* Circle Marker */}
                    <circle 
                      cx={m.cx} 
                      cy={m.cy} 
                      r={isHovered ? "6" : "3.5"} 
                      fill={isHovered ? '#0D3666' : '#FFFFFF'} 
                      stroke={isHovered ? '#FFFFFF' : '#0D3666'} 
                      strokeWidth="1.5" 
                      className="transition-all duration-150"
                    />

                    {/* Hover Country Name Tooltip */}
                    {isHovered && (
                      <g className="animate-in fade-in duration-150 pointer-events-none">
                        <rect 
                          x={m.cx - 50} 
                          y={m.cy - 26} 
                          width="100" 
                          height="20" 
                          rx="4" 
                          fill="#0D3666" 
                          stroke="#28B2A8" 
                          strokeWidth="1"
                        />
                        <text 
                          x={m.cx} 
                          y={m.cy - 12} 
                          textAnchor="middle" 
                          fill="#FFFFFF" 
                          fontSize="10" 
                          fontWeight="bold" 
                          fontFamily="Plus Jakarta Sans"
                        >
                          {(m.flag || (m.name && COUNTRY_FLAGS[m.name])) || '🌐'} {m.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

            </svg>
          </div>

          {/* Footer Caption */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200 gap-2">
            <span className="font-medium text-slate-700">
              Natural Earth 1:110m verified real country borders. Hover any marker for country details.
            </span>
            <span className="text-brand-teal font-bold font-mono text-[11px]">
              Nagpur Zero-Mile Corporate HQ (India)
            </span>
          </div>

        </div>

        {/* EXCLUSIVE POLICY: ONE COUNTRY ONE DISTRIBUTION NETWORK (Light Theme) */}
        <div className="p-6 rounded-2xl bg-brand-soft/80 border-2 border-brand-teal/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-slate-900">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-teal/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-brand-teal" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-brand-teal uppercase tracking-wider font-display">
                  Exclusive Policy
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-brand-teal text-white rounded-full">
                  Protected Importer Rights
                </span>
              </div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                One Country One Distribution Network
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                We maintain strict territorial exclusivity for qualified ophthalmic distributors. All export shipments include ISO 13485:2016, CE dossiers, and official Certificate of Origin.
              </p>
            </div>
          </div>

          <a
            href="/contact-us"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-teal hover:bg-[#20968E] text-white rounded-xl text-xs font-bold font-display shadow-sm transition-all shrink-0 hover:shadow-md cursor-pointer"
          >
            <span>Apply for Agency</span>
            <Plane className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

      </div>
    </div>
  );
};
