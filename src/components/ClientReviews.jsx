import React from 'react';
import { Star, Quote } from 'lucide-react';

const ClientReviews = () => {
  const reviews = [
    {
      id: 1,
      quote:
        "Leovin Properties made my property search seamless. I found my dream home in Lekki within two weeks. Exceptional service and total transparency!",
      name: 'Adaeze Okeke',
      role: 'Homeowner, Lagos',
      initial: 'A',
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Incredibly professional team. They guided me through the entire purchase process with complete transparency and legal diligence. Highly recommend!",
      name: 'Emmanuel Uche',
      role: 'Property Investor, Abuja',
      initial: 'E',
      rating: 5,
    },
    {
      id: 3,
      quote:
        "The listings are genuinely verified. I visited three properties and all matched exactly what was advertised online. Brilliant experience overall.",
      name: 'Fatima Aliyu',
      role: 'First-time Buyer, Lagos',
      initial: 'F',
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="bg-[#f8f9fa] text-gray-900 py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-5 py-2 rounded-full border border-emerald-800/20 bg-emerald-900/5 text-emerald-900 text-xs font-semibold uppercase tracking-widest mb-4">
            CLIENT REVIEWS
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight mb-4">
            What Our <span className="text-[#b89228] italic font-normal">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Hear from our awesome satisfied clients who found their ideal properties through Leovin Properties.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-900/10 group-hover:text-[#b89228]/20 transition-colors" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 mb-6 text-[#b89228]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-8">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-[#0f291e] text-[#d4af37] font-bold text-base flex items-center justify-center border border-[#d4af37]/30 shadow-inner">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-gray-900">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
