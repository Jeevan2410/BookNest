import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Package, Check } from 'lucide-react';
import { books } from '../data';
import { BookCover } from '../components/ui/BookCard';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

export default function BoxPage() {
  const { boxItems, removeFromBox, addToBox, boxTotal } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);
  const monthlyPicks = books.filter(b => b.monthlyPick);
  const otherBooks = books.filter(b => !b.monthlyPick).slice(0, 8);

  useEffect(() => {
    if (boxItems.length === 3) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [boxItems.length]);

  const canAddMore = boxItems.length < 3;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-heading-1 font-serif text-ink mb-3">Build Your Reading Box</h1>
          <p className="text-ink-light text-lg">Choose up to 3 books for this month's delivery.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Books */}
          <div>
            {/* Progress */}
            <div className="mb-8 p-4 bg-card rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-ink">Your Selection</span>
                <span className="text-sm text-ink-muted">{boxItems.length} of 3 books</span>
              </div>
              <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(boxItems.length / 3) * 100}%` }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              {boxItems.length === 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-secondary font-medium mt-2 flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Your reading stack is ready!
                </motion.p>
              )}
            </div>

            {/* Monthly Picks */}
            <h2 className="font-serif text-xl text-ink mb-4">This Month's Picks</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {monthlyPicks.map(book => {
                const inBox = boxItems.some(item => item.book.id === book.id);
                return (
                  <motion.div key={book.id} whileHover={{ y: -4 }} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-[3/4] relative">
                      <BookCover book={book} />
                      {inBox && (
                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-cream" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-serif text-sm font-semibold text-ink truncate">{book.title}</p>
                      <p className="text-xs text-ink-muted">{book.author}</p>
                      <button
                        onClick={() => inBox ? removeFromBox(book.id) : addToBox(book)}
                        disabled={!inBox && !canAddMore}
                        className={`mt-2 w-full py-2 text-xs font-medium rounded-full transition-colors ${
                          inBox ? 'bg-secondary text-cream' : canAddMore ? 'bg-ink text-cream hover:bg-primary' : 'bg-cream-dark text-ink-muted cursor-not-allowed'
                        }`}
                      >
                        {inBox ? 'In Your Box' : canAddMore ? 'Add to Box' : 'Box Full'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* More Books */}
            <h2 className="font-serif text-xl text-ink mb-4">More Great Reads</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {otherBooks.map(book => {
                const inBox = boxItems.some(item => item.book.id === book.id);
                return (
                  <motion.div key={book.id} whileHover={{ y: -4 }} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-[3/4] relative">
                      <BookCover book={book} />
                      {inBox && (
                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-cream" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-serif text-sm font-semibold text-ink truncate">{book.title}</p>
                      <p className="text-xs text-ink-muted">{book.author}</p>
                      <button
                        onClick={() => inBox ? removeFromBox(book.id) : addToBox(book)}
                        disabled={!inBox && !canAddMore}
                        className={`mt-2 w-full py-2 text-xs font-medium rounded-full transition-colors ${
                          inBox ? 'bg-secondary text-cream' : canAddMore ? 'bg-ink text-cream hover:bg-primary' : 'bg-cream-dark text-ink-muted cursor-not-allowed'
                        }`}
                      >
                        {inBox ? 'In Your Box' : canAddMore ? 'Add to Box' : 'Box Full'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Box Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border-light">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-lg">Your Box</h2>
              </div>

              <AnimatePresence>
                {boxItems.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <Package className="w-8 h-8 text-ink-muted mx-auto mb-2" />
                    <p className="text-sm text-ink-muted">Your box is waiting for a story.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {boxItems.map(item => (
                      <motion.div
                        key={item.book.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-3 p-2 bg-cream rounded-xl"
                      >
                        <BookCover book={item.book} size="small" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink truncate">{item.book.title}</p>
                          <p className="text-xs text-ink-muted">${item.book.price}</p>
                        </div>
                        <button onClick={() => removeFromBox(item.book.id)} className="p-1 hover:bg-cream-dark rounded-full">
                          <Trash2 className="w-3.5 h-3.5 text-ink-muted" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {boxItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border-light space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted">Subtotal</span>
                    <span className="font-medium">${boxTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted">Shipping</span>
                    <span className="font-medium text-secondary">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border-light">
                    <span>Total</span>
                    <span>${boxTotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
                  >
                    Continue to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-secondary text-cream px-8 py-4 rounded-2xl shadow-2xl"
          >
            <p className="font-serif text-xl">✨ Your reading stack is ready!</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
