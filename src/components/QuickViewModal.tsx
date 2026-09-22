import React from 'react';
import { useStore } from '../context/StoreContext';
import { BookCoverImage } from './BookCoverImage';
import { X, Heart, ShoppingBag, Star, BookOpen, Layers, Calendar, ShieldCheck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewBook, setQuickViewBook, addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!quickViewBook) return null;

  const inWishlist = isInWishlist(quickViewBook.id);
  const discountPercent =
    quickViewBook.oldPrice && quickViewBook.oldPrice > quickViewBook.price
      ? Math.round(((quickViewBook.oldPrice - quickViewBook.price) / quickViewBook.oldPrice) * 100)
      : null;

  return (
    <div
      id="quickview-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setQuickViewBook(null)}
    >
      <div
        id="quickview-modal-content"
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D9] flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C8275]">
            Curated Edition • {quickViewBook.category}
          </span>
          <button
            id="close-quickview-modal"
            onClick={() => setQuickViewBook(null)}
            className="p-1.5 rounded-full text-[#6B6864] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">
          {/* Left Cover */}
          <div className="w-full md:w-56 shrink-0 mx-auto max-w-[220px]">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E8E2D9] bg-[#F5F1EB]">
              <BookCoverImage book={quickViewBook} className="w-full aspect-[2/3]" size="lg" />
            </div>
            {discountPercent && (
              <div className="mt-2.5 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF4E6] text-[#B8860B] border border-[#E8DFC8]">
                  Special Offer — {discountPercent}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Right Details */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1 text-xs font-bold text-[#1E1D1C]">
                  <Star className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
                  <span>{quickViewBook.rating}</span>
                </div>
                <span className="text-xs text-[#8C8275]">
                  ({quickViewBook.reviewsCount.toLocaleString()} reader reviews)
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1D1C] leading-tight">
                {quickViewBook.title}
              </h2>
              <p className="text-sm text-[#6B6864] italic mt-1">
                Written by <strong className="text-[#1E1D1C]">{quickViewBook.author}</strong>
              </p>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-bold text-[#1E1D1C]">
                  ₹{quickViewBook.price}
                </span>
                {quickViewBook.oldPrice && (
                  <span className="text-sm text-[#9C9589] line-through">
                    ₹{quickViewBook.oldPrice}
                  </span>
                )}
                <span className="ml-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock ({quickViewBook.stock} copies left)
                </span>
              </div>

              <p className="text-xs text-[#524E48] leading-relaxed mt-4 pt-3 border-t border-[#E8E2D9]">
                {quickViewBook.description}
              </p>

              {/* Book Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F0EBE1] text-[11px] text-[#6B6864]">
                {quickViewBook.publisher && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Publisher: {quickViewBook.publisher}</span>
                  </div>
                )}
                {quickViewBook.pages && (
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Pages: {quickViewBook.pages}</span>
                  </div>
                )}
                {quickViewBook.publicationYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Published: {quickViewBook.publicationYear}</span>
                  </div>
                )}
                {quickViewBook.isbn && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>ISBN: {quickViewBook.isbn}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E8E2D9] flex items-center gap-3">
              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  addToCart(quickViewBook);
                  setQuickViewBook(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#E6CA65]" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                id="modal-toggle-wishlist-btn"
                onClick={() => toggleWishlist(quickViewBook.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-[#D5CBBF] bg-white text-[#524E48] hover:text-[#1E1D1C]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
