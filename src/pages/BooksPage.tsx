import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { books, allGenres } from '../data';
import { BookCard, LoadingSkeleton } from '../components/ui/BookCard';

type SortOption = 'popular' | 'newest' | 'rating' | 'title';

export default function BooksPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredBooks = useMemo(() => {
    let result = [...books];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (selectedGenre) {
      result = result.filter(b => b.genres.includes(selectedGenre));
    }
    switch (sortBy) {
      case 'newest': result.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'title': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }
    return result;
  }, [search, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-heading-1 font-serif text-ink mb-3">All Books</h1>
          <p className="text-ink-light text-lg">Explore our complete collection of curated reads.</p>
        </motion.div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books or authors..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:border-primary text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-ink-muted" />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-primary"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title A-Z</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-full text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-cream p-6 pt-20 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-56 lg:shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-6 right-6 p-2">
                <X className="w-5 h-5" />
              </button>
            )}
            <h3 className="font-serif text-lg mb-4 hidden lg:block">Genres</h3>
            <div className="space-y-2">
              <button
                onClick={() => { setSelectedGenre(null); setShowFilters(false); }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedGenre ? 'bg-ink text-cream' : 'text-ink-light hover:bg-cream-dark'}`}
              >
                All Genres
              </button>
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => { setSelectedGenre(genre); setShowFilters(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedGenre === genre ? 'bg-ink text-cream' : 'text-ink-light hover:bg-cream-dark'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </aside>

          {/* Book Grid */}
          <div className="flex-1">
            <p className="text-sm text-ink-muted mb-4">{filteredBooks.length} books found</p>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-ink-muted text-lg">Nothing on these shelves.</p>
                <p className="text-sm text-ink-muted/60 mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredBooks.slice(0, visibleCount).map((book, i) => (
                    <BookCard key={book.id} book={book} index={i} />
                  ))}
                </div>
                {visibleCount < filteredBooks.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 8)}
                      className="px-6 py-3 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-cream transition-colors"
                    >
                      Load More Books
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
