import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Badge, Button } from './Primitives';
import { FileText, ArrowRight, ShieldCheck, ZoomIn, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenRfq }) => {
  const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 100);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-medical-card hover:shadow-brand-glow hover:border-brand-teal/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Banner / Bigger Product Image Container */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-slate-50 p-4 border-b border-slate-100 relative overflow-hidden flex items-center justify-center min-h-[220px] h-[220px] group/img cursor-crosshair"
      >
        {(product.image_url || product.image) ? (
          <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
            <img 
              src={product.image_url || product.image} 
              alt={product.name} 
              className="h-44 sm:h-48 w-auto max-w-full object-contain mx-auto transition-transform duration-200 ease-out"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isHovered ? 'scale(2)' : 'scale(1)'
              }}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('default.jpg')) {
                  target.src = '/products/default.jpg';
                }
              }}
            />
            {/* Magnifying Hover Overlay */}
            {!isHovered && (
              <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-brand-teal shadow-md border border-brand-teal/20">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center relative z-10 space-y-1">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm mx-auto flex items-center justify-center text-slate-400 font-bold font-display text-lg">
              {product.name.charAt(0)}
            </div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider font-semibold">
              Image Needed
            </span>
          </div>
        )}

        {/* Brand Flagship & Model Badge */}
        {product.brand && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-teal text-white shadow-sm z-10">
            {product.brand} {product.variants && product.variants.length > 1 ? `· ${product.variants.length} Models` : product.model ? `· ${product.model}` : 'Flagship'}
          </span>
        )}

        {/* Category / Subcategory Clickable Badge */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
          {product.category_path && product.category_path.includes('>') ? (
            <Link
              to={`/products?category=${encodeURIComponent(product.main_category)}&subcategory=${encodeURIComponent(product.category_path.split('>')[1].trim())}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-bold text-brand-teal bg-white/95 backdrop-blur-sm border border-brand-teal/30 hover:bg-brand-teal hover:text-white px-2 py-0.5 rounded shadow-2xs transition-colors truncate max-w-[170px] cursor-pointer"
              title={`View only ${product.category_path.split('>')[1].trim()}`}
            >
              {product.category_path.split('>')[1].trim()}
            </Link>
          ) : (
            <Link
              to={`/products?category=${encodeURIComponent(product.main_category)}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-bold text-slate-700 bg-white/95 border border-slate-200 hover:text-brand-teal px-2 py-0.5 rounded shadow-2xs transition-colors cursor-pointer"
            >
              {product.main_category}
            </Link>
          )}
        </div>
      </div>

      {/* Product Body */}
      <div className="p-5 flex-1 space-y-3">
        <Link 
          to={`/product/${product.slug}`}
          className="group-hover:text-brand-teal transition-colors"
        >
          <h3 className="font-display font-bold text-slate-900 text-lg leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {product.short_description || 'High-precision ophthalmic surgical instrument designed for micro-incisions and surgical procedures.'}
        </p>

        {/* Key Specification Badges / Variants Count Badge */}
        {product.variants && product.variants.length > 1 ? (
          <div className="pt-1 flex items-center space-x-1.5">
            <span className="text-[10px] font-bold text-brand-teal bg-brand-soft border border-brand-teal/30 px-2.5 py-1 rounded-lg inline-flex items-center space-x-1 font-mono">
              <span>{product.variants.length} Models & Sizes Available</span>
            </span>
          </div>
        ) : Object.keys(product.specifications).length > 0 ? (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
              <span key={key} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono truncate max-w-[180px]">
                {key}: {val}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Action Footer with Add to Cart */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center space-x-2 border cursor-pointer shadow-sm ${
            justAdded
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-brand-teal text-white hover:bg-[#20968E] border-brand-teal'
          }`}
          title="Add to quotation cart"
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added to Cart ✓</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
