import React from 'react';
import { Container, Section, SectionHeading, Button } from '../components/Primitives';
import { PrecisionIcon, ExportCargoIcon, TrustCertificationIcon } from '../components/CustomIcons';
import { MapPin, Phone, Mail, Award, CheckCircle2, ShieldCheck, FileText, Globe2 } from 'lucide-react';

export const AboutPage: React.FC<{ onOpenRfq: () => void }> = ({ onOpenRfq }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-body">
      
      {/* Header Banner (With About & Manufacturing Cover Image - Pure) */}
      <div 
        className="py-16 md:py-24 border-b border-slate-200 relative overflow-hidden bg-cover bg-center bg-no-repeat text-slate-900"
        style={{ backgroundImage: `url('/about-cover.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-white px-3 py-1 rounded border border-brand-teal/30 shadow-sm font-display inline-block">
              39 Years of Manufacturing & Export Legacy (Est. 1985)
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900">
              About Central India Export
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Headquartered at Zero Mile Nagpur, India, Central India Export is a global B2B manufacturer and exporter serving over 10,000 global customers across 5 continents.
            </p>
          </div>
        </Container>
      </div>

      {/* Main Narrative */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal font-display">
                Our Foundation & Vision
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Pioneering Precision Ophthalmic Craftsmanship Since 1985
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded by Sandeep Vaid in 1985, Central India Export has built a documented client base exceeding 10,000 global customers. We maintain successful market penetration across Europe, North America (including Canada), Latin America, Central America, and the African continent.
              </p>

              {/* Regulatory Compliance & Quality Assurance Grid */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
                  Regulatory Compliance & Quality Assurance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-brand-soft/60 rounded-xl border border-brand-teal/20 space-y-1">
                    <strong className="text-brand-teal block font-bold font-display">FDA Compliance</strong>
                    <span className="text-slate-600">Adheres to strict U.S. FDA regulatory standards</span>
                  </div>
                  <div className="p-3.5 bg-brand-soft/60 rounded-xl border border-brand-teal/20 space-y-1">
                    <strong className="text-brand-teal block font-bold font-display">CE Marking (Conformité Européenne)</strong>
                    <span className="text-slate-600">Conforms to European medical directive standards</span>
                  </div>
                  <div className="p-3.5 bg-brand-soft/60 rounded-xl border border-brand-teal/20 space-y-1">
                    <strong className="text-brand-teal block font-bold font-display">GMP Manufacturing Guidelines</strong>
                    <span className="text-slate-600">Good Manufacturing Practice facility protocols</span>
                  </div>
                  <div className="p-3.5 bg-brand-soft/60 rounded-xl border border-brand-teal/20 space-y-1">
                    <strong className="text-brand-teal block font-bold font-display">ISO Certifications</strong>
                    <span className="text-slate-600">Certified ISO 13485 quality management systems</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="font-display font-bold text-lg text-slate-900 block">Sandeep Vaid</strong>
                  <span className="text-slate-500">Founder & CEO</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="font-display font-bold text-lg text-brand-teal block">27AAEFC8743J1Z5</strong>
                  <span className="text-slate-500">Registered GSTIN</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-brand-soft via-white to-slate-100 text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
              <h3 className="font-display font-bold text-2xl text-slate-900">The MIHAN Nagpur Logistics Advantage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nagpur is geographically recognized as the "Zero Mile" center of India. Situated adjacent to the MIHAN Multi-modal International Cargo Hub, Central India Export operates with unmatched air cargo connectivity.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Direct international customs clearance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Temperature-monitored sterile packaging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Air freight dispatch to Europe, Americas & Africa</span>
                </li>
              </ul>
              <Button variant="primary" className="w-full justify-center text-xs" onClick={onOpenRfq}>
                Request Wholesale Export Terms
              </Button>
            </div>

          </div>
        </Container>
      </Section>

    </div>
  );
};
