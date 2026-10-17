import { DrawablyBadge, DrawablyButton, DrawablyDivider } from 'drawably/react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { scrollToTop } from '../lib/scroll';

const letters = 'Sana Ammar'.split('');

export default function Footer() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>(0.2);

  return (
    <footer className="footer" aria-label="Footer">
      <DrawablyDivider className="footer__rule" />

      <div ref={ref} className="footer__name" role="img" aria-label="Sana Ammar">
        {letters.map((letter, index) => (
          <span className="footer__letter" aria-hidden="true" key={`${letter}-${index}`}>
            <span
              className={`footer__letter-inner ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          </span>
        ))}
      </div>

      <DrawablyDivider className="footer__rule footer__rule--bar" />

      <div className="footer__bar">
        <DrawablyBadge className="footer__meta">
          <span className="pulse" aria-hidden="true" /> Available for work
        </DrawablyBadge>
        <span className="footer__meta footer__meta--muted">
          © {new Date().getFullYear()} Sana Ammar
        </span>
        <DrawablyButton className="footer__top" onClick={scrollToTop}>
          Back to top ↑
        </DrawablyButton>
      </div>
    </footer>
  );
}
