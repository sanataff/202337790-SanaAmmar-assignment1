import type { ReactNode } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
};

/**
 * Fades, rises and un-blurs its children the first time they scroll into view.
 * Motion is disabled automatically for users who prefer reduced motion.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
