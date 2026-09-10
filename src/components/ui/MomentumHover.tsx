import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MomentumHoverProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function MomentumHover({ children, className = '', intensity = 10 }: MomentumHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform({
      x: (x - centerX) * 0.1,
      y: (y - centerY) * 0.1,
      rotateX,
      rotateY,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: transform.x,
        y: transform.y,
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
