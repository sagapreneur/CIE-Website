import React, { useState, useMemo } from 'react';
import { Container, Button, Badge } from '../components/Primitives';
import { Search, ChevronDown, HelpCircle, ShieldCheck, Truck, FileText, Award, PhoneCall, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_DATA, FaqItem } from '../data/faqs';

export const FaqPage: React.FC<{ onOpenRfq: (productName?: string) => void }> = ({ onOpenRfq }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'General' | 'Quality' | 'Orders' | 'Logistics' | 'OEM'>('All');
  const [openAccordion, setOpenAccordion] = useState<string | null>('b2b-01');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesTab = activeTab === 'All' || item.category === activeTab;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <Container className="max-w-5xl space-y-10">
        
        {/* Header Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-soft border border-brand-teal/30 text-xs font-bold text-brand-teal uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center & Frequently Asked Questions</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about Central India Export’s ophthalmic instruments, IOVUE™ IOL brand, 
            ISO 13485 quality standards, export order procedures, and international shipping logistics.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs (e.g., ISO 13485, MOQ, IOVUE, Incoterms, OEM)..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {(['All', 'General', 'Quality', 'Orders', 'Logistics', 'OEM'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab === 'All' ? 'All Questions' : tab === 'General' ? 'General B2B' : tab === 'Quality' ? 'Quality & ISO' : tab === 'Orders' ? 'Export Orders' : tab === 'Logistics' ? 'Export & Shipping' : 'OEM & Branding'}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openAccordion === faq.id;
              return (
                <div key={faq.id} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : faq.id)}
                    className="w-full text-left py-3 flex items-start justify-between space-x-4 group"
                  >
                    <span className="font-display font-bold text-base text-slate-900 group-hover:text-brand-teal transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-teal' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="pt-1 pb-3 text-sm text-slate-600 leading-relaxed space-y-2 border-t border-slate-100/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 space-y-3 text-slate-500">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
              <p>No matching questions found for "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* Support & Export Desk Callout Box */}
        <div className="bg-gradient-to-r from-brand-teal to-brand-blue rounded-2xl p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-xl">Have a Specific Export or OEM Inquiry?</h3>
            <p className="text-sm opacity-90">
              Our dedicated export desk in Nagpur, India is ready to assist with custom proforma quotes and technical specifications.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-brand-teal hover:bg-slate-100 font-bold"
              onClick={() => onOpenRfq()}
            >
              Request Proforma Quote
            </Button>
            <Link to="/contact-us">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Export Desk
              </Button>
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
};
