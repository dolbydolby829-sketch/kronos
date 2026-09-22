import React from 'react';
import { Book } from '../types';
import { BookCoverImage } from './BookCoverImage';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useStore();
  const inWishlist = isInWishlist(book.id);

  const discountPercent =
    book.oldPrice && book.oldPrice > book.price
      ? Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)
      : null;

  return (
    <article
      id={`book-card-${book.id}`}
      className="group relative flex flex-col bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#D5CBBF]"
    >
      {/* Cover container */}
      <div
        onClick={() => setQuickViewBook(book)}
        className="relative mb-3 overflow-hidden rounded-lg bg-[#F5F1EB] cursor-pointer"
      >
        <BookCoverImage book={book} className="w-full aspect-[2/3]" />

        {/* Discount Badge */}
        {discountPercent ? (
          <span className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-[#B8860B] text-white rounded shadow-xs">
            {discountPercent}% OFF
          </span>
        ) : book.bestseller ? (
          <span className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-[#1E1D1C] text-[#FAF8F5] rounded shadow-xs">
            Bestseller
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${book.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(book.id);
          }}
          aria-label={inWishlist ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            inWishlist
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 backdrop-blur-xs text-[#524E48] hover:text-[#1E1D1C] hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              inWishlist ? 'fill-rose-600 text-rose-600' : ''
            }`}
          />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 px-3 hidden sm:flex pointer-events-none group-hover:pointer-events-auto">
          <button
            id={`quickview-btn-${book.id}`}
            onClick={() => setQuickViewBook(book)}
            className="w-full py-1.5 px-3 rounded bg-white/95 text-[#1E1D1C] text-xs font-medium flex items-center justify-center gap-1.5 shadow-md hover:bg-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#B8860B]" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium tracking-wide uppercase text-[#8C8275] truncate">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#1E1D1C]">
              <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
              <span>{book.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewBook(book)}
            className="font-serif text-base font-semibold text-[#1E1D1C] leading-snug line-clamp-2 hover:text-[#B8860B] transition-colors cursor-pointer"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-[#6B6864] mt-1 line-clamp-1 italic">
            by {book.author}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#1E1D1C]">
                ₹{book.price}
              </span>
              {book.oldPrice && book.oldPrice > book.price && (
                <span className="text-xs text-[#9C9589] line-through">
                  ₹{book.oldPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">In stock</span>
          </div>

          <button
            id={`add-to-cart-btn-${book.id}`}
            onClick={() => addToCart(book)}
            className="px-3 py-2 rounded-lg bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-medium flex items-center gap-1.5 transition-colors duration-200 active:scale-95 shadow-xs"
            aria-label={`Add ${book.title} to Cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
