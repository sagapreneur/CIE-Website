import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Primitives';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import categoriesData from '../../public_html/data/categories.json';

export const Footer: React.FC<{ onOpenRfq: () => void }> = ({ onOpenRfq }) => {
  return (
    <footer className="bg-[#EBF7F8] text-slate-800 relative overflow-hidden pt-16 pb-12 border-t-2 border-brand-teal/40 font-body">
      {/* Light blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-teal/20">
          
          {/* Column 1: Company Profile with Logo Only */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/cie-logo.png" alt="Central India Export" className="h-12 w-auto bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm" />
              <div className="h-12 px-4 bg-gradient-to-br from-[#0D3666] to-[#1A2638] border border-[#28B2A8] rounded-lg flex items-center justify-center shadow-sm">
                <span className="font-display font-extrabold text-white text-base tracking-widest">
                  IOVUE<span className="text-brand-teal">™</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pr-4 font-normal">
              Central India Export (est. 2004) is a premier supplier and international exporter of high-precision ophthalmic surgical instruments, ioVue intraocular lenses (IOLs), micro-surgical blades, and ophthalmic equipment based in Nagpur, India.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-brand-teal shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>21+ Years Export Mastery</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 font-mono shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                <span>GSTIN: 27AAEFC8743J1Z5</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-brand-teal transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-brand-teal transition-colors">Product Catalog (457 Items)</Link></li>
              <li><Link to="/iovue" className="text-brand-teal font-semibold hover:underline">ioVue IOL Flagship</Link></li>
              <li><Link to="/about-us" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link to="/company-profile" className="hover:text-brand-teal transition-colors font-semibold text-brand-teal">Company Profile & Facilities</Link></li>
              <li><Link to="/contact-us" className="hover:text-brand-teal transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-brand-teal transition-colors font-semibold">FAQ & Help Center</Link></li>
              <li>
                <button onClick={onOpenRfq} className="text-brand-teal font-bold hover:underline flex items-center space-x-1">
                  <span>Request Quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Major Product Categories */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Product Lines
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {categoriesData.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="hover:text-brand-teal transition-colors flex items-center justify-between">
                    <span className="truncate">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Nagpur HQ & Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <span>
                  Central India Export,<br />
                  6-7, Shri Vardhan Complex Ramdaspeth,<br />
                  Wardha Road, Nagpur-440012, Maharashtra (India)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                <a href="tel:+917122429168" className="hover:text-brand-teal transition-colors font-semibold">+91-712-2429168</a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-brand-teal shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23m4.52 10.23c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29" />
                </svg>
                <a href="https://wa.me/919822200622" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors font-semibold">+91-9822200622</a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <div className="flex flex-col space-y-0.5">
                  <a href="mailto:vaidsandeep100@yahoo.co.in" className="hover:text-brand-teal transition-colors">vaidsandeep100@yahoo.co.in</a>
                  <a href="mailto:cie@cieindia.com" className="hover:text-brand-teal transition-colors">cie@cieindia.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-brand-teal shrink-0" />
                <span>centralindiaexport.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <p>© 2004–2026 Central India Export. All Rights Reserved.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p>
              Developed by{' '}
              <a 
                href="https://www.kardecode.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-teal hover:underline font-semibold"
              >
                KardeCode
              </a>
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-700">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-700">Terms & Conditions</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
