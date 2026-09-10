import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, BookOpen, Calendar, FileText, Plus } from 'lucide-react';
import { books } from '../data';
import { BookCover, Rating, BookBadge, BookCard } from '../components/ui/BookCard';
import { useApp } from '../context/AppContext';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToBox, toggleSaved, savedBooks } = useApp();
  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-2 font-serif mb-4">Book not found</h1>
          <p className="text-ink-muted mb-6">This page may have wandered off the shelf.</p>
          <Link to="/books" className="px-6 py-3 bg-ink text-cream rounded-full font-medium">Back to Books</Link>
        </div>
      </div>
    );
  }

  const isSaved = savedBooks.includes(book.id);
  const relatedBooks = books.filter(b => b.id !== book.id && b.genres.some(g => book.genres.includes(g))).slice(0, 4);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/books" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left - Cover */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="sticky top-24">
              <div className="relative mx-auto w-64 h-[22rem] lg:w-72 lg:h-[26rem]">
                <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: book.coverColor }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-0.5 bg-white/30 mb-4" />
                    <span className="font-serif text-white text-xl leading-tight">{book.title}</span>
                    <div className="w-8 h-0.5 bg-white/20 my-3" />
                    <span className="text-white/60 text-sm">{book.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {book.monthlyPick && <BookBadge text="Monthly Pick" variant="primary" />}
              {book.featured && <BookBadge text="Editor's Pick" variant="accent" />}
              {book.genres.map(g => <BookBadge key={g} text={g} />)}
            </div>

            <h1 className="text-heading-1 font-serif text-ink mb-2">{book.title}</h1>
            <p className="text-xl text-ink-muted mb-4">by {book.author}</p>

            <div className="flex items-center gap-4 mb-6">
              <Rating value={book.rating} />
              <span className="text-sm text-ink-muted flex items-center gap-1">
                <FileText className="w-4 h-4" /> {book.pages} pages
              </span>
              <span className="text-sm text-ink-muted flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {new Date(book.publicationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <p className="text-ink-light leading-relaxed text-lg mb-8">{book.longDescription}</p>

            {book.editorNote && (
              <div className="bg-cream-dark rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Editor's Note</span>
                </div>
                <p className="italic text-ink-light">"{book.editorNote}"</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => addToBox(book)}
                className="flex items-center gap-2 px-6 py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add to Box — ${book.price}
              </button>
              <button
                onClick={() => toggleSaved(book.id)}
                className={`flex items-center gap-2 px-6 py-3 border-2 rounded-full font-medium transition-colors ${isSaved ? 'border-primary text-primary' : 'border-ink text-ink hover:bg-ink hover:text-cream'}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
                {isSaved ? 'Saved' : 'Save for Later'}
              </button>
            </div>

            {/* Reviews */}
            {book.reviews.length > 0 && (
              <div className="border-t border-border pt-8">
                <h2 className="font-serif text-xl text-ink mb-6">Reader Reviews</h2>
                <div className="space-y-6">
                  {book.reviews.map(review => (
                    <div key={review.id} className="p-4 bg-card rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{review.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink">{review.author}</p>
                          <p className="text-xs text-ink-muted">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-accent text-accent' : 'text-border'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-ink-light">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl text-ink mb-8">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedBooks.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
