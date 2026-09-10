import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { genres, books } from '../data';

export default function GenresPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-heading-1 font-serif text-ink mb-4">Browse by Genre</h1>
          <p className="text-ink-light text-lg max-w-xl mx-auto">Find your next obsession among our curated categories.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre, i) => {
            const genreBooks = books.filter(b => b.genres.includes(genre.name));
            return (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/books?genre=${genre.slug}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/3]"
                  style={{ backgroundColor: genre.color }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="font-serif text-2xl text-white mb-2 group-hover:scale-105 transition-transform">{genre.name}</h2>
                    <p className="text-white/60 text-sm mb-4 max-w-xs">{genre.description}</p>
                    <span className="text-white/40 text-xs">{genreBooks.length} books</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
