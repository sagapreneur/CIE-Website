import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Section, SectionHeading, Button } from '../components/Primitives';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, X, ChevronRight, FileText } from 'lucide-react';
import productsData from '../../public_html/data/products.json';
import categoriesData from '../../public_html/data/categories.json';

interface ProductsPageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenRfq }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [onlyIovue, setOnlyIovue] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(15);
  }, [selectedCategory, searchQuery, onlyIovue]);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchCat = !selectedCategory || p.main_category.toLowerCase() === selectedCategory.toLowerCase() || p.category_path.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.short_description.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIovue = !onlyIovue || p.brand === 'ioVue' || p.brand === 'IOVUE';
      return matchCat && matchSearch && matchIovue;
    });
  }, [selectedCategory, searchQuery, onlyIovue]);

  const handleCategorySelect = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory('');
      setSearchParams({});
    } else {
      setSelectedCategory(catName);
      setSearchParams({ category: catName });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner (With Products Cover Image - Pure) */}
      <div 
        className="py-14 border-b border-slate-200 relative overflow-hidden bg-cover bg-center bg-no-repeat text-slate-900"
        style={{ backgroundImage: `url('/products-cover.png')` }}
      >
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-white px-3 py-1 rounded border border-brand-teal/30 shadow-sm font-display">
              Complete Ophthalmic Export Catalog
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900">
              Ophthalmic Equipment & Instruments ({productsData.length} Items)
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Filter by category, search specific products, or request a wholesale quotation directly.
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content Layout */}
      <Container className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden col-span-1">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl shadow-sm font-bold text-slate-800 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-brand-teal" />
                <span>Filter By Category & Keywords</span>
              </div>
              <span className="text-[11px] font-mono text-brand-teal bg-brand-soft px-2 py-0.5 rounded">
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
            </button>
          </div>

          {/* Left Sidebar Filter Column */}
          <div className={`lg:col-span-3 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            
            {/* Search Box */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Search Catalog
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search forceps, cannula, IOL..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-teal outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>



            {/* Categories List */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Categories ({categoriesData.length})
                </span>
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory('')} className="text-[11px] text-brand-teal font-semibold hover:underline">
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
                {categoriesData.map((cat) => {
                  const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-brand-teal text-white font-bold' 
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate pr-2">
                        {cat.icon_url && (
                          <img 
                            src={cat.icon_url} 
                            alt={cat.name} 
                            className={`w-4 h-4 object-contain shrink-0 ${isSelected ? 'brightness-0 invert' : ''}`} 
                          />
                        )}
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {cat.product_count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bulk Quote Banner (High-Contrast Premium Card) */}
            <div className="bg-white border border-brand-teal/30 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-brand-teal shrink-0" />
                <h4 className="font-display font-extrabold text-slate-900 text-sm">Bulk Wholesale Orders</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Need a custom proforma quotation for distributor orders, tender bids, or hospital contracts?
              </p>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full justify-center text-xs" 
                onClick={() => onOpenRfq()}
              >
                Request Wholesale Quote
              </Button>
            </div>

          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Long Prominent Catalog Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-brand-teal/30 shadow-sm space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
                Search Ophthalmic Catalog (457 Items)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search instruments by name, REF code, or keyword (e.g. Forceps, Cannula, Blades, 20D)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none font-medium text-slate-900"
                />
                <Search className="w-5 h-5 text-brand-teal absolute left-3.5 top-3.5" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filter Bar */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> of {productsData.length} products
                {selectedCategory && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 bg-brand-soft text-brand-blue rounded border border-brand-teal/30">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>

              {(selectedCategory || searchQuery || onlyIovue) && (
                <button
                  onClick={() => { setSelectedCategory(''); setSearchQuery(''); setOnlyIovue(false); setSearchParams({}); }}
                  className="text-xs text-rose-600 font-semibold hover:underline flex items-center space-x-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, visibleCount).map((prod) => (
                    <ProductCard key={prod.id} product={prod} onOpenRfq={onOpenRfq} />
                  ))}
                </div>

                {/* Load More Button (Bottom Middle) */}
                {filteredProducts.length > visibleCount && (
                  <div className="pt-6 pb-4 text-center flex flex-col items-center justify-center space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="px-8 py-3.5 bg-brand-teal hover:bg-[#20968E] text-white font-bold text-sm shadow-md hover:shadow-brand-glow transition-all"
                      onClick={() => setVisibleCount(prev => prev + 15)}
                    >
                      Load More Products ({filteredProducts.length - visibleCount} Remaining)
                    </Button>
                    <p className="text-xs text-slate-500 font-medium">
                      Showing <strong className="text-slate-900 font-bold">{Math.min(visibleCount, filteredProducts.length)}</strong> of <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> products
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center space-y-4 border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-800">No matching products found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting your search terms or clearing category filters to view all 457 products.
                </p>
                <Button variant="outline" size="sm" onClick={() => { setSelectedCategory(''); setSearchQuery(''); setOnlyIovue(false); }}>
                  Reset Search Filters
                </Button>
              </div>
            )}

          </div>

        </div>
      </Container>

    </div>
  );
};
