import { motion } from 'framer-motion';
import { Book } from '../../types';

interface BookCoverProps {
  book: Book;
  className?: string;
  animated?: boolean;
}

export default function BookCover({ book, className = '', animated = true }: BookCoverProps) {
  const genre = book.genres[0] || 'Literary Fiction';
  
  // Generate unique cover design based on genre
  const getCoverDesign = () => {
    switch (genre) {
      case 'Literary Fiction':
        return {
          bg: 'linear-gradient(135deg, #2D4A3E 0%, #4A6B5C 100%)',
          pattern: 'radial-gradient(circle at 20% 80%, rgba(201, 168, 118, 0.3) 0%, transparent 50%)',
          accent: '#C9A876',
          floatingElements: ['circle', 'line'],
        };
      case 'Horror':
        return {
          bg: 'linear-gradient(180deg, #1C1917 0%, #2D1F1F 100%)',
          pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(184, 67, 47, 0.1) 10px, rgba(184, 67, 47, 0.1) 20px)',
          accent: '#B8432F',
          floatingElements: ['triangle', 'circle'],
        };
      case 'Fantasy':
        return {
          bg: 'linear-gradient(135deg, #4A3B5C 0%, #6B4C7A 100%)',
          pattern: 'radial-gradient(circle at 80% 20%, rgba(232, 184, 77, 0.4) 0%, transparent 40%)',
          accent: '#E8B84D',
          floatingElements: ['star', 'circle'],
        };
      case 'Romance':
        return {
          bg: 'linear-gradient(135deg, #B8432F 0%, #D4654F 100%)',
          pattern: 'radial-gradient(circle at 30% 70%, rgba(245, 237, 224, 0.2) 0%, transparent 50%)',
          accent: '#F5EDE0',
          floatingElements: ['circle', 'heart'],
        };
      case 'Thriller':
        return {
          bg: 'linear-gradient(180deg, #1C1917 0%, #44403C 100%)',
          pattern: 'linear-gradient(90deg, transparent 49%, rgba(184, 67, 47, 0.3) 49%, rgba(184, 67, 47, 0.3) 51%, transparent 51%)',
          accent: '#B8432F',
          floatingElements: ['line', 'triangle'],
        };
      case 'Mystery':
        return {
          bg: 'linear-gradient(135deg, #2D4A3E 0%, #1C1917 100%)',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(201, 168, 118, 0.2) 0%, transparent 60%)',
          accent: '#C9A876',
          floatingElements: ['circle', 'line'],
        };
      case 'Science Fiction':
        return {
          bg: 'linear-gradient(135deg, #1C1917 0%, #2D4A3E 100%)',
          pattern: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(232, 184, 77, 0.1) 20px, rgba(232, 184, 77, 0.1) 21px)',
          accent: '#E8B84D',
          floatingElements: ['circle', 'square'],
        };
      case 'Historical Fiction':
        return {
          bg: 'linear-gradient(135deg, #5C3D2E 0%, #8B5A3C 100%)',
          pattern: 'radial-gradient(circle at 70% 30%, rgba(245, 237, 224, 0.3) 0%, transparent 50%)',
          accent: '#F5EDE0',
          floatingElements: ['line', 'circle'],
        };
      case 'Magical Realism':
        return {
          bg: 'linear-gradient(135deg, #9B8EC4 0%, #6B4C7A 100%)',
          pattern: 'radial-gradient(circle at 40% 60%, rgba(232, 184, 77, 0.3) 0%, transparent 50%)',
          accent: '#E8B84D',
          floatingElements: ['star', 'circle'],
        };
      default:
        return {
          bg: 'linear-gradient(135deg, #2D4A3E 0%, #4A6B5C 100%)',
          pattern: 'radial-gradient(circle at 20% 80%, rgba(201, 168, 118, 0.3) 0%, transparent 50%)',
          accent: '#C9A876',
          floatingElements: ['circle', 'line'],
        };
    }
  };

  const design = getCoverDesign();

  return (
    <motion.div
      className={`relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl ${className}`}
      style={{ perspective: '1000px' }}
      whileHover={{ scale: 1.02, rotateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cover background */}
      <div
        className="absolute inset-0"
        style={{ background: design.bg }}
      />
      
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: design.pattern }}
      />

      {/* Animated floating elements */}
      {animated && (
        <>
          {design.floatingElements.includes('circle') && (
            <motion.div
              className="absolute w-20 h-20 rounded-full opacity-20"
              style={{ background: design.accent, top: '20%', left: '10%' }}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          
          {design.floatingElements.includes('star') && (
            <motion.div
              className="absolute opacity-30"
              style={{ top: '30%', right: '15%' }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill={design.accent}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </motion.div>
          )}

          {design.floatingElements.includes('line') && (
            <motion.div
              className="absolute w-32 h-px opacity-30"
              style={{ background: design.accent, top: '60%', left: '50%', transform: 'translateX(-50%)' }}
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {design.floatingElements.includes('triangle') && (
            <motion.div
              className="absolute opacity-20"
              style={{ bottom: '25%', right: '20%' }}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill={design.accent}>
                <path d="M20 5 L35 35 L5 35 Z"/>
              </svg>
            </motion.div>
          )}

          {design.floatingElements.includes('heart') && (
            <motion.div
              className="absolute opacity-25"
              style={{ top: '40%', left: '20%' }}
              animate={{
                scale: [1, 1.1, 1],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={design.accent}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
          )}

          {design.floatingElements.includes('square') && (
            <motion.div
              className="absolute w-16 h-16 border-2 opacity-20"
              style={{ borderColor: design.accent, top: '15%', right: '25%' }}
              animate={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top - Genre badge */}
        <div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: `${design.accent}33`, color: design.accent }}
          >
            {genre}
          </div>
        </div>

        {/* Middle - Title and Author */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h3
            className="font-display text-2xl font-bold leading-tight mb-3"
            style={{ color: design.accent }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {book.title}
          </motion.h3>
          <motion.p
            className="text-sm font-medium opacity-80"
            style={{ color: design.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            {book.author}
          </motion.p>
        </div>

        {/* Bottom - Decorative line */}
        <div
          className="w-12 h-0.5"
          style={{ background: design.accent }}
        />
      </div>

      {/* Spine effect on hover */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-full opacity-0"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shadow overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
