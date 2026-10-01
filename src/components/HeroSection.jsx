import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, MessageSquare, Compass } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000"
        style={{ backgroundImage: `url('/pexels-expect-best-79873-323780.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f16] via-[#0a1f16]/75 to-black/80" />
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Top Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-emerald-950/80 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-8 shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          <span>NIGERIA'S PREMIUM REAL ESTATE BRAND</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
          Find Your Perfect{' '}
          <span className="text-[#d4af37] italic font-normal block sm:inline">
            Property Today
          </span>
        </h1>

        {/* Subtext Description */}
        <p className="max-w-2xl text-lg sm:text-xl text-emerald-100/90 font-light leading-relaxed mb-10 drop-shadow">
          Browse premium listings across Nigeria and connect directly with a trusted real estate expert committed to delivering luxury, trust, and speed.
        </p>

        {/* Action Call buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          <a
            href="#properties"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-emerald-900 hover:bg-emerald-800 text-white px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase border border-emerald-700/60 shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>EXPLORE LISTINGS</span>
          </a>

          <Link
            to="/enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-black/50 hover:bg-black/80 text-white hover:text-[#d4af37] px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase border border-white/30 hover:border-[#d4af37]/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            <span>MESSAGE US</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[10px] tracking-widest text-emerald-200/80 uppercase mb-2">SCROLL DOWN</span>
          <div className="w-6 h-10 rounded-full border-2 border-emerald-500/40 flex justify-center p-1">
            <div className="w-1.5 h-3 bg-[#d4af37] rounded-full animate-bounce mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
