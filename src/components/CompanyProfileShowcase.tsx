import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge, Button } from './Primitives';
import { 
  Building2, PackageCheck, Factory, ChevronLeft, ChevronRight, Play, Pause,
  Globe2, ShieldCheck, Award, FileText, ArrowRight, CheckCircle2, Sparkles,
  Microscope, Stethoscope, Layers, Eye, MapPin, Check, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyProfileShowcaseProps {
  onOpenRfq: (productName?: string) => void;
}

export const CompanyProfileShowcase: React.FC<CompanyProfileShowcaseProps> = ({ onOpenRfq }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  const slides = [
    {
      id: 'profile',
      tabTitle: '01. Corporate Profile & Reach',
      subtitle: 'Precision in Vision, Trust in Every Export',
      heading: '21 Years of Ophthalmic Export Mastery (Est. 2004)',
    },
    {
      id: 'products',
      tabTitle: '02. Main Product Series (Specs)',
      subtitle: 'One-Stop Purchasing Solutions',
      heading: 'Deep Technical Coverage Across 4 Primary Product Verticals',
    },
    {
      id: 'production',
      tabTitle: '03. Cleanroom Facilities & Quality',
      subtitle: 'Own Cleanrooms & Assembly Facilities',
      heading: '3 Dedicated Nagpur Cleanroom Facilities & Growth Milestones',
    }
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200">
      
      {/* Light Blueprint Pattern Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2BB2A8 0.8px, transparent 0.8px), linear-gradient(to right, #EBF1F5 1px, transparent 1px)`,
          backgroundSize: '32px 32px, 64px 64px'
        }}
      />

      <Container className="relative z-10 space-y-8">
        
        {/* Presentation Header Bar (Clean Light Deck Frame) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 md:p-6 shadow-xl space-y-4">
          
          {/* Top Banner Slogan & Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-brand-soft border border-brand-teal/30 flex items-center justify-center text-brand-teal font-extrabold text-xs">
                CIE
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-brand-teal font-bold block">
                  Central India Export Presentation Deck
                </span>
                <span className="text-[11px] text-slate-500 font-mono">HQ: Nagpur, Maharashtra, India · Est. 2004</span>
              </div>
            </div>
            
            <div className="text-xs font-mono text-slate-600 italic bg-brand-soft/60 px-3 py-1 rounded-full border border-brand-teal/20">
              <span className="text-brand-teal font-bold">Motto: </span>
              "Greeting the day, greeting the future! · The whole world runs on trust!"
            </div>
          </div>

          {/* Presentation Slide Tabs & Control Bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Slide Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 flex-1">
              {slides.map((slide, index) => {
                const isActive = activeSlide === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(index)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-display font-bold transition-all duration-300 flex items-center justify-center space-x-2 text-center ${
                      isActive 
                        ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/20 scale-[1.01]' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <span>{slide.tabTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Presentation Controls */}
            <div className="flex items-center justify-between md:justify-end space-x-3 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200 shrink-0">
              <span className="text-xs font-mono text-slate-600">
                Slide <strong className="text-brand-teal font-bold">{activeSlide + 1}</strong> of {slides.length}
              </span>
              
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className={`p-2 rounded-lg transition-colors ${
                    isAutoplay 
                      ? 'bg-brand-teal text-white' 
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                  title={isAutoplay ? "Pause Slideshow" : "Play Auto-Slideshow"}
                >
                  {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-white text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-white text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Slide Deck Stage Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[480px]">
          <AnimatePresence mode="wait">
            
            {/* SLIDE 01: CORPORATE PROFILE & EXPORT FOOTPRINT */}
            {activeSlide === 0 && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-10 space-y-8"
              >
                
                {/* Header Header Info */}
                <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-bold">
                      {slides[0].subtitle}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 mt-1">
                      {slides[0].heading}
                    </h3>
                  </div>

                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<FileText className="w-4 h-4" />}
                    onClick={() => onOpenRfq('Corporate Profile & Catalog Request')}
                  >
                    Request Corporate Dossier
                  </Button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Text Summary & Metrics */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                      Central India Export — <span className="text-brand-teal">21-Year Global Export Legacy</span>
                    </h2>

                    <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-normal">
                      <p>
                        Founded in 2004 in Nagpur, India by CEO <strong className="text-slate-900 font-semibold">Sandeep Vaid</strong>, <strong className="text-brand-blue font-bold">Central India Export (CIE)</strong> has grown into a trusted partner and recognized brand in the global ophthalmic equipment and medical consumables market. Situated at Nagpur's Zero Mile in the heart of the city, CIE specializes in direct B2B export and supply of ioVue™ intraocular lenses, micro-surgical blades, surgical instruments, diagnostic strips, viscoelastic solutions, and ocular prostheses.
                      </p>

                      <p>
                        Thanks to our dedication to micron-precision quality, competitive B2B wholesale pricing, and long-term distributor partnerships, CIE products are exported to <strong className="text-slate-900 font-bold font-mono">over 31 countries</strong> worldwide with a strict policy of <strong className="text-brand-teal font-bold">ONE COUNTRY ONE DISTRIBUTOR NETWORK</strong>.
                      </p>
                    </div>

                    {/* Informative Key Regions Breakdown Grid */}
                    <div className="bg-brand-soft/40 rounded-2xl p-4 border border-brand-teal/20 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue font-display flex items-center space-x-1.5">
                        <Globe2 className="w-4 h-4 text-brand-teal" />
                        <span>Global Export Network (31+ Countries · One Country One Distributor)</span>
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-slate-800">
                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-brand-teal block">🇪🇺 Europe</span>
                          <span className="text-[11px] text-slate-600">UK, Turkey, Spain</span>
                        </div>

                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-brand-teal block">🇺🇸 Americas</span>
                          <span className="text-[11px] text-slate-600">Guatemala, Brazil, Mexico, Colombia</span>
                        </div>

                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-brand-teal block">🇦🇪 Middle East & Africa</span>
                          <span className="text-[11px] text-slate-600">UAE, South Africa, Kenya, Nigeria</span>
                        </div>

                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-brand-teal block">🌏 Asia-Pacific</span>
                          <span className="text-[11px] text-slate-600">India, Thailand, Vietnam, Philippines</span>
                        </div>
                      </div>
                    </div>

                  {/* Stat Counters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200">
                    <div className="p-3 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
                      <span className="font-display font-extrabold text-2xl text-brand-teal font-mono">21+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold font-display">Years Export Mastery</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
                      <span className="font-display font-extrabold text-2xl text-slate-900 font-mono">31+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold font-display">Export Countries</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
                      <span className="font-display font-extrabold text-2xl text-brand-teal font-mono">457+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold font-display">Catalog Items</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
                      <span className="font-display font-extrabold text-2xl text-slate-900 font-mono">10,000+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold font-display">Surgeons Served</p>
                    </div>
                  </div>
                </div>

                {/* Right Visual Image & Certifications Showcase */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-white">
                    <img 
                      src="/facility-cleanroom.jpg" 
                      alt="Central India Export Cleanroom Facility" 
                      className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg space-y-1">
                      <div className="flex items-center space-x-2 text-brand-teal">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold font-display uppercase tracking-wider">Nagpur Manufacturing Hub</span>
                      </div>
                      <p className="text-xs text-slate-700">
                        ISO Class 5 & 7 Certified Cleanroom Units for IOL Assembly & Micron Blade Sharpening
                      </p>
                    </div>
                  </div>

                  {/* Certification Badges Card */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      Regulatory Credentials & Certifications
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-brand-soft/60 border border-brand-teal/20 flex items-center space-x-2.5">
                        <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
                        <div>
                          <strong className="text-slate-900 block font-bold">ISO 13485:2016</strong>
                          <span className="text-[10px] text-slate-600">Medical Devices Quality</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-brand-soft/60 border border-brand-teal/20 flex items-center space-x-2.5">
                        <Award className="w-5 h-5 text-brand-teal shrink-0" />
                        <div>
                          <strong className="text-slate-900 block font-bold">CE Compliance</strong>
                          <span className="text-[10px] text-slate-600">European Standards</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
            )}

            {/* SLIDE 2: MAIN PRODUCTS SERIES (DEEP TECHNICAL SPECS) */}
            {activeSlide === 1 && (
              <motion.div
                key="slide-products-light"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <Badge variant="teal" className="bg-brand-soft text-brand-teal border-brand-teal/30 mb-2">
                      4 Core Vertical Series
                    </Badge>
                    <h2 className="font-display font-extrabold text-2xl text-slate-900">
                      Technical Overview of Main Manufactured Product Lines
                    </h2>
                    <p className="text-xs text-slate-600">
                      Detailed specifications, diopters, materials, and blade geometry specs for B2B export buyers.
                    </p>
                  </div>

                  <Link to="/products">
                    <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Browse All 457 Catalog Items
                    </Button>
                  </Link>
                </div>

                {/* 4 Main Series Cards Grid with Deep Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Vertical 1: IOLs & ioVue */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-brand-teal/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 p-2 text-brand-teal flex items-center justify-center shrink-0">
                          <Eye className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider">Vertical Series 01</span>
                          <h3 className="font-display font-bold text-xl text-slate-900">
                            Intraocular Lenses & ioVue™ Brand
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-brand-teal text-white">
                        45+ Items
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Hydrophilic & Hydrophobic Acrylic Foldable IOLs, PMMA single-piece & 3-piece lenses, Iris Fixation Claw lenses, and Capsular Tension Rings (CTR).
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-mono">
                      <div className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">Technical Specifications:</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>• <strong>Diopter Range:</strong> -10.0 D to +35.0 D</div>
                        <div>• <strong>Optic Design:</strong> 360° Square Edge</div>
                        <div>• <strong>Optic Diameter:</strong> 6.0 mm</div>
                        <div>• <strong>UV Protection:</strong> UV 400 Absorbing</div>
                        <div>• <strong>A-Constant:</strong> 118.0 / 118.4</div>
                        <div>• <strong>Sterilization:</strong> Steam / ETO Sterile</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Link to="/iovue" className="text-xs font-bold text-brand-teal hover:underline">
                        Explore ioVue Brand Page →
                      </Link>
                      <button
                        onClick={() => onOpenRfq('ioVue Intraocular Lenses')}
                        className="px-3 py-1.5 bg-brand-teal text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-[#20968E]"
                      >
                        Request IOL Quotation
                      </button>
                    </div>
                  </div>

                  {/* Vertical 2: Micro Surgical Blades */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-brand-teal/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 p-2 text-brand-teal flex items-center justify-center shrink-0">
                          <Microscope className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider">Vertical Series 02</span>
                          <h3 className="font-display font-bold text-xl text-slate-900">
                            Micro Surgical Blades & Knives
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-white">
                        35+ Types
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ultra-sharp Slit, Lance, Keratome, MVR, Crescent, and Sideport blades with safety handles engineered for precise corneal incisions.
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-mono">
                      <div className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">Technical Specifications:</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>• <strong>Keratome Blades:</strong> 2.2mm to 3.2mm</div>
                        <div>• <strong>Lance Blades:</strong> 15°, 30°, 45° angles</div>
                        <div>• <strong>MVR Blades:</strong> 19G, 20G, 23G</div>
                        <div>• <strong>Material:</strong> Swiss Stainless Steel</div>
                        <div>• <strong>Edge Honing:</strong> Laser Micron Honed</div>
                        <div>• <strong>Packaging:</strong> ETO Sterile Blister</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Link to="/products?category=Micro%20Surgical%20Blades" className="text-xs font-bold text-brand-teal hover:underline">
                        View All Blades Catalog →
                      </Link>
                      <button
                        onClick={() => onOpenRfq('Micro Surgical Blades')}
                        className="px-3 py-1.5 bg-brand-teal text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-[#20968E]"
                      >
                        Request Blades Quotation
                      </button>
                    </div>
                  </div>

                  {/* Vertical 3: Ophthalmic Instruments */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-brand-teal/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 p-2 text-brand-teal flex items-center justify-center shrink-0">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider">Vertical Series 03</span>
                          <h3 className="font-display font-bold text-xl text-slate-900">
                            Ophthalmic Surgical Instruments
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-white">
                        280+ Instruments
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Swiss stainless steel & titanium forceps, micro scissors, needle holders, speculums, lacrimal cannulas, markers, and calipers.
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-mono">
                      <div className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">Technical Specifications:</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>• <strong>Alloys:</strong> Grade 5 Titanium & 316L SS</div>
                        <div>• <strong>Craftsmanship:</strong> Hand-honed tips</div>
                        <div>• <strong>Forceps Types:</strong> Tying, Fixation, Rhexis</div>
                        <div>• <strong>Micro Scissors:</strong> Vannas, Castroviejo</div>
                        <div>• <strong>Finish:</strong> Non-glare Satin/Blue Anodized</div>
                        <div>• <strong>Autoclavable:</strong> 134°C Thermal Resistance</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Link to="/products?category=Instruments" className="text-xs font-bold text-brand-teal hover:underline">
                        View All Instruments →
                      </Link>
                      <button
                        onClick={() => onOpenRfq('Ophthalmic Surgical Instruments')}
                        className="px-3 py-1.5 bg-brand-teal text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-[#20968E]"
                      >
                        Request Instruments Quote
                      </button>
                    </div>
                  </div>

                  {/* Vertical 4: Solutions & Diagnostics */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-brand-teal/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 p-2 text-brand-teal flex items-center justify-center shrink-0">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider">Vertical Series 04</span>
                          <h3 className="font-display font-bold text-xl text-slate-900">
                            Solutions, Diagnostics & Prostheses
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-white">
                        95+ Items
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sodium Hyaluronate viscoelastics, Fluorescein/Schirmer diagnostic strips, ocular prostheses artificial eyes, and acuity charts.
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-mono">
                      <div className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">Technical Specifications:</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>• <strong>Viscoelastics:</strong> 1.0% - 1.4% Sodium Hyaluronate</div>
                        <div>• <strong>BFS Filling:</strong> Sterile pre-filled syringes</div>
                        <div>• <strong>Diagnostic Strips:</strong> Fluorescein, Schirmer</div>
                        <div>• <strong>Paper Grade:</strong> Lint-free medical absorbency</div>
                        <div>• <strong>Prosthetics:</strong> Hand-polished PMMA Ocular</div>
                        <div>• <strong>Charts:</strong> Vision Acuity Drum & Illuminated</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Link to="/products?category=Ophthalmic%20Solutions" className="text-xs font-bold text-brand-teal hover:underline">
                        View Solutions Catalog →
                      </Link>
                      <button
                        onClick={() => onOpenRfq('Ophthalmic Solutions & Diagnostics')}
                        className="px-3 py-1.5 bg-brand-teal text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-[#20968E]"
                      >
                        Request Solutions Quote
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* SLIDE 3: CLEANROOM PRODUCTION LINES & FACILITIES */}
            {activeSlide === 2 && (
              <motion.div
                key="slide-production-light"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Infrastructure Overview Banner & Milestones */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Factory Infrastructure & Milestones */}
                  <div className="lg:col-span-5 space-y-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-teal/30 text-xs font-bold text-brand-teal">
                      <Factory className="w-3.5 h-3.5" />
                      <span>Cleanrooms & Infrastructure</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl text-slate-900">
                      3 Owned Cleanroom Facilities in Nagpur, India
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      We operate 3 dedicated manufacturing units in Nagpur equipped with ISO Class 5/7 cleanrooms, alongside 5 strategic manufacturing partner lines providing an integrated production capacity of <strong className="text-slate-900 font-mono font-bold">457+ catalog items</strong>.
                    </p>

                    {/* Timeline Growth Milestones (Detailed Informative Adaptations) */}
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      <h4 className="text-xs uppercase font-mono tracking-widest text-brand-blue font-bold">
                        Central India Export Growth Milestones
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-teal border border-brand-teal/30 font-mono font-bold shrink-0">1985</span>
                          <span className="text-slate-700">Founded in Nagpur by CEO Sandeep Vaid as an ophthalmic equipment export merchant.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-teal border border-brand-teal/30 font-mono font-bold shrink-0">1998</span>
                          <span className="text-slate-700">Commissioned direct manufacturing line for surgical stainless steel instruments & cannulas.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-teal border border-brand-teal/30 font-mono font-bold shrink-0">2004</span>
                          <span className="text-slate-700">Established ISO Class 5 Cleanrooms for ioVue™ IOL lathe cutting & micro blade honing.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-teal border border-brand-teal/30 font-mono font-bold shrink-0">2014</span>
                          <span className="text-slate-700">Attained ISO 13485:2016 certification & CE Mark compliance for European export markets.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-teal border border-brand-teal/30 font-mono font-bold shrink-0">2022</span>
                          <span className="text-slate-700">Expanded global distribution network to 50+ countries across 5 continents.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4 Cleanroom Production Line Cards */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Line 1: IOL Assembly */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-brand-teal/50 transition-all">
                      <div className="h-40 overflow-hidden relative bg-slate-100">
                        <img 
                          src="/production-line-iol.jpg" 
                          alt="Cleanroom IOL Assembly Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 backdrop-blur-md text-brand-teal border border-brand-teal/30 shadow-2xs">
                          Unit 01 · Nagpur HQ
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-brand-teal transition-colors">
                          Cleanroom IOL Assembly & Lathe Line
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          ISO Class 5/7 cleanrooms equipped with CNC optical lathes, 100% hydration diopter testing, and interferometric surface inspection.
                        </p>
                      </div>
                    </div>

                    {/* Line 2: Micro Blade Honing */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-brand-teal/50 transition-all">
                      <div className="h-40 overflow-hidden relative bg-slate-100">
                        <img 
                          src="/production-line-blades.jpg" 
                          alt="Micro Surgical Blade Honing Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 backdrop-blur-md text-brand-teal border border-brand-teal/30 shadow-2xs">
                          Unit 02 · Ramdaspeth
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-brand-teal transition-colors">
                          Micro Blade Laser Honing Line
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          Laser-guided edge honing and Swiss micro-grinding machines for 1.8mm–3.2mm keratome & lance blades inspected under 100x digital magnification.
                        </p>
                      </div>
                    </div>

                    {/* Line 3: Ophthalmic Solutions BFS */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-brand-teal/50 transition-all">
                      <div className="h-40 overflow-hidden relative bg-slate-100">
                        <img 
                          src="/production-line-solutions.jpg" 
                          alt="Ophthalmic Sterile Solution BFS Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 backdrop-blur-md text-brand-teal border border-brand-teal/30 shadow-2xs">
                          Unit 03 · Sterile Packaging
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-brand-teal transition-colors">
                          Sterile Solutions BFS Liquid Filling
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          Automated Blow-Fill-Seal (BFS) liquid aseptic filling for 1.0%–1.4% Sodium Hyaluronate viscoelastics & tamper-proof sterile syringes.
                        </p>
                      </div>
                    </div>

                    {/* Line 4: Prosthetics & Diagnostics */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-brand-teal/50 transition-all">
                      <div className="h-40 overflow-hidden relative bg-slate-100">
                        <img 
                          src="/production-line-prosthetics.jpg" 
                          alt="Prosthetics & Diagnostic Strips Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 backdrop-blur-md text-brand-teal border border-brand-teal/30 shadow-2xs">
                          Unit 04 · Laboratory
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-brand-teal transition-colors">
                          Prosthetics & Diagnostics Line
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          Precision polishing lab for custom PMMA ocular acrylic prosthetics and lint-free diagnostic paper strip precision slitting.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
};
