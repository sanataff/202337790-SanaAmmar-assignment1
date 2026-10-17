import type { ReactNode } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type MaskedTextProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds, for lines revealed in sequence. */
  delay?: number;
};

/**
 * A single line that slides up out of an overflow clip when it enters the
 * viewport — the signature heading reveal.
 */
export default function MaskedText({ children, className = '', delay = 0 }: MaskedTextProps) {
  const { ref, visible } = useRevealOnScroll<HTMLSpanElement>(0.3);

  return (
    <span ref={ref} className={`mask ${className}`.trim()}>
      <span
        className={`mask__inner ${visible ? 'is-visible' : ''}`}
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
