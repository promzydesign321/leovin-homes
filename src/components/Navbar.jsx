import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, PhoneCall } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'LISTINGS', href: '#properties' },
    { name: 'ABOUT', href: '#about' },
    { name: 'WHY US', href: '#why-us' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'CONTACT US', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-emerald-900/80 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform duration-300">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white">
            Leovin <span className="text-[#d4af37] italic font-normal">Properties</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-gray-200 hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/enquiry"
            className="flex items-center space-x-2 bg-emerald-800/80 hover:bg-[#d4af37] text-white hover:text-black text-xs font-semibold px-5 py-2.5 rounded-full border border-[#d4af37]/50 transition-all duration-300 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Enquire Now</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#d4af37] focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-200 hover:text-[#d4af37] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/enquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-block w-full text-center bg-[#d4af37] text-black font-semibold text-sm py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
