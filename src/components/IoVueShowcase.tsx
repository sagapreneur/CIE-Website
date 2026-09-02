import React, { useState } from 'react';
import { Container, Button, Badge } from './Primitives';
import { FileText, ChevronLeft, ChevronRight, ShieldCheck, Check, ZoomIn, ArrowRight, Eye, Award } from 'lucide-react';

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
    id: 'iovue-aspheric-acrylic',
    name: 'ioVue Aspheric Hydrophilic Acrylic Foldable IOL',
    tagline: 'Aberration-Free Monofocal Optics with 360° Continuous Square Edge',
    description: 'Precision-engineered hydrophilic acrylic intraocular lens with 360° posterior square edge technology to inhibit posterior capsule opacification (PCO). Designed for effortless micro-incision cataract surgery (MICS) with superb contrast sensitivity.',
    image: '/iovue/iovue-aspheric-acrylic.png',
    features: [
      '360° Continuous Square Edge to prevent PCO',
      'Aberration-Free Aspheric Optics for superior depth of focus',
      '26% Water Content Hydrophilic Acrylic material',
      'Micro-Incision (MICS) compatible through 2.2mm cartridge'
    ],
    specs: [
      { label: 'Optic Type', value: 'Aspheric Monofocal (Aberration-Free)' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '12.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D (0.5D increments)' },
      { label: 'A-Constant', value: '118.5' },
      { label: 'ACD', value: '5.0 mm' },
      { label: 'Refractive Index', value: '1.46 (Hydrated at 35°C)' },
      { label: 'Haptic Design', value: 'Single Piece Modified C-Loop (0° Angle)' },
      { label: 'Square Edge', value: '360° Continuous Posterior Square Edge' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-phob-hydrophobic',
    name: 'ioVue PHOB - Hydrophobic Acrylic 3-Piece IOL',
    tagline: 'Glisten-Free Hydrophobic Polymer with Superior Capsular Stability',
    description: 'Advanced hydrophobic acrylic 3-piece foldable intraocular lens featuring PVDF haptics angled at 5° for optimal capsular bag centration. Engineered for zero glistenings with exceptional rotational stability.',
    image: '/iovue/iovue-phob-hydrophobic.png',
    features: [
      'Glisten-Free Hydrophobic Acrylic formulation',
      'Blue PVDF Haptics with 5° angulation for solid capsular fit',
      '360° Micro-Edge technology for PCO prevention',
      'High refractive index (1.53) for ultra-thin profile'
    ],
    specs: [
      { label: 'Optic Type', value: 'Biconvex Hydrophobic Monofocal' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '13.00 mm' },
      { label: 'Diopter Range', value: '+5.0 D to +35.0 D (0.5D increments)' },
      { label: 'A-Constant', value: '118.7' },
      { label: 'ACD', value: '5.2 mm' },
      { label: 'Haptic Material', value: 'Blue PVDF Haptics (5° Angulation)' },
      { label: 'Refractive Index', value: '1.53' },
      { label: 'Square Edge', value: '360° Micro-Edge Technology' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'iovue-blue-filter-yellow',
    name: 'ioVue Blue Filter Yellow Aspheric IOL',
    tagline: 'Natural Photoprotective Blue-Light Blocking Chromophore',
    description: 'Natural yellow-chromophore hydrophobic acrylic IOL engineered to mimic the human crystalline lens. Filters harmful UV and high-energy blue light (400–450nm) to protect macular retina while preserving scotopic vision.',
    image: '/iovue/iovue-blue-filter-yellow.png',
    features: [
      'Natural Yellow Chromophore for Macular Photoprotection',
      'UV & Blue Light Filtering (<450nm wavelength cut-off)',
      'Aspheric optics for enhanced night driving contrast',
      'Smooth injector delivery through sub-2.4mm incisions'
    ],
    specs: [
      { label: 'Optic Type', value: 'Aspheric Yellow Chromophore' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '12.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D (0.5D steps)' },
      { label: 'A-Constant', value: '118.5' },
      { label: 'Light Spectrum', value: 'UV & Blue Light Cut-off (<450nm)' },
      { label: 'Refractive Index', value: '1.48' },
      { label: 'Haptic Design', value: 'Single Piece Modified C-Loop' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO)' },
      { label: 'Delivery System', value: 'Pre-loaded / Cartridge Injector' }
    ]
  },
  {
    id: 'iovue-quad-haptic',
    name: 'ioVue Aspheric Quad-Haptic Acrylic Foldable IOL',
    tagline: '4-Point Haptic Centration for Maximum Rotational & Capsular Stability',
    description: 'Unique 4-point haptic geometry engineered for flawless centration and zero tilt in compromised capsular bags, providing superior optical alignment and long-term centration.',
    image: '/iovue/iovue-aspheric-quad-haptic.png',
    features: [
      '4-Point Quad Haptic Geometry for zero-tilt stability',
      'Ideal for weak zonules or compromised capsular bags',
      'Aberration-free optics for reduced halo and glare',
      '360° continuous square edge for PCO inhibition'
    ],
    specs: [
      { label: 'Optic Type', value: 'Aspheric Quad-Haptic' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '11.50 mm / 12.00 mm' },
      { label: 'Diopter Range', value: '+12.0 D to +28.0 D' },
      { label: 'A-Constant', value: '118.4' },
      { label: 'Haptic Design', value: '4-Point Plate / Quad Haptic' },
      { label: 'Refractive Index', value: '1.46' },
      { label: 'Square Edge', value: '360° Continuous Edge' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-pmma-single-piece',
    name: 'ioVue PMMA Single Piece 360° Advance Square Edge IOL',
    tagline: 'Clinical-Grade PMMA Monofocal Lens for Rigorous Surgical Demands',
    description: 'High molecular weight clinical PMMA intraocular lens with UV absorber and 360° advance square edge. Ideal for extra-capsular cataract extraction (ECCE) and anterior chamber or scleral fixation.',
    image: '/iovue/iovue-pmma-single-piece.png',
    features: [
      'High Molecular Weight Clinical-Grade PMMA material',
      'Integrated UV Absorbing Chromophore',
      '360° Advance Square Edge optical boundary',
      'Highly polished optical surface for optical clarity'
    ],
    specs: [
      { label: 'Optic Type', value: 'Equibiconvex PMMA Monofocal' },
      { label: 'Optic Diameter', value: '6.00 mm / 6.50 mm' },
      { label: 'Overall Length', value: '12.50 mm / 13.00 mm' },
      { label: 'Diopter Range', value: '+8.0 D to +32.0 D (0.5D increments)' },
      { label: 'A-Constant', value: '118.2' },
      { label: 'Material', value: 'CQ PMMA with UV Absorber' },
      { label: 'Refractive Index', value: '1.49' },
      { label: 'Haptic Angle', value: '5° or 0° Angulation' },
      { label: 'Sterilization', value: 'ETO Gas' }
    ]
  },
  {
    id: 'iovue-iris-fixation',
    name: 'ioVue Iris Fixation PMMA IOL',
    tagline: 'Specialized Iris-Claw Anterior Segment Reconstruction Lens',
    description: 'Iris-claw design PMMA lens for aphakia correction in eyes lacking posterior capsular support. Securely clips to the iris stroma with minimal endothelial tissue contact.',
    image: '/iovue/iovue-iris-fixation-pmma.png',
    features: [
      'Iris-Claw Fixation design for anterior segment aphakia',
      'Minimal corneal endothelial touch risk',
      'Versatile placement (Anterior or Retro-pupillary)',
      'Clinical PMMA with built-in UV protection'
    ],
    specs: [
      { label: 'Optic Type', value: 'Convexo-Concave PMMA' },
      { label: 'Optic Diameter', value: '5.40 mm' },
      { label: 'Overall Length', value: '8.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +25.0 D' },
      { label: 'A-Constant', value: '115.0' },
      { label: 'Fixation Type', value: 'Iris Claw Stroma Fixation' },
      { label: 'Sterilization', value: 'ETO Gas' }
    ]
  },
  {
    id: 'pmma-3-piece-uv',
    name: 'ioVue PMMA 3-Piece with UV Absorbing IOL',
    tagline: 'Proven 3-Piece Architecture for Sulcus & Scleral Suturing',
    description: '3-Piece PMMA intraocular lens featuring flexible polypropylene haptics for scleral suturing or sulcus placement when capsular support is absent.',
    image: '/iovue/iovue-pmma-3piece-uv.png',
    features: [
      'Flexible Blue Prolene Haptics angled at 10°',
      'Designed for Sulcus & Scleral Fixation procedures',
      'UV-Absorbing PMMA Optic disc',
      'Large 6.50mm optic for wide visual clear zone'
    ],
    specs: [
      { label: 'Optic Type', value: 'Biconvex PMMA 3-Piece' },
      { label: 'Optic Diameter', value: '6.50 mm' },
      { label: 'Overall Length', value: '13.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D' },
      { label: 'A-Constant', value: '118.5' },
      { label: 'Haptic Material', value: 'Prolene / Polypropylene (10° Angle)' },
      { label: 'Sterilization', value: 'ETO Gas' }
    ]
  },
  {
    id: 'yellow-filter-hydrophilic',
    name: 'ioVue Yellow Filter Hydrophilic Acrylic 360° Edge IOL',
    tagline: 'Premium Yellow-Tint Hydrophilic MICS Lens',
    description: 'Natural yellow chromophore hydrophilic acrylic lens combining high water content comfort with 360° square edge optical clarity for sub-2.2mm MICS delivery.',
    image: '/iovue/iovue-yellow-filter-hydrophilic.png',
    features: [
      '26% High Water Content Hydrophilic Acrylic',
      'Integrated Yellow Chromophore for UV & Blue-Light Filtering',
      '360° Square Edge Optics to inhibit PCO',
      'Smooth micro-incision cartridge delivery'
    ],
    specs: [
      { label: 'Optic Type', value: 'Aspheric Yellow Hydrophilic' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '12.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D' },
      { label: 'A-Constant', value: '118.5' },
      { label: 'Water Content', value: '26% Hydrated at 35°C' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-hydrophilic-acrylic',
    name: 'ioVue Hydrophilic Acrylic Foldable IOL',
    tagline: 'Biocompatible 26% Water Content Hydrophilic MICS Lens',
    description: 'High-purity biocompatible hydrophilic acrylic intraocular lens designed for smooth folding and sub-2.2mm micro-incision cartridge injection into the capsular bag.',
    image: '/iovue/iovue-hydrophilic-acrylic.png',
    features: [
      '26% Equilibrium Water Content for superior uveal biocompatibility',
      'Smooth controlled unfolding inside capsular bag',
      'Precision optical finish for maximum contrast',
      'EO Gas / Steam Sterilized in single blister pack'
    ],
    specs: [
      { label: 'Optic Type', value: 'Monofocal Hydrophilic Acrylic' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '12.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D' },
      { label: 'A-Constant', value: '118.5' },
      { label: 'ACD', value: '5.0 mm' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-phobic-monofocal',
    name: 'ioVue Phobic Hydrophobic Monofocal IOL',
    tagline: 'Single-Piece Glisten-Free Hydrophobic Acrylic Monofocal',
    description: 'High refractive index glisten-free hydrophobic acrylic monofocal lens featuring robust C-loop haptic geometry for exceptional capsular centration and minimal PCO.',
    image: '/iovue/iovue-phobic.png',
    features: [
      'Glisten-Free Single-Piece Hydrophobic Polymer',
      'High Refractive Index (1.53) for ultra-thin lens profile',
      '360° Square Edge Technology to inhibit PCO',
      'Robust C-Loop haptics for long-term centration'
    ],
    specs: [
      { label: 'Optic Type', value: 'Single-Piece Hydrophobic Monofocal' },
      { label: 'Optic Diameter', value: '6.00 mm' },
      { label: 'Overall Length', value: '13.00 mm' },
      { label: 'Diopter Range', value: '+5.0 D to +35.0 D' },
      { label: 'A-Constant', value: '118.7' },
      { label: 'Refractive Index', value: '1.53' },
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
              <span>Flagship Intraocular Lens Brand · ioVue Series</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              ioVue Premium Intraocular Lenses
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
                ioVue Flagship
              </span>
            </div>

            {/* Certifications Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">Certification</span>
                <strong className="text-brand-teal font-bold text-[11px]">CE & ISO 13485</strong>
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
              <Button 
                variant="primary" 
                size="md" 
                icon={<FileText className="w-4 h-4" />}
                onClick={() => onOpenRfq(currentProd.name)}
              >
                Request Quote for {currentProd.name.split(' ')[0]} {currentProd.name.split(' ')[1]}
              </Button>

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
