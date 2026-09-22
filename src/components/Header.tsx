import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  BookOpen,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(headerSearchQuery.trim())}`);
      setHeaderSearchQuery('');
      setIsSearchExpanded(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      id="main-site-header"
      className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all duration-200"
    >
      {/* Top micro announcement bar */}
      <div className="bg-[#1E1D1C] text-[#E5D7B7] text-[11px] py-1.5 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-2">
        <span>Complimentary Express Delivery on orders above ₹999</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline text-[#D4AF37]">Use code KRONOS10 for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Brand Logo */}
          <Link
            to="/"
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1E1D1C] text-[#FAF8F5] flex items-center justify-center shadow-xs group-hover:bg-[#B8860B] transition-colors duration-300">
              <BookOpen className="w-5 h-5 text-[#FAF8F5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E1D1C] group-hover:text-[#8E6503] transition-colors">
                KRONOS BOOKS
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C8275] -mt-0.5">
                Stories that stay with you
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#B8860B] font-semibold bg-[#FAF4E6]'
                      : 'text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Quick Search in header */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden lg:flex items-center"
            >
              <div
                className={`relative flex items-center transition-all duration-300 ${
                  isSearchExpanded ? 'w-64' : 'w-48'
                }`}
              >
                <Search className="absolute left-3 w-4 h-4 text-[#8C8275] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search title, author..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-[#F3EFEA] border border-transparent focus:border-[#B8860B] focus:bg-white text-[#1E1D1C] placeholder-[#8C8275] focus:outline-hidden transition-all"
                />
              </div>
            </form>

            {/* Mobile search trigger */}
            <button
              id="mobile-search-toggle"
              onClick={() => navigate('/books')}
              aria-label="Open search catalogue"
              className="lg:hidden p-2.5 rounded-full text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-button"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative p-2.5 rounded-full text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span
                  id="wishlist-badge"
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-75 duration-200"
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="header-cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2.5 rounded-full text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="cart-badge"
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B8860B] text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-75 duration-200"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              id="header-profile-button"
              onClick={() => setIsAccountOpen(true)}
              aria-label="User Account"
              className="p-2.5 rounded-full text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 rounded-lg text-[#524E48] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-[#E8E2D9] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Mobile search form */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#8C8275]" />
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#F3EFEA] border border-[#E8E2D9] focus:bg-white focus:border-[#B8860B] text-[#1E1D1C] placeholder-[#8C8275] outline-hidden"
            />
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FAF4E6] text-[#B8860B] font-semibold'
                      : 'text-[#1E1D1C] hover:bg-[#F3EFEA]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Quick utility drawer triggers */}
          <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-around text-xs font-medium text-[#524E48]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="flex items-center gap-1.5 p-2"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
            <span className="text-[#D5CBBF]">|</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex items-center gap-1.5 p-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#B8860B]" />
              <span>Cart ({cartCount})</span>
            </button>
            <span className="text-[#D5CBBF]">|</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAccountOpen(true);
              }}
              className="flex items-center gap-1.5 p-2"
            >
              <User className="w-4 h-4 text-[#1E1D1C]" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
