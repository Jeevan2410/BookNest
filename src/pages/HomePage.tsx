import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { books, genres } from '../data';
import { useApp } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

// Generated image URLs
const heroImage = 'https://image.qwenlm.ai/generated-images/b4c88d12-8c57-4a71-a8e4-063ebfe4c285/_result.png';
const mascotImage = 'https://image.qwenlm.ai/generated-images/81f0848f-3ba4-481c-81a1-472cddcb079a/_result.png';
const boxImage = 'https://image.qwenlm.ai/generated-images/2606d09f-47d8-4802-85e0-1f5899ea6755/_result.png';

const bookCovers = [
  'https://image.qwenlm.ai/generated-images/e6dc80dc-99b5-4195-9b2b-1e199d5dae5c/_result.png',
  'https://image.qwenlm.ai/generated-images/66f57a3f-0918-4145-8d07-a5c2f9119ec6/_result.png',
  'https://image.qwenlm.ai/generated-images/31df68aa-3b3d-40f9-939d-e3af54aa01dd/_result.png',
  'https://image.qwenlm.ai/generated-images/505c86c2-61ad-491f-af8f-3c4d2d48bd91/_result.png',
  'https://image.qwenlm.ai/generated-images/91748da0-0d65-4ffd-a53f-dc19be3bd073/_result.png',
  'https://image.qwenlm.ai/generated-images/c5a3d061-dacf-42aa-87fb-7d4075a1921f/_result.png',
];

// Fox mascot SVG - appears throughout
function FoxMascot({ className = '', size = 80 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
      {/* Fox face */}
      <ellipse cx="50" cy="55" rx="25" ry="28" fill="#B8432F" />
      <ellipse cx="50" cy="60" rx="18" ry="20" fill="#F5EDE0" />
      {/* Ears */}
      <path d="M 30 35 L 25 15 L 40 30 Z" fill="#B8432F" />
      <path d="M 70 35 L 75 15 L 60 30 Z" fill="#B8432F" />
      <path d="M 32 32 L 28 20 L 38 30 Z" fill="#F5EDE0" />
      <path d="M 68 32 L 72 20 L 62 30 Z" fill="#F5EDE0" />
      {/* Eyes */}
      <circle cx="42" cy="50" r="3" fill="#1C1917" />
      <circle cx="58" cy="50" r="3" fill="#1C1917" />
      <circle cx="43" cy="49" r="1" fill="#F5EDE0" />
      <circle cx="59" cy="49" r="1" fill="#F5EDE0" />
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="2" ry="2.5" fill="#1C1917" />
      {/* Glasses */}
      <circle cx="42" cy="50" r="6" stroke="#C9A876" strokeWidth="1.5" fill="none" />
      <circle cx="58" cy="50" r="6" stroke="#C9A876" strokeWidth="1.5" fill="none" />
      <line x1="48" y1="50" x2="52" y2="50" stroke="#C9A876" strokeWidth="1.5" />
      {/* Smile */}
      <path d="M 45 62 Q 50 65 55 62" stroke="#1C1917" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const { addToBox } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const monthlyPicks = books.filter(b => b.monthlyPick).slice(0, 6);

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3 }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(mascotRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
      '-=0.5'
    );
  }, []);

  // Books section scroll animation
  useEffect(() => {
    if (!booksRef.current) return;
    const cards = booksRef.current.querySelectorAll('[data-book-card]');
    
    gsap.fromTo(cards,
      { y: 80, opacity: 0, rotation: -5 },
      {
        y: 0, opacity: 1, rotation: 0,
        duration: 0.8, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: booksRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Flow section
  useEffect(() => {
    if (!flowRef.current) return;
    const items = flowRef.current.querySelectorAll('[data-flow-item]');
    
    gsap.fromTo(items,
      { x: -100, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: flowRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Benefits section
  useEffect(() => {
    if (!benefitsRef.current) return;
    const labels = benefitsRef.current.querySelectorAll('[data-benefit]');
    
    gsap.fromTo(labels,
      { scale: 0, rotation: 16 },
      {
        scale: 1, rotation: (i) => [3, -2, 4, -3, 2][i] || 0,
        duration: 0.8, stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      {/* HERO - Editorial asymmetric layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C1917' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Left - Editorial text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full">
                <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
                <span className="text-sm font-medium text-terracotta">February 2026 Selections</span>
              </div>

              <h1 ref={titleRef} className="text-display-xl text-ink opacity-0">
                Stories worth<br />
                <span className="italic text-terracotta">making room</span><br />
                for.
              </h1>

              <p ref={subtitleRef} className="text-editorial text-ink-light max-w-lg opacity-0">
                A literary club for curious readers. Discover carefully chosen books, build your monthly reading box, and find stories you'll want to talk about.
              </p>

              <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
                <Link
                  to="/books"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper font-medium rounded-full hover:bg-terracotta transition-colors duration-300"
                >
                  <span>Explore This Month</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-paper transition-all duration-300"
                >
                  Join the Club
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-ink/10">
                <div>
                  <p className="text-display-md text-ink">12k+</p>
                  <p className="text-sm text-ink-muted">Active readers</p>
                </div>
                <div className="w-px h-12 bg-ink/10" />
                <div>
                  <p className="text-display-md text-ink">200+</p>
                  <p className="text-sm text-ink-muted">Books curated</p>
                </div>
                <div className="w-px h-12 bg-ink/10" />
                <div>
                  <p className="text-display-md text-ink">4.9</p>
                  <p className="text-sm text-ink-muted">Member rating</p>
                </div>
              </div>
            </div>

            {/* Right - Hero image with mascot */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Editorial book collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
              </div>

              {/* Mascot floating */}
              <div ref={mascotRef} className="absolute -bottom-8 -left-8 opacity-0">
                <div className="relative">
                  <img src={mascotImage} alt="BookNest mascot" className="w-32 h-32 animate-float" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-mustard rounded-full flex items-center justify-center animate-wiggle">
                    <span className="text-ink text-xs font-bold">New!</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-terracotta/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-8 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY PICKS - Editorial grid */}
      <section ref={booksRef} className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <p className="text-sm font-medium text-terracotta mb-3">This Month's Picks</p>
              <h2 className="text-display-lg text-ink mb-4">Fresh stories. Hidden gems.</h2>
              <p className="text-lg text-ink-light max-w-md">Books you'll be talking about. Hand-picked by our editorial team.</p>
            </div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-ink font-medium hover:text-terracotta transition-colors group"
            >
              <span>View all books</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Asymmetric book grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {monthlyPicks.map((book, i) => (
              <div
                key={book.id}
                data-book-card
                className="group relative"
                style={{ transform: `rotate(${[0, -1, 1, -0.5, 0.5, -1][i % 6]}deg)` }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={bookCovers[i % bookCovers.length]}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {book.genres.slice(0, 2).map(genre => (
                          <span key={genre} className="px-3 py-1 bg-paper/90 text-ink text-xs font-medium rounded-full">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => addToBox(book)}
                        className="w-full py-3 bg-terracotta text-paper font-medium rounded-full hover:bg-terracotta-light transition-colors"
                      >
                        Add to Box — ${book.price}
                      </button>
                    </div>
                  </div>

                  {/* Monthly pick badge */}
                  {book.monthlyPick && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-mustard text-ink text-xs font-bold rounded-full">
                      Monthly Pick
                    </div>
                  )}
                </div>

                {/* Book info */}
                <div className="mt-4 space-y-1">
                  <h3 className="text-display-md text-ink group-hover:text-terracotta transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-ink-light">{book.author}</p>
                  <p className="text-sm text-ink-muted line-clamp-2">{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Editorial flow */}
      <section ref={flowRef} className="py-24 lg:py-32 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <p className="font-handwritten text-3xl text-terracotta mb-4 -rotate-2">Consider us your professional book curator</p>
            <h2 className="text-display-lg text-ink">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { step: '01', title: 'Discover', desc: 'Explore this month\'s curated selections across every genre.', color: 'bg-terracotta/10' },
              { step: '02', title: 'Build Your Box', desc: 'Choose up to 3 books for your monthly reading box.', color: 'bg-forest/10' },
              { step: '03', title: 'Delivered', desc: 'Your beautifully packaged box arrives at your door.', color: 'bg-gold/10' },
              { step: '04', title: 'Read & Share', desc: 'Read, review, and discuss with our community.', color: 'bg-mustard/10' },
            ].map((item, i) => (
              <div key={item.step} data-flow-item className="relative">
                <div className={`${item.color} rounded-3xl p-8 h-full`}>
                  <p className="font-handwritten text-5xl text-ink/20 mb-4">{item.step}</p>
                  <h3 className="text-display-md text-ink mb-3">{item.title}</h3>
                  <p className="text-ink-light">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-ink/20" />
                )}
              </div>
            ))}
          </div>

          {/* Box illustration */}
          <div className="mt-20 flex justify-center">
            <div className="relative w-full max-w-md">
              <img src={boxImage} alt="Your monthly box" className="w-full rounded-3xl shadow-xl" />
              <div className="absolute -top-4 -right-4">
                <FoxMascot size={60} className="animate-wiggle" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS - Rotating labels */}
      <section ref={benefitsRef} className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink mb-4">Why BookNest?</h2>
            <p className="text-lg text-ink-light max-w-md mx-auto">More than a book club — it's a reading ritual.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { text: 'Range of genres', color: 'bg-terracotta/10' },
              { text: 'Free shipping', color: 'bg-forest/10' },
              { text: 'Affordable', color: 'bg-gold/10' },
              { text: 'High quality hardcovers', color: 'bg-mustard/10' },
              { text: 'Curated books', color: 'bg-terracotta-light/10' },
            ].map((benefit) => (
              <div
                key={benefit.text}
                data-benefit
                className={`${benefit.color} rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-shadow`}
              >
                <p className="text-display-md text-ink">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/membership"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ink text-paper font-medium rounded-full hover:bg-terracotta transition-colors duration-300"
            >
              <span>Join the Club</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="font-handwritten text-xl text-ink-muted mt-4 -rotate-2">Cancel or skip anytime ✌️</p>
          </div>
        </div>
      </section>

      {/* GENRES - Large typography */}
      <section className="py-24 lg:py-32 bg-terracotta text-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-display-lg mb-4">Find your next obsession.</h2>
            <p className="text-lg text-paper/80 max-w-md mx-auto">Browse by genre and discover your new favorite category.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.slice(0, 12).map((genre) => (
              <Link
                key={genre.id}
                to={`/books?genre=${genre.slug}`}
                className="group relative p-8 bg-paper/10 rounded-2xl hover:bg-paper/20 transition-colors duration-300"
              >
                <h3 className="text-display-md group-hover:translate-x-2 transition-transform duration-300">
                  {genre.name}
                </h3>
                <p className="text-sm text-paper/60 mt-2">{genre.bookCount} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink mb-4">Readers make the club.</h2>
            <p className="text-lg text-ink-light">Hear from our community of passionate readers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maya', location: 'Portland, OR', text: "I've discovered more new favorite authors through this club than I ever expected. The curation is impeccable.", rating: 5 },
              { name: 'James', location: 'Brooklyn, NY', text: "Finally, a book club that respects my taste while pushing me to try new things. The community is wonderful.", rating: 5 },
              { name: 'Sofia', location: 'Austin, TX', text: "The monthly box feels like a gift I send myself. Beautiful editions, thoughtful selections, and the reading challenges keep me motivated.", rating: 5 },
            ].map((t, i) => (
              <div
                key={t.name}
                className="bg-cream rounded-3xl p-8 shadow-md"
                style={{ transform: `rotate(${[1, -1, 0.5][i % 3]}deg)` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#E8B84D">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-ink-light mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-medium text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-ink text-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-display-lg mb-6">Ready to find your next favorite book?</h2>
          <p className="text-xl text-paper/80 mb-10 max-w-lg mx-auto">
            Join thousands of readers who trust us to deliver stories worth making room for.
          </p>
          <Link
            to="/membership"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-terracotta text-paper font-medium rounded-full hover:bg-terracotta-light transition-colors duration-300"
          >
            <span>Start Your Membership</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
