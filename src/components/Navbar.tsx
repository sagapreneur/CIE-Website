import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from './Primitives';
import { Search, ChevronDown, ChevronRight, Menu, X, FileText, Globe, Phone, Mail, TrendingUp, ArrowRight, Layers } from 'lucide-react';
import categoriesData from '../../public_html/data/categories.json';
import productsData from '../../public_html/data/products.json';

interface NavbarProps {
  onOpenRfq: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState<number | string>(categoriesData[0]?.id || 'intraocular-lenses');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCategoryObj = useMemo(() => {
    return categoriesData.find(c => c.id === activeCategory) || categoriesData[0];
  }, [activeCategory]);

  const activeProductsList = useMemo(() => {
    if (!selectedCategoryObj) return [];
    let prods = productsData.filter(p => p.main_category === selectedCategoryObj.name);
    if (activeSubcategory && activeSubcategory !== 'All') {
      const subLower = activeSubcategory.toLowerCase();
      prods = prods.filter(p => 
        p.name.toLowerCase().includes(subLower) || 
        p.category_path?.toLowerCase().includes(subLower) ||
        p.slug.toLowerCase().includes(subLower)
      );
    }
    return prods.slice(0, 24);
  }, [selectedCategoryObj, activeSubcategory]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setIsSearchFocused(false);
  }, [location]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter preview products for live search popup (Matches Screenshot 2)
  const searchPreviewProducts = useMemo(() => {
    if (!navSearch.trim()) {
      return productsData.filter(p => p.is_featured || p.image).slice(0, 5);
    }
    return productsData.filter(p => 
      p.name.toLowerCase().includes(navSearch.toLowerCase()) || 
      p.main_category.toLowerCase().includes(navSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(navSearch.toLowerCase())
    ).slice(0, 5);
  }, [navSearch]);

  return (
    <>
      {/* Top Bar - Clean Light Theme */}
      <div className="bg-brand-soft text-slate-700 text-xs py-2 border-b border-brand-teal/20">
        <Container className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1.5 text-slate-700 font-medium">
              <Globe className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span>Nagpur-440012, Maharashtra (India)</span>
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <a href="tel:+917122522500" className="hover:text-brand-teal transition-colors font-medium flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span>Phone No. +91-712-2522500</span>
            </a>
            <a href="mailto:vaidsandeep100@yahoo.co.in" className="hover:text-brand-teal transition-colors font-medium flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span>Email. vaidsandeep100@yahoo.co.in</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}>
        <Container className="flex items-center justify-between gap-6">
          
          {/* Logo with ioVue™ Trademark Badge */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <img 
              src="/cie-logo.png" 
              alt="Central India Export" 
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-brand-soft border border-brand-teal/40 text-brand-teal text-[10px] font-bold tracking-wider uppercase shadow-2xs font-display">
              <span className="font-black text-brand-teal">ioVue™</span>
              <span className="text-slate-600 font-medium">Brand</span>
            </span>
          </Link>

          {/* Desktop Nav Links & Search Bar (Fixed Flex Layout - Zero Shift) */}
          <nav className="hidden lg:flex items-center space-x-6 font-display text-sm font-semibold text-slate-800">
            <Link to="/" className={`whitespace-nowrap shrink-0 hover:text-brand-teal transition-colors ${location.pathname === '/' ? 'text-brand-teal font-bold' : ''}`}>
              Home
            </Link>

            {/* Mega Menu Dropdown */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link 
                to="/products" 
                className={`flex items-center space-x-1 whitespace-nowrap hover:text-brand-teal transition-colors py-2 ${location.pathname.startsWith('/products') ? 'text-brand-teal font-bold' : ''}`}
              >
                <span>Products & Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180 text-brand-teal' : ''}`} />
              </Link>

              {megaMenuOpen && (
                <div className="absolute top-full -left-28 w-[960px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex min-h-[460px] max-h-[500px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* LEVEL 1: Left Sidebar - Main Categories List */}
                  <div className="w-[260px] bg-white border-r border-slate-100 py-3 shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display">
                        Ophthalmic Categories
                      </div>
                      
                      <div className="space-y-0.5 mt-1 max-h-[380px] overflow-y-auto pr-1">
                        {categoriesData.map((cat) => {
                          const isSelected = activeCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onMouseEnter={() => {
                                setActiveCategory(cat.id);
                                setActiveSubcategory('All');
                              }}
                              onClick={() => {
                                setMegaMenuOpen(false);
                                navigate(`/products?category=${encodeURIComponent(cat.name)}`);
                              }}
                              className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs font-semibold transition-all group ${
                                isSelected 
                                  ? 'bg-brand-soft text-brand-teal font-extrabold border-l-4 border-brand-teal shadow-2xs' 
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 truncate pr-2">
                                {cat.icon_url ? (
                                  <img 
                                    src={cat.icon_url} 
                                    alt={cat.name} 
                                    className={`w-4 h-4 object-contain shrink-0 transition-transform ${isSelected ? 'scale-110' : ''}`} 
                                  />
                                ) : (
                                  <span className="text-xs font-bold text-brand-teal">{cat.name.charAt(0)}</span>
                                )}
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                isSelected ? 'text-brand-teal translate-x-0.5' : 'text-slate-300 group-hover:text-slate-400'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="px-4 pt-2 border-t border-slate-100">
                      <Link 
                        to="/products"
                        onClick={() => setMegaMenuOpen(false)}
                        className="text-xs text-brand-teal font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>View All {productsData.length} Products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* LEVEL 2: Middle Sidebar - Subcategories Group (Only rendered if subcategories exist) */}
                  {selectedCategoryObj && selectedCategoryObj.subcategories && selectedCategoryObj.subcategories.length > 0 && (
                    <div className="w-[220px] bg-slate-50/80 border-r border-slate-100 py-3 shrink-0 flex flex-col justify-between">
                      <div className="h-full flex flex-col justify-between space-y-2">
                        <div>
                          <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display truncate">
                            Subcategories
                          </div>

                          <div className="space-y-0.5 mt-1 max-h-[380px] overflow-y-auto pr-1">
                            {/* "All [Category]" Option */}
                            <button
                              onMouseEnter={() => setActiveSubcategory('All')}
                              onClick={() => {
                                setMegaMenuOpen(false);
                                navigate(`/products?category=${encodeURIComponent(selectedCategoryObj.name)}`);
                              }}
                              className={`w-full text-left px-4 py-2 flex items-center justify-between text-xs font-semibold transition-all ${
                                activeSubcategory === 'All'
                                  ? 'text-brand-teal font-extrabold bg-white shadow-2xs border-l-2 border-brand-teal'
                                  : 'text-slate-600 hover:bg-white/60'
                              }`}
                            >
                              <span className="truncate">All {selectedCategoryObj.name}</span>
                              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                            </button>

                            {/* Subcategories List */}
                            {selectedCategoryObj.subcategories.map((sub, idx) => (
                              <button
                                key={idx}
                                onMouseEnter={() => setActiveSubcategory(sub.name)}
                                onClick={() => {
                                  setMegaMenuOpen(false);
                                  navigate(`/products?category=${encodeURIComponent(selectedCategoryObj.name)}&search=${encodeURIComponent(sub.name)}`);
                                }}
                                className={`w-full text-left px-4 py-2 flex items-center justify-between text-xs font-medium transition-all ${
                                  activeSubcategory === sub.name
                                    ? 'text-brand-teal font-extrabold bg-white shadow-2xs border-l-2 border-brand-teal'
                                    : 'text-slate-600 hover:bg-white/60'
                                }`}
                              >
                                <span className="truncate pr-1">{sub.name}</span>
                                <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="px-4 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-mono">
                          {selectedCategoryObj.product_count} total items
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LEVEL 3: Right Panel - 3-Column Items Grid */}
                  <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col justify-between">
                    <div>
                      {selectedCategoryObj && (
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-soft border border-brand-teal/30 p-2 text-brand-teal flex items-center justify-center shrink-0">
                              {selectedCategoryObj.icon_url ? (
                                <img src={selectedCategoryObj.icon_url} alt={selectedCategoryObj.name} className="w-full h-full object-contain" />
                              ) : (
                                <Layers className="w-5 h-5 text-brand-teal" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-display font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                                {activeSubcategory === 'All' ? `ALL ${selectedCategoryObj.name.toUpperCase()}` : activeSubcategory.toUpperCase()}
                              </h3>
                              <span className="text-[11px] text-slate-500 font-medium">
                                Showing items in {selectedCategoryObj.name}
                              </span>
                            </div>
                          </div>

                          <span className="text-[11px] font-bold bg-brand-teal text-white px-2.5 py-0.5 rounded-full font-mono">
                            {activeProductsList.length} items
                          </span>
                        </div>
                      )}

                      {/* 3-Column Grid of Items (Matches Screenshot Pattern) */}
                      <div className="grid grid-cols-3 gap-x-4 gap-y-2.5">
                        {activeProductsList.map((prod) => (
                          <Link
                            key={prod.id}
                            to={`/product/${prod.slug}`}
                            onClick={() => setMegaMenuOpen(false)}
                            className="group flex items-start space-x-2 p-1.5 rounded-lg hover:bg-brand-soft/70 transition-colors text-xs text-slate-700 hover:text-brand-teal font-medium truncate"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/60 mt-1.5 shrink-0 group-hover:bg-brand-teal group-hover:scale-125 transition-all" />
                            <span className="truncate leading-snug">{prod.name}</span>
                          </Link>
                        ))}
                      </div>

                      {activeProductsList.length === 0 && (
                        <div className="py-8 text-center text-xs text-slate-400">
                          No items in this subcategory
                        </div>
                      )}
                    </div>

                    {/* Bottom Factory Quote Action Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        Need proforma quotes or OEM manufacturing?
                      </span>
                      <button
                        onClick={() => {
                          setMegaMenuOpen(false);
                          onOpenRfq();
                        }}
                        className="px-3 py-1 bg-brand-teal hover:bg-[#20968E] text-white text-xs font-bold rounded-lg transition-all shadow-2xs shrink-0"
                      >
                        Request Quote
                      </button>
                    </div>

                  </div>

                </div>
              )}
            </div>

            <Link to="/about-us" className={`whitespace-nowrap shrink-0 hover:text-brand-teal transition-colors ${location.pathname === '/about-us' ? 'text-brand-teal font-bold' : ''}`}>
              About Us
            </Link>

            <Link to="/contact-us" className={`whitespace-nowrap shrink-0 hover:text-brand-teal transition-colors ${location.pathname === '/contact-us' ? 'text-brand-teal font-bold' : ''}`}>
              Contact Us
            </Link>

            {/* Stable Search Bar (Fixed Width - Zero Alignment Shift) */}
            <div ref={searchContainerRef} className="relative w-52 sm:w-60 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (navSearch.trim()) {
                    setIsSearchFocused(false);
                    navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
                  }
                }}
                className="relative flex items-center w-full"
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    value={navSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => setNavSearch(e.target.value)}
                    placeholder="Search products..."
                    className={`w-full pl-9 pr-7 py-2 text-xs rounded-full border text-slate-800 placeholder-slate-400 outline-none transition-all ${
                      isSearchFocused 
                        ? 'border-brand-teal ring-2 ring-brand-teal/20 bg-white shadow-md' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  />
                  <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 transition-colors ${
                    isSearchFocused ? 'text-brand-teal' : 'text-slate-400'
                  }`} />
                  {navSearch && (
                    <button 
                      type="button" 
                      onClick={() => setNavSearch('')} 
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Results Dropdown (Matches Screenshot 2) */}
              {isSearchFocused && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-teal font-display pb-2 border-b border-slate-100 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{navSearch.trim() ? 'Search Results' : 'Popular Products'}</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {searchPreviewProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.slug}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-brand-soft/80 transition-colors group/item"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-xs font-bold text-slate-400">{prod.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-800 group-hover/item:text-brand-teal truncate leading-tight">
                            {prod.name}
                          </h5>
                          <span className="text-[10px] text-brand-teal font-medium truncate block">
                            {prod.main_category}
                          </span>
                        </div>
                      </Link>
                    ))}

                    {searchPreviewProducts.length === 0 && (
                      <div className="py-4 text-center text-xs text-slate-500">
                        No products found for "{navSearch}"
                      </div>
                    )}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setIsSearchFocused(false);
                        navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
                      }}
                      className="text-xs font-bold text-brand-teal hover:underline inline-flex items-center space-x-1"
                    >
                      <span>View All {productsData.length} Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Request Quote Button */}
            <Button 
              variant="primary" 
              size="sm"
              icon={<FileText className="w-4 h-4" />}
              onClick={() => onOpenRfq()}
            >
              Request Quote
            </Button>
          </nav>

          {/* Action CTAs for mobile */}
          <div className="flex lg:hidden items-center space-x-3">
            <Button 
              variant="primary" 
              size="sm"
              icon={<FileText className="w-4 h-4" />}
              onClick={() => onOpenRfq()}
            >
              Quote
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (navSearch.trim()) {
                  setMobileMenuOpen(false);
                  navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
                }
              }}
              className="relative"
            >
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs outline-none"
              />
              <Search className="w-3.5 h-3.5 text-brand-teal absolute left-3 top-2.5" />
            </form>

            <div className="space-y-2 text-sm font-semibold">
              <Link to="/" className="block py-2 text-slate-800 hover:text-brand-teal border-b border-slate-100">
                Home
              </Link>
              <Link to="/products" className="block py-2 text-slate-800 hover:text-brand-teal border-b border-slate-100">
                Products & Categories ({categoriesData.length} Lines)
              </Link>
              <Link to="/about-us" className="block py-2 text-slate-800 hover:text-brand-teal border-b border-slate-100">
                About Us
              </Link>
              <Link to="/contact-us" className="block py-2 text-slate-800 hover:text-brand-teal border-b border-slate-100">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
