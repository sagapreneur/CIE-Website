import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Section, SectionHeading, Button, Badge } from '../components/Primitives';
import { WorldMap } from '../components/WorldMap';
import { ProductCard } from '../components/ProductCard';
import { 
  Eye, PackageCheck, Award, ShieldCheck, Globe2, Factory, Truck, Search,
  Microscope, FileCheck, ArrowRight, FileText, CheckCircle2, Shield, Sparkles, PhoneCall, ChevronRight, Layers, Stethoscope
} from 'lucide-react';
import productsData from '../../public_html/data/products.json';
import categoriesData from '../../public_html/data/categories.json';
import { IoVueShowcase } from '../components/IoVueShowcase';

interface HomePageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();
  const featuredProducts = productsData.filter(p => p.is_featured).slice(0, 8);

  return (
    <div className="space-y-0 font-body bg-white text-slate-900">
      
      {/* HERO SECTION (With Custom Hero Background Image - No Overlay) */}
      <section 
        className="relative text-slate-900 pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-200 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-teal/30 text-xs font-semibold text-brand-teal shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span>39-Year Export Legacy · Nagpur, India (Est. 1985)</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-900">
              Ophthalmic Products <span className="text-brand-teal">& IOLs</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Direct export manufacturing of ioVue intraocular lenses, micro-blades, ophthalmic solutions, diagnostic strips, and ocular prostheses. Dispatched globally from Nagpur's Zero-Mile MIHAN cargo hub.
            </p>

            {/* Action CTAs */}
            <div className="pt-1 flex flex-wrap gap-4 items-center">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<FileText className="w-5 h-5" />}
                onClick={() => onOpenRfq()}
              >
                Request a Wholesale Quote
              </Button>

              <Link to="/products">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-brand-teal text-brand-teal bg-white hover:bg-brand-teal hover:text-white hover:border-brand-teal shadow-sm font-bold"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Browse All 460 Products
                </Button>
              </Link>
            </div>

            {/* Trust Specs Bar (Compact Circular White Icon with Teal Border) */}
            <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 border-t border-slate-200/80 text-[11px]">
              <div className="flex items-center space-x-2 py-1.5 px-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded-full bg-white border border-brand-teal flex items-center justify-center text-brand-teal shrink-0 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <span className="font-bold text-slate-900 leading-tight">FDA & CE Compliant</span>
              </div>

              <div className="flex items-center space-x-2 py-1.5 px-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded-full bg-white border border-brand-teal flex items-center justify-center text-brand-teal shrink-0 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <span className="font-bold text-slate-900 leading-tight">GMP & ISO Certified</span>
              </div>

              <div className="flex items-center space-x-2 py-1.5 px-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded-full bg-white border border-brand-teal flex items-center justify-center text-brand-teal shrink-0 shadow-sm">
                  <Globe2 className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <span className="font-bold text-slate-900 leading-tight">10,000+ Global Clients</span>
              </div>

              <div className="flex items-center space-x-2 py-1.5 px-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                <div className="w-6 h-6 rounded-full bg-white border border-brand-teal flex items-center justify-center text-brand-teal shrink-0 shadow-sm">
                  <Truck className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <span className="font-bold text-slate-900 leading-tight">MIHAN Cargo Dispatch</span>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* TRUST COUNTER STRIP (Light Theme) */}
      <section className="bg-brand-soft text-slate-900 py-8 border-b border-brand-teal/20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-brand-teal/20">
            <div className="space-y-1">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-teal">39+</span>
              <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold font-display">Years Manufacturing</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">457+</span>
              <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold font-display">Catalog Items</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-teal">50+</span>
              <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold font-display">Export Destinations</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">10,000+</span>
              <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold font-display">Surgeons & Clinics Served</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORY GRID (5-Column Balanced Grid - 2 Full Rows of 5 Categories) */}
      <Section className="bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="Ophthalmic Catalog Categories"
            title="Browse Complete Wholesale Product Inventory"
            subtitle="Explore our comprehensive export catalog organized across 10 primary medical product categories."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {categoriesData.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative bg-white hover:bg-gradient-to-b hover:from-white hover:to-brand-soft/50 rounded-2xl p-5 border border-slate-200/80 hover:border-brand-teal/50 shadow-sm hover:shadow-brand-glow transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5"
              >
                {/* Decorative Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-teal/5 rounded-full blur-2xl group-hover:bg-brand-teal/15 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Header Row: Custom SVG Icon Badge + Product Count Pill */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl bg-brand-soft/80 border border-brand-teal/20 text-brand-teal flex items-center justify-center p-2.5 shadow-2xs group-hover:bg-brand-teal group-hover:text-white group-hover:scale-105 group-hover:shadow-brand-glow transition-all duration-300 shrink-0">
                      {cat.icon_url ? (
                        <img 
                          src={cat.icon_url} 
                          alt={cat.name} 
                          className="w-7 h-7 max-w-full max-h-full object-contain group-hover:brightness-0 group-hover:invert transition-all" 
                        />
                      ) : (
                        <Layers className="w-6 h-6" />
                      )}
                    </div>

                    <span className="text-xs font-extrabold bg-brand-soft border border-brand-teal/30 text-brand-teal px-3 py-1 rounded-full font-mono tracking-tight flex items-center space-x-1 group-hover:bg-brand-teal group-hover:text-white group-hover:border-transparent transition-all shadow-2xs">
                      <span>{cat.product_count}</span>
                      <span className="font-normal opacity-90 text-[10px]">Products</span>
                    </span>
                  </div>

                  {/* Category Title */}
                  <div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base group-hover:text-brand-teal transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Sleek Bottom Action Link */}
                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-brand-teal group-hover:text-[#20968E] transition-colors relative z-10">
                  <span className="text-xs font-bold tracking-tight text-slate-500 group-hover:text-brand-teal transition-colors">View Products</span>
                  <div className="w-6 h-6 rounded-full bg-brand-soft group-hover:bg-brand-teal group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      {/* FEATURED BRAND: ioVue Full Section Interactive Product Showcase */}
      <IoVueShowcase onOpenRfq={onOpenRfq} />

      {/* WHY CHOOSE US */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Export Excellence & Trust"
            title="Why International Buyers Partner With Central India Export"
            subtitle="Combining 39 years of manufacturing mastery with central logistics from Nagpur."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-teal flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Micron Precision Craftsmanship</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hand-honed stainless steel and titanium ophthalmic instruments inspected under magnification for surgical accuracy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-teal flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">MIHAN Cargo Hub Logistics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located at Nagpur's Zero Mile adjacent to the MIHAN cargo airport for direct international freight dispatches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-teal flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Quality Compliance Standards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ISO 13485 quality management systems, complete batch traceability, and full export documentation provided.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-teal flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Wholesale Export Quotations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated export desk offering competitive FOB/CIF quotation terms, custom packaging, and sample dispatches.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* GLOBAL REACH MAP SECTION (Light Theme) */}
      <Section className="bg-slate-50 py-20">
        <Container>
          <WorldMap />
        </Container>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <SectionHeading
              eyebrow="Featured Ophthalmic Products"
              title="Top Export Items & Surgical Instruments"
              subtitle="High-demand surgical instruments and lenses selected from our 457 catalog items."
              className="mb-0"
            />
            <Link to="/products">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onOpenRfq={onOpenRfq} />
            ))}
          </div>
        </Container>
      </Section>

      {/* HOMEPAGE FAQ SECTION */}
      <section className="bg-slate-50 py-14 border-t border-slate-200">
        <Container className="max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="teal" className="bg-white text-brand-teal border-brand-teal/30">
              Frequently Asked Questions
            </Badge>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Common B2B Export & Technical Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Key information regarding ISO 13485 certification, wholesale orders, ioVue™ IOLs, and shipping logistics.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <details className="group border-b border-slate-100 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                What quality certifications do Central India Export products hold?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                All surgical instruments, blades, and ioVue™ IOLs are manufactured under ISO 13485:2016 Quality Management Systems for Medical Devices, carry CE certification, and conform to WHO-GMP manufacturing standards.
              </p>
            </details>

            <details className="group border-b border-slate-100 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                How can international buyers request proforma wholesale quotations?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                You can click any "Request Quote" button across our website or email cie@cieindia.com. Our export desk in Nagpur, India will issue a formal FOB/CIF proforma invoice within 24 business hours.
              </p>
            </details>

            <details className="group border-b border-slate-100 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                What are your shipping Incoterms and international lead times?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We offer FOB (Nagpur/Mumbai), CIF, and CFR Incoterms 2020 via air express (DHL, FedEx) or air cargo. In-stock products are dispatched within 3–5 days; bulk contracts ship within 2–3 weeks.
              </p>
            </details>

            <details className="group">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                Do you provide OEM private label branding for medical distributors?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes! We offer full OEM private labeling, custom laser-marking on instrument handles, bespoke blister packaging, and tailored diopter ranges for distributor networks worldwide.
              </p>
            </details>
          </div>

          <div className="text-center">
            <Link to="/faq" className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-teal hover:underline">
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA BANNER (Soft Light Teal Gradient Theme) */}
      <section className="bg-gradient-to-r from-brand-soft via-white to-brand-soft text-slate-900 py-16 border-t border-slate-200">
        <Container className="text-center space-y-6 max-w-4xl">
          <Badge variant="teal" className="bg-white text-brand-teal border-brand-teal/30 shadow-sm">
            B2B Export Inquiries Open
          </Badge>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-slate-900">
            Ready to Request a Quotation for Your Clinic or Distribution Network?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Get direct manufacturer pricing on ophthalmic instruments, ioVue IOLs, and surgical equipment.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<FileText className="w-5 h-5" />}
              onClick={() => onOpenRfq()}
            >
              Get a Quotation Today
            </Button>
            <Link to="/contact-us">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 text-slate-800 hover:bg-slate-100"
                icon={<PhoneCall className="w-5 h-5" />}
              >
                Contact Nagpur Export Desk
              </Button>
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
};
