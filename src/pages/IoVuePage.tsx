import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section, SectionHeading, Button, Badge } from '../components/Primitives';
import { EyeIrisIcon, PrecisionIcon, TrustCertificationIcon } from '../components/CustomIcons';
import { ProductCard } from '../components/ProductCard';
import { FileText, ArrowRight, CheckCircle2, ShieldCheck, Download, Award, Sparkles, ShoppingCart, Check, Eye } from 'lucide-react';
import { IoVueShowcase } from '../components/IoVueShowcase';
import { useCart } from '../context/CartContext';
import productsData from '../../public_html/data/products.json';

interface IoVuePageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const IoVuePage: React.FC<IoVuePageProps> = ({ onOpenRfq }) => {
  const { addToCart } = useCart();
  const [matrixTab, setMatrixTab] = useState<'all' | 'hydrophobic' | 'hydrophilic' | 'pmma' | 'edof' | 'preloaded'>('all');
  const [justAddedModel, setJustAddedModel] = useState<string | null>(null);

  const iovueProducts = useMemo(() => {
    return productsData.filter(p => p.brand === 'ioVue' || p.brand === 'IOVUE' || p.category_path.includes('Intraocular Lenses'));
  }, []);

  // Flatten the 30 registered models from the 10 product families for the full technical matrix
  const registeredModels = useMemo(() => {
    const list: any[] = [];
    iovueProducts.forEach(p => {
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v: any) => {
          list.push({
            id: p.id,
            slug: p.slug,
            name: v.name || `${p.name} (Model ${v.model})`,
            model: v.model,
            category_path: p.category_path,
            main_category: p.main_category,
            short_description: p.short_description,
            image_url: p.image_url || p.image,
            specifications: v.specifications || {
              "Model Number": v.model,
              "Optic Diameter": v.optic_dia,
              "Overall Diameter": v.overall_dia,
              "Diopter Power Range": v.diopter,
              "Estimated A-Constant": v.a_constant,
              "Haptic Architecture": v.haptic_type,
              "Sterilization": v.sterilization,
              "PCO Protection": v.pco
            }
          });
        });
      } else if (p.model && p.id >= 9100) {
        list.push(p);
      }
    });
    return list;
  }, [iovueProducts]);

  const filteredMatrixModels = useMemo(() => {
    switch (matrixTab) {
      case 'hydrophobic':
        return registeredModels.filter(p => p.category_path.includes('Hydrophobic'));
      case 'hydrophilic':
        return registeredModels.filter(p => p.category_path.includes('Hydrophilic'));
      case 'pmma':
        return registeredModels.filter(p => p.category_path.includes('PMMA') || p.category_path.includes('Anterior Chamber') || p.model === 'IPS 5580');
      case 'edof':
        return registeredModels.filter(p => p.model?.includes('CE') || p.model?.includes('YE'));
      case 'preloaded':
        return registeredModels.filter(p => p.model?.endsWith('P'));
      case 'all':
      default:
        return registeredModels;
    }
  }, [registeredModels, matrixTab]);

  const handleAddToCart = (product: any) => {
    addToCart(product, 100);
    setJustAddedModel(product.model || product.name);
    setTimeout(() => {
      setJustAddedModel(null);
    }, 2000);
  };

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
                Request IOVUE™ Export Quote
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <SectionHeading
              eyebrow="IOVUE™ Specifications Matrix"
              title="Official 30-Model Registered Technical Matrix"
              subtitle="Comprehensive specifications for Hydrophobic, Hydrophilic, EDOF, Pre-Loaded, and PMMA formulations."
            />
            <div className="text-xs text-slate-500 font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs shrink-0">
              Showing <span className="font-bold text-brand-teal">{filteredMatrixModels.length}</span> of 30 Models
            </div>
          </div>

          {/* Tab Filter Navigation */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 pb-3">
            {[
              { id: 'all', label: 'All Registered Models', count: 30 },
              { id: 'hydrophobic', label: 'Hydrophobic Acrylic', count: 12 },
              { id: 'hydrophilic', label: 'Hydrophilic Acrylic', count: 12 },
              { id: 'pmma', label: 'PMMA Series', count: 6 },
              { id: 'edof', label: 'EDOF Technology', count: 8 },
              { id: 'preloaded', label: 'Pre-Loaded Systems', count: 4 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMatrixTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center space-x-2 cursor-pointer ${
                  matrixTab === tab.id
                    ? 'bg-brand-teal text-white shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  matrixTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Matrix Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-teal text-white font-display uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-bold">Model No.</th>
                    <th className="py-3.5 px-4 font-bold">Lens Type / Generic Description</th>
                    <th className="py-3.5 px-4 font-bold">Optic / Overall Size</th>
                    <th className="py-3.5 px-4 font-bold">Material & Architecture</th>
                    <th className="py-3.5 px-4 font-bold">Power & A-Constant</th>
                    <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredMatrixModels.map((prod) => {
                    const specs = prod.specifications || {};
                    const isPreloaded = prod.model?.endsWith('P');
                    const isEdof = prod.model?.includes('CE') || prod.model?.includes('YE');
                    const isYellow = prod.model?.includes('Y');
                    const isAdded = justAddedModel === prod.model;

                    return (
                      <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Model Number */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1.5">
                            <Link 
                              to={`/product/${prod.slug}`} 
                              className="font-mono font-bold text-slate-900 hover:text-brand-teal text-xs underline decoration-brand-teal/30 hover:decoration-brand-teal"
                            >
                              {prod.model}
                            </Link>
                            {isPreloaded && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 uppercase font-mono">
                                Preloaded
                              </span>
                            )}
                            {isEdof && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-800 uppercase font-mono">
                                EDOF
                              </span>
                            )}
                            {isYellow && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 uppercase font-mono">
                                Yellow
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono block">
                            CIE-{prod.id.toString().padStart(4, '0')}
                          </span>
                        </td>

                        {/* Generic / Product Description */}
                        <td className="py-3.5 px-4 max-w-[280px]">
                          <Link 
                            to={`/product/${prod.slug}`} 
                            className="font-bold text-slate-900 hover:text-brand-teal block line-clamp-1"
                          >
                            {prod.name}
                          </Link>
                          <span className="text-[11px] text-slate-500 line-clamp-1">
                            {specs['Haptic Architecture'] || prod.short_description}
                          </span>
                        </td>

                        {/* Dimensions */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                          <span className="font-semibold text-slate-900">{specs['Optic Diameter'] || '6.00 mm'}</span>
                          <span className="text-slate-400"> / </span>
                          <span className="font-semibold text-brand-teal">{specs['Overall Diameter'] || '12.50 mm'}</span>
                        </td>

                        {/* Material Formulation */}
                        <td className="py-3.5 px-4 max-w-[200px]">
                          <span className="text-slate-800 font-medium block truncate">
                            {specs['Material'] || 'Biocompatible Acrylate'}
                          </span>
                          <span className="text-[10px] text-emerald-700 flex items-center space-x-1">
                            <span>✓</span>
                            <span>{specs['PCO Protection'] || '360° Step Square Edge'}</span>
                          </span>
                        </td>

                        {/* Power & A-Constant */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px]">
                          <div className="text-slate-900 font-semibold">{specs['Diopter Power Range'] || '+10.0D to +30.0D'}</div>
                          <div className="text-slate-500 text-[10px]">A-Const: <strong className="text-slate-700">{specs['Estimated A-Constant'] || '118.0'}</strong></div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => handleAddToCart(prod)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-display shadow-2xs transition-all flex items-center space-x-1 cursor-pointer ${
                                isAdded 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-brand-teal hover:bg-[#20968E] text-white'
                              }`}
                              title="Add 100 units to inquiry cart"
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added ✓</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => onOpenRfq(prod.name, prod.slug)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-brand-teal text-slate-700 hover:text-brand-teal bg-white text-xs font-bold font-display shadow-2xs transition-all cursor-pointer"
                              title="Request specific quotation"
                            >
                              RFQ
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
