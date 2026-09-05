import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShieldCheck, Globe2, Package } from 'lucide-react';
import { Button } from './Primitives';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItemsCount,
    openCartRfq 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl z-10 flex flex-col h-full border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-brand-soft border-b border-brand-teal/20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-brand-teal/30 flex items-center justify-center text-brand-teal shadow-xs">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">
                Quotation Inquiry Cart
              </h3>
              <p className="text-xs text-slate-600">
                {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'} selected ({totalItemsCount} pcs total)
              </p>
            </div>
          </div>
          
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-slate-200/80 text-slate-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MOQ Notice Strip */}
        <div className="bg-white border-b border-slate-100 px-5 py-2.5 flex items-center space-x-2 text-[11px] text-slate-600">
          <Package className="w-3.5 h-3.5 text-brand-teal shrink-0" />
          <span>
            <strong>MOQ Policy:</strong> The MOQ 100 piece depends on the product.
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-bold text-slate-800 text-base">Your Cart is Empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our ophthalmic catalog and click "Add to Cart" to build a multi-product export quotation.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeCart}
                className="mt-2"
              >
                Continue Browsing Catalog
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-brand-teal/40 transition-colors"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image_url || '/products/default.jpg'}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/products/default.jpg';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-display font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.main_category && (
                    <span className="text-[10px] text-brand-teal font-semibold font-mono block">
                      {item.main_category}
                    </span>
                  )}

                  {/* Quantity adjustment */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 50))}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-brand-teal transition-colors"
                        title="Decrease 50 pcs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        step="10"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-14 text-center font-mono text-xs font-bold text-slate-900 border-none outline-none py-0.5"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 50)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-brand-teal transition-colors"
                        title="Increase 50 pcs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 font-medium">
                      Units / Pcs
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-4">
            
            {/* Exclusive Policy Highlight */}
            <div className="bg-brand-soft/60 rounded-xl p-3 border border-brand-teal/20 flex items-start space-x-2 text-[11px] text-slate-700">
              <Globe2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900">One Country One Distribution Network</strong>
                <span className="text-slate-600">Exclusive territory distributor terms apply for approved importers.</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-3">
              <span>Total Estimated Units:</span>
              <span className="font-mono font-bold text-base text-slate-900">
                {totalItemsCount} pcs
              </span>
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-md text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={openCartRfq}
              >
                Proceed to RFQ ({cartItems.length} Products)
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-slate-500 hover:text-rose-600 transition-colors py-1"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
              <span>Direct Export Supplier Proforma · ISO 13485 & CE</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

