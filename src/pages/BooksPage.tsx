import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { books, allGenres } from '../data';
import { useApp } from '../context/AppContext';
import BookCover from '../components/ui/BookCover';

type SortOption = 'popular' | 'newest' | 'rating' | 'title';

export default function BooksPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const { addToBox } = useApp();

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
    <div className="min-h-screen bg-paper pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-sm font-medium text-terracotta mb-2">The Collection</p>
          <h1 className="text-display-lg text-ink mb-3">All Books</h1>
          <p className="text-lg text-ink-light">Explore our complete collection of curated reads.</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books or authors..."
              className="w-full pl-12 pr-4 py-3 bg-cream border-2 border-ink/10 rounded-full focus:outline-none focus:border-terracotta text-ink"
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
              className="px-4 py-3 bg-cream border-2 border-ink/10 rounded-full text-sm font-medium focus:outline-none focus:border-terracotta"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title A-Z</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 bg-ink text-paper rounded-full text-sm font-medium"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-paper p-6 pt-20 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-56 lg:shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-6 right-6 p-2">
                <X className="w-5 h-5" />
              </button>
            )}
            <h3 className="font-display text-xl font-semibold mb-4 hidden lg:block">Genres</h3>
            <div className="space-y-1">
              <button
                onClick={() => { setSelectedGenre(null); setShowFilters(false); }}
                className={`block w-full text-left px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedGenre ? 'bg-ink text-paper' : 'text-ink-light hover:bg-cream'}`}
              >
                All Genres
              </button>
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => { setSelectedGenre(genre); setShowFilters(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedGenre === genre ? 'bg-ink text-paper' : 'text-ink-light hover:bg-cream'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </aside>

          {/* Book Grid */}
          <div className="flex-1">
            <p className="text-sm text-ink-muted mb-4 font-medium">{filteredBooks.length} books found</p>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-ink-muted text-lg font-display">Nothing on these shelves.</p>
                <p className="text-sm text-ink-muted/60 mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative"
                    style={{ transform: `rotate(${[0, -0.5, 0.5, -0.3, 0.3, -0.5][i % 6]}deg)` }}
                  >
                    <BookCover book={book} className="rounded-2xl" />

                    <div className="mt-4 space-y-1">
                      <h3 className="font-display text-xl font-semibold text-ink group-hover:text-terracotta transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-ink-light">{book.author}</p>
                      <p className="text-sm text-ink-muted line-clamp-2">{book.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
