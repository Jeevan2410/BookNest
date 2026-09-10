import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, CreditCard, Heart, Settings, LogOut, BookOpen, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { books } from '../data';
import { BookCover } from '../components/ui/BookCard';

export default function AccountPage() {
  const { user, logout, boxItems, savedBooks, addToast } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const savedBookObjects = books.filter(b => savedBooks.includes(b.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-heading-2 font-serif text-ink mb-1">Hello, {user.name}</h1>
              <p className="text-ink-muted">Member since {user.memberSince}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-ink-muted hover:text-primary transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-2">
              {[
                { icon: User, label: 'Profile', active: true },
                { icon: Package, label: 'Current Box' },
                { icon: CreditCard, label: 'Billing' },
                { icon: Heart, label: 'Saved Books' },
                { icon: Settings, label: 'Preferences' },
              ].map(item => (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active ? 'bg-ink text-cream' : 'text-ink-light hover:bg-cream-dark'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </aside>

            {/* Content */}
            <div className="space-y-8">
              {/* Subscription */}
              <div className="bg-card rounded-2xl p-6 border border-border-light">
                <h2 className="font-serif text-lg text-ink mb-4">Current Subscription</h2>
                <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
                  <div>
                    <p className="font-medium text-ink">{user.plan}</p>
                    <p className="text-sm text-ink-muted">Next billing: March 1, 2026</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addToast('Plan change coming soon', 'info')} className="px-3 py-1.5 text-xs font-medium border border-border rounded-full hover:bg-cream-dark">Change Plan</button>
                    <button onClick={() => addToast('Month skipped!', 'success')} className="px-3 py-1.5 text-xs font-medium border border-border rounded-full hover:bg-cream-dark">Skip Month</button>
                  </div>
                </div>
              </div>

              {/* Current Box */}
              <div className="bg-card rounded-2xl p-6 border border-border-light">
                <h2 className="font-serif text-lg text-ink mb-4">Current Box</h2>
                {boxItems.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {boxItems.map(item => (
                      <div key={item.book.id} className="text-center">
                        <BookCover book={item.book} size="small" />
                        <p className="text-xs font-medium text-ink mt-2 truncate">{item.book.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-8 h-8 text-ink-muted mx-auto mb-2" />
                    <p className="text-sm text-ink-muted">No books selected this month.</p>
                    <Link to="/box" className="text-sm text-primary font-medium hover:underline mt-2 inline-block">Build your box →</Link>
                  </div>
                )}
              </div>

              {/* Saved Books */}
              <div className="bg-card rounded-2xl p-6 border border-border-light">
                <h2 className="font-serif text-lg text-ink mb-4">Saved Books</h2>
                {savedBookObjects.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {savedBookObjects.map(book => (
                      <Link key={book.id} to={`/books/${book.id}`} className="text-center group">
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
                          <BookCover book={book} />
                        </div>
                        <p className="text-xs font-medium text-ink mt-2 truncate group-hover:text-primary transition-colors">{book.title}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-8 h-8 text-ink-muted mx-auto mb-2" />
                    <p className="text-sm text-ink-muted">Your future favorites live here.</p>
                    <Link to="/books" className="text-sm text-primary font-medium hover:underline mt-2 inline-block">Browse books →</Link>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                <button onClick={() => addToast('Payment management coming soon', 'info')} className="p-4 bg-card rounded-xl border border-border-light text-center hover:border-primary transition-colors">
                  <CreditCard className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-ink">Manage Payment</p>
                </button>
                <button onClick={() => addToast('Address management coming soon', 'info')} className="p-4 bg-card rounded-xl border border-border-light text-center hover:border-primary transition-colors">
                  <Package className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-ink">Shipping Address</p>
                </button>
                <button onClick={() => addToast('Order history coming soon', 'info')} className="p-4 bg-card rounded-xl border border-border-light text-center hover:border-primary transition-colors">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-ink">Order History</p>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
