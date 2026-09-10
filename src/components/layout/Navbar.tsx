import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setSearchOpen, setBoxDrawerOpen, setMobileMenuOpen, mobileMenuOpen, boxItems, user } = useApp();
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
    { to: '/#how-it-works', label: 'How It Works' },
    { to: '/membership', label: 'Membership' },
    { to: '/gifts', label: 'Gifts' },
    { to: '/genres', label: 'Genres' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <BookOpen className="w-6 h-6 text-primary transition-transform group-hover:rotate-[-8deg]" />
              <span className="font-serif text-xl font-bold text-ink">BookNest</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-ink-light hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-cream-dark transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-ink-light" />
              </button>

              <Link
                to={user ? '/account' : '/login'}
                className="p-2 rounded-full hover:bg-cream-dark transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-ink-light" />
              </Link>

              <button
                onClick={() => setBoxDrawerOpen(true)}
                className="p-2 rounded-full hover:bg-cream-dark transition-colors relative"
                aria-label="Shopping box"
              >
                <ShoppingBag className="w-5 h-5 text-ink-light" />
                {boxItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {boxItems.length}
                  </motion.span>
                )}
              </button>

              <Link
                to="/membership"
                className="hidden sm:inline-flex px-4 py-2 bg-ink text-cream text-sm font-medium rounded-full hover:bg-primary transition-colors"
              >
                Join the Club
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-cream-dark transition-colors"
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
            className="fixed inset-0 z-40 bg-cream pt-20 lg:hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-2xl font-serif text-ink hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-border">
                <Link
                  to="/login"
                  className="block text-lg text-ink-light py-2"
                >
                  {user ? 'My Account' : 'Sign In'}
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex mt-4 px-6 py-3 bg-ink text-cream font-medium rounded-full"
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
