import React from 'react';
import { Home, Phone, Mail, MapPin, ArrowRight, Globe, Share2, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-emerald-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="space-y-6">
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                Leovin <span className="text-[#d4af37] italic font-normal">Properties</span>
              </span>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Nigeria's premier luxury real estate agency. Specialising in verified high-end residential listings, architectural marvels, and prime land investments across Lagos & Abuja.
            </p>
            <div className="flex items-center space-x-3">
              {[Globe, Share2, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black text-gray-300 flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#d4af37] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-white transition-colors">Featured Listings</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Leovin Properties</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Client Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Our Team</a>
              </li>
            </ul>
          </div>

          {/* Prime Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#d4af37] uppercase tracking-wider">
              Prime Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>Banana Island, Ikoyi</li>
              <li>Lekki Phase 1, Lagos</li>
              <li>Victoria Island, Lagos</li>
              <li>Maitama District, Abuja</li>
              <li>Jabi & Asokoro, Abuja</li>
              <li>Eko Atlantic City</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#d4af37] uppercase tracking-wider">
              Exclusive VIP Updates
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get first access to off-market luxury listings and prime investment insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#d4af37] hover:bg-yellow-500 text-black px-3 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Leovin Properties. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
