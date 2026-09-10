import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookCover } from './BookCard';

export default function BoxDrawer() {
  const { boxDrawerOpen, setBoxDrawerOpen, boxItems, removeFromBox, boxTotal } = useApp();
  const shipping = boxTotal > 0 ? 0 : 0;
  const total = boxTotal + shipping;

  return (
    <AnimatePresence>
      {boxDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBoxDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl">Your Box</h2>
                <span className="text-sm text-ink-muted">({boxItems.length}/3)</span>
              </div>
              <button onClick={() => setBoxDrawerOpen(false)} className="p-2 hover:bg-cream-dark rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {boxItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-ink-muted" />
                  </div>
                  <p className="font-serif text-lg text-ink mb-1">Your box is waiting for a story.</p>
                  <p className="text-sm text-ink-muted">Browse our selections and add your favorites.</p>
                  <Link
                    to="/books"
                    onClick={() => setBoxDrawerOpen(false)}
                    className="mt-4 px-4 py-2 bg-ink text-cream text-sm rounded-full hover:bg-primary transition-colors"
                  >
                    Explore Books
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {boxItems.map(item => (
                      <motion.div
                        key={item.book.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex gap-3 p-3 bg-card rounded-xl"
                      >
                        <BookCover book={item.book} size="small" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-ink truncate">{item.book.title}</p>
                          <p className="text-xs text-ink-muted">{item.book.author}</p>
                          <p className="text-sm font-semibold text-ink mt-1">${item.book.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromBox(item.book.id)}
                          className="p-1.5 self-start hover:bg-cream-dark rounded-full"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4 text-ink-muted hover:text-primary" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {boxItems.length > 0 && (
              <div className="border-t border-border px-6 py-4 space-y-3">
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
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/box"
                  onClick={() => setBoxDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
                >
                  Continue to Box
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
