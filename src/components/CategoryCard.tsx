import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryInfo } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  variant?: 'compact' | 'detailed';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = 'compact',
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/books?category=${encodeURIComponent(category.name)}`);
  };

  if (variant === 'compact') {
    return (
      <div
        id={`category-pill-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
        className="group relative overflow-hidden rounded-xl border border-[#E8E2D9] bg-white p-5 cursor-pointer hover:border-[#B8860B]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center group-hover:bg-[#B8860B] group-hover:text-white transition-colors duration-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F3EFEA] text-[#78746E]">
            {category.bookCount}+ titles
          </span>
        </div>

        <div className="mt-4">
          <h4 className="font-serif text-base font-bold text-[#1E1D1C] group-hover:text-[#B8860B] transition-colors">
            {category.name}
          </h4>
          <p className="text-xs text-[#6B6864] mt-1 line-clamp-2">
            {category.tagline}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F5F1EB] flex items-center justify-between text-xs font-medium text-[#1E1D1C] group-hover:text-[#B8860B]">
          <span>Explore genre</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    );
  }

  // Detailed variant for Categories Page
  return (
    <article
      id={`category-card-detailed-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="group relative overflow-hidden rounded-2xl bg-white border border-[#E8E2D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Editorial Image Banner */}
      <div className="relative h-48 overflow-hidden bg-[#2B2825]">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute top-3.5 right-3.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-xs text-[#1E1D1C] shadow-xs">
            {category.bookCount}+ Volumes
          </span>
        </div>

        <div className="absolute bottom-3.5 left-4 right-4">
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            {category.name}
          </h3>
          <p className="text-xs text-[#E6E0D6] mt-0.5 italic">
            {category.tagline}
          </p>
        </div>
      </div>

      {/* Description & Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-sm text-[#524E48] leading-relaxed">
          {category.description}
        </p>

        {category.featuredAuthors.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C8275]">
              Featured Authors:
            </span>
            <p className="text-xs text-[#1E1D1C] font-medium mt-1">
              {category.featuredAuthors.join(' • ')}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-[#F0EBE1]">
          <button
            id={`explore-category-btn-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={handleNavigate}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#D5CBBF] hover:bg-[#1E1D1C] hover:text-[#FAF8F5] text-[#1E1D1C] text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 group/btn"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8860B] group-hover/btn:text-[#FAF8F5] group-hover/btn:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </article>
  );
};
