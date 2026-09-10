import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { books, genres } from '../data';
import { useApp } from '../context/AppContext';

// SVG Ear component for book cards
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

// Wave SVG Background
function WaveBackground({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg className={`absolute bottom-0 left-0 w-full ${className}`} viewBox="0 0 1920 400" fill="none" preserveAspectRatio="none">
      <path d="M0 200C320 100 640 300 960 200C1280 100 1600 300 1920 200V400H0V200Z" fill={color} />
    </svg>
  );
}

export default function HomePage() {
  const { addToBox } = useApp();
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const monthlyPicks = books.filter(b => b.monthlyPick);
  
  // Card colors for book slider
  const cardColors = [
    { bg: '#32225F', text: '#FFFFFF' },
    { bg: '#6ABF4C', text: '#000000' },
    { bg: '#000000', text: '#FFFFFF' },
    { bg: '#C13A1F', text: '#FFFFFF' },
    { bg: '#00102C', text: '#FFFFFF' },
    { bg: '#F26B22', text: '#000000' },
  ];

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.querySelector('[data-card]')?.clientWidth || 350;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* HERO - Yellow Background */}
      <section className="relative min-h-screen bg-yellow overflow-hidden flex items-center">
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1920 600" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M1695 151c64-31 131-7 176 42 40 44 55 98 61 156 6 62-2 123-5 185-3 59-3 118 17 174 10 28 25 55 51 73 37 25 81 25 122-1V1080H0V600c64-5 128-6 193-9 59-2 118-8 172-36 68-35 95-102 71-176-27-82-60-127-94-172-40-51-81-102-119-155-47-67-66-144-59-226 5-66 34-122 81-168 86-86 189-120 309-96 61 12 114 42 165 78 47 33 93 68 141 100 70 47 143 47 215 4 48-28 94-61 139-94 57-41 114-83 180-109" fill="#F9A220" stroke="#F9A220" strokeWidth="20" />
            <path d="M957 848c20-17 39-18 60-1 24 19 39 45 56 70 20 31 43 59 77 79 41 24 83 22 120-5 52-38 86-99 141-134 55-35 123-13 158 32 24 31 37 67 49 105 15 46 30 93 49 139 17 40 45 73 88 90V1400H226c-32-15-61-36-89-62-48-45-73-103-81-168-13-120 23-223 117-302 47-40 105-63 164-80 55-16 111-30 167-48 81-25 126-83 138-165 7-55 10-112 12-168 3-70 5-141 26-209 14-48 37-91 76-124 54-45 114-50 177-22 57 25 98 69 140 113 45 46 90 93 138 137 35 32 79 50 127 56 46 5 86-6 120-38 37-35 61-79 84-125" fill="#F9A220" stroke="#F9A220" strokeWidth="20" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-32 w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Left - Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-hero text-ink mb-6"
              >
                Unbox stories worth talking about
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg lg:text-xl text-ink/80 max-w-lg mb-8"
              >
                Join the book club that's anything but traditional. Choose up to 3 new reads every month, delivered to your door. Then dive into the stories, and the conversations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <Link
                  to="/membership"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-bold text-lg rounded-full hover:bg-ink/90 transition-all"
                >
                  <span>Log-in / Sign-up now</span>
                  <span className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-ink" />
                  </span>
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-handwritten text-2xl text-ink/70 mt-8 -rotate-3"
              >
                Shipping to the USA & Canada ✨
              </motion.p>
            </div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
              className="relative hidden lg:block"
            >
              <div className="relative w-80 h-96 mx-auto">
                {/* Box illustration */}
                <div className="absolute inset-0 bg-ink rounded-3xl shadow-2xl flex items-center justify-center transform -rotate-6">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-yellow rounded-full flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="font-display text-2xl text-cream font-bold">Your Monthly Box</p>
                    <p className="text-cream/60 mt-2">Curated stories inside</p>
                  </div>
                </div>
                {/* Floating books */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-8 -right-8 w-24 h-32 bg-pink rounded-lg shadow-lg transform rotate-12"
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <span className="font-display text-white text-xs text-center">The Last Blue Hour</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-8 w-20 h-28 bg-periwinkle rounded-lg shadow-lg transform -rotate-6"
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <span className="font-display text-white text-xs text-center">Paper Birds</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOKS SECTION - White Background */}
      <section className="relative bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-section-title text-ink mb-3">Our Feb books</h2>
              <p className="text-lg text-ink/60 max-w-md">We drop new books on the 1st of every month. Call us creatures of habit.</p>
            </div>
            <p className="font-handwritten text-2xl text-ink/50 -rotate-2 lg:rotate-0">
              Discover hidden gems and buzzy new releases
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Controls */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => scrollSlider('left')}
                className="w-12 h-12 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="w-12 h-12 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Cards */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 scroll-snap-x"
            >
              {monthlyPicks.map((book, i) => {
                const colorSet = cardColors[i % cardColors.length];
                const rotation = i % 2 === 0 ? '2deg' : '-2deg';
                return (
                  <motion.div
                    key={book.id}
                    data-card
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-shrink-0 w-[320px] scroll-snap-item"
                  >
                    <div
                      className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                      style={{ backgroundColor: colorSet.bg, transform: `rotate(${rotation})` }}
                    >
                      {/* Ears */}
                      <BookEars color={colorSet.bg} />
                      
                      {/* Bottom rounded part */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl" style={{ backgroundColor: colorSet.bg }} />
                      
                      {/* CTA on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Link
                          to={`/books/${book.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm text-cream text-sm font-medium rounded-full"
                        >
                          Read more
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="p-6 pt-10">
                        {/* Book cover */}
                        <div className="relative mx-auto w-48 h-64 mb-6 shadow-xl">
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
                        <h3 className="font-display text-xl font-bold mb-2" style={{ color: colorSet.text }}>
                          {book.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: colorSet.text, opacity: 0.8 }}>
                          {book.description}
                        </p>

                        {/* Genre tags */}
                        <div className="flex flex-wrap gap-2">
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
                      </div>

                      {/* Full card link */}
                      <Link to={`/books/${book.id}`} className="absolute inset-0 z-0" aria-label={`Read more about ${book.title}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Pink Background */}
      <section className="relative bg-pink-soft py-20 lg:py-32 overflow-hidden">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 w-full pointer-events-none opacity-30">
          <svg viewBox="0 0 1920 400" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M1036 224c46-18 94-27 145-17 69 14 110 57 128 125 15 60 6 120-1 180-8 64-17 128-21 193-3 47 9 93 35 135 24 39 58 63 105 70 51 7 100-1 150-11 44-8 89-18 134-23 37-4 76-2 112 14V1080H0V400c64-5 128-6 193-9 59-2 118-8 172-36 68-35 95-102 71-176" fill="#FF6B9D" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-handwritten text-3xl text-pink-bright mb-2 -rotate-2">Consider us your professional book curator</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { step: 'Step #1', title: 'Explore our books', desc: "The first of every month we reveal 6-7 new books. Follow us on socials to keep an eye on any hints we may post.", color: '#FFE4EC', variant: 'base' },
              { step: 'Step #2', title: 'Build your box', desc: 'Members can order up to 3 books per box. At least one title must be from the current month\'s selections.', color: '#FF6B9D', variant: 'bright-pink' },
              { step: 'Step #3', title: 'Check your doorstop', desc: 'Your box is delivered right to your doorstep. This is the best excuse to cancel your Friday night plans.', color: '#F9A220', variant: 'yellow' },
              { step: 'Step #4', title: 'Share your reads', desc: 'Share your box and tag us @booknest or participate in the Club discussions in-app!', color: '#8B9DC3', variant: 'periwinkle' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
                style={{ transform: `rotate(${i % 2 === 0 ? '2' : '-2'}deg)` }}
              >
                <div className="rounded-3xl overflow-hidden shadow-lg h-full" style={{ backgroundColor: item.color }}>
                  <div className="p-6">
                    <span className="font-handwritten text-2xl font-bold text-ink/60">{item.step}</span>
                    
                    {/* Illustration placeholder */}
                    <div className="my-6 h-40 rounded-2xl bg-white/30 flex items-center justify-center">
                      <span className="text-5xl">
                        {i === 0 ? '📚' : i === 1 ? '📦' : i === 2 ? '🏠' : '💬'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GENRE INTERACTION - Bright Pink */}
      <section className="relative bg-pink py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Genre List */}
            <div>
              <ul className="space-y-2">
                {genres.slice(0, 11).map((genre, i) => (
                  <motion.li
                    key={genre.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/books?genre=${genre.slug}`}
                      className="group block font-display text-4xl lg:text-6xl font-black text-cream hover:text-yellow transition-colors py-1"
                    >
                      <span className="group-hover:translate-x-2 transition-transform inline-block">{genre.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Book covers grid */}
            <div className="hidden lg:grid grid-cols-3 gap-3">
              {books.slice(0, 9).map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
                  style={{ backgroundColor: book.coverColor, transform: `rotate(${(i % 3 - 1) * 2}deg)` }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-display text-white text-xs leading-tight">{book.title}</span>
                    <span className="text-white/50 text-[9px] mt-1">{book.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="relative bg-cream py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-ink mb-4">Why BookNest?</h2>
            <p className="text-lg text-ink/60 max-w-md mx-auto">More than a book club — it's a reading ritual.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Range of genres', color: '#FFE4EC', rotation: '5deg' },
              { title: 'Free shipping', color: '#F9A220', rotation: '-3deg' },
              { title: 'Affordable', color: '#8B9DC3', rotation: '4deg' },
              { title: 'High quality hardcovers', color: '#4ECDC4', rotation: '-5deg' },
              { title: 'Curated books', color: '#8B9A46', rotation: '3deg' },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: benefit.color, transform: `rotate(${benefit.rotation})` }}
              >
                <p className="font-display text-xl lg:text-2xl font-black text-ink leading-tight">
                  {benefit.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              to="/membership"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ink text-cream font-bold text-xl rounded-full hover:bg-ink/90 transition-all"
            >
              <span>Join the Club</span>
              <span className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 text-ink" />
              </span>
            </Link>
            <p className="font-handwritten text-xl text-ink/50 mt-4 -rotate-2">Cancel or skip anytime ✌️</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-yellow py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-section-title text-ink text-center mb-12">Readers make the club</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Maya', text: "I've discovered more new favorite authors through this club than I ever expected.", rating: 5 },
              { name: 'James', text: "Finally, a book club that respects my taste while pushing me to try new things.", rating: 5 },
              { name: 'Sofia', text: "The monthly box feels like a gift I send myself. Beautiful editions, thoughtful selections.", rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
                style={{ transform: `rotate(${i % 2 === 0 ? '1' : '-1'}deg)` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <span key={s} className="text-yellow text-xl">★</span>
                  ))}
                </div>
                <p className="text-ink/80 mb-4 italic">"{t.text}"</p>
                <p className="font-bold text-ink">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
