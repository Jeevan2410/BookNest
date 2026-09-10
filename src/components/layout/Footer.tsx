import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast('Welcome to the club!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-ink text-paper">
      {/* Newsletter */}
      <div className="bg-terracotta py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h3 className="font-display text-4xl lg:text-5xl font-semibold text-paper mb-3">Stay in the loop</h3>
          <p className="text-paper/80 mb-6 max-w-md mx-auto">New books, reading challenges, and stories worth sharing. No spam, just good reads.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 bg-paper border-2 border-paper rounded-full text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold"
              required
            />
            <button type="submit" className="px-6 py-3 bg-ink text-paper font-medium rounded-full hover:bg-ink-light transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Discover</h4>
            <ul className="space-y-2.5">
              <li><Link to="/books" className="text-sm text-paper/70 hover:text-paper transition-colors">Books</Link></li>
              <li><Link to="/genres" className="text-sm text-paper/70 hover:text-paper transition-colors">Genres</Link></li>
              <li><Link to="/books" className="text-sm text-paper/70 hover:text-paper transition-colors">New Releases</Link></li>
              <li><Link to="/books" className="text-sm text-paper/70 hover:text-paper transition-colors">Popular</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Membership</h4>
            <ul className="space-y-2.5">
              <li><Link to="/membership" className="text-sm text-paper/70 hover:text-paper transition-colors">Join</Link></li>
              <li><Link to="/membership" className="text-sm text-paper/70 hover:text-paper transition-colors">How It Works</Link></li>
              <li><Link to="/membership" className="text-sm text-paper/70 hover:text-paper transition-colors">Pricing</Link></li>
              <li><Link to="/gifts" className="text-sm text-paper/70 hover:text-paper transition-colors">Gifts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Help</h4>
            <ul className="space-y-2.5">
              <li><Link to="/faq" className="text-sm text-paper/70 hover:text-paper transition-colors">FAQ</Link></li>
              <li><Link to="/faq" className="text-sm text-paper/70 hover:text-paper transition-colors">Shipping</Link></li>
              <li><Link to="/faq" className="text-sm text-paper/70 hover:text-paper transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-paper/70 hover:text-paper transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-paper/70 hover:text-paper transition-colors">About</Link></li>
              <li><Link to="/" className="text-sm text-paper/70 hover:text-paper transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-sm text-paper/70 hover:text-paper transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-sm text-paper/70 hover:text-paper transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-paper/10 gap-4">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
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
            <span className="font-display text-xl font-semibold text-paper">BookNest</span>
          </div>
          <p className="text-sm text-paper/40">© 2026 BookNest. Made for readers, by readers.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 bg-paper/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors text-sm font-bold">IG</a>
            <a href="#" className="w-8 h-8 bg-paper/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors text-sm font-bold">TW</a>
            <a href="#" className="w-8 h-8 bg-paper/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors text-sm font-bold">TT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
