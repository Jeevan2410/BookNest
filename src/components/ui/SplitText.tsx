import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(' ');
    const spans = containerRef.current.querySelectorAll('.split-word');

    gsap.fromTo(
      spans,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay,
        ease: 'power3.out',
      }
    );
  }, [text, delay]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="split-word inline-block overflow-hidden">
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
}
