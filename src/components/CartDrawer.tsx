import React from 'react';
import { useStore } from '../context/StoreContext';
import { BookCoverImage } from './BookCoverImage';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    totalSavings,
    total,
    setIsCheckoutOpen,
    setQuickViewBook,
  } = useStore();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="cart-drawer-content"
          className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9] animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1E1D1C]">Your Cart</h2>
                <p className="text-xs text-[#6B6864]">
                  {cart.length} {cart.length === 1 ? 'title' : 'titles'} selected
                </p>
              </div>
            </div>
            <button
              id="close-cart-drawer"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#6B6864] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-[#FAF4E6] border-b border-[#E8DFC8] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium text-[#7C5E0B]">
                {remainingForFreeDelivery > 0 ? (
                  <span>
                    Add <strong className="font-bold text-[#1E1D1C]">₹{remainingForFreeDelivery}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                    You unlocked Free Express Delivery!
                  </span>
                )}
                <span>{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EADAAC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B8860B] rounded-full transition-all duration-300"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E2D9]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#8C8275]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#6B6864] max-w-xs">
                    Explore our curated collection of bestselling fiction, business, and philosophy to start reading.
                  </p>
                </div>
                <Link
                  to="/books"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6CA65]" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.book.id}
                  id={`cart-item-${item.book.id}`}
                  className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center"
                >
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      setQuickViewBook(item.book);
                    }}
                    className="w-16 shrink-0 rounded-md overflow-hidden shadow-xs bg-[#F5F1EB] cursor-pointer"
                  >
                    <BookCoverImage book={item.book} aspectRatio="aspect-[2/3]" size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsCartOpen(false);
                        setQuickViewBook(item.book);
                      }}
                      className="font-serif text-sm font-semibold text-[#1E1D1C] truncate cursor-pointer hover:text-[#B8860B] transition-colors"
                      title={item.book.title}
                    >
                      {item.book.title}
                    </h4>
                    <p className="text-xs text-[#6B6864] italic truncate">
                      {item.book.author}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-bold text-[#1E1D1C]">
                        ₹{item.book.price}
                      </span>
                      {item.book.oldPrice && (
                        <span className="text-xs text-[#9C9589] line-through">
                          ₹{item.book.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#D5CBBF] rounded-lg bg-white overflow-hidden">
                        <button
                          id={`decrease-qty-${item.book.id}`}
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1E1D1C] min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          id={`increase-qty-${item.book.id}`}
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        id={`remove-item-${item.book.id}`}
                        onClick={() => removeFromCart(item.book.id)}
                        className="p-1.5 text-[#8C8275] hover:text-rose-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B6864]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1E1D1C]">₹{subtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Savings</span>
                    <span className="font-semibold">-₹{totalSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6864]">
                  <span>Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="font-semibold text-emerald-700 uppercase tracking-wide">
                      FREE
                    </span>
                  ) : (
                    <span className="font-medium text-[#1E1D1C]">₹{deliveryFee}</span>
                  )}
                </div>
                <div className="pt-2 border-t border-[#F0EBE1] flex justify-between text-base font-bold text-[#1E1D1C]">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                id="proceed-to-checkout-btn"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#78746E]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Simulated college project checkout. No actual charges.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
