import { useCallback, useEffect, useState } from 'react';
import { BIRD_TOGGLE_EVENT, getBirdEnabled, setBirdEnabled } from '../lib/birdPreference';

export function useBirdPreference() {
  const [birdEnabled, setBirdEnabledState] = useState(() => getBirdEnabled());

  useEffect(() => {
    const onToggle = (event: Event) => {
      const custom = event as CustomEvent<boolean>;
      setBirdEnabledState(custom.detail);
    };

    window.addEventListener(BIRD_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(BIRD_TOGGLE_EVENT, onToggle);
  }, []);

  const toggleBird = useCallback(() => {
    const next = !getBirdEnabled();
    setBirdEnabled(next);
    setBirdEnabledState(next);
  }, []);

  return { birdEnabled, toggleBird, setBirdEnabled: setBirdEnabledState };
}
