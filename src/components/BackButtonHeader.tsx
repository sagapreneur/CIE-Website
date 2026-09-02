import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Container } from './Primitives';

export const BackButtonHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Do not render on the home page root
  if (location.pathname === '/') return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-slate-100/90 border-b border-slate-200/80 py-2 backdrop-blur-md sticky top-[60px] md:top-[72px] z-30 shadow-2xs">
      <Container className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-white bg-white hover:bg-brand-teal px-3.5 py-1.5 rounded-lg border border-slate-300/80 shadow-2xs transition-all cursor-pointer group"
          title="Click to go back to previous page"
          aria-label="Back to Previous Page"
        >
          <ArrowLeft className="w-4 h-4 text-brand-teal group-hover:text-white transition-colors" />
          <span>Back to Previous Page</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-brand-teal transition-colors font-medium cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Return Home</span>
        </button>
      </Container>
    </div>
  );
};
