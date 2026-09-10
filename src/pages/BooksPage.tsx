import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { books, allGenres } from '../data';
import { useApp } from '../context/AppContext';

// BookEars component
function BookEars({ color }: { color: string }) {
  return (
    <>
      <svg className="absolute -top-3 left-5 w-7 h-8" viewBox="0 0 44 45" fill={color}>
        <path d="M1.335.198c.671-.316 1.5-.254 2.186.187C27.678 16.847 39.839 36.953 44 45h-6.048c-2.382-1.604-6.964-3.674-15.652-4.814C2.999 37.666-.665 14.174.09 2.04.152 1.28.589.515 1.335.198Z" />
      </svg>
      <svg className="absolute -top-3 right-5 w-5 h-10 scale-x-[-1]" viewBox="0 0 29 80" fill={color}>
        <path d="M19.388.879c.667-.771 1.647-1.018 2.559-.807.912.21 1.682.956 1.926 1.861C34.595 38.09 25.79 69.237 21.823 80h-4.188c-.17-4.22-2.739-13.318-10.975-22.064-8.493-9.099-8.88-21.913-1.063-37.23C11.221 9.603 19.091 1.266 19.388.879Z" />
      </svg>
    </>
  );
}

const cardColors = [
  { bg: '#32225F', text: '#FFFFFF' },
  { bg: '#6ABF4C', text: '#000000' },
  { bg: '#000000', text: '#FFFFFF' },
  { bg: '#C13A1F', text: '#FFFFFF' },
  { bg: '#00102C', text: '#FFFFFF' },
  { bg: '#F26B22', text: '#000000' },
  { bg: '#8B9DC3', text: '#FFFFFF' },
  { bg: '#8B9A46', text: '#FFFFFF' },
];

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
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-section-title text-ink mb-3">All Books</h1>
          <p className="text-lg text-ink/60">Explore our complete collection of curated reads.</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books or authors..."
              className="w-full pl-12 pr-4 py-3 bg-cream border-2 border-ink rounded-full focus:outline-none focus:border-yellow text-ink"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-ink/40" />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-cream border-2 border-ink rounded-full text-sm font-bold focus:outline-none focus:border-yellow"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title A-Z</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 bg-ink text-cream rounded-full text-sm font-bold"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-cream p-6 pt-20 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-56 lg:shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-6 right-6 p-2">
                <X className="w-5 h-5" />
              </button>
            )}
            <h3 className="font-display text-xl font-bold mb-4 hidden lg:block">Genres</h3>
            <div className="space-y-1">
              <button
                onClick={() => { setSelectedGenre(null); setShowFilters(false); }}
                className={`block w-full text-left px-4 py-2 rounded-full text-sm font-bold transition-colors ${!selectedGenre ? 'bg-ink text-cream' : 'text-ink/60 hover:bg-cream-dark'}`}
              >
                All Genres
              </button>
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => { setSelectedGenre(genre); setShowFilters(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-full text-sm font-bold transition-colors ${selectedGenre === genre ? 'bg-ink text-cream' : 'text-ink/60 hover:bg-cream-dark'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </aside>

          {/* Book Grid */}
          <div className="flex-1">
            <p className="text-sm text-ink/50 mb-4 font-bold">{filteredBooks.length} books found</p>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-ink/50 text-lg font-display">Nothing on these shelves.</p>
                <p className="text-sm text-ink/30 mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book, i) => {
                  const colorSet = cardColors[i % cardColors.length];
                  const rotation = i % 2 === 0 ? '1.5deg' : '-1.5deg';
                  return (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div
                        className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                        style={{ backgroundColor: colorSet.bg, transform: `rotate(${rotation})` }}
                      >
                        <BookEars color={colorSet.bg} />
                        
                        {/* Hover CTA */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Link
                            to={`/books/${book.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm text-cream text-sm font-bold rounded-full"
                          >
                            Read more
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="p-6 pt-10">
                          {/* Book cover */}
                          <div className="relative mx-auto w-44 h-56 mb-5 shadow-xl">
                            <div className="w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: book.coverColor }}>
                              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                <div className="w-8 h-0.5 bg-white/30 mb-3" />
                                <span className="font-display text-white text-sm leading-tight">{book.title}</span>
                                <div className="w-4 h-0.5 bg-white/20 my-2" />
                                <span className="text-white/60 text-xs">{book.author}</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="font-display text-lg font-bold mb-2" style={{ color: colorSet.text }}>
                            {book.title}
                          </h3>
                          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: colorSet.text, opacity: 0.8 }}>
                            {book.description}
                          </p>

                          {/* Genre tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {book.genres.slice(0, 3).map((genre, gi) => {
                              const tagColors = ['#FF9D00', '#000000', '#E62701', '#3D3195', '#9E81E4', '#71002E'];
                              const tagBg = tagColors[gi % tagColors.length];
                              const isLight = tagBg === '#FF9D00' || tagBg === '#E6FF2B';
                              return (
                                <span
                                  key={genre}
                                  className="px-3 py-1 text-xs font-bold rounded-full"
                                  style={{ backgroundColor: tagBg, color: isLight ? '#000' : '#fff' }}
                                >
                                  {genre}
                                </span>
                              );
                            })}
                          </div>

                          {/* Add to box */}
                          <button
                            onClick={(e) => { e.stopPropagation(); addToBox(book); }}
                            className="w-full py-2.5 bg-cream/20 hover:bg-cream/30 text-cream text-sm font-bold rounded-full transition-colors"
                          >
                            Add to Box — ${book.price}
                          </button>
                        </div>

                        {/* Full card link */}
                        <Link to={`/books/${book.id}`} className="absolute inset-0 z-0" aria-label={`Read more about ${book.title}`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
