import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

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
    "Hello Central India Export, I am interested in wholesale ophthalmic surgical products and would like to request information."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-auto">
      
      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg hover:bg-brand-teal hover:scale-110 transition-all duration-300 flex items-center justify-center border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal"
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
  );
};
