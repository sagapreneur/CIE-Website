import React from 'react';
import { Container, Section, SectionHeading, Button, Badge } from '../components/Primitives';
import { EyeIrisIcon, PrecisionIcon, TrustCertificationIcon } from '../components/CustomIcons';
import { ProductCard } from '../components/ProductCard';
import { FileText, ArrowRight, CheckCircle2, ShieldCheck, Download, Award, Sparkles, ShoppingCart } from 'lucide-react';
import { IoVueShowcase } from '../components/IoVueShowcase';
import { useCart } from '../context/CartContext';
import productsData from '../../public_html/data/products.json';

interface IoVuePageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const IoVuePage: React.FC<IoVuePageProps> = ({ onOpenRfq }) => {
  const { addToCart } = useCart();
  const iovueProducts = productsData.filter(p => p.brand === 'ioVue' || p.brand === 'IOVUE' || p.category_path.includes('Intraocular Lenses'));

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-body">
      
      {/* Hero Header (With Universal Banner Background - Pure) */}
      <section 
        className="py-16 md:py-24 relative overflow-hidden border-b border-slate-200 bg-cover bg-center bg-no-repeat text-slate-900"
        style={{ backgroundImage: `url('/universal-banner.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white rounded-full text-xs font-bold uppercase tracking-wider text-brand-teal border border-brand-teal/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span>Flagship Product Line · Central India Export</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-900">
              IOVUE™ Intraocular Lenses (IOLs)
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Premium optical quality intraocular lenses designed for micro-incision cataract surgery (MICS). Engineered with 360° square edge optics to prevent posterior capsular opacification (PCO).
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<FileText className="w-5 h-5" />}
                onClick={() => onOpenRfq('IOVUE™ IOL Complete Series Catalog')}
              >
                Request IOVUE™ Wholesale Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-800 hover:bg-slate-100"
                icon={<Download className="w-5 h-5" />}
                onClick={() => onOpenRfq('IOVUE™ Technical Datasheet PDF')}
              >
                Request Technical Datasheets
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Full-Section Cover Showcase */}
      <IoVueShowcase onOpenRfq={onOpenRfq} />

      {/* Optical Technology Highlights */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Precision Optical Engineering"
            title="Why IOVUE™ Lenses Stand Out in Surgical Performance"
            subtitle="Designed to meet stringent ISO 13485 standards with superior capsular stability."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                <EyeIrisIcon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl">360° Continuous Square Edge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creates a sharp physical barrier at the optic edge to prevent lens epithelial cell (LEC) migration, significantly reducing secondary PCO rates.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <PrecisionIcon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl">Monofocal Aberration Neutral Optics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aspheric optical design delivers enhanced contrast sensitivity, minimal glare, and crisp vision under low light conditions.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                <TrustCertificationIcon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl">Natural Yellow Blue-Light Filter Option</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Protects the macula from harmful UV and short-wavelength blue light without disrupting circadian color perception.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* IOVUE™ Models Matrix Table */}
      <Section className="bg-slate-100/70">
        <Container>
          <SectionHeading
            eyebrow="IOVUE™ Specifications Matrix"
            title="Technical Parameters & Model Specifications"
            subtitle="Full specifications for Hydrophilic, Hydrophobic, and PMMA formulations."
          />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-teal text-white font-display uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Model Variant</th>
                    <th className="py-3.5 px-4">Material Formulation</th>
                    <th className="py-3.5 px-4">Optic / Overall Size</th>
                    <th className="py-3.5 px-4">Diopter Power Range</th>
                    <th className="py-3.5 px-4">A-Constant</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">IOVUE™ Hydrophilic Square Edge</td>
                    <td className="py-3 px-4">Hydrophilic Acrylic (26% Water)</td>
                    <td className="py-3 px-4 font-mono">6.00mm / 12.50mm</td>
                    <td className="py-3 px-4 font-mono">+10.0D to +30.0D (0.5D steps)</td>
                    <td className="py-3 px-4 font-mono">118.5</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => addToCart({
                          id: 1001,
                          name: 'IOVUE™ Hydrophilic Square Edge IOL',
                          slug: 'iovue-hydrophilic-square-edge-iol',
                          main_category: 'Intraocular Lenses',
                          image_url: '/products/iovue-clear-hydrophilic-acrylic-foldable-iol-fs-6025.jpg'
                        }, 100)}
                        className="px-3 py-1.5 rounded-lg bg-brand-teal hover:bg-[#20968E] text-white text-xs font-bold font-display shadow-2xs transition-all flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">IOVUE™ Hydrophobic 3-Piece Acrylic</td>
                    <td className="py-3 px-4">Hydrophobic Acrylic with PMMA Haptics</td>
                    <td className="py-3 px-4 font-mono">6.00mm / 13.00mm</td>
                    <td className="py-3 px-4 font-mono">+15.0D to +25.0D (0.5D steps)</td>
                    <td className="py-3 px-4 font-mono">118.9</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => addToCart({
                          id: 1002,
                          name: 'IOVUE™ Hydrophobic 3-Piece Acrylic IOL',
                          slug: 'iovue-hydrophobic-3-piece-acrylic-iol',
                          main_category: 'Intraocular Lenses',
                          image_url: '/products/iovue-aspheric-hydrophobic-foldable-iol-fp-6025.jpg'
                        }, 100)}
                        className="px-3 py-1.5 rounded-lg bg-brand-teal hover:bg-[#20968E] text-white text-xs font-bold font-display shadow-2xs transition-all flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">IOVUE™ PMMA PC IOL</td>
                    <td className="py-3 px-4">High Purified PMMA (UV Absorbing)</td>
                    <td className="py-3 px-4 font-mono">6.00mm / 12.50mm</td>
                    <td className="py-3 px-4 font-mono">+0.0D to +35.0D (0.5D steps)</td>
                    <td className="py-3 px-4 font-mono">118.2</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => addToCart({
                          id: 1003,
                          name: 'IOVUE™ PMMA PC IOL',
                          slug: 'iovue-pmma-pc-iol',
                          main_category: 'Intraocular Lenses',
                          image_url: '/products/iovue-high-quality-pmma-posterior-chamber-iol.jpg'
                        }, 100)}
                        className="px-3 py-1.5 rounded-lg bg-brand-teal hover:bg-[#20968E] text-white text-xs font-bold font-display shadow-2xs transition-all flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">IOVUE™ Capsular Tension Ring (CTR)</td>
                    <td className="py-3 px-4">Medical Grade PMMA Filament</td>
                    <td className="py-3 px-4 font-mono">10mm / 11mm / 12mm Uncompressed</td>
                    <td className="py-3 px-4 font-mono">N/A (Cataract Bag Stability)</td>
                    <td className="py-3 px-4 font-mono">N/A</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => addToCart({
                          id: 1004,
                          name: 'IOVUE™ Capsular Tension Ring (CTR)',
                          slug: 'iovue-capsular-tension-ring-ctr',
                          main_category: 'Intraocular Lenses',
                          image_url: '/products/iovue-capsular-tension-rings-ctr-model-pr-1109-pr-1210.jpg'
                        }, 100)}
                        className="px-3 py-1.5 rounded-lg bg-brand-teal hover:bg-[#20968E] text-white text-xs font-bold font-display shadow-2xs transition-all flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* IOVUE Products Grid */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="IOL Product Catalog"
            title="Browse IOVUE™ & Intraocular Lens Products"
            subtitle="Request quotations on individual lens models and injector cartridges."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {iovueProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} onOpenRfq={onOpenRfq} />
            ))}
          </div>
        </Container>
      </Section>

    </div>
  );
};
