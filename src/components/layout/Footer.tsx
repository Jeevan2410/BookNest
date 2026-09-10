import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast('Welcome to the newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-ink text-cream/80 mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Newsletter */}
        <div className="text-center mb-16 pb-16 border-b border-cream/10">
          <h3 className="font-serif text-3xl lg:text-4xl text-cream mb-3">Get bookish.</h3>
          <p className="text-cream/60 mb-6 max-w-md mx-auto">Monthly reading recommendations, author interviews, and stories worth sharing.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 rounded-full text-cream placeholder:text-cream/40 focus:outline-none focus:border-primary"
              required
            />
            <button type="submit" className="px-6 py-3 bg-primary text-cream font-medium rounded-full hover:bg-primary-dark transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h4 className="font-serif text-cream text-lg mb-4">Discover</h4>
            <ul className="space-y-2.5">
              <li><Link to="/books" className="text-sm hover:text-cream transition-colors">Books</Link></li>
              <li><Link to="/genres" className="text-sm hover:text-cream transition-colors">Genres</Link></li>
              <li><Link to="/books" className="text-sm hover:text-cream transition-colors">New Releases</Link></li>
              <li><Link to="/books" className="text-sm hover:text-cream transition-colors">Popular</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-cream text-lg mb-4">Membership</h4>
            <ul className="space-y-2.5">
              <li><Link to="/membership" className="text-sm hover:text-cream transition-colors">Join</Link></li>
              <li><Link to="/membership" className="text-sm hover:text-cream transition-colors">How It Works</Link></li>
              <li><Link to="/membership" className="text-sm hover:text-cream transition-colors">Pricing</Link></li>
              <li><Link to="/gifts" className="text-sm hover:text-cream transition-colors">Gifts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-cream text-lg mb-4">Help</h4>
            <ul className="space-y-2.5">
              <li><Link to="/faq" className="text-sm hover:text-cream transition-colors">FAQ</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-cream transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-cream transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-cream text-lg mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm hover:text-cream transition-colors">About</Link></li>
              <li><Link to="/" className="text-sm hover:text-cream transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-sm hover:text-cream transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-sm hover:text-cream transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream/10 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg text-cream">BookNest</span>
          </div>
          <p className="text-sm text-cream/40">© 2026 BookNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:text-cream transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:text-cream transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:text-cream transition-colors" aria-label="Made with love"><Heart className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
