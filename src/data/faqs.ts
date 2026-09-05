export interface FaqItem {
  id: string;
  category: 'General' | 'Quality' | 'Orders' | 'Logistics' | 'OEM';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  // 1. Payment Terms
  {
    id: 'b2b-01',
    category: 'Orders',
    question: 'What international payment terms and payment methods do you accept?',
    answer: 'We accept international payments exclusively via PayPal and direct Bank Wire Transfer (T/T). All export orders, custom consignments, and evaluation sample dispatches are processed on a 100% full advance payment basis prior to production allocation and export shipping dispatch.'
  },

  // 2. Courier / Freight Charges
  {
    id: 'b2b-02',
    category: 'Logistics',
    question: 'Who is responsible for international courier and shipping freight charges?',
    answer: 'All international courier, air express, and destination customs clearance charges must be borne directly by the importer / buyer. Consignments can be dispatched on your existing corporate courier account (e.g., DHL, FedEx, UPS) or freight charges will be itemized directly on the proforma invoice upon mutual agreement.'
  },

  // 3. Minimum Order Quantity (MOQ)
  {
    id: 'b2b-03',
    category: 'Orders',
    question: 'What is your Minimum Order Quantity (MOQ) for international orders?',
    answer: 'The standard Minimum Order Quantity (MOQ) is 100 pieces, depending on the specific product line and category. For initial hospital clinic trials and newly appointed distributor assessments, flexible evaluation packs and mixed product batches are accommodated.'
  },

  // 4. Proforma Quotation & Certificates Turnaround
  {
    id: 'b2b-04',
    category: 'Orders',
    question: 'How do I request a formal Proforma Quotation and regulatory technical dossiers?',
    answer: 'Click any "Request Quote" or cart checkout button across our portal, or email our export desk directly at cie@cieindia.com. Our dedicated export sales desk will issue a formal proforma invoice. All required international certificates—including ISO 13485:2016 quality accreditations, European CE Mark technical dossiers, Certificate of Origin, and Certificate of Analysis (COA)—will be provided alongside the order invoices within 24 business hours.'
  },

  // 5. One Country One Distribution Network
  {
    id: 'b2b-05',
    category: 'General',
    question: 'What is Central India Export\'s "One Country One Distribution Network" policy?',
    answer: 'Central India Export strictly enforces a "One Country One Distribution Network" policy worldwide. Approved regional distributors receive protected exclusive territorial rights within their designated country, ensuring sustainable long-term profitability and direct factory technical collaboration.'
  },

  // 6. Company Scope & Overview
  {
    id: 'b2b-06',
    category: 'General',
    question: 'Who is Central India Export (CIE) and what products do you supply?',
    answer: 'Central India Export (est. 2004) is a premier supplier and international exporter of high-precision ophthalmic surgical instruments, ioVue intraocular lenses (IOLs), micro-surgical blades, ophthalmic solutions, diagnostic strips, and ophthalmic equipment based at Zero Mile Nagpur, India.'
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
    answer: 'Standard stock items (IOVUE™ IOLs, blades, strips) are dispatched within 1–3 business weeks from order confirmation and receipt of full advance payment.'
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
    answer: 'Absolutely. We encourage medical distributors and hospital procurement heads to evaluate sample packs for surgical feedback before signing annual supply contracts. Contact our export desk at cie@cieindia.com to arrange sample dispatch.'
  }
];
