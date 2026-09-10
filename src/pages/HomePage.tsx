import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Star, Moon, Coffee } from 'lucide-react';
import { books, genres, testimonials, awardYears } from '../data';
import { BookCard, BookBadge } from '../components/ui/BookCard';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  const { addToBox } = useApp();
  const monthlyPicks = books.filter((b) => b.monthlyPick);
  const featuredBook = books.find((b) => b.featured && b.monthlyPick) || books[3];
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredBooks = activeGenre
    ? books.filter((b) => b.genres.includes(activeGenre))
    : monthlyPicks;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-accent rounded-full animate-float opacity-40" />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full animate-float-delayed opacity-30" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-secondary rounded-full animate-float opacity-20" />
          <div className="absolute top-1/4 right-1/4 w-5 h-5 bg-rose/20 rounded-full animate-float-delayed opacity-20" />
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">February 2026 Selections</span>
              </div>
              <h1 className="text-display font-serif text-ink mb-6">
                Stories worth<br />
                <span className="text-primary italic">making room</span> for.
              </h1>
              <p className="text-lg text-ink-light max-w-lg mb-8 leading-relaxed">
                Discover carefully chosen books, build your monthly reading box, and find stories you'll want to talk about.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
                >
                  Explore This Month
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-cream transition-colors"
                >
                  Join the Club
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-serif font-bold text-ink">12k+</p>
                  <p className="text-xs text-ink-muted">Active readers</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-bold text-ink">200+</p>
                  <p className="text-xs text-ink-muted">Books curated</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-bold text-ink">4.9</p>
                  <p className="text-xs text-ink-muted">Member rating</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main book stack */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    {/* Book 1 */}
                    <div className="w-44 h-60 rounded-lg shadow-xl transform rotate-[-5deg] translate-x-[-20px]" style={{ backgroundColor: '#2D5F4E' }}>
                      <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                        <span className="font-serif text-white/90 text-sm">The Last Blue Hour</span>
                        <span className="text-white/50 text-xs mt-1">Elara Whitmore</span>
                      </div>
                    </div>
                    {/* Book 2 */}
                    <div className="absolute top-4 left-12 w-44 h-60 rounded-lg shadow-xl transform rotate-[3deg]" style={{ backgroundColor: '#C4553A' }}>
                      <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                        <span className="font-serif text-white/90 text-sm">House of Paper Birds</span>
                        <span className="text-white/50 text-xs mt-1">Tomás Alvarez</span>
                      </div>
                    </div>
                    {/* Book 3 */}
                    <div className="absolute top-8 left-24 w-44 h-60 rounded-lg shadow-xl transform rotate-[-2deg] translate-x-[10px]" style={{ backgroundColor: '#9B8EC4' }}>
                      <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                        <span className="font-serif text-white/90 text-sm">The Quiet Between Stars</span>
                        <span className="text-white/50 text-xs mt-1">Amara Okafor</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 right-10">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-20 left-5">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Moon className="w-5 h-5 text-secondary" />
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }} className="absolute top-20 left-10">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 0.5 }} className="absolute bottom-10 right-20">
                  <div className="w-8 h-8 bg-rose/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-rose" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MONTHLY PICKS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif text-ink mb-3">
              This Month's Picks
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-ink-light text-lg max-w-lg mx-auto">
              Fresh stories. Hidden gems. Books you'll be talking about.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {monthlyPicks.slice(0, 8).map((book: typeof books[0], i: number) => (
              <BookCard key={book.id} book={book} variant="featured" index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-cream transition-colors"
            >
              View All Books
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED BOOK */}
      <section className="py-20 lg:py-28 bg-card-warm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative mx-auto w-64 h-80 lg:w-72 lg:h-96">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3" />
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: featuredBook.coverColor }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-0.5 bg-white/30 mb-4" />
                    <span className="font-serif text-white text-xl leading-tight">{featuredBook.title}</span>
                    <div className="w-8 h-0.5 bg-white/20 my-3" />
                    <span className="text-white/60 text-sm">{featuredBook.author}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent mb-4">
                <Star className="w-3 h-3 fill-accent" /> Editor's Pick
              </span>
              <h2 className="text-heading-1 font-serif text-ink mb-3">{featuredBook.title}</h2>
              <p className="text-lg text-ink-muted mb-4">by {featuredBook.author}</p>
              <p className="text-ink-light leading-relaxed mb-6">{featuredBook.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredBook.genres.map((g: string) => <BookBadge key={g} text={g} variant="primary" />)}
              </div>
              {featuredBook.editorNote && (
                <blockquote className="border-l-2 border-primary pl-4 mb-8 italic text-ink-light">
                  "{featuredBook.editorNote}"
                </blockquote>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/books/${featuredBook.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
                >
                  Explore Book
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => addToBox(featuredBook)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-cream transition-colors"
                >
                  Add to Box
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif text-ink mb-3">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-ink-light text-lg">
              Four simple steps to your next great read.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📚', title: 'Discover', desc: 'Explore this month\'s curated selections across every genre.' },
              { icon: '📦', title: 'Build Your Box', desc: 'Choose up to 3 books for your monthly reading box.' },
              { icon: '✨', title: 'Delivered', desc: 'Your beautifully packaged box arrives at your door.' },
              { icon: '💬', title: 'Read & Share', desc: 'Read, review, and discuss with our community.' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cream-dark flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-primary mb-2">Step {i + 1}</div>
                <h3 className="font-serif text-xl text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-ink-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="py-20 lg:py-28 bg-ink text-cream">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif mb-3">
              Your monthly reading ritual.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-cream/60 text-lg">
              Choose the plan that fits your reading life.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Monthly Reader', price: '$19.99', period: '/month', books: '1 book', features: ['1 hardcover book', 'Free shipping', 'Community access', 'Monthly challenges'] },
              { name: 'Avid Reader', price: '$34.99', period: '/month', books: '2 books', features: ['2 hardcover books', 'Everything in Monthly', 'Priority new releases', 'Author events'], popular: true },
              { name: 'Devoted Reader', price: '$49.99', period: '/month', books: '3 books', features: ['3 hardcover books', 'Everything in Avid', 'Signed editions', 'VIP access'] },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl ${plan.popular ? 'bg-primary text-cream' : 'bg-cream/5 border border-cream/10'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-ink text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-lg mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-60">{plan.period}</span>
                </div>
                <p className="text-sm opacity-60 mb-4">{plan.books} per month</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/membership"
                  className={`block text-center py-2.5 rounded-full font-medium text-sm transition-colors ${
                    plan.popular ? 'bg-cream text-ink hover:bg-cream/90' : 'bg-cream/10 text-cream hover:bg-cream/20'
                  }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-cream/40 text-sm mt-8">Cancel or skip anytime. No commitments.</p>
        </div>
      </section>

      {/* GENRE DISCOVERY */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif text-ink mb-3">
              Find your next obsession.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-ink-light text-lg">
              Browse by genre and discover your new favorite category.
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {genres.slice(0, 12).map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(activeGenre === genre.name ? null : genre.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGenre === genre.name
                    ? 'bg-ink text-cream'
                    : 'bg-cream-dark text-ink-light hover:bg-border'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredBooks.slice(0, 8).map((book: typeof books[0], i: number) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY / TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-card-warm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif text-ink mb-3">
              Readers make the club.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-ink-light text-lg">
              Hear from our community of passionate readers.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t: typeof testimonials[0], i: number) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="text-ink-light text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.location} · Member since {t.memberSince}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* READERS' CHOICE */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-heading-1 font-serif text-ink mb-3">
              Readers' Choice
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-ink-light text-lg">
              Our members vote. These are the winners.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardYears.map((award: typeof awardYears[0], i: number) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-44 mx-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform" style={{ backgroundColor: books.find((b) => b.id === award.bookId)?.coverColor || '#333' }}>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3">
                      <span className="font-serif text-white text-xs text-center leading-tight">{award.title}</span>
                      <span className="text-white/50 text-[9px] mt-1">{award.author}</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-ink">{award.year}</span>
                  </div>
                </div>
                <h3 className="font-serif text-sm font-semibold text-ink">{award.title}</h3>
                <p className="text-xs text-ink-muted">{award.author}</p>
                <p className="text-xs text-primary mt-1">{award.votes.toLocaleString()} votes</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary text-cream">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-heading-1 font-serif mb-4">Ready to find your next favorite book?</h2>
            <p className="text-cream/80 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of readers who trust us to deliver stories worth making room for.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-ink font-medium rounded-full hover:bg-cream/90 transition-colors text-lg"
            >
              Start Your Membership
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
