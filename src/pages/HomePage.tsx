import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { books, genres } from '../data';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/ui/PageTransition';

gsap.registerPlugin(ScrollTrigger);

// Helper to split text into words with spans
function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden align-bottom" style={{ verticalAlign: 'bottom' }}>
          <span className="inline-block">{word}</span>
        </span>
      )).reduce((acc: React.ReactNode[], el, i) => {
        if (i > 0) acc.push(<span key={`space-${i}`} className="inline-block w-[0.25em]" />);
        acc.push(el);
        return acc;
      }, [])}
    </span>
  );
}

// Helper to split text into characters
function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ))}
    </span>
  );
}

// SVG Ears for book cards
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

// Easter Egg Mascot Pop-up
function EasterEgg({ variant = 'left' }: { variant?: 'left' | 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (isOpen) {
      gsap.fromTo(overlayRef.current,
        { scale: 0, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(overlayRef.current, {
        scale: 0, opacity: 0, rotation: -10, duration: 0.3, ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <div className={`absolute ${variant === 'left' ? 'bottom-8 left-8' : 'bottom-8 right-8'} z-20`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 text-ink hover:scale-110 transition-transform"
        aria-label="Show sign up"
      >
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <path fill="currentColor" d="m53.332 55.909-9.81-22.05c1.253-3.071 4.434-12.573 1.132-24.425a.845.845 0 0 0-.602-.6.82.82 0 0 0-.82.24c-.096.12-2.651 2.711-4.507 6.19-2.58 4.799-2.531 8.854.12 11.78 2.917 3.192 3.062 5.423 2.893 6.431l-.555.048c-.988-2.111-4.29-8.062-12.51-13.82a.734.734 0 0 0-.698-.072c-.242.096-.386.336-.41.576-.314 3.839.723 11.3 6.893 12.212 3.881.576 5.183 1.68 5.593 2.136-.121.816-.41 1.871-.989 3.239l-7.28 16.651h-.023a1.456 1.456 0 0 1-.12.288l-.097.192c-1.157 2.471-5.327 6.766-6.99 8.446-.41.431-.7.72-.796.84-.096.12-.385.575.169 1.175.771.84 3.182 1.895 4.315 1.104.337-.24.53-.48.747-.768.627-.816 4.001-4.559 9.424-9.261 0 0 1.76-2.184 4.435-2.52h1.616c1.205 0 2.169.288 2.723 1.512l.892 2.04c.844 1.943.844 2.998-2 3.454v1.296h11.642v-1.248c-2.363-.432-2.869-1.727-4.387-5.086Zm-13.233-7.27a2.284 2.284 0 0 1-2.29-2.28 2.284 2.284 0 0 1 2.29-2.279 2.284 2.284 0 0 1 2.29 2.28c0 1.247-1.037 2.279-2.29 2.279Z" />
          <path fill="currentColor" fillRule="evenodd" d="M40.922 0C63.522 0 80 18.401 80 41.1 80 63.8 63.522 80 40.922 80S0 63.8 0 41.1C0 18.402 18.321 0 40.922 0Zm22.857 15.697c-13.817-13.474-36.234-13.754-49.77 0C.473 29.45 2.035 50.379 15.852 63.853 29.67 77.327 52.823 79.81 66.36 66.055c13.537-13.754 11.237-36.884-2.58-50.358Z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div ref={overlayRef} className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-yellow rounded-3xl p-6 shadow-xl">
          {/* Ears */}
          <svg className="absolute -top-4 left-4 w-6 h-7 text-yellow" viewBox="0 0 44 45" fill="currentColor">
            <path d="M1.335.198c.671-.316 1.5-.254 2.186.187C27.678 16.847 39.839 36.953 44 45h-6.048c-2.382-1.604-6.964-3.674-15.652-4.814C2.999 37.666-.665 14.174.09 2.04.152 1.28.589.515 1.335.198Z" />
          </svg>
          <svg className="absolute -top-4 right-4 w-4 h-8 text-yellow scale-x-[-1]" viewBox="0 0 29 80" fill="currentColor">
            <path d="M19.388.879c.667-.771 1.647-1.018 2.559-.807.912.21 1.682.956 1.926 1.861C34.595 38.09 25.79 69.237 21.823 80h-4.188c-.17-4.22-2.739-13.318-10.975-22.064-8.493-9.099-8.88-21.913-1.063-37.23C11.221 9.603 19.091 1.266 19.388.879Z" />
          </svg>
          <h3 className="font-display text-lg font-bold text-ink mb-3">Want to join the Club?</h3>
          <Link
            to="/membership"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-cream font-bold rounded-full text-sm hover:bg-ink/90 transition-colors"
          >
            Sign-up now!
          </Link>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const { addToBox } = useApp();
  
  // Refs for animations
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroParaRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const heroHandwrittenRef = useRef<HTMLParagraphElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const booksHandwrittenRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const flowHandwrittenRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const benefitsWrapRef = useRef<HTMLDivElement>(null);
  const genreListRef = useRef<HTMLUListElement>(null);
  const genreBoxesRef = useRef<HTMLDivElement>(null);

  const monthlyPicks = books.filter(b => b.monthlyPick);
  
  const cardColors = [
    { bg: '#32225F', text: '#FFFFFF' },
    { bg: '#6ABF4C', text: '#000000' },
    { bg: '#000000', text: '#FFFFFF' },
    { bg: '#C13A1F', text: '#FFFFFF' },
    { bg: '#00102C', text: '#FFFFFF' },
    { bg: '#F26B22', text: '#000000' },
  ];

  // Hero animations
  useEffect(() => {
    // Word split animation for title
    if (heroTitleRef.current) {
      const words = heroTitleRef.current.querySelectorAll('.split-word');
      gsap.fromTo(words,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.08, delay: 1.8, ease: 'power3.out' }
      );
    }
    
    // Paragraph fade in
    if (heroParaRef.current) {
      gsap.fromTo(heroParaRef.current,
        { y: '1em', opacity: 0 },
        { y: '0em', opacity: 1, duration: 0.8, delay: 2.3, ease: 'power3.out' }
      );
    }
    
    // Button
    if (heroButtonRef.current) {
      gsap.fromTo(heroButtonRef.current,
        { y: '1em', opacity: 0 },
        { y: '0em', opacity: 1, duration: 0.8, delay: 2.5, ease: 'power3.out' }
      );
    }
    
    // Handwritten text - character by character
    if (heroHandwrittenRef.current) {
      const chars = heroHandwrittenRef.current.querySelectorAll('.split-char');
      gsap.fromTo(chars,
        { x: '-0.25em', y: '0.5em', rotation: 22, opacity: 0 },
        { x: '0em', y: '0em', rotation: 0, opacity: 1, duration: 0.4, stagger: 0.015, delay: 2.7, ease: 'power2.out' }
      );
    }
    
    // Hero visual
    if (heroVisualRef.current) {
      gsap.fromTo(heroVisualRef.current,
        { rotation: -21, y: 50, opacity: 0, scale: 0.8 },
        { rotation: -21, y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 2, ease: 'power3.out' }
      );
    }
    
    // Hero background clip-path
    if (heroBgRef.current) {
      gsap.fromTo(heroBgRef.current,
        { clipPath: 'ellipse(0% 0% at 100% 100%)' },
        { clipPath: 'ellipse(150% 130% at 100% 100%)', duration: 1.5, delay: 1.6, ease: 'power3.inOut' }
      );
    }
  }, []);

  // Books section handwritten text on scroll
  useEffect(() => {
    if (!booksHandwrittenRef.current) return;
    const chars = booksHandwrittenRef.current.querySelectorAll('.split-char');
    gsap.fromTo(chars,
      { x: '-0.25em', y: '0.5em', rotation: 22, opacity: 0 },
      {
        x: '0em', y: '0em', rotation: 0, opacity: 1,
        duration: 0.4, stagger: 0.015, ease: 'power2.out',
        scrollTrigger: { trigger: booksHandwrittenRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  }, []);

  // Book slider entrance
  useEffect(() => {
    if (!sliderRef.current) return;
    const items = sliderRef.current.querySelectorAll('[data-book-item]');
    gsap.fromTo(items,
      { y: '30%', opacity: 0 },
      {
        y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sliderRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  }, []);

  // Flow cards - slide up from below with rotation
  useEffect(() => {
    if (!flowRef.current) return;
    const cards = flowRef.current.querySelectorAll('[data-flow-card]');
    gsap.fromTo(cards,
      { y: '150%', opacity: 0 },
      {
        y: '0%', opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: flowRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    
    // Flow handwritten text
    if (flowHandwrittenRef.current) {
      const chars = flowHandwrittenRef.current.querySelectorAll('.split-char');
      gsap.fromTo(chars,
        { x: '-0.25em', y: '0.5em', rotation: 22, opacity: 0 },
        {
          x: '0em', y: '0em', rotation: 0, opacity: 1,
          duration: 0.4, stagger: 0.015, ease: 'power2.out',
          scrollTrigger: { trigger: flowHandwrittenRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    }
  }, []);

  // Benefits labels - scale in with rotation
  useEffect(() => {
    if (!benefitsWrapRef.current) return;
    const labels = benefitsWrapRef.current.querySelectorAll('[data-benefit-label]');
    gsap.fromTo(labels,
      { rotation: 16.3956, scale: 0, opacity: 0 },
      {
        rotation: (i) => [5, -3, 4, -5, 3][i] || 0,
        scale: 1, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: benefitsWrapRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  }, []);

  // Momentum hover on benefits
  useEffect(() => {
    if (!benefitsRef.current) return;
    const el = benefitsRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const labels = el.querySelectorAll('[data-benefit-label]');
      labels.forEach(label => {
        const rect = label.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        const maxDistance = 400;
        
        if (distance < maxDistance) {
          const intensity = (1 - distance / maxDistance) * 15;
          const rotateX = ((e.clientY - centerY) / rect.height) * -intensity;
          const rotateY = ((e.clientX - centerX) / rect.width) * intensity;
          
          gsap.to(label, {
            rotateX, rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 1000,
          });
        }
      });
    };
    
    const handleMouseLeave = () => {
      const labels = el.querySelectorAll('[data-benefit-label]');
      labels.forEach(label => {
        gsap.to(label, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Genre interaction
  useEffect(() => {
    if (!genreListRef.current || !genreBoxesRef.current) return;
    const items = genreListRef.current.querySelectorAll('[data-genre-item]');
    const boxes = genreBoxesRef.current.querySelectorAll('[data-genre-box]');
    
    items.forEach((item, index) => {
      const handleEnter = () => {
        gsap.to(item, { x: 20, duration: 0.3, ease: 'power2.out' });
        boxes.forEach((box, i) => {
          if (i === index % boxes.length) {
            gsap.to(box, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
          } else {
            gsap.to(box, { opacity: 0, scale: 0.9, duration: 0.3 });
          }
        });
      };
      const handleLeave = () => {
        gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
      };
      item.addEventListener('mouseenter', handleEnter);
      item.addEventListener('mouseleave', handleLeave);
    });
    
    return () => {
      items.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  // Book slider drag
  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    let isDown = false;
    let startX: number, scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const handleMouseUp = () => {
      isDown = false;
      slider.style.cursor = 'grab';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page Transition */}
      <PageTransition />

      {/* HERO */}
      <section className="relative min-h-screen bg-yellow overflow-hidden flex items-center">
        {/* Background SVG */}
        <div ref={heroBgRef} className="absolute inset-0 pointer-events-none" style={{ clipPath: 'ellipse(0% 0% at 100% 100%)' }}>
          <svg viewBox="0 0 1920 1403" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <path d="M1695 151c64-31 131-7 176 42 40 44 55 98 61 156 6 62-2 123-5 185-3 59-3 118 17 174 10 28 25 55 51 73 37 25 81 25 122-1V1080H0V600c64-5 128-6 193-9 59-2 118-8 172-36 68-35 95-102 71-176-27-82-60-127-94-172-40-51-81-102-119-155-47-67-66-144-59-226 5-66 34-122 81-168 86-86 189-120 309-96 61 12 114 42 165 78 47 33 93 68 141 100 70 47 143 47 215 4 48-28 94-61 139-94 57-41 114-83 180-109" fill="#F9A220" stroke="#F9A220" strokeWidth="20" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-32 w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Left - Title */}
            <div>
              <h1 ref={heroTitleRef} className="text-hero text-ink mb-6 block" aria-label="Unbox stories worth talking about">
                <SplitWords text="Unbox stories worth talking about" />
              </h1>
              
              <p ref={heroParaRef} className="text-lg lg:text-xl text-ink/80 max-w-lg mb-8 opacity-0">
                Join the book club that's anything but traditional. Choose up to 3 new reads every month, delivered to your door. Then dive into the stories, and the conversations.
              </p>
              
              <div ref={heroButtonRef} className="opacity-0">
                <Link
                  to="/membership"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-bold text-lg rounded-full hover:bg-ink/90 transition-all"
                >
                  <span>Log-in / Sign-up now</span>
                  <span className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
                      <path d="M13.58 5.66v.845l-5.994 5.66-1.71-2.063a61.427 61.427 0 0 1 4.265-2.988l-.02-.078c-1.828.196-4.107.294-6.387.294H0V4.835h3.734c2.28 0 4.56.098 6.387.294l.02-.059a67.638 67.638 0 0 1-4.265-3.006L7.586 0l5.994 5.66Z" fill="currentColor" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              <p ref={heroHandwrittenRef} className="font-handwritten text-2xl text-ink/70 mt-8 -rotate-3">
                <SplitChars text="Shipping to the USA & Canada" />
              </p>
            </div>

            {/* Right - Visual */}
            <div ref={heroVisualRef} className="relative hidden lg:block opacity-0">
              <div className="relative w-80 h-96 mx-auto">
                <div className="absolute inset-0 bg-ink rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-yellow rounded-full flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="font-display text-2xl text-cream font-bold">Your Monthly Box</p>
                    <p className="text-cream/60 mt-2">Curated stories inside</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Easter Egg */}
        <EasterEgg variant="left" />
      </section>

      {/* BOOKS SECTION */}
      <section className="relative bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-section-title text-ink mb-3">Our Feb books</h2>
              <p className="text-lg text-ink/60 max-w-md">We drop new books on the 1st of every month. Call us creatures of habit.</p>
            </div>
            <p ref={booksHandwrittenRef} className="font-handwritten text-2xl text-ink/50">
              <SplitChars text="Discover hidden gems and buzzy new releases" />
            </p>
          </div>

          {/* Slider */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => sliderRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}
              className="w-12 h-12 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
              aria-label="Previous"
            >
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none"><path d="M.42 5.66v.845l5.994 5.66 1.71-2.063A61.427 61.427 0 0 0 3.859 7.114l.02-.078c1.828.196 4.107.294 6.387.294H14V4.835h-3.734c-2.28 0-4.56.098-6.387.294l-.02-.059A67.638 67.638 0 0 0 8.124 2.064L6.414 0 .42 5.66Z" fill="currentColor" /></svg>
            </button>
            <button
              onClick={() => sliderRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}
              className="w-12 h-12 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
              aria-label="Next"
            >
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none"><path d="M13.58 5.66v.845l-5.994 5.66-1.71-2.063a61.427 61.427 0 0 1 4.265-2.988l-.02-.078c-1.828.196-4.107.294-6.387.294H0V4.835h3.734c2.28 0 4.56.098 6.387.294l.02-.059a67.638 67.638 0 0 1-4.265-3.006L7.586 0l5.994 5.66Z" fill="currentColor" /></svg>
            </button>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8"
            style={{ cursor: 'grab' }}
          >
            {monthlyPicks.map((book, i) => {
              const colorSet = cardColors[i % cardColors.length];
              const rotation = [2, -2.2, 2.2, -2.6, 2.8, -1.9][i % 6];
              return (
                <div
                  key={book.id}
                  data-book-item
                  className="flex-shrink-0 w-[320px]"
                  style={{ ['--book-rotate' as any]: `${rotation}deg` }}
                >
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                    style={{ backgroundColor: colorSet.bg, transform: `rotate(${rotation}deg)` }}
                  >
                    <BookEars color={colorSet.bg} />
                    
                    {/* CTA on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Link
                        to={`/books/${book.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm text-cream text-sm font-bold rounded-full"
                      >
                        Read more
                        <svg width="10" height="10" viewBox="0 0 14 13" fill="none"><path d="M13.58 5.66v.845l-5.994 5.66-1.71-2.063a61.427 61.427 0 0 1 4.265-2.988l-.02-.078c-1.828.196-4.107.294-6.387.294H0V4.835h3.734c2.28 0 4.56.098 6.387.294l.02-.059a67.638 67.638 0 0 1-4.265-3.006L7.586 0l5.994 5.66Z" fill="currentColor" /></svg>
                      </Link>
                    </div>

                    <div className="p-6 pt-10">
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

                      <h3 className="font-display text-xl font-bold mb-2" style={{ color: colorSet.text }}>
                        {book.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: colorSet.text, opacity: 0.8 }}>
                        {book.description}
                      </p>

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

                    <Link to={`/books/${book.id}`} className="absolute inset-0 z-0" aria-label={`Read more about ${book.title}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Pink Background */}
      <section ref={flowRef} className="relative bg-pink-soft py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p ref={flowHandwrittenRef} className="font-handwritten text-3xl text-pink-bright">
              <SplitChars text="Consider us your professional book curator" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { step: 'Step #1', title: 'Explore our books', desc: "The first of every month we reveal 6-7 new books. Follow us on socials to keep an eye on any hints we may post.", color: '#FFE4EC', emoji: '📚' },
              { step: 'Step #2', title: 'Build your box', desc: "Members can order up to 3 books per box. At least one title must be from the current month's selections.", color: '#FF6B9D', emoji: '📦' },
              { step: 'Step #3', title: 'Check your doorstop', desc: 'Your box is delivered right to your doorstep. This is the best excuse to cancel your Friday night plans.', color: '#F9A220', emoji: '🏠' },
              { step: 'Step #4', title: 'Share your reads', desc: 'Share your box and tag us @booknest or participate in the Club discussions in-app!', color: '#8B9DC3', emoji: '💬' },
            ].map((item, i) => (
              <div
                key={item.step}
                data-flow-card
                className="relative rounded-3xl overflow-hidden shadow-lg"
                style={{ backgroundColor: item.color, transform: 'rotate(3.45deg)' }}
              >
                <div className="p-6">
                  <span className="font-handwritten text-2xl font-bold text-ink/60">{item.step}</span>
                  <div className="my-6 h-40 rounded-2xl bg-white/30 flex items-center justify-center">
                    <span className="text-5xl">{item.emoji}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GENRE INTERACTION - Bright Pink */}
      <section className="relative bg-pink py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ul ref={genreListRef} className="space-y-2">
              {genres.slice(0, 11).map((genre) => (
                <li key={genre.id} data-genre-item>
                  <Link
                    to={`/books?genre=${genre.slug}`}
                    className="group block font-display text-4xl lg:text-6xl font-black text-cream hover:text-yellow transition-colors py-1"
                  >
                    <span className="group-hover:translate-x-2 transition-transform inline-block">{genre.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div ref={genreBoxesRef} className="hidden lg:block relative aspect-square">
              {books.slice(0, 4).map((book, i) => (
                <div
                  key={book.id}
                  data-genre-box
                  className="absolute inset-0 grid grid-cols-3 gap-3"
                  style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'scale(1)' : 'scale(0.9)' }}
                >
                  {books.slice(i * 3, i * 3 + 9).map((b, j) => (
                    <div
                      key={b.id}
                      className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
                      style={{ backgroundColor: b.coverColor, transform: `rotate(${(j % 3 - 1) * 2}deg)` }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                        <span className="font-display text-white text-xs leading-tight">{b.title}</span>
                        <span className="text-white/50 text-[9px] mt-1">{b.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <EasterEgg variant="right" />
      </section>

      {/* BENEFITS */}
      <section ref={benefitsRef} className="relative bg-cream py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-ink mb-4">Why BookNest?</h2>
            <p className="text-lg text-ink/60 max-w-md mx-auto">More than a book club — it's a reading ritual.</p>
          </div>

          <div ref={benefitsWrapRef} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" style={{ transformStyle: 'preserve-3d' }}>
            {[
              { text: 'Range of genres', color: '#FFE4EC', rotation: 5 },
              { text: 'Free shipping', color: '#F9A220', rotation: -3 },
              { text: 'Affordable', color: '#8B9DC3', rotation: 4 },
              { text: 'High quality hardcovers', color: '#4ECDC4', rotation: -5 },
              { text: 'Curated books', color: '#8B9A46', rotation: 3 },
            ].map((benefit) => (
              <div
                key={benefit.text}
                data-benefit-label
                className="rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: benefit.color, transform: `rotate(${benefit.rotation}deg)` }}
              >
                <p className="font-display text-xl lg:text-2xl font-black text-ink leading-tight">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/membership"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ink text-cream font-bold text-xl rounded-full hover:bg-ink/90 transition-all"
            >
              <span>Join the Club</span>
              <span className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none"><path d="M13.58 5.66v.845l-5.994 5.66-1.71-2.063a61.427 61.427 0 0 1 4.265-2.988l-.02-.078c-1.828.196-4.107.294-6.387.294H0V4.835h3.734c2.28 0 4.56.098 6.387.294l.02-.059a67.638 67.638 0 0 1-4.265-3.006L7.586 0l5.994 5.66Z" fill="currentColor" /></svg>
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
              <div
                key={t.name}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
