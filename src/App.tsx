import React, { useState, useEffect } from 'react';
import { NavigationPage } from './types';

// Global Header & Footer
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Homepage Sections
import { HeroSection } from './components/HeroSection';
import { SocialProofCounters } from './components/SocialProofCounters';
import { AboutUsSection } from './components/AboutUsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VideoTestimonials } from './components/VideoTestimonials';
import { FeaturedPortfolioSection } from './components/FeaturedPortfolioSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';

// Subpages
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

// Interactive Modals
import { BookingModal } from './components/BookingModal';
import { QuoteBuilderModal } from './components/QuoteBuilderModal';
import { LegalModals } from './components/LegalModals';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#12063B] font-sans text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      
      {/* Persistent Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section with Autoplay Reel */}
            <HeroSection
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenQuote={() => setIsQuoteOpen(true)}
              onNavigatePortfolio={() => handleNavigate('portfolio')}
            />

            {/* 2. Social Proof (Continuous Partner Logos Stream) */}
            <SocialProofCounters />

            {/* 3. About Us Section */}
            <AboutUsSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 4. Why Choose Us (Differentiators) */}
            <WhyChooseUs onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 5. Text Reviews (Sticky Stacking Cards) */}
            <VideoTestimonials onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 6. Featured Portfolio Section */}
            <FeaturedPortfolioSection
              onNavigate={handleNavigate}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* 7. Frequently Asked Questions */}
            <FAQSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 8. Final Call-to-Action */}
            <FinalCTASection
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />
          </>
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'testimonials' && (
          <TestimonialsPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'blog' && <BlogPage />}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <QuoteBuilderModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        onOpenBooking={() => {
          setIsQuoteOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <LegalModals
        type={legalType}
        onClose={() => setLegalType(null)}
      />

      {/* Bottom Page Ambient Backdrop Blur Overlay Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 sm:h-12 pointer-events-none bg-gradient-to-t from-[#0a0322]/80 via-[#0a0322]/20 to-transparent backdrop-blur-sm z-30" />

    </div>
  );
}

export default App;
