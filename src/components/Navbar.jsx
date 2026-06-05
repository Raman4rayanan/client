import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Activities', href: '#activities' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll to switch from transparent to solid background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          key="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
          className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-gradient-to-r from-[rgb(3,5,42)] via-[rgb(2,58,81)] to-[rgb(12,91,106)] backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
            }`}
        >
          <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between h-24">

            {/* Logo */}
            <a href="#" onClick={() => setMobileOpen(false)} className="py-2 shrink-0 -translate-x-2 md:-translate-x-4">
              <img src="/logo.png" alt="CTS Logo" className="h-12 md:h-20 lg:h-24 w-auto object-contain origin-left object-left" />
            </a>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium tracking-[0.3px] normal-case antialiased text-white/80 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
              <div className="flex items-center gap-6">
                <a
                  href="#shop"
                  className="cta-button px-5 py-2.5 bg-[#04667b] hover:bg-[#2796a9] text-white text-sm font-semibold tracking-[0.3px] normal-case antialiased rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(6,53,67,0.4)] hover:shadow-[0_0_20px_rgba(6,53,67,0.8)] hover:-translate-y-0.5 transform"
                >
                  Shop Now
                </a>
                <button
                  aria-label="Profile"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2796a9]/20 text-white border border-white/20 hover:border-[#2796a9] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(39,150,169,0.3)] cursor-pointer"
                >
                  <User size={18} />
                </button>
              </div>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-primary-navy/98 backdrop-blur-md border-t border-white/10"
              >
                <nav className="flex flex-col px-6 py-4 gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium tracking-[0.3px] normal-case antialiased text-white/80 hover:text-white py-2 border-b border-white/5 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href="#shop"
                      onClick={() => setMobileOpen(false)}
                      className="cta-button flex-1 px-5 py-3 bg-[#063543] hover:bg-[#052b36] text-white text-sm font-semibold tracking-[0.3px] normal-case antialiased rounded-lg text-center transition-all duration-300 shadow-[0_0_10px_rgba(6,53,67,0.4)] hover:shadow-[0_0_20px_rgba(6,53,67,0.8)]"
                    >
                      Shop Now
                    </a>
                    <button
                      aria-label="Profile"
                      onClick={() => setMobileOpen(false)}
                      className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      <User size={20} />
                    </button>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
