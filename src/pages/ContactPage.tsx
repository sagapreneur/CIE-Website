import React from 'react';
import { Container, Section, SectionHeading, Button } from '../components/Primitives';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC<{ onOpenRfq: () => void }> = ({ onOpenRfq }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner (With Universal Banner Background - Pure) */}
      <div 
        className="py-14 border-b border-slate-200 relative overflow-hidden bg-cover bg-center bg-no-repeat text-slate-900"
        style={{ backgroundImage: `url('/universal-banner.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-white px-3 py-1 rounded border border-brand-teal/30 shadow-sm font-display inline-block">
              Export Desk & Factory Headquarters
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900">
              Contact Central India Export
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Get in touch with our export sales engineering team in Nagpur for quotations, distributor terms, and product technical sheets.
            </p>
          </div>
        </Container>
      </div>

      <Container className="pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Contact Info Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-2xl text-slate-900 border-b border-slate-100 pb-3">
                Headquarters Info
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <strong className="block font-bold text-slate-900">Address:</strong>
                    <span>Central India Export</span><br />
                    <span>6-7, Shri Vardhan Complex Ramdaspeth,</span><br />
                    <span>Wardha Road, Nagpur-440012, Maharashtra (India)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <strong className="block font-bold text-slate-900 mb-1">Phone Numbers:</strong>
                    <div className="flex flex-col space-y-0.5">
                      <a href="tel:+917122522500" className="hover:text-brand-teal font-semibold">+91-712-2522500</a>
                      <a href="tel:+919823023023" className="hover:text-brand-teal font-semibold">+91-9823023023</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <strong className="block font-bold text-slate-900 mb-1">Email Contacts:</strong>
                    <div className="flex flex-col space-y-0.5">
                      <a href="mailto:vaidsandeep100@yahoo.co.in" className="text-brand-teal font-semibold hover:underline">vaidsandeep100@yahoo.co.in</a>
                      <a href="mailto:cie@cieindia.com" className="text-brand-teal font-semibold hover:underline">cie@cieindia.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <strong className="block font-bold text-slate-900">GSTIN Registration:</strong>
                    <span className="font-mono text-xs">27AAEFC8743J1Z5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Send Direct Message
              </h3>
              <p className="text-xs text-slate-500">
                For general inquiries, partnership proposals, or distributor applications.
              </p>
            </div>

            <form onSubmit={e => { e.preventDefault(); onOpenRfq(); }} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input type="text" required placeholder="Full Name" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Company / Organization</label>
                  <input type="text" placeholder="Company Name" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Business Email *</label>
                  <input type="email" required placeholder="email@domain.com" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Country</label>
                  <input type="text" placeholder="Destination Country" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Message / Inquiry Details</label>
                <textarea rows={4} placeholder="Describe your requirement..." className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-teal" />
              </div>

              <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </Container>

    </div>
  );
};
