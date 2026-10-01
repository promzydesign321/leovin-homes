import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import OurPropertiesSection from './components/OurPropertiesSection';
import AboutUs from './components/AboutUs';
import WhyChooseUs from './components/WhyChooseUs';
import ClientReviews from './components/ClientReviews';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import EnquiryPage from './pages/EnquiryPage';
import AdminPage from './pages/AdminPage';

// ── Home page with all sections ──────────────────────────────────────────────
function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a1f16] text-emerald-50 selection:bg-[#d4af37] selection:text-black font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <OurPropertiesSection />
        <AboutUs />
        <WhyChooseUs />
        <ClientReviews />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}

// ── Root App with routing ────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
