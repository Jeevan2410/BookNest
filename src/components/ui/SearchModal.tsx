import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { books } from '../../data';

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  const results = query.length > 1
    ? books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase()) ||
        b.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  const popularSearches = ['Literary Fiction', 'Fantasy', 'Elara Whitmore', 'Magical Realism'];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-cream rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-ink-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, authors, genres..."
                className="flex-1 bg-transparent text-ink placeholder:text-ink-muted focus:outline-none text-lg"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-cream-dark rounded-full">
                <X className="w-4 h-4 text-ink-muted" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-4">
              {query.length > 1 && results.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-8 h-8 text-ink-muted mx-auto mb-2" />
                  <p className="text-ink-muted">Nothing on these shelves.</p>
                  <p className="text-sm text-ink-muted/60 mt-1">Try a different search term</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-1">
                  {results.map(book => (
                    <Link
                      key={book.id}
                      to={`/books/${book.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-dark transition-colors"
                    >
                      <div className="w-10 h-14 rounded shrink-0" style={{ backgroundColor: book.coverColor }}>
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white/60" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-ink text-sm truncate">{book.title}</p>
                        <p className="text-xs text-ink-muted">{book.author} · {book.genres[0]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.length <= 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-ink-muted" />
                    <span className="text-sm font-medium text-ink-muted">Popular searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-cream-dark rounded-full text-sm text-ink-light hover:bg-border transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs text-ink-muted">
              <span>Press <kbd className="px-1.5 py-0.5 bg-cream-dark rounded text-[10px] font-mono">Esc</kbd> to close</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
