import { useCallback, useEffect, useState } from 'react';

/**
 * A small wrapper around `useState` that mirrors the value into
 * `localStorage`, so a preference survives a page reload.
 *
 * Reads and writes are wrapped in try/catch because storage can throw
 * (private browsing, disabled cookies, or a full quota).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — the app still works, it just won't persist.
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset] as const;
}
