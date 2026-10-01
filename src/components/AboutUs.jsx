import React from 'react';
import { CheckCircle2, ShieldCheck, Award, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="bg-white text-gray-900 py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
              <img
                src="/pexels-abdullah-asad-154796132-12359215.jpg"
                alt="Leovin Properties Luxury Real Estate"
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* Overlapping secondary image */}
            <div className="absolute -bottom-8 -right-6 z-20 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
              <img
                src="/pexels-dextarstudio-15422346.jpg"
                alt="Modern Interior"
                className="w-full h-56 object-cover"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -left-6 z-30 bg-[#0f291e] text-white p-6 rounded-2xl shadow-xl border border-[#d4af37]/40 flex items-center space-x-4">
              <span className="text-4xl font-serif font-bold text-[#d4af37]">5+</span>
              <div className="text-xs tracking-wider uppercase font-semibold text-emerald-100">
                <span>Years of</span>
                <span className="block text-[#d4af37]">Excellence</span>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-5 py-2 rounded-full border border-emerald-800/20 bg-emerald-900/5 text-emerald-900 text-xs font-semibold uppercase tracking-widest">
              ABOUT US
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
              We Are <span className="text-[#b89228] italic font-normal">Leovin Properties</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At Leovin Properties, we help clients find quality properties across Nigeria with ease, trust, and speed. Whether you are buying your first home or expanding your real estate portfolio, our team of dedicated professionals is committed to guiding you every step of the way.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We specialise in premium residential properties across Lagos, Abuja, and other key Nigerian cities — ensuring every listing is verified, every negotiation is transparent, and every client leaves satisfied.
            </p>

            {/* Value Checkpoints */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-emerald-950 font-bold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                </div>
                <span className="text-base font-semibold text-gray-800">
                  Verified & Trusted Listings
                </span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-emerald-950 font-bold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                </div>
                <span className="text-base font-semibold text-gray-800">
                  End-to-End Client Support
                </span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-emerald-950 font-bold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                </div>
                <span className="text-base font-semibold text-gray-800">
                  Fast, Transparent Deals
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
