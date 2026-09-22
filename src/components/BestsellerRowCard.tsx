import React from 'react';
import { Book } from '../types';
import { BookCoverImage } from './BookCoverImage';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Award } from 'lucide-react';

interface BestsellerRowCardProps {
  book: Book;
  rank: number;
}

export const BestsellerRowCard: React.FC<BestsellerRowCardProps> = ({ book, rank }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useStore();
  const inWishlist = isInWishlist(book.id);

  return (
    <article
      id={`bestseller-card-${book.id}`}
      className="flex flex-col sm:flex-row items-stretch gap-4 bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs hover:shadow-md transition-all duration-300 relative group"
    >
      {/* Rank number badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1D1C] text-[#FAF8F5] flex items-center justify-center font-serif text-sm font-bold shadow-md border-2 border-[#FAF8F5] z-20">
        #{rank}
      </div>

      {/* Book Cover */}
      <div
        className="w-full sm:w-28 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-[#F5F1EB]"
        onClick={() => setQuickViewBook(book)}
      >
        <BookCoverImage book={book} className="w-full aspect-[2/3]" size="sm" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider">
              <Award className="w-3 h-3" />
              Bestseller • {book.category}
            </span>
            <button
              id={`bestseller-wishlist-${book.id}`}
              onClick={() => toggleWishlist(book.id)}
              className={`p-1.5 rounded-full transition-colors ${
                inWishlist ? 'text-rose-600 bg-rose-50' : 'text-[#8C8275] hover:text-[#1E1D1C]'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          <h3
            onClick={() => setQuickViewBook(book)}
            className="font-serif text-base font-bold text-[#1E1D1C] mt-1.5 hover:text-[#B8860B] transition-colors cursor-pointer line-clamp-1"
          >
            {book.title}
          </h3>
          <p className="text-xs text-[#6B6864] italic mt-0.5">by {book.author}</p>

          <p className="text-xs text-[#524E48] mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Price & Cart button */}
        <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#1E1D1C]">
              <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
              <span>{book.rating}</span>
            </div>
            <span className="text-[#C5BDB2]">•</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#1E1D1C]">₹{book.price}</span>
              {book.oldPrice && (
                <span className="text-xs text-[#9C9589] line-through">₹{book.oldPrice}</span>
              )}
            </div>
          </div>

          <button
            id={`bestseller-add-to-cart-${book.id}`}
            onClick={() => addToCart(book)}
            className="px-3.5 py-1.5 rounded-lg bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </article>
  );
};
