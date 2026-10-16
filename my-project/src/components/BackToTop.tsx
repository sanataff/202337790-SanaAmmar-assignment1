import { useEffect, useState } from 'react';
import { DrawablyButton } from 'drawably/react';
import { scrollToTop } from '../lib/scroll';

/**
 * Floating back-to-top button that fades in once the user has scrolled
 * past the first screen. Visibility is initialised from the current
 * scroll position so there is no set-state inside the effect.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(
    () => typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.8,
  );

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <DrawablyButton
      className={`back-to-top ${shown ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </DrawablyButton>
  );
}
