import { useEffect, useState } from 'react';
import { MOBILE_LAYOUT_MQ } from '../lib/layout';

export function useMobileLayout(): boolean {
  const [mobile, setMobile] = useState(() => isMobileLayout());

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_LAYOUT_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return mobile;
}

function isMobileLayout(): boolean {
  return window.matchMedia(MOBILE_LAYOUT_MQ).matches;
}
