import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// BookNest Logo SVG - playful aardvark-inspired mascot
function Logo() {
  return (
    <svg viewBox="0 0 80 80" className="w-10 h-10" fill="none">
      <circle cx="40" cy="40" r="38" fill="#1A1A1A" />
      <path fill="#F9A220" d="m53.332 55.909-9.81-22.05c1.253-3.071 4.434-12.573 1.132-24.425a.845.845 0 0 0-.602-.6.82.82 0 0 0-.82.24c-.096.12-2.651 2.711-4.507 6.19-2.58 4.799-2.531 8.854.12 11.78 2.917 3.192 3.062 5.423 2.893 6.431l-.555.048c-.988-2.111-4.29-8.062-12.51-13.82a.734.734 0 0 0-.698-.072c-.242.096-.386.336-.41.576-.314 3.839.723 11.3 6.893 12.212 3.881.576 5.183 1.68 5.593 2.136-.121.816-.41 1.871-.989 3.239l-7.28 16.651h-.023a1.456 1.456 0 0 1-.12.288l-.097.192c-1.157 2.471-5.327 6.766-6.99 8.446-.41.431-.7.72-.796.84-.096.12-.385.575.169 1.175.771.84 3.182 1.895 4.315 1.104.337-.24.53-.48.747-.768.627-.816 4.001-4.559 9.424-9.261 0 0 1.76-2.184 4.435-2.52h1.616c1.205 0 2.169.288 2.723 1.512l.892 2.04c.844 1.943.844 2.998-2 3.454v1.296h11.642v-1.248c-2.363-.432-2.869-1.727-4.387-5.086Zm-13.233-7.27a2.284 2.284 0 0 1-2.29-2.28 2.284 2.284 0 0 1 2.29-2.279 2.284 2.284 0 0 1 2.29 2.28c0 1.247-1.037 2.279-2.29 2.279Z" />
      <path fill="#F9A220" fillRule="evenodd" d="M40.922 0C63.522 0 80 18.401 80 41.1 80 63.8 63.522 80 40.922 80S0 63.8 0 41.1C0 18.402 18.321 0 40.922 0Zm22.857 15.697c-13.817-13.474-36.234-13.754-49.77 0C.473 29.45 2.035 50.379 15.852 63.853 29.67 77.327 52.823 79.81 66.36 66.055c13.537-13.754 11.237-36.884-2.58-50.358Z" clipRule="evenodd" />
    </svg>
  );
}

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
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Logo />
              <span className="font-display text-xl font-black text-ink">BookNest</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-display text-base font-bold text-ink hover:text-pink-bright transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBoxDrawerOpen(true)}
                className="relative w-10 h-10 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
                aria-label="Shopping box"
              >
                <ShoppingBag className="w-5 h-5" />
                {boxItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-yellow text-ink text-[10px] font-black rounded-full flex items-center justify-center"
                  >
                    {boxItems.length}
                  </motion.span>
                )}
              </button>

              <Link
                to="/membership"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-yellow text-ink font-bold rounded-full hover:bg-yellow/90 transition-colors"
              >
                Join the Club
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 bg-ink text-cream rounded-full flex items-center justify-center"
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
            className="fixed inset-0 z-40 bg-yellow pt-20 lg:hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-display text-3xl font-black text-ink py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  to="/login"
                  className="block font-display text-xl text-ink/60 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex mt-4 px-8 py-4 bg-ink text-cream font-bold text-lg rounded-full"
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
