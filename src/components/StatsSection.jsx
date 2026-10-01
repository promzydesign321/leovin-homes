import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '200+', label: 'PROPERTIES SOLD' },
    { value: '98%', label: 'CLIENT SATISFACTION' },
    { value: '5+', label: 'YEARS EXPERIENCE' },
    { value: '50+', label: 'VERIFIED LISTINGS' },
  ];

  return (
    <section className="bg-[#0f291e] border-y border-[#d4af37]/20 py-12 relative z-20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/20">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center ${idx !== 0 ? 'pt-6 md:pt-0' : ''}`}>
              <span className="text-3xl sm:text-5xl font-serif font-bold text-[#d4af37] tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-100/80 tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
