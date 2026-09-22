import React from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS_DATA } from '../data/books';
import { BookCoverImage } from './BookCoverImage';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewBook,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistBooks = BOOKS_DATA.filter((b) => wishlist.includes(b.id));

  return (
    <div
      id="wishlist-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="wishlist-drawer-content"
          className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9] animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1E1D1C]">Your Wishlist</h2>
                <p className="text-xs text-[#6B6864]">
                  {wishlistBooks.length} saved {wishlistBooks.length === 1 ? 'title' : 'titles'}
                </p>
              </div>
            </div>
            <button
              id="close-wishlist-drawer"
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-[#6B6864] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E2D9]">
            {wishlistBooks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#8C8275]">
                  <Heart className="w-8 h-8 stroke-1 text-[#8C8275]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs text-[#6B6864] max-w-xs">
                    Tap the heart on any book to curate your private reading wishlist for later.
                  </p>
                </div>
                <Link
                  to="/books"
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors"
                >
                  <span>Browse Books</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6CA65]" />
                </Link>
              </div>
            ) : (
              wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  id={`wishlist-item-${book.id}`}
                  className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewBook(book);
                    }}
                    className="w-16 shrink-0 rounded-md overflow-hidden shadow-xs bg-[#F5F1EB] cursor-pointer"
                  >
                    <BookCoverImage book={book} aspectRatio="aspect-[2/3]" size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setQuickViewBook(book);
                      }}
                      className="font-serif text-sm font-semibold text-[#1E1D1C] truncate cursor-pointer hover:text-[#B8860B] transition-colors"
                      title={book.title}
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#6B6864] italic truncate">
                      {book.author}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-bold text-[#1E1D1C]">₹{book.price}</span>
                      {book.oldPrice && (
                        <span className="text-xs text-[#9C9589] line-through">₹{book.oldPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => addToCart(book, 1, false)}
                        className="px-3 py-1.5 rounded-lg bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#E6CA65]" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(book.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#D5CBBF] text-xs text-[#6B6864] hover:text-rose-600 hover:border-rose-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistBooks.length > 0 && (
            <div className="p-4 border-t border-[#E8E2D9] bg-white">
              <Link
                to="/books"
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-3 px-4 rounded-xl border border-[#D5CBBF] bg-[#FAF8F5] hover:bg-[#F3EFEA] text-xs font-semibold text-[#1E1D1C] flex items-center justify-center gap-2 transition-colors"
              >
                <span>Continue Browsing More Books</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B8860B]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
