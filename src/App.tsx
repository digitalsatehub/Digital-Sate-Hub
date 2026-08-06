import React, { useState, useEffect } from 'react';
import { NavigationPage } from './types';
import { recordPageView } from './lib/adminStore';

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
import { AdminPage } from './pages/AdminPage';

// Interactive Modals
import { BookingModal } from './components/BookingModal';
import { QuoteBuilderModal } from './components/QuoteBuilderModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#admin' || hash === '#joju' || path.includes('/admin') || path.includes('/joju')) {
      return 'admin';
    }
    return 'home';
  });

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  // Record real analytics page view & scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage !== 'admin') {
      recordPageView(currentPage);
    }
  }, [currentPage]);

  // Listen for URL changes (#joju, #admin, /joju, /admin) and secret key sequence 'joju'
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#joju' || path.endsWith('/admin') || path.endsWith('/joju') || path.includes('/joju') || path.includes('/admin')) {
        setCurrentPage('admin');
      }
    };

    window.addEventListener('hashchange', checkUrlForAdmin);
    window.addEventListener('popstate', checkUrlForAdmin);

    // Secret keyword listener: typing 'joju' triggers admin page
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }
      if (keyBuffer.includes('joju')) {
        keyBuffer = '';
        setCurrentPage('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('popstate', checkUrlForAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-[#070219] font-sans text-white">
        <AdminPage onNavigate={handleNavigate} />
      </div>
    );
  }

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
