import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge, Button } from './Primitives';
import { 
  Building2, PackageCheck, Factory, ChevronLeft, ChevronRight, Play, Pause,
  Globe2, ShieldCheck, Award, FileText, ArrowRight, CheckCircle2, Sparkles,
  Microscope, Stethoscope, Layers, Eye
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
      tabTitle: '01. Company Profile',
      subtitle: 'Greeting the Day, Greeting the Future!',
      heading: '39 Years of Ophthalmic & Surgical Export Mastery',
    },
    {
      id: 'products',
      tabTitle: '02. Main Product Series',
      subtitle: 'One-Stop Purchasing Solutions',
      heading: 'Comprehensive Coverage Across 4 Core Product Verticals',
    },
    {
      id: 'production',
      tabTitle: '03. Production Lines',
      subtitle: 'Manufacturing Excellence & Own Facilities',
      heading: 'Cleanroom Infrastructure & Micron-Precision Assembly',
    }
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-[#0B1E38] to-slate-950 text-white relative overflow-hidden border-y border-slate-800">
      {/* Blueprint Grid & Technical Ambient Background */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2BB2A8 1px, transparent 1px), linear-gradient(to right, #2BB2A8 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 80px 80px'
        }}
      />

      {/* Ambient Gradient Glow Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-8">
        
        {/* Presentation Header Bar (Competitor Slide Deck Frame Style) */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-4 md:p-6 shadow-2xl space-y-4">
          
          {/* Top Banner Taglines */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal font-extrabold text-xs">
                CIE
              </div>
              <span className="text-xs uppercase tracking-widest font-mono text-brand-teal font-semibold">
                Central India Export Presentation Deck
              </span>
            </div>
            
            <div className="text-xs font-mono text-slate-400 italic">
              <span className="text-brand-teal font-semibold">Slogan: </span>
              "Greeting the day, greeting the future! · The whole world runs on trust!"
            </div>
          </div>

          {/* Presentation Tab Switcher & Navigation Controls */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Slide Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex-1">
              {slides.map((slide, index) => {
                const isActive = activeSlide === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(index)}
                    className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-display font-bold transition-all duration-300 flex items-center justify-center space-x-2 text-center ${
                      isActive 
                        ? 'bg-brand-teal text-white shadow-brand-glow shadow-brand-teal/30 scale-[1.02]' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{slide.tabTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Autoplay & Arrow Controls */}
            <div className="flex items-center justify-between md:justify-end space-x-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shrink-0">
              <span className="text-xs font-mono text-slate-400">
                Slide <strong className="text-brand-teal">{activeSlide + 1}</strong> / {slides.length}
              </span>

              <div className="h-4 w-px bg-slate-800" />

              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-colors ${
                  isAutoplay 
                    ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' 
                    : 'border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={isAutoplay ? 'Pause Slideshow' : 'Autoplay Slideshow'}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px] font-semibold">{isAutoplay ? 'Autoplay On' : 'Autoplay'}</span>
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-brand-teal/30 text-white border border-slate-700 hover:border-brand-teal transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-brand-teal/30 text-white border border-slate-700 hover:border-brand-teal transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Presentation Slide Container */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">

            {/* SLIDE 1: COMPANY PROFILE / ABOUT US */}
            {activeSlide === 0 && (
              <motion.div
                key="slide-profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Text Presentation Card */}
                <div className="lg:col-span-7 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
                  
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-teal/15 border border-brand-teal/30 text-xs font-semibold text-brand-teal">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Company Profile · Established 1985</span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                    Trusted Global Partner in <span className="text-brand-teal">Ophthalmic Medical Consumables</span> & Surgical Solutions
                  </h2>

                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    <p>
                      Founded in 1985 in Nagpur, India, <strong className="text-white font-semibold">Central India Export (CIE)</strong> has grown into a trusted partner and recognized brand in the global ophthalmic and medical consumables market. Located at Nagpur's Zero Mile adjacent to the MIHAN cargo airport, we specialize in high-precision intraocular lenses (ioVue™), micro-surgical blades, surgical instruments, and diagnostic solutions.
                    </p>

                    <p>
                      Thanks to our dedication to manufacturing excellence and long-term distributor partnerships, CIE products have been exported to <strong className="text-white font-semibold font-mono">over 50 countries</strong>, spanning regions such as the USA, UK, UAE, South Africa, Poland, Greece, Germany, France, South America, and Southeast Asia. We take immense pride in supporting ophthalmologists, clinics, and healthcare distributors worldwide.
                    </p>

                    <p className="text-slate-400 text-xs sm:text-sm italic border-l-2 border-brand-teal pl-3">
                      "Looking ahead, Central India Export continues to strengthen its global presence, drive optical precision innovation, and strive to remain a leading force in ophthalmic surgical solutions worldwide."
                    </p>
                  </div>

                  {/* Highlight Stat Counters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <span className="font-display font-extrabold text-2xl text-brand-teal font-mono">39+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-display">Years Legacy</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <span className="font-display font-extrabold text-2xl text-white font-mono">50+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-display">Export Countries</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <span className="font-display font-extrabold text-2xl text-brand-teal font-mono">457+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-display">Catalog Items</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <span className="font-display font-extrabold text-2xl text-white font-mono">10,000+</span>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-display">Clients Served</p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link to="/about-us">
                      <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                        Read Complete Company Profile
                      </Button>
                    </Link>

                    <button
                      onClick={() => onOpenRfq()}
                      className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-teal hover:underline px-3 py-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Company Profile & Certifications PDF</span>
                    </button>
                  </div>

                </div>

                {/* Right Visual Image & Certifications Showcase */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
                    <img 
                      src="/facility-cleanroom.jpg" 
                      alt="Central India Export Cleanroom Facility" 
                      className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 space-y-1">
                      <div className="flex items-center space-x-2 text-brand-teal">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold font-display uppercase tracking-wider">Nagpur Manufacturing Hub</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        ISO Class 5/7 Certified Cleanrooms for IOL Assembly & Micron Blade Honing
                      </p>
                    </div>
                  </div>

                  {/* Certification Badges Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">ISO 13485:2016</h4>
                        <p className="text-[10px] text-slate-400">Medical Quality Certified</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">CE Compliance</h4>
                        <p className="text-[10px] text-slate-400">European Standards</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* SLIDE 2: MAIN PRODUCTS SERIES */}
            {activeSlide === 1 && (
              <motion.div
                key="slide-products"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <Badge variant="teal" className="bg-brand-teal/20 text-brand-teal border-brand-teal/40">
                    Product Coverage Presentation
                  </Badge>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    4 Core Product Verticals for Wholesale Distributors
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Meeting one-stop purchasing needs with manufactured precision across intraocular lenses, surgical blades, instruments, and diagnostic solutions.
                  </p>
                </div>

                {/* 4 Main Series Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Card 1: IOLs & ioVue */}
                  <div className="group bg-slate-900/90 hover:bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-teal/60 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden h-40 bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
                        <img 
                          src="/iovue/iovue-aspheric-acrylic.png" 
                          alt="ioVue Intraocular Lenses" 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-teal text-white shadow-sm">
                          Flagship Series
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-brand-teal font-semibold">Series 01</span>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors">
                          Intraocular Lenses & ioVue™
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                          Aspheric Hydrophilic & Hydrophobic Acrylic Foldable IOLs, PMMA lenses, Iris Claw, and Capsular Tension Rings with 360° Square Edge optics.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">45+ Catalog Items</span>
                      <button
                        onClick={() => onOpenRfq('ioVue Intraocular Lenses')}
                        className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                      >
                        <span>RFQ Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Micro Surgical Blades */}
                  <div className="group bg-slate-900/90 hover:bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-teal/60 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden h-40 bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
                        <img 
                          src="/Micro Surgical Blades-01.svg" 
                          alt="Micro Surgical Blades" 
                          className="max-h-28 max-w-full object-contain filter invert brightness-200 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          Micron Honed
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-brand-teal font-semibold">Series 02</span>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors">
                          Micro Surgical Blades & Knives
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                          Ultra-sharp Slit, Lance, Keratome, MVR, Crescent, and Sideport blades with safety handles for cataract and refractive surgery.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">35+ Blade Types</span>
                      <button
                        onClick={() => onOpenRfq('Micro Surgical Blades')}
                        className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                      >
                        <span>RFQ Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Surgical Instruments */}
                  <div className="group bg-slate-900/90 hover:bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-teal/60 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden h-40 bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
                        <img 
                          src="/Instruments-01.svg" 
                          alt="Precision Surgical Instruments" 
                          className="max-h-28 max-w-full object-contain filter invert brightness-200 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          Hand Crafted
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-brand-teal font-semibold">Series 03</span>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors">
                          Ophthalmic Instruments
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                          Swiss stainless steel and titanium forceps, micro scissors, needle holders, cannulas, speculums, and calipers for microsurgery.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">280+ Instruments</span>
                      <button
                        onClick={() => onOpenRfq('Ophthalmic Surgical Instruments')}
                        className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                      >
                        <span>RFQ Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Solutions & Diagnostics */}
                  <div className="group bg-slate-900/90 hover:bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-teal/60 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden h-40 bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
                        <img 
                          src="/Ophthalmic Solutions-01.svg" 
                          alt="Ophthalmic Solutions & Diagnostic Strips" 
                          className="max-h-28 max-w-full object-contain filter invert brightness-200 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          Sterile BFS
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-brand-teal font-semibold">Series 04</span>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors">
                          Solutions & Diagnostic Strips
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                          Sodium Hyaluronate viscoelastics, Fluorescein/Schirmer diagnostic strips, ocular prostheses artificial eyes, and acuity charts.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">95+ Solutions & Strips</span>
                      <button
                        onClick={() => onOpenRfq('Ophthalmic Solutions & Diagnostics')}
                        className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                      >
                        <span>RFQ Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                <div className="text-center pt-2">
                  <Link to="/products">
                    <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                      Explore Complete 457-Item Wholesale Catalog
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* SLIDE 3: PRODUCTION LINES & OWN FACTORIES */}
            {activeSlide === 2 && (
              <motion.div
                key="slide-production"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Infrastructure Overview Banner & Milestones */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  <div className="lg:col-span-5 space-y-6 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-teal/15 border border-brand-teal/30 text-xs font-semibold text-brand-teal">
                      <Factory className="w-3.5 h-3.5" />
                      <span>Manufacturing Capacity & Own Infrastructure</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl text-white">
                      3 Own Cleanroom Facilities & Strategic Partner Lines
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      We operate 3 state-of-the-art manufacturing facilities in Nagpur along with 5 strategic cooperation lines, providing an integrated export capacity of over <strong className="text-white font-mono font-bold">457+ catalog items</strong>.
                    </p>

                    {/* Timeline Milestones (Competitor Slide 3 Adaptation) */}
                    <div className="space-y-4 pt-2 border-t border-slate-800">
                      <h4 className="text-xs uppercase font-mono tracking-widest text-brand-teal font-bold">
                        Company Growth Milestones
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal font-mono font-bold shrink-0">1985</span>
                          <span className="text-slate-300">Established Central India Export in Nagpur, India as a specialized medical exporter.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal font-mono font-bold shrink-0">2004</span>
                          <span className="text-slate-300">Commissioned ISO Class 5 Cleanrooms for ioVue™ IOL assembly & micro blade honing.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal font-mono font-bold shrink-0">2014</span>
                          <span className="text-slate-300">Attained ISO 13485:2016 & CE Mark certifications; integrated direct MIHAN cargo dispatch.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal font-mono font-bold shrink-0">2022</span>
                          <span className="text-slate-300">Expanded global distribution network to over 50 countries across 5 continents.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Production Lines Cards (Competitor Slide 3 Layout) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Line 1: IOL Assembly */}
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-lg group hover:border-brand-teal/60 transition-all">
                      <div className="h-36 overflow-hidden relative">
                        <img 
                          src="/production-line-iol.jpg" 
                          alt="Cleanroom IOL Assembly Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-brand-teal border border-brand-teal/30">
                          Line 01
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-teal transition-colors">
                          Cleanroom IOL Assembly Line
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          ISO Class 5 cleanrooms with high-precision optical polymer lathes and 100% hydration diopter testing.
                        </p>
                      </div>
                    </div>

                    {/* Line 2: Micro Blade Honing */}
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-lg group hover:border-brand-teal/60 transition-all">
                      <div className="h-36 overflow-hidden relative">
                        <img 
                          src="/production-line-blades.jpg" 
                          alt="Micro Surgical Blade Honing Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-brand-teal border border-brand-teal/30">
                          Line 02
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-teal transition-colors">
                          Micro Blade Laser Honing Line
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Laser-guided edge sharpening and high-magnification digital microscope inspection for surgical sharpness.
                        </p>
                      </div>
                    </div>

                    {/* Line 3: Ophthalmic Solutions BFS */}
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-lg group hover:border-brand-teal/60 transition-all">
                      <div className="h-36 overflow-hidden relative">
                        <img 
                          src="/production-line-solutions.jpg" 
                          alt="Ophthalmic Sterile Solution BFS Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-brand-teal border border-brand-teal/30">
                          Line 03
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-teal transition-colors">
                          Sterile Solutions BFS Filling Line
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Automated Blow-Fill-Seal (BFS) liquid packaging for sterile viscoelastic solutions & ampoules.
                        </p>
                      </div>
                    </div>

                    {/* Line 4: Prosthetics & Diagnostics */}
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-lg group hover:border-brand-teal/60 transition-all">
                      <div className="h-36 overflow-hidden relative">
                        <img 
                          src="/production-line-prosthetics.jpg" 
                          alt="Prosthetics & Diagnostic Strips Line" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-brand-teal border border-brand-teal/30">
                          Line 04
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-teal transition-colors">
                          Prosthetics & Diagnostics Line
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Hand-polished custom acrylic ocular prosthetics and lint-free high-absorbency diagnostic test strips.
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
