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
              <img src="/CIE logo.png" alt="Central India Export" className="h-14 w-auto bg-white p-2 rounded-lg border border-slate-200 shadow-sm" />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pr-4 font-normal">
              Central India Export (est. 1985) is a manufacturer and international exporter of high-precision ophthalmic surgical instruments, ioVue intraocular lenses (IOLs), micro-surgical blades, and eye equipment based in Nagpur, India.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-brand-teal shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>39+ Years Export Legacy</span>
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
              <li><Link to="/about-us" className="hover:text-brand-teal transition-colors">About Central India Export</Link></li>
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
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:+917122522500" className="hover:text-brand-teal transition-colors font-semibold">+91-712-2522500</a>
                  <a href="tel:+919823023023" className="hover:text-brand-teal transition-colors font-semibold">+91-9823023023</a>
                </div>
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
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 1985–2026 Central India Export. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-700">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-700">Terms & Conditions</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
