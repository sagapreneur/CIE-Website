import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../components/Primitives';
import { ShieldCheck, FileText, Lock, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-12 md:py-16">
    <Container className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-teal/30 text-xs font-bold text-brand-teal uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Data Protection & B2B Confidentiality</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last Updated & Effective: January 2026 | Central India Export (CIE)
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            1. Commitment to B2B Data Privacy
          </h2>
          <p>
            Central India Export ("CIE", "we", "our", "us"), operating at 6-7 Shrivardhan Complex, Ramdaspeth, Wardha Road, 
            Nagpur, Maharashtra, India, respects the privacy of our international hospital clients, medical distributors, and 
            ophthalmic procurement partners. This Privacy Policy outlines how we collect, store, process, and safeguard business 
            contact information submitted through <strong className="text-slate-900">centralindiaexport.com</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            2. Business Information We Collect
          </h2>
          <p>We collect information exclusively necessary to process wholesale export quotations, issue proforma invoices, and dispatch sample evaluation packs:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong className="text-slate-900">Business Identity Data</strong>: Full name, job title, hospital/company name, and medical license or registration numbers.</li>
            <li><strong className="text-slate-900">Contact Details</strong>: Work email address, direct telephone/WhatsApp numbers, and company website URL.</li>
            <li><strong className="text-slate-900">Export Delivery Address</strong>: Shipping address, postal code, city, country, and preferred airport/sea port of destination.</li>
            <li><strong className="text-slate-900">Technical Product Inquiry Records</strong>: Target product SKUs, diopter/gauge requirements, and expected purchase volumes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            3. Purpose of Processing & Non-Disclosure
          </h2>
          <p>
            Your information is processed strictly for legitimate business execution. <strong className="text-slate-900">We do not sell, rent, or trade client contact details to third-party marketing companies under any circumstances.</strong>
          </p>
          <p>Information is used solely to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Prepare and issue formal FOB/CIF proforma price quotes.</li>
            <li>Coordinate international express freight shipments with verified carriers (DHL, FedEx, UPS, or designated freight forwarders).</li>
            <li>Fulfill customs clearance paperwork, Certificate of Origin, and ISO 13485 quality documentation.</li>
            <li>Communicate order status updates and post-delivery surgical technical support.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            4. Data Security & Encryption
          </h2>
          <p>
            We implement robust administrative, technical, and physical security measures to protect your inquiry data against unauthorized access, loss, or alteration. Website data transmissions are encrypted using 256-bit Secure Sockets Layer (SSL) protocols.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            5. Cookies & Web Analytics
          </h2>
          <p>
            Our website uses essential performance cookies to maintain navigation preferences and session security. Analytical cookies anonymously measure catalog browsing activity to help us optimize product load times and search responsiveness.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            6. Contact Our Data Protection Desk
          </h2>
          <p>
            If you wish to update your company contact information, request deletion of inquiry records, or inquire about our data retention policies, please contact our export desk:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <p><strong>Central India Export — Privacy Desk</strong></p>
            <p>6-7, Shrivardhan Complex, Ramdaspeth, Wardha Road, Nagpur-440012, Maharashtra, India</p>
            <p>Email: <a href="mailto:cie@cieindia.com" className="text-brand-teal underline">cie@cieindia.com</a> | Phone: +91-712-2429168</p>
          </div>
        </section>

      </div>
    </Container>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-12 md:py-16">
    <Container className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-teal/30 text-xs font-bold text-brand-teal uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>International Trade Terms & Incoterms 2020</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Terms & Conditions of Export Trade
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Standard B2B Export Contract Terms | Central India Export (CIE)
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            1. Scope of Agreement
          </h2>
          <p>
            These Terms and Conditions govern all commercial quotations, proforma invoices, purchase orders, and wholesale supply 
            contracts executed between Central India Export ("Exporter") and international buyers, medical distributors, or hospitals ("Buyer"). 
            Submitting a Request for Quotation (RFQ) or issuing a Purchase Order constitutes full acceptance of these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            2. Wholesale Proforma Quotations (FOB / CIF / CFR)
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All price quotes issued by Central India Export are wholesale B2B quotes denominated in US Dollars ($ USD) or Euros (€ EUR).</li>
            <li>Unless otherwise specified, proforma quotations are valid for 30 calendar days from date of issuance.</li>
            <li>Incoterms 2020 apply: FOB (Nagpur/Mumbai Port), CIF (Destination Airport/Seaport), or CFR based on mutual written agreement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            3. Quality Standards & Medical Device Regulations
          </h2>
          <p>
            Central India Export certifies that all supplied surgical instruments, blades, and IOVUE™ intraocular lenses comply with 
            <strong className="text-slate-900"> ISO 13485:2016 Quality Management Systems</strong> and CE technical requirements. The Buyer is responsible for obtaining local health authority import permits, device registrations, or customs authorizations in the country of destination.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            4. Payment Terms & Letter of Credit (L/C)
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-slate-900">Telegraphic Transfer (T/T)</strong>: Advance bank wire transfer as outlined in the proforma invoice.</li>
            <li><strong className="text-slate-900">Letter of Credit (L/C)</strong>: Irrevocable, confirmed L/C payable at sight issued by a top-tier international bank.</li>
            <li>Goods remain the legal property of Central India Export until full payment is received and credited to our bank account.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            5. Inspection, Quality Claims & Return Policy
          </h2>
          <p>
            The Buyer must inspect all consignments upon arrival at the destination airport or port. Any claims regarding transit damage, 
            quantity discrepancy, or product quality defect must be reported in writing with supporting photos/inspection reports within 14 calendar days 
            of shipment arrival. Approved defective items will be replaced or credited in the subsequent order.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
            6. Governing Law & Legal Jurisdiction
          </h2>
          <p>
            This agreement and all export trade transactions shall be governed by and construed in accordance with the laws of India. 
            Any legal dispute or arbitration arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in 
            <strong className="text-slate-900"> Nagpur, Maharashtra, India</strong>.
          </p>
        </section>

      </div>
    </Container>
  </div>
);

export const NotFoundPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
    <Container className="text-center space-y-6 max-w-md">
      <span className="font-display font-bold text-6xl text-brand-teal">404</span>
      <h1 className="font-display font-bold text-2xl text-slate-900">Catalog Page Not Found</h1>
      <p className="text-sm text-slate-600">The product page or category URL you requested does not exist or has been moved.</p>
      <Link to="/products">
        <Button variant="primary">Browse All 460 Products</Button>
      </Link>
    </Container>
  </div>
);
