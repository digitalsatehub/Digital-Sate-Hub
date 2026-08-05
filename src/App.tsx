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
import { FeaturedBlogSection } from './components/FeaturedBlogSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';

// Subpages
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

// Interactive Modals
import { BookingModal } from './components/BookingModal';
import { QuoteBuilderModal } from './components/QuoteBuilderModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
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

            {/* 4. Services Grid (Arranged in clean Why Choose Us layout) */}
            <WhyChooseUs onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 5. Text Reviews (Sticky Stacking Cards) */}
            <VideoTestimonials onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 6. Featured Portfolio Section (Pure Image Mockups) */}
            <FeaturedPortfolioSection
              onNavigate={handleNavigate}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* 7. Featured Blog Section (3 Posts linking to Blog Page) */}
            <FeaturedBlogSection onNavigate={handleNavigate} />

            {/* 8. Frequently Asked Questions */}
            <FAQSection onOpenBooking={() => setIsBookingOpen(true)} />
          </>
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}
      </main>

      {/* Final Call-to-Action (rendered on every page EXCEPT Contact) */}
      {currentPage !== 'contact' && (
        <FinalCTASection
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenQuote={() => setIsQuoteOpen(true)}
        />
      )}

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
      />

      <LegalModals
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}
