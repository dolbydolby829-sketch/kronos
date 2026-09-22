import React, { useState } from 'react';
import { Book } from '../types';
import { BookOpen } from 'lucide-react';

interface BookCoverImageProps {
  book: Book;
  className?: string;
  aspectRatio?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookCoverImage: React.FC<BookCoverImageProps> = ({
  book,
  className = '',
  aspectRatio = 'aspect-[2/3]',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackBg = book.coverBgColor || '#22272B';
  const accent = book.accentColor || '#D4AF37';

  return (
    <div
      className={`relative overflow-hidden rounded-md ${aspectRatio} select-none ${className}`}
      style={{ backgroundColor: fallbackBg }}
    >
      {/* Editorial Foil spine simulation */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent z-10 pointer-events-none" />
      
      {!hasError ? (
        <>
          <img
            src={book.image}
            alt={`Book cover of ${book.title} by ${book.author}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Subtle sheen layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
        </>
      ) : null}

      {/* Stylized Fallback Cover (Always works even offline or on broken URLs) */}
      {(hasError || isLoading) && (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 text-left transition-opacity duration-300 ${
            hasError ? 'opacity-100 z-0' : 'opacity-0'
          }`}
          style={{ backgroundColor: fallbackBg }}
        >
          {/* Top category pill & spine gold line */}
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded"
              style={{ color: accent, border: `1px solid ${accent}40` }}
            >
              {book.category}
            </span>
            <BookOpen className="w-3.5 h-3.5 opacity-60 text-[#FAF8F5]" />
          </div>

          {/* Book Title & Author */}
          <div className="my-auto space-y-1.5 py-2">
            <h4
              className={`font-serif font-bold text-[#FAF8F5] leading-tight line-clamp-3 ${
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
              }`}
            >
              {book.title}
            </h4>
            <p className="text-[11px] text-[#D8D3CB] line-clamp-1 italic">
              {book.author}
            </p>
          </div>

          {/* Bottom Imprint */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-[#A8A29E] uppercase tracking-widest">
            <span>Kronos Editions</span>
            <span style={{ color: accent }}>★ {book.rating}</span>
          </div>
        </div>
      )}
    </div>
  );
};
