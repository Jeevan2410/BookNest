import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalSliderProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalSlider({ children, className = '' }: HorizontalSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.children;

    // Animate cards in with stagger
    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div ref={sliderRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 scroll-snap-x">
        {children}
      </div>
    </div>
  );
}
