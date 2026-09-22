import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Section, Button, Badge } from '../components/Primitives';
import { ProductCard } from '../components/ProductCard';
import { PrecisionIcon } from '../components/CustomIcons';
import { FileText, ArrowLeft, ShieldCheck, CheckCircle, Truck, Award, ZoomIn, ShoppingCart, Check, Package, Globe2 } from 'lucide-react';
import productsData from '../../public_html/data/products.json';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenRfq }) => {
  const { productSlug, slug } = useParams<{ productSlug?: string; slug?: string }>();
  const currentSlug = productSlug || slug;
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [orderQty, setOrderQty] = useState(100);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addToCart, openCart, totalItemsCount } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };
  
  const product = productsData.find(p => p.slug === currentSlug) || productsData.find(p => p.slug.toLowerCase() === currentSlug?.toLowerCase()) || productsData[0];
  const relatedProducts = productsData.filter(p => p.main_category === product.main_category && p.id !== product.id).slice(0, 4);

  // Reset variation when slug changes
  useEffect(() => {
    setSelectedVariantIndex(0);
  }, [currentSlug]);

  const activeVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedVariantIndex] || product.variants[0]
    : null;

  const activeSpecs = activeVariant && activeVariant.specifications
    ? activeVariant.specifications
    : product.specifications || {};

  const activeModel = activeVariant ? activeVariant.model : product.model;

  const handleAddToCart = () => {
    const itemToAdd = activeVariant ? {
      ...product,
      name: `${product.name} (Model ${activeVariant.model})`,
      model: activeVariant.model,
      specifications: activeSpecs
    } : product;

    addToCart(itemToAdd, orderQty);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 2000);
  };

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
              {(product.image_url || product.image) ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                  <img 
                    src={product.image_url || product.image} 
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
                PRODUCT CODE: CIE-{product.id.toString().padStart(4, '0')}
              </span>
            </div>

            {/* Quick Export Specifications Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase">Export Origin</span>
                <strong className="text-slate-900 font-semibold">Nagpur, India (HQ)</strong>
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
              <div className="flex flex-wrap items-center gap-2">
                {product.category_path && product.category_path.includes('>') ? (
                  <div className="inline-flex items-center space-x-1.5 text-xs">
                    <Link
                      to={`/products?category=${encodeURIComponent(product.main_category)}`}
                      className="px-2.5 py-1 bg-brand-soft text-brand-blue hover:text-brand-teal rounded-md border border-brand-teal/20 font-semibold transition-colors cursor-pointer"
                    >
                      {product.main_category}
                    </Link>
                    <span className="text-slate-400 font-bold">&gt;</span>
                    <Link
                      to={`/products?category=${encodeURIComponent(product.main_category)}&subcategory=${encodeURIComponent(product.category_path.split('>')[1].trim())}`}
                      className="px-2.5 py-1 bg-brand-teal text-white hover:bg-[#20968E] rounded-md font-bold shadow-2xs transition-colors cursor-pointer"
                    >
                      {product.category_path.split('>')[1].trim()}
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={`/products?category=${encodeURIComponent(product.main_category)}`}
                    className="px-2.5 py-1 bg-brand-soft text-brand-blue hover:text-brand-teal rounded-md border border-brand-teal/20 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {product.category_path || product.main_category}
                  </Link>
                )}
                {activeModel && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-brand-teal text-white text-[10px] font-bold tracking-wider uppercase font-mono shadow-2xs">
                    Model: {activeModel}
                  </span>
                )}
                {(product.name.toLowerCase().includes('yellow') || (activeVariant && activeVariant.model.includes('Y') && !activeVariant.model.includes('YE'))) && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold tracking-wider uppercase font-mono shadow-2xs">
                    Natural Yellow · Blue Light Filter
                  </span>
                )}
                {product.brand && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-brand-soft border border-brand-teal/40 text-brand-teal text-[10px] font-bold tracking-wider uppercase font-display">
                    <span className="font-black text-brand-teal">{product.brand}</span>
                    <span className="text-slate-600 font-medium">Series</span>
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Short Description */}
            <div className="p-4 bg-brand-soft/60 rounded-xl border border-brand-teal/20 text-sm text-slate-700 leading-relaxed font-normal">
              {product.short_description || 'High-precision ophthalmic instrument supplied under ISO 13485 quality standards for precision cataract and micro-incision surgery.'}
            </div>

            {/* Model & Dimension Variation Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="p-4 bg-slate-50 rounded-xl border-2 border-brand-teal/30 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    <span>Select Model & Dimension Variation:</span>
                  </span>
                  <span className="text-[11px] font-mono text-brand-teal font-bold bg-white px-2.5 py-0.5 rounded-md border border-brand-teal/20">
                    {product.variants.length} Options Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant, idx) => {
                    const isSelected = idx === selectedVariantIndex;
                    return (
                      <button
                        key={variant.model}
                        type="button"
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-brand-teal text-slate-900 shadow-sm ring-2 ring-brand-teal/20'
                            : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-mono font-bold text-xs flex items-center space-x-1.5">
                            <span className={isSelected ? 'text-brand-teal font-extrabold' : 'text-slate-900'}>
                              {variant.model}
                            </span>
                            {variant.model.endsWith('P') && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 font-sans uppercase">
                                Preloaded
                              </span>
                            )}
                            {(variant.model.includes('CE') || variant.model.includes('YE')) && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-800 font-sans uppercase">
                                EDOF
                              </span>
                            )}
                            {variant.model.includes('Y') && !variant.model.includes('YE') && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 font-sans uppercase">
                                Yellow
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 font-mono">
                            Optic: <strong className="text-slate-800">{variant.optic_dia}</strong> · Overall: <strong className="text-brand-teal">{variant.overall_dia}</strong>
                          </div>
                          {variant.diopter && (
                            <div className="text-[10px] text-slate-500 font-mono">
                              Power: {variant.diopter}
                            </div>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
                          isSelected ? 'border-brand-teal bg-brand-teal text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary RFQ & Cart Action Box */}
            <div className="p-5 bg-brand-soft rounded-xl border border-brand-teal/30 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs text-brand-teal font-bold uppercase tracking-wider">
                  B2B Export Inquiries
                </span>
                <span className="text-[10px] bg-brand-teal text-white px-2 py-0.5 rounded font-mono font-bold">
                  Direct Factory Pricing
                </span>
              </div>

              {/* MOQ and Distribution Policy Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-brand-teal/30 rounded-lg text-slate-700 font-semibold shadow-2xs">
                  <Package className="w-3.5 h-3.5 text-brand-teal" />
                  <span>The MOQ 100 piece depends on the product</span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-brand-teal/30 rounded-lg text-[#0D3666] font-semibold shadow-2xs">
                  <Globe2 className="w-3.5 h-3.5 text-brand-teal" />
                  <span>One Country One Distribution Network</span>
                </div>
              </div>

              <p className="text-xs text-slate-700">
                Available for bulk hospital procurement, distributor sample evaluation packs, and OEM export orders. Formal proforma invoices with ISO 13485 & CE technical dossiers issued within 24 business hours.
              </p>

              {/* Quantity Selector & Action Buttons */}
              <div className="pt-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-2xs">
                    <label className="text-xs font-bold text-slate-700 font-display">Qty (Units):</label>
                    <input
                      type="number"
                      min="1"
                      step="50"
                      value={orderQty}
                      onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 font-mono font-bold text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold font-display transition-all flex items-center space-x-2 border shadow-sm cursor-pointer ${
                      addedFeedback
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-brand-teal text-white hover:bg-[#20968E] border-brand-teal'
                    }`}
                  >
                    {addedFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Added to Cart ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-white" />
                        <span>Add to Cart ({orderQty} pcs)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={openCart}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold font-display transition-all flex items-center space-x-2 border border-slate-300 hover:border-brand-teal text-slate-700 hover:text-brand-teal bg-white shadow-2xs cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-brand-teal" />
                    <span>View Cart {totalItemsCount > 0 ? `(${totalItemsCount} pcs)` : ''}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            {Object.keys(activeSpecs).length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    Technical Specifications Table
                  </h3>
                  {activeModel && (
                    <span className="text-xs font-mono font-bold text-brand-teal bg-brand-soft border border-brand-teal/30 px-2.5 py-0.5 rounded-full">
                      Specifications for Model: {activeModel}
                    </span>
                  )}
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody>
                      {Object.entries(activeSpecs).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200 w-1/3">{key}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-900">{String(val)}</td>
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
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
