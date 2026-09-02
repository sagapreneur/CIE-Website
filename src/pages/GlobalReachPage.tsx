import React from 'react';
import { Container } from '../components/Primitives';
import { WorldMap } from '../components/WorldMap';

export const GlobalReachPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 text-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-white px-3 py-1 rounded border border-brand-teal/30 shadow-sm">
            Global Ophthalmic Export Trade
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl">
            Worldwide Export Reach & Logistics
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Supplying ophthalmic surgical instruments and IOVUE™ IOLs to over 31 countries.
          </p>
        </div>

        <WorldMap />
      </Container>
    </div>
  );
};
