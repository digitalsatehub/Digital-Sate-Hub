import React, { useState, useEffect } from 'react';
import { NavigationPage } from '../types';
import { LOGO_URL } from '../data/siteData';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (currentY > 70) {
        if (currentY > lastScrollY) {
          // Scrolling down: collapse navigation items so only the logo remains visible
          setIsScrollingDown(true);
        } else {
          // Scrolling up: expand full header with navigation items
          setIsScrollingDown(false);
        }
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { label: string; page: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact Us', page: 'contact' }
  ];

  const handleNavClick = (page: string) => {
    if (page === 'services') {
      if (currentPage === 'home') {
        const servicesEl = document.getElementById('services');
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onNavigate('home');
        setTimeout(() => {
          const servicesEl = document.getElementById('services');
          if (servicesEl) {
            servicesEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else {
      onNavigate(page as NavigationPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex flex-col items-center justify-center px-4 pointer-events-none">
      {/* Single Unified Centered Floating Pill Container */}
      <div
        className={`pointer-events-auto bg-[#12063B]/90 sm:bg-[#140845]/85 backdrop-blur-xl border border-white/15 rounded-full px-4 sm:px-6 py-2 shadow-2xl shadow-black/60 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 transition-all duration-500 ease-in-out ${
          scrolled ? 'bg-[#12063B]/95 border-indigo-400/30 py-1.5' : ''
        }`}
      >
        {/* Brand Logo - Always visible inside the pill */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          id="nav-logo-button"
        >
          <div className="relative bg-white/5 p-1 rounded-lg border border-white/10 group-hover:border-indigo-400/50 transition-all duration-300">
            <img
              src={LOGO_URL}
              alt="Digital Sate Hub Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-left hidden xs:block">
            <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white block leading-none">
              DIGITAL SATE HUB
            </span>
            <span className="text-[8px] font-semibold text-indigo-300 tracking-wider uppercase block mt-0.5">
              Automations
            </span>
          </div>
        </button>

        {/* Navigation Menu Section - Collapses smoothly when scrolling down, leaving only the logo */}
        <div
          className={`hidden lg:flex items-center transition-all duration-500 ease-in-out overflow-hidden ${
            isScrollingDown
              ? 'max-w-0 opacity-0 pointer-events-none scale-95'
              : 'max-w-2xl opacity-100 scale-100'
          }`}
        >
          <div className="w-px h-5 bg-white/15 mx-3" />
          <nav className="flex items-center gap-1 whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-item-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1817B6] text-white shadow-md shadow-indigo-600/40 font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Toggle - Collapses when scrolling down as well */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isScrollingDown ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-xs opacity-100 ml-2'
          }`}
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Card */}
      {mobileMenuOpen && !isScrollingDown && (
        <div className="pointer-events-auto lg:hidden bg-[#12063B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 mt-2 max-w-sm w-full shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    handleNavClick(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1817B6] text-white font-bold'
                      : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

