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
    name: 'IOVUE™ FLEXIOL AO / ASPROLENZ - Aspheric Hydrophilic Acrylic Foldable IOL',
    tagline: 'Aberration-Neutral Negative Aspheric Optics with 360° Step Square Edge',
    description: 'Fabricated from ultra-pure 26% water content pHEMA polymer with zero silicone oil adhesion. Features pre-vaulted haptics and negative spherical aberration optics to nullify corneal spherical aberration.',
    image: '/iovue/iovue-aspheric-acrylic.png',
    features: [
      '360° Continuous Step Square Edge to inhibit PCO',
      'Aberration-Neutral Negative Aspheric Optics',
      'Ultra-Pure pHEMA 26% Equilibrium Water Content',
      'Sub-2.2mm MICS incision compatible'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Aberration-Neutral Negative Aspheric Biconvex' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm' },
      { label: 'Diopter Range', value: '-5.0 D to +35.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant / ACD', value: '118.0 / 4.96 mm' },
      { label: 'Refractive Index', value: '1.46 (Hydrated at 20°C)' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-phob-hydrophobic',
    name: 'IOVUE™ AMH Series Hydrophobic Acrylic 3-Piece IOL',
    tagline: 'Glisten-Free Hydrophobic Polymer with 5° Angulated PMMA Haptics',
    description: 'Synthesized from cross-linked hydrophobic acrylate polymer. Features 5° angulated PMMA haptics for robust capsular bag centration, high refractive index (1.49), and 360° step square edge.',
    image: '/iovue/iovue-phob-hydrophobic.png',
    features: [
      'Glisten-Free Cross-Linked Hydrophobic Acrylate',
      'PMMA Haptics with 5° angulation for capsular stability',
      '360° Step Square Edge for PCO defense',
      'High Refractive Index (1.49) for thin optic profile'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Biconvex Hydrophobic Monofocal' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 13.00 mm' },
      { label: 'Diopter Range', value: '+5.0 D to +35.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant / ACD', value: '118.7 / 5.1 mm' },
      { label: 'Haptic Architecture', value: 'PMMA Haptics (5° Angulation)' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'iovue-blue-filter-yellow',
    name: 'IOVUE™ Hyphovue Yellow Filter Aspheric IOL',
    tagline: 'Natural Photoprotective Violet-Blue Light Cut-off Chromophore',
    description: 'Natural yellow-chromophore hydrophobic acrylic IOL designed to filter UV-A and high-energy violet-blue light (<450nm) to protect the macular retina while preserving scotopic contrast sensitivity.',
    image: '/iovue/iovue-blue-filter-yellow.png',
    features: [
      'Natural Yellow Chromophore for Macular Protection',
      'Violet-Blue Light Cut-off (<450nm wavelength)',
      'Aberration-Neutral Negative Aspheric Optics',
      'Cryo-lathed Glisten-Free Hydrophobic Acrylate'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Aberration-Neutral Negative Aspheric' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm' },
      { label: 'Diopter Range', value: '-5.0 D to +35.0 D' },
      { label: 'Estimated A-Constant / ACD', value: '118.0 / 4.96 mm' },
      { label: 'Light Transmission', value: 'UV-A & Violet-Blue Cut-off (<450nm)' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-quad-haptic',
    name: 'IOVUE™ FA 6005 / YA 6005 Quad Haptic Hydrophilic Foldable IOL',
    tagline: '4-Point Quad Haptic Centration for Superior Capsular Bag Stability',
    description: 'Unique 4-point quad haptic geometry engineered for zero-tilt centration in compromised capsular bags, providing maximum rotational stability and uniform equatorial friction.',
    image: '/iovue/iovue-aspheric-quad-haptic.png',
    features: [
      '4-Point Quad Haptic Geometry for zero-tilt stability',
      'Ideal for compromised capsular bags or weak zonules',
      'Aberration-neutral optics for reduced halos',
      '360° continuous step square edge for PCO defense'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Aspheric Quad-Haptic (4-Point Plate)' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 11.50 mm (12.00 mm)' },
      { label: 'Diopter Range', value: '+12.0 D to +28.0 D' },
      { label: 'Estimated A-Constant', value: '118.4' },
      { label: 'Refractive Index', value: '1.46' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-pmma-single-piece',
    name: 'IOVUE™ PROXYLENZ / GLOWEDGE Aspheric PMMA IOL',
    tagline: 'High Molecular Weight Clinical PMMA with 360° Advance Square Edge',
    description: 'High molecular weight clinical-grade PMMA intraocular lens with integrated UV absorber and 360° advance square edge. Ideal for extra-capsular cataract extraction (ECCE) and anterior/posterior chamber placement.',
    image: '/iovue/iovue-pmma-single-piece.png',
    features: [
      'High Molecular Weight Clinical-Grade CQ PMMA',
      'Integrated UV-A & UV-B Absorbing Chromophore',
      '360° Advance Step Square Edge Optical Boundary',
      'Micro-lathed optical surface for crystal clarity'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Equibiconvex PMMA Monofocal' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm (13.00 mm)' },
      { label: 'Diopter Range', value: '+8.0 D to +32.0 D (0.5D increments)' },
      { label: 'Estimated A-Constant', value: '118.2' },
      { label: 'Material', value: 'CQ PMMA with UV Absorber' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'iovue-iris-fixation',
    name: 'IOVUE™ Irisglow Iris-Claw Fixation PMMA IOL',
    tagline: 'Specialized Iris-Claw Stroma Fixation Anterior Reconstruction Lens',
    description: 'Iris-claw design PMMA lens for aphakia correction in eyes lacking posterior capsular support. Securely clips to the iris stroma with zero endothelial tissue touch.',
    image: '/iovue/iovue-iris-fixation-pmma.png',
    features: [
      'Iris-Claw Stroma Fixation for aphakic anterior segment',
      'Minimal risk of corneal endothelial contact',
      'Versatile Anterior or Retro-pupillary placement',
      'CQ PMMA with built-in UV protection'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Convexo-Concave PMMA' },
      { label: 'Optic Diameter / Length', value: '5.40 mm / 8.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +25.0 D' },
      { label: 'Estimated A-Constant', value: '115.0' },
      { label: 'Fixation Mechanism', value: 'Iris Claw Stroma Fixation' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'pmma-3-piece-uv',
    name: 'IOVUE™ PS 6535 Scleral Fixation PMMA 3-Piece IOL',
    tagline: 'Proven 3-Piece Architecture for Sulcus & Scleral Suturing',
    description: '3-Piece PMMA intraocular lens featuring flexible polypropylene (Prolene) haptics angled at 10° for scleral suturing or sulcus fixation when capsular support is absent.',
    image: '/iovue/iovue-pmma-3piece-uv.png',
    features: [
      'Flexible Blue Prolene Haptics angled at 10°',
      'Designed for Sulcus & Scleral Fixation procedures',
      'UV-Absorbing PMMA Optic disc (6.50mm large optic)',
      'Large optical zone for maximum visual field'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Biconvex PMMA 3-Piece' },
      { label: 'Optic Diameter / Length', value: '6.50 mm / 13.50 mm' },
      { label: 'Diopter Range', value: '+10.0 D to +30.0 D' },
      { label: 'Estimated A-Constant', value: '118.5' },
      { label: 'Haptic Material', value: 'Prolene / Polypropylene (10° Angle)' },
      { label: 'Sterilization', value: 'Ethylene Oxide (ETO Gas)' }
    ]
  },
  {
    id: 'yellow-filter-hydrophilic',
    name: 'IOVUE™ ACCURAVUE Yellow Hydrophilic Aspheric 360 Edge IOL',
    tagline: 'Premium Yellow-Tint Hydrophilic MICS Lens with 26% Water Content',
    description: 'Natural yellow chromophore hydrophilic acrylic lens combining 26% pHEMA water content comfort with 360° step square edge optical clarity for sub-2.2mm MICS delivery.',
    image: '/iovue/iovue-yellow-filter-hydrophilic.png',
    features: [
      '26% High Water Content Hydrophilic pHEMA Acrylate',
      'Integrated Yellow Chromophore for UV & Violet-Blue Cut-off',
      '360° Step Square Edge Optics for PCO defense',
      'Smooth MICS cartridge delivery'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Aspheric Yellow Hydrophilic' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm' },
      { label: 'Diopter Range', value: '-5.0 D to +35.0 D' },
      { label: 'Estimated A-Constant / ACD', value: '118.0 / 4.96 mm' },
      { label: 'Water Content', value: '26% Hydrated at 20°C' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-hydrophilic-acrylic',
    name: 'IOVUE™ HEMAFOLD / GLOWFOLD Hydrophilic Acrylic Foldable IOL',
    tagline: 'Biocompatible Workhorse 26% Water Content Hydrophilic MICS Lens',
    description: 'High-purity biocompatible pHEMA hydrophilic acrylic intraocular lens designed for smooth folding and sub-2.2mm micro-incision cartridge injection into the capsular bag.',
    image: '/iovue/iovue-hydrophilic-acrylic.png',
    features: [
      '26% Equilibrium Water Content for superior biocompatibility',
      'Smooth controlled unfolding inside capsular bag',
      'Spherical Biconvex geometry for robust refractive outcomes',
      '360° Step Square Edge for PCO defense'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Spherical Biconvex Hydrophilic' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm' },
      { label: 'Diopter Range', value: '-5.0 D to +35.0 D' },
      { label: 'Estimated A-Constant / ACD', value: '118.0 / 4.96 mm' },
      { label: 'Refractive Index', value: '1.46 at 20°C' },
      { label: 'Sterilization', value: 'Steam Autoclaved' }
    ]
  },
  {
    id: 'iovue-phobic-monofocal',
    name: 'IOVUE™ FLEXIOL PHOBIC Aspheric / HYPHOFLEX Hydrophobic Monofocal IOL',
    tagline: 'Single-Piece Cryo-Lathed Glisten-Free Hydrophobic Monofocal',
    description: 'High refractive index (1.49 / 1.56) glisten-free hydrophobic PEA/PEMA copolymer monofocal lens featuring modified 5° C-loop haptic geometry for exceptional capsular ELP stability.',
    image: '/iovue/iovue-phobic.png',
    features: [
      'Glisten-Free Cryo-Lathed PEA/PEMA Hydrophobic Polymer',
      'High Refractive Index (1.49 / 1.56) for ultra-thin lens profile',
      '360° Step Square Edge Technology for zero PCO risk',
      'Single-Piece Modified C-Loop haptics with 5° angulation'
    ],
    specs: [
      { label: 'Optic Profile', value: 'Aberration-Neutral Negative Aspheric' },
      { label: 'Optic Diameter / Length', value: '6.00 mm / 12.50 mm (13.00 mm)' },
      { label: 'Diopter Range', value: '+4.0 D to +35.0 D (0.5D increments)' },
      { label: 'Estimated ACD', value: '5.1 mm' },
      { label: 'Refractive Index', value: '1.49 (FLEXIOL) / 1.56 (HYPHOFLEX)' },
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
