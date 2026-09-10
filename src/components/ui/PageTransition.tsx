import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function PageTransition() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }

    if (logoRef.current) {
      tl.fromTo(logoRef.current, 
        { rotation: 64, scale: 0, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        0.3
      );
    }

    tl.to(wrapRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        if (wrapRef.current) wrapRef.current.style.display = 'none';
      }
    }, 1.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[100] bg-cream flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0">
        <svg viewBox="0 0 1080 1080" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            ref={pathRef}
            d="M66.858-19C57.597 196.452 127.164 482.585 206.5 464.5c125.428-28.592 52.293-293.51 200.001-339 568.234-175-241.425 712.6 15.5 803.02C645 1007 629.398 499 810.5 499c113.398 0 106.54 189.465 164.235 429.52 48.005 199.72 89.415 213.09 105.265 173.78"
            stroke="#F9A220"
            strokeWidth="8%"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div ref={logoRef} className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full text-ink">
          <path fill="currentColor" d="m53.332 55.909-9.81-22.05c1.253-3.071 4.434-12.573 1.132-24.425a.845.845 0 0 0-.602-.6.82.82 0 0 0-.82.24c-.096.12-2.651 2.711-4.507 6.19-2.58 4.799-2.531 8.854.12 11.78 2.917 3.192 3.062 5.423 2.893 6.431l-.555.048c-.988-2.111-4.29-8.062-12.51-13.82a.734.734 0 0 0-.698-.072c-.242.096-.386.336-.41.576-.314 3.839.723 11.3 6.893 12.212 3.881.576 5.183 1.68 5.593 2.136-.121.816-.41 1.871-.989 3.239l-7.28 16.651h-.023a1.456 1.456 0 0 1-.12.288l-.097.192c-1.157 2.471-5.327 6.766-6.99 8.446-.41.431-.7.72-.796.84-.096.12-.385.575.169 1.175.771.84 3.182 1.895 4.315 1.104.337-.24.53-.48.747-.768.627-.816 4.001-4.559 9.424-9.261 0 0 1.76-2.184 4.435-2.52h1.616c1.205 0 2.169.288 2.723 1.512l.892 2.04c.844 1.943.844 2.998-2 3.454v1.296h11.642v-1.248c-2.363-.432-2.869-1.727-4.387-5.086Zm-13.233-7.27a2.284 2.284 0 0 1-2.29-2.28 2.284 2.284 0 0 1 2.29-2.279 2.284 2.284 0 0 1 2.29 2.28c0 1.247-1.037 2.279-2.29 2.279Z" />
          <path fill="currentColor" fillRule="evenodd" d="M40.922 0C63.522 0 80 18.401 80 41.1 80 63.8 63.522 80 40.922 80S0 63.8 0 41.1C0 18.402 18.321 0 40.922 0Zm22.857 15.697c-13.817-13.474-36.234-13.754-49.77 0C.473 29.45 2.035 50.379 15.852 63.853 29.67 77.327 52.823 79.81 66.36 66.055c13.537-13.754 11.237-36.884-2.58-50.358Z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
