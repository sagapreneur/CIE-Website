import React, { useState } from 'react';
import { Container, Button, Badge } from './Primitives';
import { FileText, ChevronLeft, ChevronRight, ShieldCheck, Check, ZoomIn, ArrowRight, Eye, Award, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface IoVueProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const IOVUE_PRODUCTS: IoVueProductItem[] = [
  {
    id: 'iovue-preloaded-hydrophobic',
    name: 'IOVUE™ Pre-Loaded Hydrophobic Aspheric Series (IHA-P & IHY-P)',
    tagline: 'Sterile Touchless Pre-Loaded Delivery System for Sub-2.2mm Incisions',
    description: 'Factory pre-loaded hydrophobic aspheric intraocular lens integrated with a sterile, single-use injector cartridge system. Guarantees touchless loading, precise incision entry, and zero lens damage during implantation.',
    image: '/iovue/iovue-phobic.png',
    features: [
      'Touchless sterile pre-loaded injector mechanism',
      'Sub-2.2mm micro-incision cataract surgery (MICS) delivery',
      'Glisten-free hydrophobic acrylic polymer with 1.49 refractive index',
      '360° continuous step square edge for PCO prevention'
    ],
    specs: [
      { label: 'Registered Models', value: 'IHA 6025P, IHA 6030P, IHY 6025P, IHY 6030P' },
      { label: 'Optic Profile', value: 'Aberration-Neutral Negative Aspheric' },
      { label: 'Optic / Overall Dia', value: '6.00 mm / 12.50 mm & 13.00 mm' },
      { label: 'Diopter Power Range', value: '+10.0 D to +30.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant', value: '118.9' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'iovue-edof-series',
    name: 'IOVUE™ EDOF Extended Depth of Focus Series (IHCE & IFCE)',
    tagline: 'Continuous Intermediate-to-Distance Visual Acuity with Minimal Glare',
    description: 'Engineered with specialized non-diffractive wavefront-shaping optics providing extended depth of focus. Offers exceptional distance and intermediate (computer/dashboard) vision without the halos and glare of diffractive multifocals.',
    image: '/iovue/iovue-aspheric-acrylic.png',
    features: [
      'Extended intermediate visual range for computer & mobile use',
      'Minimal nocturnal halos or glare (non-diffractive profile)',
      'Available in both Hydrophobic (IHCE/IHYE) and Hydrophilic (IFCE/IFYE)',
      'Available in Clear and Macular-Protective Natural Yellow Tint'
    ],
    specs: [
      { label: 'Registered Models', value: 'IHCE 6025/6030, IHYE 6025/6030, IFCE 6025/D, IFYE 6025/D' },
      { label: 'Optic Profile', value: 'Wavefront Extended Depth of Focus (EDOF)' },
      { label: 'Optic / Overall Dia', value: '6.00 mm / 12.50 mm & 13.00 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant', value: '118.2 (Hydrophilic) / 118.9 (Hydrophobic)' },
      { label: 'Sterilization', value: 'Steam Autoclave / ETO Gas' }
    ]
  },
  {
    id: 'iovue-hydrophobic-acrylic',
    name: 'IOVUE™ IHA / IHY Series Hydrophobic Acrylic Foldable IOL',
    tagline: 'Glisten-Free Hydrophobic Acrylate with 360° Continuous Step Square Edge',
    description: 'High refractive index (1.49 / 1.56) glisten-free hydrophobic PEA/PEMA copolymer monofocal lens featuring modified 5° C-loop haptic geometry for exceptional capsular bag stability and low PCO rates.',
    image: '/iovue/iovue-blue-filter-yellow.png',
    features: [
      'Glisten-Free Cryo-Lathed PEA/PEMA Hydrophobic Polymer',
      'Aberration-Neutral Negative Aspheric Optics',
      '360° Step Square Edge Optical Boundary',
      'Available in standard 12.50mm and large 13.00mm diameters'
    ],
    specs: [
      { label: 'Registered Models', value: 'IHA 6025, IHA 6030, IHY 6025, IHY 6030' },
      { label: 'Optic Profile', value: 'Aberration-Neutral Negative Aspheric' },
      { label: 'Optic / Overall Dia', value: '6.00 mm / 12.50 mm (6025) & 13.00 mm (6030)' },
      { label: 'Diopter Power Range', value: '+4.0 D to +35.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant', value: '118.7' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'iovue-hydrophilic-acrylic',
    name: 'IOVUE™ IFS / IFA / IYA Series Hydrophilic Acrylic Foldable IOL',
    tagline: '26% High Biocompatibility Water Content with Aberration-Neutral Optics',
    description: 'Synthesized from medical-grade 26% equilibrium water content pHEMA copolymer. Features 0° pre-vaulted and modified C-loop haptics, available in Clear and Yellow tints across standard 12.5mm and compact 11.0mm lengths.',
    image: '/iovue/iovue-yellow-filter-hydrophilic.png',
    features: [
      '26% Equilibrium Water Content for superior tissue tolerance',
      'Sub-2.2mm MICS cartridge delivery with smooth unfolding',
      'Compact 11.00mm diameter models (IFA 6010, IYA 6010) for small eyes',
      '0° Pre-vaulted models (IFS/IFA/IYA 6025D) for capsular adhesion'
    ],
    specs: [
      { label: 'Registered Models', value: 'IFS 6025/D, IFA 6025/D, IFA 6010, IYA 6025/D, IYA 6010' },
      { label: 'Optic Profile', value: 'Biconvex Spheric & Aberration-Neutral Aspheric' },
      { label: 'Optic / Overall Dia', value: '6.00 mm / 12.50 mm & 11.00 mm' },
      { label: 'Diopter Range', value: '-5.0 D to +35.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant', value: '118.0' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-pmma-series',
    name: 'IOVUE™ IPS / IPA / IPY / IAC / Iris-Claw PMMA Series',
    tagline: 'High Molecular Weight Clinical CQ PMMA with UV Filtration',
    description: 'High-purity clinical grade PMMA intraocular lenses with 360° advance square edge for ECCE and SICS procedures, anterior chamber angle support (IAC 6025), and aphakic iris-claw reconstruction (IPS 5580).',
    image: '/iovue/iovue-pmma-single-piece.png',
    features: [
      'High Molecular Weight Clinical-Grade CQ PMMA with UV Absorber',
      '360° Continuous Step Square Edge',
      'Specialized Iris Claw Fixation (IPS 5580: 5.5mm Optic / 8.0mm Length)',
      'Anterior Chamber 4-Point Flexible Support (IAC 6025)'
    ],
    specs: [
      { label: 'Registered Models', value: 'IPS 5525, IPS 6025, IAC 6025, IPA 6025, IPY 6025, IPS 5580' },
      { label: 'Optic Profile', value: 'Biconvex Spheric / Aspheric / Iris Claw' },
      { label: 'Optic / Overall Dia', value: '5.50-6.00 mm / 8.00-12.50 mm' },
      { label: 'Diopter Range', value: '+0.0 D to +35.0 D' },
      { label: 'Estimated A-Constant', value: '118.2 (PC) / 115.3 (AC) / 115.0 (Iris Claw)' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  }
];

interface IoVueShowcaseProps {
  onOpenRfq: (productName?: string) => void;
}

export const IoVueShowcase: React.FC<IoVueShowcaseProps> = ({ onOpenRfq }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const currentProd = IOVUE_PRODUCTS[currentIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IOVUE_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === IOVUE_PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gradient-to-br from-brand-soft/60 via-white to-slate-100/80 text-slate-900 py-10 md:py-14 relative overflow-hidden border-y border-brand-teal/20">
      
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

      <Container className="relative z-10 space-y-6">
        
        {/* Compact Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-white border border-brand-teal/30 text-xs font-bold text-brand-teal uppercase tracking-wider font-display shadow-2xs">
              <Award className="w-3.5 h-3.5" />
              <span>Flagship Intraocular Lens Brand · IOVUE™ Series</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              IOVUE™ Premium Intraocular Lenses
            </h2>
          </div>

          {/* Compact Carousel Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-white hover:bg-brand-teal text-slate-700 hover:text-white border border-slate-200 shadow-2xs transition-all shrink-0"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-700 px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              {currentIndex + 1} / {IOVUE_PRODUCTS.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-white hover:bg-brand-teal text-slate-700 hover:text-white border border-slate-200 shadow-2xs transition-all shrink-0"
              aria-label="Next Product"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal & Sophisticated Segmented Model Selector Bar */}
        <div className="space-y-2">
          {/* Desktop & Tablet Segmented Pill Bar */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner overflow-x-auto scrollbar-none">
            {IOVUE_PRODUCTS.map((prod, idx) => {
              const shortNames = [
                '01. Aspheric Hydrophilic',
                '02. PHOB Hydrophobic 3P',
                '03. Blue Filter Yellow',
                '04. Quad-Haptic Aspheric',
                '05. PMMA 360° Advance',
                '06. Iris Fixation PMMA',
                '07. PMMA 3-Piece UV',
                '08. Yellow Filter 360°',
                '09. Hydrophilic MICS',
                '10. Phobic Monofocal'
              ];
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all duration-200 flex items-center space-x-2 shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-sm border border-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 font-medium'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                    isSelected ? 'bg-brand-teal animate-pulse' : 'bg-slate-300'
                  }`} />
                  <span>{shortNames[idx]}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Select Dropdown */}
          <div className="sm:hidden">
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 shadow-2xs focus:ring-2 focus:ring-brand-teal focus:outline-none"
            >
              {IOVUE_PRODUCTS.map((prod, idx) => (
                <option key={prod.id} value={idx}>
                  Model {idx + 1}: {prod.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* COMPACT SHOWCASE DISPLAY CARD - LIGHT COLOR THEME */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Compact Product Image with Zoom */}
          <div className="lg:col-span-5 space-y-3">
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-inner flex flex-col items-center justify-center min-h-[240px] max-h-[300px] relative overflow-hidden group/zoom cursor-crosshair"
            >
              <img 
                src={currentProd.image} 
                alt={currentProd.name} 
                className="max-h-64 sm:max-h-72 w-auto object-contain mx-auto transition-transform duration-150 ease-out" 
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isHovered ? 'scale(2.2)' : 'scale(1)'
                }}
              />
              
              {/* Magnifying Glass Indicator */}
              <div className="absolute bottom-2.5 right-2.5 bg-white/90 text-slate-800 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold border border-brand-teal/30 shadow-2xs flex items-center space-x-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-brand-teal" />
                <span>{isHovered ? '2.2x Zooming' : 'Hover to Magnify'}</span>
              </div>

              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-brand-teal text-white font-bold text-[10px] rounded uppercase tracking-wider shadow-2xs">
                IOVUE™ Flagship
              </span>
            </div>

            {/* Certifications Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">Standards</span>
                <strong className="text-brand-teal font-bold text-[11px]">ISO 13485 & CE Mark</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">PCO Shield</span>
                <strong className="text-slate-900 font-bold text-[11px]">360° Square Edge</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">Export Hub</span>
                <strong className="text-slate-900 font-bold text-[11px]">Nagpur HQ</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Name, Description & Compact Specs Table */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title & Tagline */}
            <div className="space-y-1">
              <Badge variant="blue">{currentProd.name.includes('PMMA') ? 'Clinical PMMA' : 'Hydrophilic / Hydrophobic'}</Badge>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                {currentProd.name}
              </h3>
              <p className="text-brand-teal font-bold text-xs sm:text-sm">
                {currentProd.tagline}
              </p>
            </div>

            {/* Concise Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              {currentProd.description}
            </p>

            {/* Compact Technical Specifications Table (2 Columns) */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-teal font-display flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-teal" />
                <span>Technical Specifications Table:</span>
              </h4>
              
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  
                  {/* Table Column 1 */}
                  <div className="divide-y divide-slate-200">
                    {currentProd.specs.slice(0, 4).map((spec, sIdx) => (
                      <div key={sIdx} className="py-1.5 px-3 flex justify-between items-center hover:bg-white transition-colors">
                        <span className="text-slate-500 font-medium text-[11px]">{spec.label}</span>
                        <strong className="text-slate-900 font-mono text-right pl-2 text-[11px]">{spec.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Table Column 2 */}
                  <div className="divide-y divide-slate-200">
                    {currentProd.specs.slice(4, 8).map((spec, sIdx) => (
                      <div key={sIdx} className="py-1.5 px-3 flex justify-between items-center hover:bg-white transition-colors">
                        <span className="text-slate-500 font-medium text-[11px]">{spec.label}</span>
                        <strong className="text-slate-900 font-mono text-right pl-2 text-[11px]">{spec.value}</strong>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* Compact CTAs */}
            <div className="pt-1 flex flex-wrap gap-3 items-center">
              <button 
                onClick={() => {
                  addToCart({
                    id: currentProd.id,
                    name: currentProd.name,
                    slug: currentProd.id,
                    main_category: 'Intraocular Lenses',
                    image_url: currentProd.image
                  }, 100);
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-teal hover:bg-[#20968E] text-white font-bold font-display text-xs shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                <span>Add {currentProd.name.split(' ')[0]} {currentProd.name.split(' ')[1]} to Cart</span>
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center space-x-1.5 shrink-0"
              >
                <span>Next Lens ({currentIndex + 2 > IOVUE_PRODUCTS.length ? 1 : currentIndex + 2}/{IOVUE_PRODUCTS.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-teal" />
              </button>
            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};
