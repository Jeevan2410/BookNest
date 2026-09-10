import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'rotate-in';
  delay?: number;
  stagger?: number;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
  stagger = 0 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.children;
    
    const animations: Record<string, gsap.TweenVars> = {
      'fade-up': { y: 50, opacity: 0 },
      'fade-in': { opacity: 0 },
      'scale-up': { scale: 0.8, opacity: 0 },
      'rotate-in': { rotation: 16.3956, scale: 0, opacity: 0 },
    };

    const fromVars = animations[animation];

    gsap.fromTo(
      elements,
      fromVars,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: stagger || 0.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [animation, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
