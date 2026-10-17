import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark';

/** First visit: follow the operating system preference. */
function getPreferredTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}

/**
 * Persists the colour theme in localStorage and reflects it on the
 * `<html>` element via a `data-theme` attribute that the CSS reacts to.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'portfolio-theme',
    getPreferredTheme(),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
