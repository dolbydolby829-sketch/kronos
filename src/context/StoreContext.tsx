import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem, DemoOrder } from '../types';
import { BOOKS_DATA } from '../data/books';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: DemoOrder[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isAccountOpen: boolean;
  quickViewBook: Book | null;
  toastMessage: string | null;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setQuickViewBook: (book: Book | null) => void;
  addToCart: (book: Book, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  placeDemoOrder: (
    shippingDetails: DemoOrder['shippingDetails'],
    paymentMethod?: DemoOrder['paymentMethod']
  ) => DemoOrder;
  showToast: (msg: string) => void;
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  deliveryFee: number;
  totalSavings: number;
  total: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kronos_books_cart';
const WISHLIST_STORAGE_KEY = 'kronos_books_wishlist';
const ORDERS_STORAGE_KEY = 'kronos_books_orders';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state initialized from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Hydrate with latest book references to maintain integrity
        return parsed
          .map((item: { bookId?: string; book: Book; quantity: number }) => {
            const id = item.bookId || item.book?.id;
            const fullBook = BOOKS_DATA.find((b) => b.id === id) || item.book;
            return fullBook ? { book: fullBook, quantity: item.quantity || 1 } : null;
          })
          .filter(Boolean);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });

  // Wishlist state initialized from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
      return [];
    }
  });

  // Demo orders
  const [orders, setOrders] = useState<DemoOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      const compactCart = cart.map((item) => ({
        bookId: item.book.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(compactCart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (book: Book, quantity = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) }
            : item
        );
      }
      return [...prev, { book, quantity: Math.min(quantity, book.stock) }];
    });
    showToast(`Added "${book.title}" to your cart`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.book.id === bookId) {
          const clamped = Math.min(quantity, item.book.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (bookId: string) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    setWishlist((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast(book ? `Removed "${book.title}" from wishlist` : 'Removed from wishlist');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast(book ? `Saved "${book.title}" to wishlist` : 'Saved to wishlist');
        return [...prev, bookId];
      }
    });
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  // Computed values
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  const totalSavings = cart.reduce((acc, item) => {
    if (item.book.oldPrice && item.book.oldPrice > item.book.price) {
      return acc + (item.book.oldPrice - item.book.price) * item.quantity;
    }
    return acc;
  }, 0);

  // Delivery: Free above ₹999, otherwise ₹49 (only if subtotal > 0)
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const placeDemoOrder = (
    shippingDetails: DemoOrder['shippingDetails'],
    paymentMethod: DemoOrder['paymentMethod'] = 'Cash on Delivery'
  ): DemoOrder => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KB-2026-${randomNum}`;
    const newOrder: DemoOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal,
      delivery: deliveryFee,
      discount: totalSavings,
      total,
      paymentMethod,
      shippingDetails,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isAccountOpen,
        quickViewBook,
        toastMessage,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsAccountOpen,
        setQuickViewBook,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeDemoOrder,
        showToast,
        cartCount,
        wishlistCount,
        subtotal,
        deliveryFee,
        totalSavings,
        total,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1E1D1C] text-[#FAF8F5] px-5 py-3.5 rounded-lg shadow-xl border border-[#383531] text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
