import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { IoVuePage } from './pages/IoVuePage';
import { AboutPage } from './pages/AboutPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, NotFoundPage } from './pages/StaticPages';
import { RfqModal } from './components/RfqModal';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingWidgets } from './components/FloatingWidgets';

import { FaqPage } from './pages/FaqPage';
import { BackButtonHeader } from './components/BackButtonHeader';

export const App: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name?: string; slug?: string }>({});

  const handleOpenRfq = (productName?: string, productSlug?: string) => {
    setSelectedProduct({ name: productName, slug: productSlug });
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-body selection:bg-brand-teal selection:text-white">
      <ScrollToTop />
      <Navbar onOpenRfq={handleOpenRfq} />
      <BackButtonHeader />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenRfq={handleOpenRfq} />} />
          <Route path="/products" element={<ProductsPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/product/:productSlug" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/products/:productSlug" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/iovue" element={<IoVuePage onOpenRfq={handleOpenRfq} />} />
          <Route path="/about-us" element={<AboutPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/company-profile" element={<CompanyProfilePage onOpenRfq={handleOpenRfq} />} />
          <Route path="/contact-us" element={<ContactPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/faq" element={<FaqPage onOpenRfq={handleOpenRfq} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onOpenRfq={handleOpenRfq} />
      <FloatingWidgets />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        productName={selectedProduct.name}
        productSlug={selectedProduct.slug}
      />
    </div>
  );
};
export default App;
