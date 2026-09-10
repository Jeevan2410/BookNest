import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitCharsProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitChars({ text, className = '', delay = 0 }: SplitCharsProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.split-char');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
        rotation: -10,
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.02,
        delay,
        ease: 'power2.out',
      }
    );
  }, [text, delay]);

  const chars = text.split('');

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
