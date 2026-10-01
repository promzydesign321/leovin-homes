import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Move, ArrowUpRight, Heart, Search } from 'lucide-react';

const OurPropertiesSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Villas', 'Apartments', 'Duplexes', 'Penthouses'];

  const properties = [
    {
      id: 1,
      title: 'Ocean View Villa',
      category: 'Villas',
      location: 'Lekki Phase 1, Lagos',
      price: '₦350,000,000',
      specs: { beds: 5, baths: 6, area: '750 sqm' },
      image: '/pexels-expect-best-79873-323780.jpg',
      badge: 'Featured',
    },
    {
      id: 2,
      title: 'Lakeside Luxury Retreat',
      category: 'Duplexes',
      location: 'Maitama, Abuja',
      price: '₦480,000,000',
      specs: { beds: 6, baths: 7, area: '920 sqm' },
      image: '/pexels-julia-kuzenkov-442028-1974596.jpg',
      badge: 'New Listing',
    },
    {
      id: 3,
      title: 'Beachfront Paradise Residence',
      category: 'Villas',
      location: 'Banana Island, Lagos',
      price: '₦850,000,000',
      specs: { beds: 6, baths: 8, area: '1,200 sqm' },
      image: '/pexels-robertkso-20296321.jpg',
      badge: 'Hot Deal',
    },
    {
      id: 4,
      title: 'Metro Skyline Penthouse',
      category: 'Penthouses',
      location: 'Victoria Island, Lagos',
      price: '₦290,000,000',
      specs: { beds: 3, baths: 4, area: '450 sqm' },
      image: '/pexels-vitaliy-haiduk-326720599-19760997.jpg',
      badge: 'Verified',
    },
    {
      id: 5,
      title: 'Contemporary Golf Estate',
      category: 'Villas',
      location: 'Jabi, Abuja',
      price: '₦410,000,000',
      specs: { beds: 5, baths: 5, area: '800 sqm' },
      image: '/pexels-artbovich-7031581.jpg',
      badge: 'Exclusive',
    },
    {
      id: 6,
      title: 'Cliffside Modern Smart Home',
      category: 'Apartments',
      location: 'Ikoyi, Lagos',
      price: '₦320,000,000',
      specs: { beds: 4, baths: 4, area: '520 sqm' },
      image: '/pexels-dextarstudio-15422346.jpg',
      badge: 'Premium',
    },
  ];

  const filteredProperties =
    activeCategory === 'All'
      ? properties
      : properties.filter((p) => p.category === activeCategory);

  return (
    <section id="properties" className="bg-[#f8f9fa] text-gray-900 py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-5 py-2 rounded-full border border-emerald-800/20 bg-emerald-900/5 text-emerald-900 text-xs font-semibold uppercase tracking-widest mb-4">
            OUR PORTFOLIO
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Featured <span className="text-[#b89228] italic font-normal">Property Listings</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Handpicked premium properties across Nigeria's most sought-after locations, vetted for legal integrity and architectural excellence.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#0f291e] text-[#d4af37] shadow-lg border border-[#d4af37]/40'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              {/* Card Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-[#d4af37] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#d4af37]/30">
                  {property.badge}
                </div>
                <button 
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 flex items-center justify-center transition-all duration-300 shadow"
                  aria-label="Save Property"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium block">Price</span>
                  <span className="text-lg font-serif font-bold text-emerald-950">
                    {property.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#b89228] mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-emerald-900 transition-colors mb-4 line-clamp-1">
                    {property.title}
                  </h3>
                </div>

                <div>
                  {/* Property Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-gray-50 rounded-xl mb-6 text-xs text-gray-600 border border-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center space-x-1 text-gray-800 font-semibold">
                        <Bed className="w-3.5 h-3.5 text-[#b89228]" />
                        <span>{property.specs.beds}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5">Beds</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-x border-gray-200">
                      <div className="flex items-center space-x-1 text-gray-800 font-semibold">
                        <Bath className="w-3.5 h-3.5 text-[#b89228]" />
                        <span>{property.specs.baths}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5">Baths</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center space-x-1 text-gray-800 font-semibold">
                        <Move className="w-3.5 h-3.5 text-[#b89228]" />
                        <span>{property.specs.area}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5">Area</span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    to="/enquiry"
                    className="w-full flex items-center justify-center space-x-2 bg-[#0f291e] hover:bg-emerald-900 text-white hover:text-[#d4af37] text-xs font-semibold py-3 rounded-xl transition-all duration-300 shadow-sm"
                  >
                    <span>View Property Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPropertiesSection;
