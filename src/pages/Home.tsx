import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS_DATA, CATEGORIES_DATA } from '../data/books';
import { BookCard } from '../components/BookCard';
import { BestsellerRowCard } from '../components/BestsellerRowCard';
import { CategoryCard } from '../components/CategoryCard';
import {
  ArrowRight,
  BookOpen,
  Truck,
  ShieldCheck,
  HeartHandshake,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const Home: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // SEO document title
  useEffect(() => {
    document.title = 'Kronos Books — Discover Your Next Great Story';
  }, []);

  // Filter 8 featured books specified by prompt
  const featuredBooks = BOOKS_DATA.filter((b) => b.featured).slice(0, 8);

  // 4 Bestselling books for horizontal layout
  const bestsellerBooks = BOOKS_DATA.filter((b) => b.bestseller).slice(0, 4);

  // 10 categories for the homepage category section
  const homeCategories = CATEGORIES_DATA.filter((c) =>
    [
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
    ].includes(c.name)
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-[#F3EFEA] border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#D5CBBF] text-xs font-semibold text-[#8E6503] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>The Premier Independent Book Retailing Experience</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1D1C] leading-[1.15]">
                  Find Your Next <br />
                  <span className="italic font-normal text-[#8E6503]">Great Story.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#524E48] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Explore timeless classics, modern masterpieces, inspiring ideas and unforgettable adventures.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/books"
                  id="hero-explore-books-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98"
                >
                  <span>Explore Books</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>

                <Link
                  to="/categories"
                  id="hero-browse-categories-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white text-[#1E1D1C] border border-[#D5CBBF] text-sm font-semibold flex items-center justify-center transition-colors shadow-xs"
                >
                  <span>Browse Categories</span>
                </Link>
              </div>

              {/* Trust Line */}
              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-center lg:justify-start text-xs text-[#78746E] tracking-wide font-medium">
                <span>Curated collection • Secure checkout • Fast delivery</span>
              </div>
            </div>

            {/* Right Editorial Hero Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#2B2825]">
                  <img
                    src="https://images.unsplash.com/photo-1507842229451-7f01be7fe8e5?auto=format&fit=crop&q=80&w=1200"
                    alt="Kronos Books ambient library reading room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E2D9] shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#8C8275] font-semibold">
                        Staff Pick of the Month
                      </p>
                      <h4 className="font-serif text-sm font-bold text-[#1E1D1C]">
                        Atomic Habits
                      </h4>
                      <p className="text-xs text-[#6B6864] italic">by James Clear</p>
                    </div>
                    <Link
                      to="/books?category=Self%20Development"
                      className="px-3 py-1.5 rounded-lg bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C]"
                    >
                      View
                    </Link>
                  </div>
                </div>

                {/* Decorative accent element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: FEATURED BOOKS */}
      <section id="featured-books-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-1">
              <span>Handpicked Selections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C]">
              Featured Books
            </h2>
            <p className="text-sm text-[#6B6864] mt-1">
              Essential volumes recommended by our editors for every curious mind.
            </p>
          </div>

          <Link
            to="/books"
            id="view-all-books-btn"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E1D1C] hover:text-[#B8860B] transition-colors group"
          >
            <span>View All Books</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Featured Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 3. SECTION: SHOP BY CATEGORY */}
      <section id="shop-by-category-section" className="bg-[#F3EFEA] py-16 border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
              Curated Genres
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C] mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-[#6B6864] mt-2">
              Browse across diverse literary traditions, actionable business strategies, and groundbreaking science.
            </p>
          </div>

          {/* Responsive Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {homeCategories.map((category) => (
              <CategoryCard key={category.name} category={category} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: BESTSELLERS (4 books in horizontal layout) */}
      <section id="bestsellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
            Reader Favorites
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C] mt-1">
            Bestselling Titles
          </h2>
          <p className="text-sm text-[#6B6864] mt-1">
            The stories, mental models, and ideas readers can't stop discussing this year.
          </p>
        </div>

        {/* 4 Bestsellers in horizontal 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bestsellerBooks.map((book, idx) => (
            <BestsellerRowCard key={book.id} book={book} rank={idx + 1} />
          ))}
        </div>
      </section>

      {/* 5. SECTION: WHY KRONOS BOOKS (4 features) */}
      <section id="why-kronos-section" className="bg-[#FAF4E6] py-16 border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#8E6503] uppercase tracking-wider">
              The Reader's Haven
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C] mt-1">
              Why Kronos Books
            </h2>
            <p className="text-sm text-[#6B6864] mt-2">
              Every detail of our digital bookstore is crafted around reverence for the written word.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs text-center sm:text-left space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#B8860B] flex items-center justify-center mx-auto sm:mx-0 border border-[#E8DFC8]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                Curated Collection
              </h3>
              <p className="text-xs text-[#524E48] leading-relaxed">
                Carefully selected books for curious minds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs text-center sm:text-left space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#B8860B] flex items-center justify-center mx-auto sm:mx-0 border border-[#E8DFC8]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                Fast Delivery
              </h3>
              <p className="text-xs text-[#524E48] leading-relaxed">
                Reliable delivery across India.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs text-center sm:text-left space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#B8860B] flex items-center justify-center mx-auto sm:mx-0 border border-[#E8DFC8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                Secure Shopping
              </h3>
              <p className="text-xs text-[#524E48] leading-relaxed">
                Safe and simple checkout experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs text-center sm:text-left space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#B8860B] flex items-center justify-center mx-auto sm:mx-0 border border-[#E8DFC8]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                Readers First
              </h3>
              <p className="text-xs text-[#524E48] leading-relaxed">
                A bookstore designed around readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: NEWSLETTER */}
      <section id="newsletter-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1E1D1C] rounded-3xl p-8 sm:p-12 text-center text-[#FAF8F5] relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              The Reader's Gazette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get 10% off your first order
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D3CB] leading-relaxed">
              Subscribe to receive curated monthly reading guides, literary essays, and exclusive early access to special editions.
            </p>

            {newsletterSubscribed ? (
              <div
                id="newsletter-success-msg"
                className="p-4 rounded-xl bg-white/10 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center gap-2 animate-in zoom-in-95 duration-200"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>You're on the list! Welcome to Kronos Books.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-hidden focus:border-[#D4AF37] focus:bg-white/15"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#B8860B] hover:bg-[#A3770A] text-white text-xs font-semibold transition-colors shadow-md"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-rose-300 text-xs mt-1">{newsletterError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
