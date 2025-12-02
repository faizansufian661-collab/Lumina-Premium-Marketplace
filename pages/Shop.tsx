import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Grid, List, Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';

const Shop: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Sync URL params with state when they change
    if (initialCategory) setSelectedCategory(initialCategory);
    if (!initialCategory && !searchQuery) setSelectedCategory(null);
  }, [initialCategory, searchQuery]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Category Filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [selectedCategory, priceRange, sortOption, searchQuery]);

  return (
    <div className="bg-white dark:bg-black min-h-screen pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory ? selectedCategory : 'Full Collection'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Showing {filteredProducts.length} premium items
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm text-gray-900 dark:text-white"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter size={18} /> Filters
            </button>

            <div className="relative group">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-6 py-3 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer font-medium"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className={`
            w-64 flex-shrink-0 
            ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-white dark:bg-black p-6 overflow-y-auto' : 'hidden md:block'}
          `}>
             {isMobileFiltersOpen && (
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-serif font-bold dark:text-white">Filters</h2>
                 <button onClick={() => setIsMobileFiltersOpen(false)} className="dark:text-white"><X /></button>
               </div>
             )}

            {/* Categories */}
            <div className="mb-10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === null ? 'border-primary-600' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selectedCategory === null && <div className="w-2 h-2 rounded-full bg-primary-600"></div>}
                  </div>
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="hidden"
                  />
                  <span className={`transition-colors ${selectedCategory === null ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-500'}`}>All Categories</span>
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === cat.name ? 'border-primary-600' : 'border-gray-300 dark:border-gray-600'}`}>
                      {selectedCategory === cat.name && <div className="w-2 h-2 rounded-full bg-primary-600"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat.name}
                      onChange={() => setSelectedCategory(cat.name)}
                      className="hidden"
                    />
                    <span className={`transition-colors ${selectedCategory === cat.name ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-500'}`}>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Price Range</h3>
              <div className="flex items-center gap-4 mb-4">
                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">${priceRange[0]}</span>
                 <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary-600"
                 />
                 <span className="text-sm font-medium text-gray-900 dark:text-white w-12">${priceRange[1]}</span>
              </div>
            </div>

             <button 
               className="w-full py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium text-sm uppercase tracking-wider"
               onClick={() => {
                 setSelectedCategory(null);
                 setPriceRange([0, 1000]);
                 setSortOption('featured');
               }}
             >
               Clear Filters
             </button>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 animate-fade-in">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-300 dark:text-gray-600">
                  <SearchIcon size={40} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We couldn't find matches for "{searchQuery}". <br/> 
                  Try checking your spelling or use different keywords.
                </p>
                <button 
                  onClick={() => { setSelectedCategory(null); window.history.pushState({}, '', '/shop'); window.location.reload(); }} 
                  className="mt-6 text-primary-600 font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;