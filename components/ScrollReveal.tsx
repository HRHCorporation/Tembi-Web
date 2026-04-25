'use client';
import React, { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'zoomIn';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  animation = 'fadeUp',
}: ScrollRevealProps) {
  const { ref, isInView } = useInView();

  const baseStyle: React.CSSProperties = {
    transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  };

  const getInitialTransform = () => {
    const transforms: { [key: string]: string } = {
      fadeUp: 'translateY(32px)',
      fadeIn: 'none',
      slideLeft: 'translateX(-32px)',
      slideRight: 'translateX(32px)',
      scaleUp: 'scale(0.95)',
      zoomIn: 'scale(0.75)',
    };
    return transforms[animation] || 'none';
  };

  const dynamicStyle: React.CSSProperties = isInView
    ? {
        ...baseStyle,
        transform: 'translate(0, 0) scale(1)',
        opacity: 1,
      }
    : {
        ...baseStyle,
        transform: getInitialTransform(),
        opacity: animation === 'fadeIn' ? 0 : (animation === 'fadeUp' || animation === 'slideLeft' || animation === 'slideRight' ? 0 : 1),
      };

  return (
    <div
      ref={ref}
      style={dynamicStyle}
    >
      {children}
    </div>
  );
}
