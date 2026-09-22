import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Package, Heart, BookCheck, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AccountDrawer: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, wishlistCount, cartCount } = useStore();

  if (!isAccountOpen) return null;

  return (
    <div
      id="account-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={() => setIsAccountOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="account-drawer-content"
          className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9] animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E1D1C] text-[#FAF8F5] flex items-center justify-center font-serif text-base font-bold shadow-xs">
                R
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-[#1E1D1C]">Reader Account</h2>
                <p className="text-xs text-[#6B6864]">reader@kronosbooks.com</p>
              </div>
            </div>
            <button
              id="close-account-drawer"
              onClick={() => setIsAccountOpen(false)}
              className="p-2 rounded-full text-[#6B6864] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
              aria-label="Close account"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white p-3 rounded-xl border border-[#E8E2D9] text-center">
                <span className="block text-lg font-bold text-[#1E1D1C]">{orders.length}</span>
                <span className="text-[10px] text-[#8C8275] uppercase tracking-wider font-semibold">Orders</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8E2D9] text-center">
                <span className="block text-lg font-bold text-[#1E1D1C]">{wishlistCount}</span>
                <span className="text-[10px] text-[#8C8275] uppercase tracking-wider font-semibold">Wishlist</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8E2D9] text-center">
                <span className="block text-lg font-bold text-[#1E1D1C]">{cartCount}</span>
                <span className="text-[10px] text-[#8C8275] uppercase tracking-wider font-semibold">Bag</span>
              </div>
            </div>

            {/* Academic / Project Note */}
            <div className="bg-[#FAF4E6] p-4 rounded-xl border border-[#E8DFC8] space-y-2 text-xs text-[#7C5E0B]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E1D1C]">
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                <span>Kronos Books — BCA Project Edition</span>
              </div>
              <p className="leading-relaxed">
                All account records, cart items, wishlists, and demo orders are saved client-side using reactive localStorage state, ready for offline presentation.
              </p>
            </div>

            {/* Orders Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-[#1E1D1C] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#B8860B]" />
                  <span>Recent Demo Orders</span>
                </h3>
                <span className="text-xs text-[#8C8275]">{orders.length} placed</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-[#D5CBBF] bg-white text-center text-xs text-[#6B6864]">
                  No orders placed yet. Add books to your bag and test the checkout flow!
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="bg-white p-3.5 rounded-xl border border-[#E8E2D9] space-y-2 text-xs shadow-xs"
                    >
                      <div className="flex justify-between items-center font-medium">
                        <span className="font-mono text-[#1E1D1C] font-bold">{order.orderId}</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                          Confirmed
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B6864]">
                        Date: {order.date} • Total: ₹{order.total} • {order.paymentMethod || 'Demo'}
                      </div>
                      <div className="text-[11px] text-[#524E48] line-clamp-1">
                        Items: {order.items.map((i) => `${i.quantity}x ${i.book.title}`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reader Preferences & Profile Status */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#1E1D1C] flex items-center gap-2">
                <User className="w-4 h-4 text-[#B8860B]" />
                <span>Reader Membership Status</span>
              </h3>
              <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D9] text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#F0EBE1]">
                  <span className="text-[#6B6864]">Member Tier</span>
                  <span className="font-semibold text-[#B8860B]">Kronos Club Reader</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#F0EBE1]">
                  <span className="text-[#6B6864]">Delivery Privilege</span>
                  <span className="font-semibold text-emerald-700">Free Over ₹999</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#6B6864]">Support Channel</span>
                  <span className="text-[#1E1D1C]">support@kronosbooks.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E8E2D9] bg-white">
            <Link
              to="/books"
              onClick={() => setIsAccountOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] flex items-center justify-center transition-colors"
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
