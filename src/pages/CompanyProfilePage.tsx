import React from 'react';
import { Container, Section, SectionHeading, Button, Badge } from '../components/Primitives';
import { CompanyProfileShowcase } from '../components/CompanyProfileShowcase';
import { WorldMap } from '../components/WorldMap';
import { 
  Building2, ShieldCheck, Award, Globe2, Truck, FileText, ArrowRight,
  CheckCircle2, Sparkles, Factory, Microscope, PhoneCall, ChevronRight, Layers,
  Target, Compass, Star, RefreshCw, PackageCheck, HelpCircle, Check, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyProfilePageProps {
  onOpenRfq: (productName?: string) => void;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ onOpenRfq }) => {
  return (
    <div className="bg-white text-slate-900 font-body">
      
      {/* Header Banner (With Company Profile & Manufacturing Cover Image) */}
      <div 
        className="py-16 md:py-20 border-b border-slate-200 relative overflow-hidden bg-cover bg-center bg-no-repeat text-slate-900"
        style={{ backgroundImage: `url('/about-cover.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
              <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to="/about-us" className="hover:text-brand-teal transition-colors">About</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-brand-teal font-bold">Company Profile</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-brand-teal/30 text-xs font-bold text-brand-teal shadow-2xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Presentation & Technical Capabilities</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
              Company Profile & <span className="text-brand-teal">Manufacturing Lines</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Explore Central India Export's 39-year manufacturing heritage, 4 main product verticals with deep technical specifications, cleanroom production lines, and global export footprint from Nagpur's MIHAN hub.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Button 
                variant="primary" 
                size="md" 
                icon={<FileText className="w-4 h-4" />}
                onClick={() => onOpenRfq('Company Profile & Catalog Inquiry')}
              >
                Request Corporate Profile PDF & Proforma Quote
              </Button>

              <Link to="/contact-us">
                <Button 
                  variant="outline" 
                  size="md" 
                  className="border-slate-300 text-slate-800 hover:bg-slate-100"
                  icon={<PhoneCall className="w-4 h-4" />}
                >
                  Contact Export Desk
                </Button>
              </Link>
            </div>

          </div>
        </Container>
      </div>

      {/* 1. DEDICATED PRESENTATION SHOWCASE (Company Profile, Main Products, Production Lines) */}
      <CompanyProfileShowcase onOpenRfq={onOpenRfq} />

      {/* 2. CORPORATE MISSION, VISION & CORE VALUES */}
      <Section className="bg-white">
        <Container className="space-y-12">
          
          <SectionHeading
            eyebrow="Corporate Philosophy"
            title="Mission, Vision & Strategic Pillars"
            subtitle="Guiding our growth as a leading manufacturer and exporter of ophthalmic medical consumables."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Mission */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-brand-teal/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 text-brand-teal flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>

              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Corporate Mission
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To empower ophthalmologists, surgical clinics, and healthcare distributors worldwide with certified, micron-precision ophthalmic instruments and ioVue™ intraocular lenses at direct manufacturer wholesale rates.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-brand-teal/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 text-brand-teal flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>

              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Global Vision
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To establish Central India Export as Asia's premier zero-defect exporter of ophthalmic surgical products, continuously innovating cleanroom assembly lines and optical technologies from Nagpur's zero-mile cargo hub.
              </p>
            </div>

            {/* Card 3: Quality Values */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-brand-teal/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/30 text-brand-teal flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>

              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Pillars of Excellence
              </h3>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>100% Optical Power Interferometry</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Laser-Guided Blade Edge Honing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>WHO-GMP Cleanroom Standards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>ISO 13485 & CE Compliance</span>
                </li>
              </ul>
            </div>

          </div>

        </Container>
      </Section>

      {/* 3. MANUFACTURING & QUALITY ASSURANCE 4-STEP PROCESS */}
      <Section className="bg-slate-50">
        <Container className="space-y-12">
          
          <SectionHeading
            eyebrow="Precision Manufacturing Workflow"
            title="4-Stage Quality Assurance & Production Process"
            subtitle="From raw material spectrometry to cleanroom assembly and ETO gas sterilization."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-xl bg-brand-teal text-white font-mono font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h4 className="font-display font-bold text-slate-900 text-lg">
                Material Spectrometry
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verification of pure PMMA, hydrophilic/hydrophobic optical polymers, and Swiss Grade 5 Titanium for zero cytotoxicity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-xl bg-brand-teal text-white font-mono font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h4 className="font-display font-bold text-slate-900 text-lg">
                Cleanroom Machining
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                CNC optical lathe milling for 360° Square Edge IOL optics and micro-laser edge honing under ISO Class 5 air laminar flow.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-xl bg-brand-teal text-white font-mono font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h4 className="font-display font-bold text-slate-900 text-lg">
                Optical Inspection
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% interferometric diopter power verification and 100x magnification digital microscope blade inspection.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-xl bg-brand-teal text-white font-mono font-bold text-xs flex items-center justify-center">
                04
              </span>
              <h4 className="font-display font-bold text-slate-900 text-lg">
                Sterile BFS & ETO Packaging
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated Blow-Fill-Seal liquid filling, blister pouch sealing, and ETO gas sterilization with Certificate of Analysis.
              </p>
            </div>

          </div>

        </Container>
      </Section>

      {/* 4. GLOBAL REACH WORLD MAP */}
      <Section className="bg-white py-12">
        <Container>
          <WorldMap />
        </Container>
      </Section>

      {/* 5. OEM & PRIVATE LABEL SERVICES FOR DISTRIBUTORS */}
      <Section className="bg-slate-50">
        <Container className="space-y-12">
          
          <SectionHeading
            eyebrow="Distributor Partnership Services"
            title="OEM Private Label & Custom Packaging Solutions"
            subtitle="Tailored manufacturing, custom laser marking, and bespoke packaging for international medical networks."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Capability Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900">
                ISO 13485 & CE Mark Compliance
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Our manufacturing facilities adhere to strict ISO 13485:2016 quality management standards for medical devices. All ioVue™ intraocular lenses, blades, and instruments carry European CE compliance certificates and full batch test documentation.
              </p>

              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>100% Optical Power & Resolution Testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>WHO-GMP Cleanroom Standards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Full Material Traceability & Certificate of Analysis</span>
                </li>
              </ul>
            </div>

            {/* Capability Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900">
                MIHAN Air Cargo Logistics Advantage
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Situated at Nagpur's Zero Mile in central India, our export desk leverages direct proximity to the MIHAN international cargo airport for rapid air freight dispatches worldwide via DHL, FedEx, and international air cargo carriers.
              </p>

              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Dispatch within 3–5 Business Days for In-Stock Items</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>FOB, CIF & CFR Incoterms 2020 terms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Custom Export Clearance & Phytosanitary Packaging</span>
                </li>
              </ul>
            </div>

            {/* Capability Card 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
                <Factory className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900">
                OEM Private Label Manufacturing
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                We partner with international hospital networks and medical device distributors to deliver full OEM private labeling, customized laser etching on instrument handles, tailored diopter ranges, and bespoke blister packaging.
              </p>

              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Custom Distributor Branding & Logo Laser Etching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Sterile Blister & Pouch Packaging Options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Tailored Diopter & Optical Geometry Tolerances</span>
                </li>
              </ul>
            </div>

          </div>

        </Container>
      </Section>

      {/* 6. WHOLESALE EXPORT FAQ ACCORDION SECTION */}
      <section className="bg-white py-14 border-t border-slate-200">
        <Container className="max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="teal" className="bg-brand-soft text-brand-teal border-brand-teal/30">
              B2B Importers FAQ
            </Badge>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Frequently Asked Questions for Medical Importers & Distributors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Key information on MOQ policies, sample dispatches, payment terms, and ISO 13485 certification downloads.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <details className="group border-b border-slate-200 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                What are Central India Export's Minimum Order Quantities (MOQs)?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We offer flexible MOQ terms for initial clinic/distributor evaluation orders. Tiered volume pricing is available for container and air cargo shipments.
              </p>
            </details>

            <details className="group border-b border-slate-200 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                How can international buyers request product samples for evaluation?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Evaluation samples for micro blades, cannulas, and ioVue™ IOLs can be dispatched within 48 business hours via FedEx or DHL air express upon request.
              </p>
            </details>

            <details className="group border-b border-slate-200 pb-3">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                What international payment & shipping Incoterms do you support?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We support Wire Transfer (T/T), Irrevocable Letter of Credit (L/C at sight), and CAD terms. Incoterms include FOB (Nagpur/Mumbai), CIF, and CFR Incoterms 2020.
              </p>
            </details>

            <details className="group">
              <summary className="font-display font-bold text-base text-slate-900 cursor-pointer flex justify-between items-center group-hover:text-brand-teal">
                How do I receive formal proforma quotes and quality certificates?
                <span className="text-brand-teal group-open:rotate-180 transition-transform font-bold">+</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Click any "Request Quote" button or email cie@cieindia.com. Our export desk issues formal proforma invoices along with ISO 13485 & CE technical dossiers within 24 business hours.
              </p>
            </details>
          </div>
        </Container>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="bg-gradient-to-r from-brand-soft via-white to-brand-soft py-16 border-t border-slate-200">
        <Container className="text-center space-y-6 max-w-4xl">
          <Badge variant="teal" className="bg-white text-brand-teal border-brand-teal/30 shadow-sm">
            Distributor Inquiries Open
          </Badge>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            Partner with Central India Export for Your Medical Supply Network
          </h2>

          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Request our formal company profile documentation, proforma quotation terms, or sample dispatches today.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<FileText className="w-5 h-5" />}
              onClick={() => onOpenRfq()}
            >
              Request a Quotation Today
            </Button>

            <Link to="/about-us">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 text-slate-800 hover:bg-slate-100"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Visit About Us Page
              </Button>
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
};
