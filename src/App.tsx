import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { SmoothScrollProvider } from './hooks/useSmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/ui/SearchModal';
import BoxDrawer from './components/ui/BoxDrawer';
import ToastContainer from './components/ui/Toast';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import BoxPage from './pages/BoxPage';
import MembershipPage from './pages/MembershipPage';
import GiftsPage from './pages/GiftsPage';
import GenresPage from './pages/GenresPage';
import FAQPage from './pages/FAQPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import AccountPage from './pages/AccountPage';
import { CheckoutPage, CheckoutSuccessPage } from './pages/CheckoutPages';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/books" element={<PageTransition><BooksPage /></PageTransition>} />
          <Route path="/books/:id" element={<PageTransition><BookDetailPage /></PageTransition>} />
          <Route path="/box" element={<PageTransition><BoxPage /></PageTransition>} />
          <Route path="/membership" element={<PageTransition><MembershipPage /></PageTransition>} />
          <Route path="/gifts" element={<PageTransition><GiftsPage /></PageTransition>} />
          <Route path="/genres" element={<PageTransition><GenresPage /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
          <Route path="/account" element={<PageTransition><AccountPage /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
          <Route path="/checkout/success" element={<PageTransition><CheckoutSuccessPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <SearchModal />
      <BoxDrawer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SmoothScrollProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </SmoothScrollProvider>
    </HashRouter>
  );
}
