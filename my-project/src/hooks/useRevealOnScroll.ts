import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view, using an
 * `IntersectionObserver`. Returns a ref to attach and a boolean that
 * drives the CSS transition.
 *
 * Falls back to "always visible" when the browser has no
 * IntersectionObserver support, so content is never hidden.
 */
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  // If the browser can't observe intersections, start visible so the
  // content is never hidden behind an animation that will not run.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
