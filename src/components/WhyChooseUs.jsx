import React from 'react';
import { ShieldCheck, Zap, Award, Handshake } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Trusted Listings',
      description:
        'Every property on our platform has been personally vetted and verified for legal authenticity and clear ownership title.',
    },
    {
      icon: Zap,
      title: 'Fast Response',
      description:
        'We respond quickly to all enquiries. Our team is available and ready to connect you with top market opportunities immediately.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Properties',
      description:
        'All properties listed are physically inspected and confirmed — so what you see online is exactly what you get.',
    },
    {
      icon: Handshake,
      title: 'Professional Service',
      description:
        'From first enquiry to final handover, we deliver a professional, stress-free experience tailored to your budget and goals.',
    },
  ];

  return (
    <section id="why-us" className="bg-[#0f291e] text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Blur Circle */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-5 py-2 rounded-full border border-[#d4af37]/40 bg-emerald-950/60 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-4">
            OUR ADVANTAGES
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Why Choose <span className="text-[#d4af37] italic font-normal">Leovin Properties</span>
          </h2>
          <p className="text-emerald-100/80 text-base sm:text-lg">
            We stand out by offering a seamless property experience built on trust, transparency, and real results.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-emerald-950/70 border border-emerald-800/40 hover:border-[#d4af37]/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
              >
                {/* Circle Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-emerald-900/90 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6 group-hover:bg-[#d4af37] group-hover:text-emerald-950 transition-all duration-300 shadow-md">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-emerald-100/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
