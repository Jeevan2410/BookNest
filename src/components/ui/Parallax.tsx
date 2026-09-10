import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  rotate?: number;
}

export function Parallax({ children, className = '', speed = 0.5, rotate = 0 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      rotation: rotate,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed, rotate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
