import React from 'react';
import { Container, Section, SectionHeading, Button, Badge } from '../components/Primitives';
import { CompanyProfileShowcase } from '../components/CompanyProfileShowcase';
import { 
  Building2, ShieldCheck, Award, Globe2, Truck, FileText, ArrowRight,
  CheckCircle2, Sparkles, Factory, Microscope, PhoneCall, ChevronRight, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyProfilePageProps {
  onOpenRfq: (productName?: string) => void;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ onOpenRfq }) => {
  return (
    <div className="bg-white text-slate-900 font-body">
      
      {/* Universal Page Hero Banner */}
      <section 
        className="relative bg-gradient-to-r from-slate-900 via-[#0B1E38] to-slate-950 text-white py-16 md:py-20 overflow-hidden border-b border-slate-800"
        style={{ backgroundImage: `url('/universal-banner.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Dark Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-5">
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link to="/about-us" className="hover:text-brand-teal transition-colors">About</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-brand-teal font-semibold">Company Profile</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-teal/20 border border-brand-teal/40 text-xs font-semibold text-brand-teal shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Presentation & Infrastructure</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Company Profile & <span className="text-brand-teal">Manufacturing Lines</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore Central India Export's 39-year manufacturing heritage, 4 main product series, cleanroom production lines, and global export footprint from Nagpur's MIHAN hub.
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
                  className="border-slate-600 text-slate-200 hover:bg-slate-800"
                  icon={<PhoneCall className="w-4 h-4" />}
                >
                  Contact Export Desk
                </Button>
              </Link>
            </div>

          </div>
        </Container>
      </section>

      {/* DEDICATED PRESENTATION SHOWCASE (Company Profile, Main Products, Production Lines) */}
      <CompanyProfileShowcase onOpenRfq={onOpenRfq} />

      {/* DETAILED CORPORATE CAPABILITIES & EXPORT COMPLIANCE */}
      <Section className="bg-slate-50">
        <Container className="space-y-12">
          
          <SectionHeading
            eyebrow="Export Quality & Infrastructure Standards"
            title="Global Manufacturing Excellence & Compliance"
            subtitle="Built on 39 years of rigorous quality management systems and central logistics advantages."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Capability Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-soft border border-brand-teal/20 text-brand-teal flex items-center justify-center">
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

      {/* BOTTOM CTA BANNER */}
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
