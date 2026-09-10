import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BenefitLabelProps {
  text: string;
  color: string;
  rotation: number;
  delay?: number;
}

export function BenefitLabel({ text, color, rotation, delay = 0 }: BenefitLabelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        rotation: rotation,
        scale: 0,
        opacity: 0,
      },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [rotation, delay]);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
      style={{ backgroundColor: color }}
    >
      <p className="font-display text-xl lg:text-2xl font-black text-ink leading-tight">
        {text}
      </p>
    </div>
  );
}
