/** Shared layout breakpoint — matches nav mobile menu & hero/about mobile */
export const MOBILE_LAYOUT_MQ = '(max-width: 900px)';

const DESKTOP_FINE_POINTER_MQ = '(hover: hover) and (pointer: fine)';
export const REDUCED_MOTION_MQ = '(prefers-reduced-motion: reduce)';

export function isMobileLayout(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MOBILE_LAYOUT_MQ).matches;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION_MQ).matches;
}

export function isDesktopFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(DESKTOP_FINE_POINTER_MQ).matches;
}

/** Water ripples on desktop pointer + mobile layout (touch-friendly). */
export function canUseWaterRipple(): boolean {
  if (prefersReducedMotion()) return false;
  return isMobileLayout() || isDesktopFinePointer();
}

/** Page bird — any viewport except reduced motion (user toggle still applies). */
export function canUsePageBird(): boolean {
  return !prefersReducedMotion();
}

export const MOTION_EFFECT_MEDIA_QUERIES = [
  MOBILE_LAYOUT_MQ,
  DESKTOP_FINE_POINTER_MQ,
  REDUCED_MOTION_MQ,
] as const;
