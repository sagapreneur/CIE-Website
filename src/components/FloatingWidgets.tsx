import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingWidgets: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { openCart, cartItems, totalItemsCount, lastAddedProduct } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Central India Export, I am interested in ophthalmic surgical products and would like to request export quotation information."
  );

  return (
    <>
      {/* Toast popup when item added */}
      {lastAddedProduct && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-brand-teal/40 flex items-center space-x-3 text-xs">
          <div className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
          <span className="font-medium">
            Added to Cart: <strong className="text-brand-teal">{lastAddedProduct}</strong>
          </span>
          <button 
            onClick={openCart} 
            className="underline font-bold text-brand-teal hover:text-white ml-1 cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-auto">
        
        {/* Floating Cart Icon Button (Positioned slightly above To the top icon) */}
        <button
          onClick={openCart}
          aria-label="View quotation cart"
          className="w-11 h-11 rounded-full bg-brand-teal text-white shadow-lg hover:bg-[#20968E] hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-brand-teal relative cursor-pointer group"
          title="RFQ Cart"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#0D3666] text-white text-[10px] font-mono font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {cartItems.length}
            </span>
          )}
          {/* Tooltip on hover */}
          <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md font-bold">
            Quotation Cart {totalItemsCount > 0 ? `(${totalItemsCount} pcs)` : ''}
          </span>
        </button>

        {/* Scroll To Top Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg hover:bg-brand-teal hover:scale-110 transition-all duration-300 flex items-center justify-center border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/919822200622?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 rounded-full shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        >
          <MessageCircle className="w-6 h-6 fill-white stroke-none shrink-0" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold font-display pl-0 group-hover:pl-2">
            Chat on WhatsApp
          </span>
        </a>

      </div>
    </>
  );
};
