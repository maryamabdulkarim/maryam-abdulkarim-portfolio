import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Moon, Sun, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'Craft & Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Story', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 dark:bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="group flex items-baseline gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
        >
          <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 tracking-wider">
            / {PERSONAL_INFO.displayTitle}
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-200" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow-amber-400/20 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 bg-neutral-900/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-neutral-950/95 border-b border-neutral-800 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-200 hover:text-amber-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
