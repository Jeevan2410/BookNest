import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setBoxDrawerOpen, mobileMenuOpen, setMobileMenuOpen, boxItems } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location, setMobileMenuOpen]);

  const navLinks = [
    { to: '/books', label: 'Books' },
    { to: '/membership', label: 'Membership' },
    { to: '/gifts', label: 'Gifts' },
    { to: '/genres', label: 'Genres' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with fox mascot */}
            <Link to="/" className="flex items-center gap-2 group">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="group-hover:scale-110 transition-transform">
                <ellipse cx="50" cy="55" rx="25" ry="28" fill="#B8432F" />
                <ellipse cx="50" cy="60" rx="18" ry="20" fill="#F5EDE0" />
                <path d="M 30 35 L 25 15 L 40 30 Z" fill="#B8432F" />
                <path d="M 70 35 L 75 15 L 60 30 Z" fill="#B8432F" />
                <circle cx="42" cy="50" r="3" fill="#1C1917" />
                <circle cx="58" cy="50" r="3" fill="#1C1917" />
                <circle cx="42" cy="50" r="6" stroke="#C9A876" strokeWidth="1.5" fill="none" />
                <circle cx="58" cy="50" r="6" stroke="#C9A876" strokeWidth="1.5" fill="none" />
                <line x1="48" y1="50" x2="52" y2="50" stroke="#C9A876" strokeWidth="1.5" />
              </svg>
              <span className="font-display text-xl font-semibold text-ink">BookNest</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-medium text-ink hover:text-terracotta transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBoxDrawerOpen(true)}
                className="relative w-10 h-10 bg-ink text-paper rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
                aria-label="Shopping box"
              >
                <ShoppingBag className="w-5 h-5" />
                {boxItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-mustard text-ink text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {boxItems.length}
                  </motion.span>
                )}
              </button>

              <Link
                to="/membership"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-paper font-medium rounded-full hover:bg-terracotta-light transition-colors"
              >
                Join the Club
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 bg-ink text-paper rounded-full flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-paper pt-20 lg:hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-display text-3xl font-semibold text-ink py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  to="/login"
                  className="block font-display text-xl text-ink-light py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex mt-4 px-8 py-4 bg-terracotta text-paper font-medium rounded-full"
                >
                  Join the Club
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
