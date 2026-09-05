import React, { useState } from 'react';
import { Globe, ShieldCheck, Award, CheckCircle2, Plane, Building2, Truck } from 'lucide-react';
import exportCountriesData from '../../public_html/data/export-countries.json';
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

export const WorldMap: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>('All Export Markets');
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

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display mr-2">
              Filter Target Region:
            </span>
            <button
              onClick={() => setActiveRegion('All Export Markets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-display ${
                activeRegion === 'All Export Markets'
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Export Markets
            </button>
            {exportCountriesData.map((reg) => (
              <button
                key={reg.region}
                onClick={() => setActiveRegion(reg.region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-display ${
                  activeRegion === reg.region
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {reg.region}
              </button>
            ))}
          </div>

          {/* Color Legend */}
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-brand-teal inline-block" />
              <span className="font-semibold text-slate-800">Export Market</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block border border-slate-300" />
              <span className="text-slate-500">Other Countries</span>
            </span>
          </div>
        </div>

        {/* 100% REAL GEOGRAPHIC WORLD MAP (Flat Minimal 2D SaaS Style) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2 border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2 font-display font-bold text-slate-800">
              <Globe className="w-4 h-4 text-brand-teal" />
              <span>Verified Geographic Map (Hover any marker to reveal country name)</span>
            </div>
            
            <span className="font-mono text-[11px] text-brand-teal font-bold bg-white border border-brand-teal/30 px-2.5 py-0.5 rounded">
              Dispatch: Zero Mile Nagpur (Central Export Desk)
            </span>
          </div>

          {/* Authentic Real SVG World Map */}
          <div className="relative w-full my-auto">
            <svg viewBox="0 0 960 480" className="w-full h-auto max-h-[420px]">
              
              {/* SVG Background - Clean Light Canvas */}
              <rect width="960" height="480" fill="#F8FAFC" rx="8" />

              {/* 177 REAL WORLD COUNTRY PATHS */}
              {allFeatures.map((country) => {
                const isExport = country.is_export;
                const isRegionMatch = activeRegion === 'All Export Markets' || country.region === activeRegion;

                let fillColor = '#E2E8F0'; // Default non-export country (neutral light grey)
                if (isExport) {
                  if (isRegionMatch) {
                    fillColor = '#28B2A8'; // Solid uniform brand teal for all export markets
                  } else {
                    fillColor = '#A3E3DE'; // Soft teal when filtered
                  }
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
                          {m.flag} {m.name}
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

        {/* TARGET MARKETS DIRECTORY WITH FLAG ICONS */}
        <div className="space-y-6 pt-2">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-teal uppercase tracking-wider font-display mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Verified International Distribution Network</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                Target Export Markets & Global Footprint
              </h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-medium">Currently viewing:</span>
              <span className="px-3 py-1 bg-brand-soft text-brand-teal border border-brand-teal/30 rounded-lg text-xs font-bold font-display">
                {activeRegion}
              </span>
            </div>
          </div>

          {/* Regional Country Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {exportCountriesData
              .filter((r) => activeRegion === 'All Export Markets' || r.region === activeRegion)
              .map((reg) => (
                <div 
                  key={reg.region} 
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-brand-teal/40 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <span className="font-display font-bold text-sm text-slate-900 flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-brand-teal" />
                        <span>{reg.region}</span>
                      </span>
                      <span className="text-[11px] font-bold font-mono px-2 py-0.5 bg-white border border-slate-200 rounded-full text-slate-600">
                        {reg.countries.length} Markets
                      </span>
                    </div>

                    {/* Country Pills with Flags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {reg.countries.map((countryName) => {
                        const flag = COUNTRY_FLAGS[countryName] || '🌐';
                        const matchingFeature = exportFeatures.find(
                          (f) => f.name?.toLowerCase() === countryName.toLowerCase()
                        );

                        return (
                          <div
                            key={countryName}
                            onMouseEnter={() => matchingFeature && setHoveredCountry(matchingFeature)}
                            onMouseLeave={() => matchingFeature && setHoveredCountry(null)}
                            className="flex items-center space-x-2 px-2.5 py-1.5 bg-white rounded-xl border border-slate-200/80 hover:border-brand-teal hover:bg-brand-soft/40 transition-all cursor-default group"
                          >
                            <span className="text-xl shrink-0 select-none" role="img" aria-label={countryName}>
                              {flag}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 truncate group-hover:text-brand-teal transition-colors">
                                {countryName}
                              </p>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Active Market" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1 font-medium">
                      <Truck className="w-3 h-3 text-brand-teal" />
                      <span>Direct Express Dispatch</span>
                    </span>
                    <span className="font-semibold text-brand-teal">Available</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Central Export Origin Card & One Country One Distribution Policy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            
            {/* Origin Desk */}
            <div className="p-5 rounded-2xl bg-white border-2 border-brand-teal/40 shadow-xs flex items-center space-x-4">
              <span className="text-4xl select-none" role="img" aria-label="India">
                🇮🇳
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-brand-teal bg-brand-soft px-2 py-0.5 rounded">
                  Global Export Desk & Origin
                </span>
                <h4 className="font-display font-bold text-base text-slate-900 mt-1">
                  India (Nagpur HQ Zero-Mile)
                </h4>
                <p className="text-xs text-slate-600">
                  Central India Export Corporate HQ & Worldwide Dispatch
                </p>
              </div>
            </div>

            {/* One Country One Distribution Network Banner */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-brand-dark text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-brand-teal/30 shadow-md">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-brand-teal" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-brand-teal uppercase tracking-wider font-display">
                      Exclusive Policy
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-brand-teal text-white rounded-full">
                      Protected Importer Rights
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">
                    One Country One Distribution Network
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    We maintain strict territorial exclusivity for qualified ophthalmic distributors. All export shipments include ISO 13485:2016, CE dossiers, and official Certificate of Origin.
                  </p>
                </div>
              </div>

              <a
                href="/contact-us"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-xl text-xs font-bold font-display shadow-sm transition-all shrink-0 hover:shadow-md"
              >
                <span>Apply for Agency</span>
                <Plane className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
