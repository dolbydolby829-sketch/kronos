import React, { useEffect } from 'react';
import { CATEGORIES_DATA } from '../data/books';
import { CategoryCard } from '../components/CategoryCard';
import { Sparkles, Compass } from 'lucide-react';

export const Categories: React.FC = () => {
  useEffect(() => {
    document.title = 'Book Categories — Kronos Books';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4E6] border border-[#E8DFC8] text-xs font-semibold text-[#8E6503] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Curated Disciplines & Genres</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1E1D1C]">
          Find Books That Match Your Curiosity
        </h1>

        <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
          From Pulitzer-winning literature and cognitive neuroscience to profound biographies and world history. Discover your next lifelong obsession.
        </p>
      </div>

      {/* Large Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES_DATA.map((category) => (
          <CategoryCard key={category.name} category={category} variant="detailed" />
        ))}
      </div>

      {/* Editorial Bottom Callout */}
      <div className="bg-[#F3EFEA] rounded-2xl p-8 border border-[#E8E2D9] text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold text-[#8C8275]">
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Need a tailored recommendation?</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1D1C]">
          Looking for a specific subject or college textbook?
        </h3>
        <p className="text-xs sm:text-sm text-[#6B6864] max-w-xl mx-auto">
          Our literary curators review dozens of submissions each week. Write to our editorial team anytime through our Contact page.
        </p>
      </div>
    </div>
  );
};
