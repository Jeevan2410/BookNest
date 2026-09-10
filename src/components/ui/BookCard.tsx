import { motion } from 'framer-motion';
import { Star, Plus, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { useApp } from '../../context/AppContext';

interface BookCardProps {
  book: Book;
  variant?: 'standard' | 'compact' | 'featured' | 'horizontal';
  index?: number;
}

export function BookCard({ book, variant = 'standard', index = 0 }: BookCardProps) {
  const { addToBox, toggleSaved, savedBooks } = useApp();
  const isSaved = savedBooks.includes(book.id);

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex gap-4 p-4 bg-card rounded-2xl book-card-hover"
      >
        <Link to={`/books/${book.id}`} className="shrink-0">
          <BookCover book={book} size="small" />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/books/${book.id}`} className="font-serif text-lg font-semibold text-ink hover:text-primary transition-colors line-clamp-1">
            {book.title}
          </Link>
          <p className="text-sm text-ink-muted mt-0.5">{book.author}</p>
          <div className="flex items-center gap-2 mt-1">
            <Rating value={book.rating} size="sm" />
            <span className="text-xs text-ink-muted">{book.genres[0]}</span>
          </div>
          <p className="text-sm text-ink-light mt-2 line-clamp-2">{book.description}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative bg-card rounded-2xl overflow-hidden book-card-hover"
    >
      {/* Cover */}
      <Link to={`/books/${book.id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] relative">
          <BookCover book={book} />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
        </div>
        {book.monthlyPick && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            Monthly Pick
          </span>
        )}
        {book.featured && !book.monthlyPick && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-ink text-[10px] font-bold uppercase tracking-wider rounded-full">
            Editor's Pick
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/books/${book.id}`} className="font-serif text-base font-semibold text-ink hover:text-primary transition-colors line-clamp-1 block">
              {book.title}
            </Link>
            <p className="text-sm text-ink-muted mt-0.5">{book.author}</p>
          </div>
          <button
            onClick={() => toggleSaved(book.id)}
            className="p-1.5 rounded-full hover:bg-cream-dark transition-colors shrink-0"
            aria-label={isSaved ? 'Remove from saved' : 'Save book'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-primary text-primary' : 'text-ink-muted'}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Rating value={book.rating} size="sm" />
          <span className="text-xs text-ink-muted">{book.genres[0]}</span>
        </div>

        {variant === 'featured' && (
          <p className="text-sm text-ink-light mt-2 line-clamp-2">{book.description}</p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
          <span className="text-sm font-semibold text-ink">${book.price}</span>
          <button
            onClick={() => addToBox(book)}
            className="flex items-center gap-1 px-3 py-1.5 bg-ink text-cream text-xs font-medium rounded-full hover:bg-primary transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add to Box
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function BookCover({ book, size = 'full' }: { book: Book; size?: 'full' | 'small' }) {
  const sizeClasses = size === 'small' ? 'w-16 h-22' : 'w-full h-full';
  return (
    <div className={`${sizeClasses} rounded-lg overflow-hidden relative`} style={{ backgroundColor: book.coverColor }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
        <div className="w-8 h-0.5 bg-white/30 mb-2" />
        <span className="font-serif text-white text-xs leading-tight line-clamp-3 drop-shadow-sm" style={{ fontSize: size === 'small' ? '8px' : '11px' }}>
          {book.title}
        </span>
        <div className="w-4 h-0.5 bg-white/20 mt-2" />
        <span className="text-white/60 mt-1" style={{ fontSize: size === 'small' ? '6px' : '9px' }}>
          {book.author}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
    </div>
  );
}

export function Rating({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' }) {
  const stars = Math.round(value);
  const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${sizeClass} ${i <= stars ? 'fill-accent text-accent' : 'text-border'}`} />
      ))}
      <span className={`ml-1 ${size === 'sm' ? 'text-xs' : 'text-sm'} text-ink-muted`}>{value}</span>
    </div>
  );
}

export function BookBadge({ text, variant = 'default' }: { text: string; variant?: 'default' | 'primary' | 'accent' }) {
  const variants = {
    default: 'bg-cream-dark text-ink-light',
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
  };
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {text}
    </span>
  );
}

export function EmptyState({ icon: Icon = BookOpen, title, description, action }: { icon?: any; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-ink-muted" />
      </div>
      <h3 className="font-serif text-xl text-ink mb-2">{title}</h3>
      <p className="text-ink-muted max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden">
          <div className="aspect-[3/4] animate-shimmer rounded-lg" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 animate-shimmer rounded" />
            <div className="h-3 w-1/2 animate-shimmer rounded" />
            <div className="h-3 w-1/3 animate-shimmer rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
