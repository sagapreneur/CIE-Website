import React, { useState, useMemo } from 'react';
import { Container, Button, Badge } from '../components/Primitives';
import { Search, ChevronDown, HelpCircle, ShieldCheck, Truck, FileText, Award, PhoneCall, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqItem {
  id: string;
  category: 'General' | 'Quality' | 'Orders' | 'Logistics' | 'OEM';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  // General & B2B Orders
  {
    id: 'b2b-01',
    category: 'General',
    question: 'Who is Central India Export (CIE) and what products do you supply?',
    answer: 'Central India Export (CIE) is a premier B2B supplier and global exporter of high-precision ophthalmic microsurgical instruments, intraocular lenses (IOVUE™ brand), micro-surgical blades, ophthalmic solutions, diagnostic strips, ocular prostheses, and clinic vision testing equipment based in Nagpur, Maharashtra, India.'
  },
  {
    id: 'b2b-02',
    category: 'Orders',
    question: 'How do I request a Proforma Quotation for wholesale export?',
    answer: 'You can request a formal wholesale quotation by clicking the "Request Quote" button on any product page or header, or by emailing our export desk directly at cie@cieindia.com. Please specify the product names, model codes, target quantities, and destination port.'
  },
  {
    id: 'b2b-03',
    category: 'Orders',
    question: 'What is your Minimum Order Quantity (MOQ) for international orders?',
    answer: 'MOQs vary by product line: Surgical Instruments (10 units per pattern), IOVUE™ IOLs (50 units assortment), Micro Surgical Blades (box of 100 units), Diagnostic Strips (10 boxes), and Ophthalmic Solutions (50 vials/syringes). Evaluation sample packs are available for qualified hospital buyers and medical distributors.'
  },
  {
    id: 'b2b-04',
    category: 'Orders',
    question: 'What international payment terms do you accept?',
    answer: 'We accept Irrevocable Letter of Credit (L/C at sight) from prime international banks, Telegraphic Transfer (T/T Wire Transfer), and Advance Bank Wire Transfers for sample evaluation shipments.'
  },

  // Quality & ISO Standards
  {
    id: 'qual-01',
    category: 'Quality',
    question: 'What quality certifications and standards do your instruments meet?',
    answer: 'All Central India Export products are supplied under strict ISO 13485:2016 Quality Management Systems for Medical Devices. Our surgical instruments and IOVUE™ IOLs carry European CE Mark technical dossiers and WHO-GMP compliance, ensuring international safety and performance.'
  },
  {
    id: 'qual-02',
    category: 'Quality',
    question: 'What surgical materials are used in your ophthalmic instruments?',
    answer: 'We utilize premium-grade biocompatible materials including AISI 420 & 316L Swedish Stainless Steel, Grade 5 Titanium Alloy (Ti-6Al-4V), Clinical Grade PMMA CQ with UV blockers, and Hydrophilic/Hydrophobic Acrylic polymers for IOVUE™ IOLs.'
  },
  {
    id: 'qual-03',
    category: 'Quality',
    question: 'Are your instruments reusable and autoclavable?',
    answer: 'Yes! All stainless steel and titanium microsurgical instruments (forceps, scissors, speculums, needle holders, probes) are 100% reusable and certified for repeated steam autoclave sterilization up to 134°C (273°F).'
  },

  // Shipping & Logistics
  {
    id: 'log-01',
    category: 'Logistics',
    question: 'What export Incoterms do you offer for international freight?',
    answer: 'We offer FOB (Free On Board - Mumbai/Nagpur Port), CIF (Cost, Insurance & Freight), and CFR (Cost & Freight) Incoterms 2020. Air express freight via DHL, FedEx, or air cargo is arranged based on client preference.'
  },
  {
    id: 'log-02',
    category: 'Logistics',
    question: 'What is the typical lead time for production and dispatch?',
    answer: 'Standard stock items (IOVUE™ IOLs, blades, strips) are dispatched within 1–3 business weeks from order confirmation.'
  },
  {
    id: 'log-03',
    category: 'Logistics',
    question: 'Do you provide certificate of origin and customs documentation?',
    answer: 'Yes! Every international export consignment includes a Commercial Invoice, Packing List, Certificate of Origin (issued by Chamber of Commerce), Certificate of Analysis (COA), ISO 13485 Compliance Certificate, and Airway Bill (AWB).'
  },

  // OEM & Private Labeling
  {
    id: 'oem-01',
    category: 'OEM',
    question: 'Do you offer OEM private label branding for distributors?',
    answer: 'Yes, we provide complete OEM and Private Label supply services. We can custom-laser mark distributor logos on instrument handles, customize blister pouch packaging, and produce bespoke diopter/model configurations.'
  },
  {
    id: 'oem-02',
    category: 'OEM',
    question: 'Can I request sample evaluation packs prior to placing a bulk order?',
    answer: 'Absolutely. We encourage medical distributors and hospital procurement heads to evaluate sample packs for surgical feedback before signing annual supply contracts. Contact our export desk to arrange sample dispatch.'
  }
];

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
            ISO 13485 quality standards, wholesale order procedures, and international shipping logistics.
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
              {tab === 'All' ? 'All Questions' : tab === 'General' ? 'General B2B' : tab === 'Quality' ? 'Quality & ISO' : tab === 'Orders' ? 'Wholesale Orders' : tab === 'Logistics' ? 'Export & Shipping' : 'OEM & Branding'}
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
            <h3 className="font-display font-bold text-xl">Have a Specific Wholesale or OEM Inquiry?</h3>
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
