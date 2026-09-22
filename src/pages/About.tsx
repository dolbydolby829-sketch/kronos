import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Award,
  Users,
  Share2,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us — Kronos Books';
  }, []);

  const values = [
    {
      title: 'Curiosity',
      description: 'We believe every great question deserves exploration.',
      icon: Compass,
    },
    {
      title: 'Quality',
      description: 'We carefully curate books that offer lasting value.',
      icon: Award,
    },
    {
      title: 'Accessibility',
      description: 'Reading should feel welcoming to everyone.',
      icon: Users,
    },
    {
      title: 'Community',
      description: 'Books become more meaningful when ideas are shared.',
      icon: Share2,
    },
  ];

  const timeline = [
    {
      year: '2022',
      title: 'The Idea',
      description:
        'Conceived as an intellectual sanctuary for bibliophiles seeking curated non-fiction and enduring classics.',
    },
    {
      year: '2023',
      title: 'First Collection',
      description:
        'Launched with 150 meticulously vetted titles across philosophy, human psychology, and modern business.',
    },
    {
      year: '2025',
      title: 'Digital Expansion',
      description:
        'Scaled high-speed logistics and reading circles across South Asia with localized editorial curation.',
    },
    {
      year: '2026',
      title: 'Kronos Books',
      description:
        'Unveiled our premier modern bookstore platform, combining editorial craftsmanship with instant digital cataloguing.',
    },
  ];

  const statistics = [
    { value: '20+', label: 'Categories' },
    { value: '1000+', label: 'Books planned' },
    { value: '10K+', label: 'Readers' },
    { value: '24/7', label: 'Online access' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. HERO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4E6] border border-[#E8DFC8] text-xs font-semibold text-[#8E6503] shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Our Ethos & Heritage</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1E1D1C] leading-tight">
          More Than a Bookstore.
        </h1>

        <p className="font-serif italic text-lg sm:text-2xl text-[#6B6864] max-w-2xl mx-auto leading-relaxed">
          "Kronos Books was created for people who believe that a good book can change the way you see the world."
        </p>
      </section>

      {/* 2. OUR STORY & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-xs">
          {/* Left: Editorial narrative */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[#B8860B]">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C]">
                Crafting a sanctuary for deliberate readers.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
              Kronos Books is a modern digital bookstore focused on making quality reading accessible. In an age dominated by 15-second distractions, algorithmic noise, and sensationalist feeds, we stand firmly for slow thought, deep comprehension, and timeless books.
            </p>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8E6503]">
                Our Mission
              </span>
              <p className="font-serif text-base sm:text-lg italic text-[#1E1D1C] leading-snug">
                "To connect readers with books that inform, inspire and stay with them long after the final page."
              </p>
            </div>
          </div>

          {/* Right: Architectural / editorial photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#222]">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200"
              alt="Kronos Books Reading Archive"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs italic">
              "A room without books is like a body without a soul." — Cicero
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="bg-[#F3EFEA] py-16 border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C] mt-1">
              Our Values
            </h2>
            <p className="text-sm text-[#6B6864] mt-2">
              The foundational commitments that shape our catalog, customer care, and publishing partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1E1D1C]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#524E48] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D1C] mt-1">
            Milestones of Growth
          </h2>
        </div>

        <div className="relative border-l-2 border-[#D5CBBF] ml-4 sm:ml-32 space-y-10 py-4">
          {timeline.map((item) => (
            <div key={item.year} className="relative pl-6 sm:pl-8 group">
              {/* Year marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-[#B8860B] group-hover:scale-125 transition-transform" />
              <span className="sm:absolute sm:-left-28 sm:top-1 font-serif text-sm font-bold text-[#B8860B] tracking-wider block sm:inline mb-1 sm:mb-0">
                {item.year}
              </span>

              <div className="bg-white rounded-xl p-5 border border-[#E8E2D9] shadow-xs space-y-1">
                <h3 className="font-serif text-base font-bold text-[#1E1D1C]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#524E48] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATISTICS */}
      <section className="bg-[#FAF4E6] py-14 border-y border-[#E8DFC8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <span className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1D1C]">
                  {stat.value}
                </span>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#8E6503]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA: START EXPLORING */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pb-6">
        <div className="bg-[#1E1D1C] text-[#FAF8F5] rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden space-y-5">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-lg mx-auto">
            Ready to find your next great read?
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D3CB] max-w-md mx-auto">
            Browse our carefully catalogued editions with fast, nationwide delivery and genuine book lover service.
          </p>
          <div className="pt-2">
            <Link
              to="/books"
              id="about-cta-start-exploring-btn"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FAF8F5] text-[#1E1D1C] hover:bg-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-98"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 text-[#B8860B]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
