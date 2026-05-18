import { useEffect, useState } from 'react';

const DEFAULT_MS = 32;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Reveals `text` character-by-character; skips animation when `instant` is true. */
export function useBirdTypewriter(text: string | null, instant = false) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!text) {
      setDisplay('');
      return;
    }

    if (instant || prefersReducedMotion()) {
      setDisplay(text);
      return;
    }

    setDisplay('');
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setDisplay(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, DEFAULT_MS);

    return () => window.clearInterval(id);
  }, [text, instant]);

  return display;
}
