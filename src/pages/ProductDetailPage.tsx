import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Section, Button, Badge } from '../components/Primitives';
import { ProductCard } from '../components/ProductCard';
import { PrecisionIcon } from '../components/CustomIcons';
import { FileText, ArrowLeft, ShieldCheck, CheckCircle, Truck, Award, ZoomIn } from 'lucide-react';
import productsData from '../../public_html/data/products.json';

interface ProductDetailPageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenRfq }) => {
  const { productSlug, slug } = useParams<{ productSlug?: string; slug?: string }>();
  const currentSlug = productSlug || slug;
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };
  
  const product = productsData.find(p => p.slug === currentSlug) || productsData.find(p => p.slug.toLowerCase() === currentSlug?.toLowerCase()) || productsData[0];
  const relatedProducts = productsData.filter(p => p.main_category === product.main_category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 text-xs text-slate-600">
        <Container className="flex items-center space-x-2">
          <Link to="/" className="hover:text-brand-teal">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-teal">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.main_category)}`} className="hover:text-brand-teal">
            {product.main_category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{product.name}</span>
        </Container>
      </div>

      {/* Main Product Hero */}
      <Container className="pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Visual Box */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden group/zoom cursor-crosshair"
            >
              {product.image ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-64 w-auto object-contain mx-auto transition-transform duration-150 ease-out" 
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isHovered ? 'scale(2.5)' : 'scale(1)'
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('default.jpg')) {
                        target.src = '/products/default.jpg';
                      }
                    }}
                  />
                  {/* Magnifying Indicator Badge */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-brand-teal border border-brand-teal/30 shadow-sm flex items-center space-x-1.5 opacity-90 group-hover/zoom:opacity-100 transition-opacity pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isHovered ? '2.5x Zooming' : 'Hover to Magnify'}</span>
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-soft shadow-lg flex items-center justify-center text-brand-blue font-bold font-display text-3xl mb-3 z-10">
                  {product.name.charAt(0)}
                </div>
              )}

              {product.brand && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-brand-teal text-white font-bold text-xs rounded uppercase tracking-wider z-10 shadow-sm">
                  {product.brand} Series
                </span>
              )}

              <span className="text-xs font-mono text-slate-500 mt-4 block">
                PRODUCT CODE: CIE-PRD-{product.id.toString().padStart(4, '0')}
              </span>
            </div>

            {/* Quick Export Specifications Bar */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase">Export Origin</span>
                <strong className="text-slate-900 font-semibold">Nagpur, India (MIHAN)</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase">Sterilization</span>
                <strong className="text-slate-900 font-semibold">EO Gas / Autoclave</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Product Detail Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="blue">{product.category_path}</Badge>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-wider uppercase shadow-2xs font-display">
                  <span className="text-teal-400 font-extrabold">ioVue™</span>
                  <span className="text-slate-300 font-normal">Certified</span>
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Short Description */}
            <div className="p-4 bg-brand-soft/60 rounded-xl border border-brand-teal/20 text-sm text-slate-700 leading-relaxed font-normal">
              {product.short_description || 'High-precision ophthalmic instrument manufactured under ISO 13485 quality standards for precision cataract and micro-incision surgery.'}
            </div>

            {/* Primary RFQ Action Box */}
            <div className="p-5 bg-brand-soft rounded-xl border border-brand-teal/30 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs text-brand-teal font-bold uppercase tracking-wider">
                  B2B Wholesale Export Inquiries
                </span>
                <span className="text-[10px] bg-brand-teal text-white px-2 py-0.5 rounded font-mono font-bold">
                  Direct Factory Pricing
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Available for bulk hospital procurement, distributor sample evaluation packs, and OEM export orders.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<FileText className="w-4 h-4" />}
                  onClick={() => onOpenRfq(product.name, product.slug)}
                >
                  Request a Formal Quote
                </Button>
                <Link to="/contact-us">
                  <Button variant="outline" size="lg" className="border-slate-300 text-slate-800 hover:bg-slate-100">
                    Contact Export Desk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Specifications Table */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
                  Technical Specifications Table
                </h3>
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200 w-1/3">{key}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-900">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Long Description Prose */}
            {product.long_description && (
              <div className="space-y-2 pt-2">
                <h3 className="font-display font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
                  Detailed Product Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.long_description}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 space-y-6">
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Related Items in {product.main_category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} onOpenRfq={onOpenRfq} />
              ))}
            </div>
          </div>
        )}

      </Container>

    </div>
  );
};
