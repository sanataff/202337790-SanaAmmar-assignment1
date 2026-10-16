import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type WordsRevealProps = {
  text: string;
  className?: string;
};

/**
 * Reveals a paragraph word by word as it scrolls through the viewport.
 *
 * The words are written straight to the DOM in a `requestAnimationFrame`
 * loop (outside React's render cycle) so scrolling stays smooth; only
 * `opacity` is touched.
 */
export default function WordsReveal({ text, className = '' }: WordsRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(' ');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const spans = Array.from(element.querySelectorAll<HTMLElement>('.word'));
    if (reducedMotion) {
      spans.forEach((span) => (span.style.opacity = '1'));
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.85; // begins when the text is near the bottom
      const end = viewport * 0.35; // completes before it reaches the top
      const distance = rect.height + (start - end);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      const active = Math.round(progress * spans.length);

      spans.forEach((span, index) => {
        span.style.opacity = index < active ? '1' : '0.14';
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [text, reducedMotion]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="word">
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
