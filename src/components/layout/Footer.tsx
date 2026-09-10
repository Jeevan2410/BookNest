import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function FooterLogo() {
  return (
    <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none">
      <circle cx="40" cy="40" r="38" fill="#F9A220" />
      <path fill="#1A1A1A" d="m53.332 55.909-9.81-22.05c1.253-3.071 4.434-12.573 1.132-24.425a.845.845 0 0 0-.602-.6.82.82 0 0 0-.82.24c-.096.12-2.651 2.711-4.507 6.19-2.58 4.799-2.531 8.854.12 11.78 2.917 3.192 3.062 5.423 2.893 6.431l-.555.048c-.988-2.111-4.29-8.062-12.51-13.82a.734.734 0 0 0-.698-.072c-.242.096-.386.336-.41.576-.314 3.839.723 11.3 6.893 12.212 3.881.576 5.183 1.68 5.593 2.136-.121.816-.41 1.871-.989 3.239l-7.28 16.651h-.023a1.456 1.456 0 0 1-.12.288l-.097.192c-1.157 2.471-5.327 6.766-6.99 8.446-.41.431-.7.72-.796.84-.096.12-.385.575.169 1.175.771.84 3.182 1.895 4.315 1.104.337-.24.53-.48.747-.768.627-.816 4.001-4.559 9.424-9.261 0 0 1.76-2.184 4.435-2.52h1.616c1.205 0 2.169.288 2.723 1.512l.892 2.04c.844 1.943.844 2.998-2 3.454v1.296h11.642v-1.248c-2.363-.432-2.869-1.727-4.387-5.086Zm-13.233-7.27a2.284 2.284 0 0 1-2.29-2.28 2.284 2.284 0 0 1 2.29-2.279 2.284 2.284 0 0 1 2.29 2.28c0 1.247-1.037 2.279-2.29 2.279Z" />
      <path fill="#1A1A1A" fillRule="evenodd" d="M40.922 0C63.522 0 80 18.401 80 41.1 80 63.8 63.522 80 40.922 80S0 63.8 0 41.1C0 18.402 18.321 0 40.922 0Zm22.857 15.697c-13.817-13.474-36.234-13.754-49.77 0C.473 29.45 2.035 50.379 15.852 63.853 29.67 77.327 52.823 79.81 66.36 66.055c13.537-13.754 11.237-36.884-2.58-50.358Z" clipRule="evenodd" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast('Welcome to the club! 📚', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-ink text-cream">
      {/* Newsletter section */}
      <div className="bg-yellow py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h3 className="font-display text-4xl lg:text-5xl font-black text-ink mb-3">Stay in the loop</h3>
          <p className="text-ink/70 mb-6 max-w-md mx-auto">New books, reading challenges, and stories worth sharing. No spam, just good reads.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 bg-white border-2 border-ink rounded-full text-ink placeholder:text-ink/40 focus:outline-none focus:border-pink-bright"
              required
            />
            <button type="submit" className="px-6 py-3 bg-ink text-cream font-bold rounded-full hover:bg-ink/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h4 className="font-display text-lg font-bold text-yellow mb-4">Discover</h4>
            <ul className="space-y-2.5">
              <li><Link to="/books" className="text-sm text-cream/70 hover:text-cream transition-colors">Books</Link></li>
              <li><Link to="/genres" className="text-sm text-cream/70 hover:text-cream transition-colors">Genres</Link></li>
              <li><Link to="/books" className="text-sm text-cream/70 hover:text-cream transition-colors">New Releases</Link></li>
              <li><Link to="/books" className="text-sm text-cream/70 hover:text-cream transition-colors">Popular</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-yellow mb-4">Membership</h4>
            <ul className="space-y-2.5">
              <li><Link to="/membership" className="text-sm text-cream/70 hover:text-cream transition-colors">Join</Link></li>
              <li><Link to="/membership" className="text-sm text-cream/70 hover:text-cream transition-colors">How It Works</Link></li>
              <li><Link to="/membership" className="text-sm text-cream/70 hover:text-cream transition-colors">Pricing</Link></li>
              <li><Link to="/gifts" className="text-sm text-cream/70 hover:text-cream transition-colors">Gifts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-yellow mb-4">Help</h4>
            <ul className="space-y-2.5">
              <li><Link to="/faq" className="text-sm text-cream/70 hover:text-cream transition-colors">FAQ</Link></li>
              <li><Link to="/faq" className="text-sm text-cream/70 hover:text-cream transition-colors">Shipping</Link></li>
              <li><Link to="/faq" className="text-sm text-cream/70 hover:text-cream transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-cream/70 hover:text-cream transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-yellow mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-cream/70 hover:text-cream transition-colors">About</Link></li>
              <li><Link to="/" className="text-sm text-cream/70 hover:text-cream transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-sm text-cream/70 hover:text-cream transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-sm text-cream/70 hover:text-cream transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream/10 gap-4">
          <div className="flex items-center gap-3">
            <FooterLogo />
            <span className="font-display text-xl font-black text-cream">BookNest</span>
          </div>
          <p className="text-sm text-cream/40">© 2026 BookNest. Made for readers, by readers.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 bg-cream/10 rounded-full flex items-center justify-center hover:bg-yellow hover:text-ink transition-colors text-sm font-bold">IG</a>
            <a href="#" className="w-8 h-8 bg-cream/10 rounded-full flex items-center justify-center hover:bg-yellow hover:text-ink transition-colors text-sm font-bold">TW</a>
            <a href="#" className="w-8 h-8 bg-cream/10 rounded-full flex items-center justify-center hover:bg-yellow hover:text-ink transition-colors text-sm font-bold">TT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
