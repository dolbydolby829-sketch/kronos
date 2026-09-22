import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountDrawer } from './components/AccountDrawer';
import { QuickViewModal } from './components/QuickViewModal';

import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1D1C] overflow-x-hidden selection:bg-[#EBDDB6] selection:text-[#1A1918]">
          {/* Main Sticky Header */}
          <Header />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Main Footer */}
          <Footer />

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <CheckoutModal />
          <WishlistDrawer />
          <AccountDrawer />
          <QuickViewModal />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
