import { useEffect, useState } from 'react';
import { canUseWaterRipple, MOTION_EFFECT_MEDIA_QUERIES } from '../lib/layout';

/** Re-sync when viewport or motion preferences change. */
export function useWaterRippleEnabled(): boolean {
  const [enabled, setEnabled] = useState(() => canUseWaterRipple());

  useEffect(() => {
    const sync = () => setEnabled(canUseWaterRipple());
    sync();

    const media = MOTION_EFFECT_MEDIA_QUERIES.map((q) => window.matchMedia(q));
    media.forEach((mq) => mq.addEventListener('change', sync));
    return () => media.forEach((mq) => mq.removeEventListener('change', sync));
  }, []);

  return enabled;
}
