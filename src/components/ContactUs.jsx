import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Buying',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-white text-gray-900 py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0f291e] rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-b from-emerald-950 to-[#0f291e] text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-emerald-800/40 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-emerald-900/60 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-6">
                GET IN TOUCH
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                Let's Find Your <span className="text-[#d4af37] italic font-normal">Dream Home</span>
              </h2>

              <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed mb-8">
                Have questions about a property or looking to list your estate? Connect directly with our property advisors today.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200/60 font-medium block">Phone Number</span>
                    <a href="tel:+2348000000000" className="text-sm sm:text-base font-semibold text-white hover:text-[#d4af37] transition-colors">
                      +234 800 LEOVIN (536846)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200/60 font-medium block">Email Address</span>
                    <a href="mailto:info@leovinproperties.com" className="text-sm sm:text-base font-semibold text-white hover:text-[#d4af37] transition-colors">
                      enquiries@leovinproperties.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200/60 font-medium block">Headquarters</span>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-emerald-800/40 text-xs text-emerald-200/50 mt-8">
              <span>Working Hours: Mon - Sat: 8:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex flex-col justify-center">
            {formSubmitted ? (
              <div className="text-center py-12 px-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Leovin Properties. One of our dedicated real estate advisors will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Send Us A Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Enquiry Purpose
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all"
                    >
                      <option value="Buying">Buying a Property</option>
                      <option value="Selling">Selling a Property</option>
                      <option value="Renting">Renting / Leasing</option>
                      <option value="Investment">Real Estate Investment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#0f291e] hover:bg-emerald-900 text-white hover:text-[#d4af37] font-semibold text-xs py-4 rounded-xl uppercase tracking-widest shadow-lg transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
