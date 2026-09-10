import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-ink-muted" />
        </div>
        <h1 className="text-heading-1 font-serif text-ink mb-4">404</h1>
        <p className="text-xl text-ink-light mb-2">Looks like this page wandered off the shelf.</p>
        <p className="text-ink-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors">
          Back to Books
        </Link>
      </div>
    </div>
  );
}
