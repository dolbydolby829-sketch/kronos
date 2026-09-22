import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BOOKS_DATA } from '../data/books';
import { Book, BookCategory } from '../types';
import { BookCard } from '../components/BookCard';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  BookOpen,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const CATEGORIES_LIST: ('All' | BookCategory)[] = [
  'All',
  'Fiction',
  'Self Development',
  'Business',
  'Finance',
  'Technology',
  'Biography',
  'Science',
  'Fantasy',
  'Thriller',
  'Academic',
  'Productivity',
  'History',
];

type PriceRange = 'all' | 'under300' | '300-500' | '500-800' | 'above800';
type RatingFilter = 'all' | '4.5' | '4.0' | '3.5';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const Books: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>('all');
  const [selectedRating, setSelectedRating] = useState<RatingFilter>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && (CATEGORIES_LIST as string[]).includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }

    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next);
  };

  // Page title SEO
  useEffect(() => {
    document.title = 'Books — Kronos Books';
  }, []);

  // Filter and Sort logic
  const filteredBooks = useMemo(() => {
    let result = [...BOOKS_DATA];

    // 1. Search filter: Title, Author, Category
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.description && b.description.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((b) => b.category === selectedCategory);
    }

    // 3. Price filter
    if (selectedPrice === 'under300') {
      result = result.filter((b) => b.price < 300);
    } else if (selectedPrice === '300-500') {
      result = result.filter((b) => b.price >= 300 && b.price <= 500);
    } else if (selectedPrice === '500-800') {
      result = result.filter((b) => b.price > 500 && b.price <= 800);
    } else if (selectedPrice === 'above800') {
      result = result.filter((b) => b.price > 800);
    }

    // 4. Rating filter
    if (selectedRating === '4.5') {
      result = result.filter((b) => b.rating >= 4.5);
    } else if (selectedRating === '4.0') {
      result = result.filter((b) => b.rating >= 4.0);
    } else if (selectedRating === '3.5') {
      result = result.filter((b) => b.rating >= 3.5);
    }

    // 5. Availability filter
    if (inStockOnly) {
      result = result.filter((b) => b.stock > 0);
    }

    // 6. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.publicationYear || 0) - (a.publicationYear || 0));
    } else {
      // 'featured'
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPrice, selectedRating, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPrice('all');
    setSelectedRating('all');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedPrice !== 'all' ||
    selectedRating !== 'all' ||
    inStockOnly ||
    sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8C8275]">
        <Link to="/" className="hover:text-[#1E1D1C] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5BDB2]" />
        <span className="font-semibold text-[#1E1D1C]">Books</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D9]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1D1C] tracking-tight">
            Explore Our Collection
          </h1>
          <p className="text-sm sm:text-base text-[#6B6864] mt-2 max-w-xl">
            Discover books selected for every kind of reader. From gripping fiction to seminal financial wisdom.
          </p>
        </div>

        {/* Global Result Counter */}
        <div className="text-xs text-[#6B6864] flex items-center gap-2">
          <span>Showing</span>
          <strong className="text-sm font-bold text-[#1E1D1C]">{filteredBooks.length}</strong>
          <span>of {BOOKS_DATA.length} curated volumes</span>
        </div>
      </div>

      {/* Search and Main Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Instant Search Bar */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#8C8275]" />
          <input
            id="catalogue-search-input"
            type="text"
            placeholder="Search by title, author, or genre (e.g. 'Atomic Habits', 'Morgan Housel', 'Finance')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-[#D5CBBF] text-xs sm:text-sm text-[#1E1D1C] placeholder-[#8C8275] focus:outline-hidden focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 p-1 rounded-full text-[#8C8275] hover:text-[#1E1D1C]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="lg:hidden flex-1 sm:flex-none px-4 py-3 rounded-xl border border-[#D5CBBF] bg-white text-xs font-semibold text-[#1E1D1C] flex items-center justify-center gap-2 shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-[#8C8275] whitespace-nowrap">
              Sort by:
            </span>
            <select
              id="sort-books-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3.5 py-3 rounded-xl border border-[#D5CBBF] bg-white text-xs font-medium text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Sidebar Filters + Books Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR FILTERS (Desktop persistent, mobile collapsible) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            isFilterDrawerOpen ? 'block' : 'hidden lg:block'
          } bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-2xs`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-serif text-base font-bold text-[#1E1D1C]">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#8E6503] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C8275]">
              Category
            </h4>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#FAF4E6] text-[#B8860B] font-bold'
                      : 'text-[#524E48] hover:bg-[#F5F1EB] hover:text-[#1E1D1C]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#F0EBE1]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C8275]">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-[#524E48]">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under300', label: 'Under ₹300' },
                { id: '300-500', label: '₹300 – ₹500' },
                { id: '500-800', label: '₹500 – ₹800' },
                { id: 'above800', label: 'Above ₹800' },
              ].map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2.5 py-1 px-1 rounded cursor-pointer hover:text-[#1E1D1C]"
                >
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={selectedPrice === p.id}
                    onChange={() => setSelectedPrice(p.id as PriceRange)}
                    className="accent-[#B8860B]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Rating Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#F0EBE1]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C8275]">
              Minimum Rating
            </h4>
            <div className="space-y-1.5 text-xs text-[#524E48]">
              {[
                { id: 'all', label: 'All Ratings' },
                { id: '4.5', label: '★ 4.5 & above' },
                { id: '4.0', label: '★ 4.0 & above' },
                { id: '3.5', label: '★ 3.5 & above' },
              ].map((r) => (
                <label
                  key={r.id}
                  className="flex items-center gap-2.5 py-1 px-1 rounded cursor-pointer hover:text-[#1E1D1C]"
                >
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={selectedRating === r.id}
                    onChange={() => setSelectedRating(r.id as RatingFilter)}
                    className="accent-[#B8860B]"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Availability */}
          <div className="pt-4 border-t border-[#F0EBE1]">
            <label className="flex items-center gap-2.5 text-xs font-medium text-[#1E1D1C] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-[#B8860B]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* BOOKS CATALOGUE GRID */}
        <div className="lg:col-span-9">
          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-xl bg-[#FAF4E6] border border-[#E8DFC8] text-xs">
              <span className="text-[#8E6503] font-semibold">Active filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1E1D1C] border border-[#D5CBBF]">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      const next = new URLSearchParams(searchParams);
                      next.delete('search');
                      setSearchParams(next);
                    }}
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-[#8C8275] hover:text-[#1E1D1C]" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1E1D1C] border border-[#D5CBBF]">
                  Genre: {selectedCategory}
                  <button onClick={() => handleCategorySelect('All')} aria-label="Clear category">
                    <X className="w-3 h-3 text-[#8C8275] hover:text-[#1E1D1C]" />
                  </button>
                </span>
              )}

              {selectedPrice !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1E1D1C] border border-[#D5CBBF]">
                  Price: {selectedPrice}
                  <button onClick={() => setSelectedPrice('all')} aria-label="Clear price">
                    <X className="w-3 h-3 text-[#8C8275] hover:text-[#1E1D1C]" />
                  </button>
                </span>
              )}

              {selectedRating !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1E1D1C] border border-[#D5CBBF]">
                  Rating: {selectedRating}+
                  <button onClick={() => setSelectedRating('all')} aria-label="Clear rating">
                    <X className="w-3 h-3 text-[#8C8275] hover:text-[#1E1D1C]" />
                  </button>
                </span>
              )}

              <button
                id="clear-filters-btn"
                onClick={clearAllFilters}
                className="ml-auto text-xs font-semibold text-[#8E6503] hover:underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* If No Books Found */}
          {filteredBooks.length === 0 ? (
            <div
              id="no-books-found"
              className="py-16 px-6 text-center bg-white rounded-2xl border border-[#E8E2D9] space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 stroke-1" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-serif text-xl font-bold text-[#1E1D1C]">
                  No books match your criteria
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6864] leading-relaxed">
                  We couldn’t find any titles matching your selected filters or search terms. Try loosening your filters or browsing other categories.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Books Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
