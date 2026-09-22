import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Section, SectionHeading, Button } from '../components/Primitives';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, X, ChevronRight, ChevronDown, FileText, Layers, ArrowRight } from 'lucide-react';
import productsData from '../../public_html/data/products.json';
import categoriesData from '../../public_html/data/categories.json';

interface ProductsPageProps {
  onOpenRfq: (productName?: string, productSlug?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenRfq }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSubcategory = searchParams.get('subcategory') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [onlyIovue, setOnlyIovue] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  // Keep Intraocular Lenses and Instruments subcategories expanded and accessible by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Intraocular Lenses': true,
    'Instruments': true
  });

  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('subcategory');
    const search = searchParams.get('search');
    setSelectedCategory(cat || '');
    setSelectedSubcategory(sub || '');
    setSearchQuery(search || '');
    if (cat) {
      setExpandedCategories(prev => ({ ...prev, [cat]: true }));
    }
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(15);
  }, [selectedCategory, selectedSubcategory, searchQuery, onlyIovue]);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    const selectedCatLower = selectedCategory.trim().toLowerCase();
    const selectedSubLower = selectedSubcategory.trim().toLowerCase();
    const searchLower = searchQuery.trim().toLowerCase();

    return productsData.filter(p => {
      // 1. Subcategory filter (exact or segment match)
      if (selectedSubLower) {
        const pathLower = (p.category_path || '').toLowerCase();
        const normSub = selectedSubLower.replace(/hydrophylic/g, 'hydrophilic');
        const normPath = pathLower.replace(/hydrophylic/g, 'hydrophilic');
        if (!pathLower.includes(selectedSubLower) && !normPath.includes(normSub)) {
          return false;
        }
      } else if (selectedCatLower) {
        // 2. Category filter (when no subcategory is selected)
        const mainCatLower = (p.main_category || '').toLowerCase();
        if (mainCatLower !== selectedCatLower) {
          return false;
        }
      }

      // 3. Search query filter
      const matchSearch = !searchLower || 
        p.name.toLowerCase().includes(searchLower) || 
        (p.model && p.model.toLowerCase().includes(searchLower)) ||
        (p.variants && p.variants.some(v => v.model.toLowerCase().includes(searchLower))) ||
        p.short_description.toLowerCase().includes(searchLower) || 
        p.slug.toLowerCase().includes(searchLower);

      // 4. IOVUE filter
      const matchIovue = !onlyIovue || p.brand === 'ioVue' || p.brand === 'IOVUE';

      return matchSearch && matchIovue;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, onlyIovue]);

  const handleCategorySelect = (catName: string) => {
    if (selectedCategory.toLowerCase() === catName.toLowerCase() && !selectedSubcategory) {
      setSelectedCategory('');
      setSelectedSubcategory('');
      setSearchQuery('');
      setSearchParams({});
    } else {
      setSelectedCategory(catName);
      setSelectedSubcategory('');
      setSearchQuery('');
      setExpandedCategories(prev => ({ ...prev, [catName]: true }));
      setSearchParams({ category: catName });
    }
  };

  const handleSubcategorySelect = (catName: string, subName: string) => {
    setSelectedCategory(catName);
    setSelectedSubcategory(subName);
    setSearchQuery('');
    setExpandedCategories(prev => ({ ...prev, [catName]: true }));
    setSearchParams({ category: catName, subcategory: subName });
  };

  const toggleExpand = (catName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
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
              Filter by category, search specific products, or request an export quotation directly.
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
              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl shadow-sm font-bold text-slate-800 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 font-display">
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
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories & Subcategories List */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
                  Categories ({categoriesData.length})
                </span>
                {(selectedCategory || selectedSubcategory) && (
                  <button 
                    onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); setSearchParams({}); }} 
                    className="text-[11px] text-brand-teal font-semibold hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {categoriesData.map((cat) => {
                  const isCatSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;
                  const isExpanded = !!expandedCategories[cat.name] || isCatSelected;

                  return (
                    <div key={cat.id} className="space-y-0.5">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleCategorySelect(cat.name)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between group cursor-pointer ${
                            isCatSelected && !selectedSubcategory
                              ? 'bg-brand-teal text-white font-bold shadow-xs' 
                              : isCatSelected
                                ? 'bg-brand-soft text-brand-teal font-bold border border-brand-teal/30'
                                : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate pr-2">
                            {cat.icon_url && (
                              <img 
                                src={cat.icon_url} 
                                alt={cat.name} 
                                className={`w-4 h-4 object-contain shrink-0 ${isCatSelected && !selectedSubcategory ? 'brightness-0 invert' : ''}`} 
                              />
                            )}
                            <span className="truncate">{cat.name}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            isCatSelected && !selectedSubcategory ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {cat.product_count}
                          </span>
                        </button>

                        {/* Expand/Collapse Toggle Button */}
                        {hasSubcategories && (
                          <button
                            type="button"
                            onClick={(e) => toggleExpand(cat.name, e)}
                            className="p-2 text-slate-400 hover:text-brand-teal transition-colors cursor-pointer"
                            title={isExpanded ? 'Collapse subcategories' : 'Expand subcategories'}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-brand-teal' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Clickable Subcategories List */}
                      {hasSubcategories && isExpanded && (
                        <div className="ml-3 pl-2.5 border-l-2 border-brand-teal/30 space-y-0.5 my-1 animate-in fade-in duration-200">
                          {/* "All [Category]" Option */}
                          <button
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              setSelectedSubcategory('');
                              setSearchParams({ category: cat.name });
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors flex items-center justify-between cursor-pointer ${
                              isCatSelected && !selectedSubcategory 
                                ? 'bg-brand-teal text-white font-bold' 
                                : 'text-slate-600 hover:bg-slate-100 font-medium'
                            }`}
                          >
                            <span className="truncate">All {cat.name}</span>
                            <span className={`text-[10px] font-mono ${isCatSelected && !selectedSubcategory ? 'text-white' : 'text-slate-400'}`}>
                              {cat.product_count}
                            </span>
                          </button>

                          {/* Individual Subcategories */}
                          {cat.subcategories.map((sub, sIdx) => {
                            const isSubSelected = selectedSubcategory.toLowerCase() === sub.name.toLowerCase();
                            return (
                              <button
                                key={sIdx}
                                onClick={() => handleSubcategorySelect(cat.name, sub.name)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors flex items-center justify-between cursor-pointer group/sub ${
                                  isSubSelected 
                                    ? 'bg-brand-teal text-white font-bold shadow-2xs' 
                                    : 'text-slate-600 hover:bg-brand-soft hover:text-brand-teal font-medium'
                                }`}
                              >
                                <span className="truncate pr-1">{sub.name}</span>
                                <span className={`text-[10px] font-mono shrink-0 ${isSubSelected ? 'text-white' : 'text-slate-400 group-hover/sub:text-slate-600'}`}>
                                  {sub.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bulk Quote Banner (High-Contrast Premium Card) */}
            <div className="bg-white border border-brand-teal/30 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-brand-teal shrink-0" />
                <h4 className="font-display font-extrabold text-slate-900 text-sm">Bulk Export Orders</h4>
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
                Request Export Quote
              </Button>
            </div>

          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Long Prominent Catalog Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-brand-teal/30 shadow-sm space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
                Search Ophthalmic Catalog ({productsData.length} Items)
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

            {/* Active Filter Bar & Subcategory Label */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> of {productsData.length} products
                </span>

                {/* Subcategory Label (Prioritized as requested) */}
                {selectedSubcategory ? (
                  <div className="inline-flex items-center space-x-1.5 ml-1">
                    <span className="text-slate-300">·</span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-soft text-brand-teal font-bold rounded-lg border border-brand-teal/30 shadow-2xs font-display text-xs">
                      <span className="text-slate-500 font-medium">Subcategory:</span>
                      <strong className="text-brand-teal font-extrabold">{selectedSubcategory}</strong>
                      <button 
                        onClick={() => handleCategorySelect(selectedCategory)} 
                        title="Clear subcategory and view all in category"
                        className="ml-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                    <button 
                      onClick={() => handleCategorySelect(selectedCategory)}
                      className="text-[11px] text-slate-500 hover:text-brand-teal underline cursor-pointer"
                    >
                      (in {selectedCategory})
                    </button>
                  </div>
                ) : selectedCategory ? (
                  <div className="inline-flex items-center space-x-1.5 ml-1">
                    <span className="text-slate-300">·</span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-soft text-brand-blue font-bold rounded-lg border border-brand-teal/30 shadow-2xs font-display text-xs">
                      <span className="text-slate-500 font-medium">Category:</span>
                      <strong className="text-slate-900">{selectedCategory}</strong>
                      <button 
                        onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); setSearchParams({}); }}
                        title="Clear category"
                        className="ml-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </div>
                ) : null}

                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-amber-50 text-amber-800 font-semibold rounded-lg border border-amber-200 text-xs">
                    <span>Search: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="ml-1 text-amber-600 hover:text-amber-900 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {(selectedCategory || selectedSubcategory || searchQuery || onlyIovue) && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedSubcategory('');
                    setSearchQuery('');
                    setOnlyIovue(false);
                    setSearchParams({});
                  }}
                  className="text-xs text-rose-600 font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>

            {/* Prominent Subcategory Title Header */}
            {selectedSubcategory && (
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                    {selectedSubcategory}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Displaying all <strong className="text-brand-teal font-bold">{filteredProducts.length}</strong> products in {selectedCategory} &gt; {selectedSubcategory}
                  </p>
                </div>
              </div>
            )}

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
                  Try adjusting your search terms or clearing category filters to view all {productsData.length} products.
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
