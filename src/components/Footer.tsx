import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Clock, Instagram, Twitter, Facebook, Linkedin, ShieldCheck, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-site-footer" className="bg-[#181716] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2D2A26]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
              <div className="w-10 h-10 rounded-lg bg-[#B8860B] text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  KRONOS BOOKS
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8D3CB] -mt-0.5">
                  Stories that stay with you
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#B5AEA4] leading-relaxed max-w-sm">
              Kronos Books is a premier modern digital bookstore dedicated to connecting curious readers with transformative fiction, timeless literature, empowering finance, and deep philosophy.
            </p>

            <div className="flex items-center space-x-3 pt-2 text-[#D8D3CB]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#262422] flex items-center justify-center hover:bg-[#B8860B] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#262422] flex items-center justify-center hover:bg-[#B8860B] hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#262422] flex items-center justify-center hover:bg-[#B8860B] hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#262422] flex items-center justify-center hover:bg-[#B8860B] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#FAF8F5] tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#B5AEA4]">
              <li>
                <Link to="/" className="hover:text-[#E6CA65] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-[#E6CA65] transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#E6CA65] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E6CA65] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E6CA65] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#FAF8F5] tracking-wider uppercase">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#B5AEA4]">
              <li>
                <Link to="/books?category=Self%20Development" className="hover:text-[#E6CA65] transition-colors">
                  Self Development
                </Link>
              </li>
              <li>
                <Link to="/books?category=Fiction" className="hover:text-[#E6CA65] transition-colors">
                  Fiction & Classics
                </Link>
              </li>
              <li>
                <Link to="/books?category=Finance" className="hover:text-[#E6CA65] transition-colors">
                  Finance & Wealth
                </Link>
              </li>
              <li>
                <Link to="/books?category=Business" className="hover:text-[#E6CA65] transition-colors">
                  Business & Startups
                </Link>
              </li>
              <li>
                <Link to="/books?category=Science" className="hover:text-[#E6CA65] transition-colors">
                  Science & Technology
                </Link>
              </li>
              <li>
                <Link to="/books?category=Fantasy" className="hover:text-[#E6CA65] transition-colors">
                  Fantasy & Epics
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#FAF8F5] tracking-wider uppercase">
              Online Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5AEA4]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B8860B] shrink-0" />
                <a href="mailto:support@kronosbooks.com" className="hover:text-[#E6CA65] transition-colors">
                  support@kronosbooks.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>Mon – Sat, 9:00 AM – 7:00 PM IST</span>
              </li>
              <li className="pt-2 text-[11px] text-[#A69E92] leading-relaxed">
                Prompt digital support for all readers and orders worldwide.
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Project Badge Banner */}
        <div className="py-4 border-b border-[#2D2A26] flex flex-wrap items-center justify-between gap-3 text-xs text-[#B5AEA4]">
          <div className="flex items-center gap-2 text-[#E6CA65] font-medium tracking-wide">
            <GraduationCap className="w-4 h-4 text-[#E6CA65]" />
            <span>KRONOS BOOKS • BCA Practical Project • 2026</span>
          </div>
          <span className="text-[11px] text-[#8C8275]">
            Developed for BCA Practical Examination
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E978C]">
          <p>© 2026 Kronos Books. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-[#C5BDB2]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verified Academic Demonstration Project
            </span>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms & Privacy
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
