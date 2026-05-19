import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react';
import { MOBILE_LAYOUT_MQ, prefersReducedMotion } from '../lib/layout';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (x: number) => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2);

function computeFocus(scrollEl: HTMLElement, node: HTMLElement): number {
  const cRect = scrollEl.getBoundingClientRect();
  const cCenter = cRect.left + cRect.width / 2;
  const maxDist = cRect.width * 0.52;
  const r = node.getBoundingClientRect();
  const dist = Math.abs(r.left + r.width / 2 - cCenter);
  return ease(Math.max(0, Math.min(1, 1 - dist / maxDist)));
}

function applyFocusStyle(
  node: HTMLElement,
  focus: number,
  reduced: boolean,
  mobile: boolean,
) {
  const scale = reduced ? 1 : mobile ? 0.9 + focus * 0.1 : 0.82 + focus * 0.18;
  const opacity = reduced ? 1 : mobile ? 0.45 + focus * 0.55 : 0.32 + focus * 0.68;
  const blurMax = mobile ? 1.5 : 4;
  node.style.transform = `scale(${scale})`;
  node.style.opacity = String(opacity);
  node.style.filter =
    reduced || (1 - focus) * blurMax <= 0.12
      ? 'none'
      : `blur(${((1 - focus) * blurMax).toFixed(2)}px)`;
  node.classList.toggle('rk-project-card--focused', focus > 0.72);
  node.classList.add('rk-project-card--carousel-ready');
}

/** Center-card focus: scale, opacity, blur based on distance from viewport center */
export function useCarouselFocus(scrollRef: RefObject<HTMLElement | null>) {
  const nodeMap = useRef<Record<number, HTMLElement>>({});
  const smoothed = useRef<Record<number, number>>({});
  const rafId = useRef<number>(0);
  const reducedRef = useRef(false);
  const mobileRef = useRef(false);

  const applyAll = useCallback(
    (instant: boolean) => {
      const el = scrollRef.current;
      if (!el) return;
      const reduced = reducedRef.current;
      const mobile = mobileRef.current;

      Object.entries(nodeMap.current).forEach(([id, node]) => {
        const slot = Number(id);
        const target = computeFocus(el, node);
        const next = instant ? target : lerp(smoothed.current[slot] ?? target, target, 1);
        smoothed.current[slot] = next;
        applyFocusStyle(node, next, reduced, mobile);
      });
    },
    [scrollRef],
  );

  const registerNode = useCallback(
    (slot: number, node: HTMLElement | null) => {
      if (node) {
        nodeMap.current[slot] = node;
        const el = scrollRef.current;
        if (el) {
          const target = computeFocus(el, node);
          smoothed.current[slot] = target;
          applyFocusStyle(node, target, reducedRef.current, mobileRef.current);
        }
      } else {
        delete nodeMap.current[slot];
        delete smoothed.current[slot];
      }
    },
    [scrollRef],
  );

  useLayoutEffect(() => {
    reducedRef.current = prefersReducedMotion();
    const mq = window.matchMedia(MOBILE_LAYOUT_MQ);
    mobileRef.current = mq.matches;

    const onMqChange = () => {
      mobileRef.current = mq.matches;
      applyAll(true);
    };
    mq.addEventListener('change', onMqChange);

    applyAll(true);

    let firstFrame = true;
    const tick = () => {
      const el = scrollRef.current;
      if (!el) return;

      const reduced = reducedRef.current;
      const mobile = mobileRef.current;
      const lerpT = firstFrame ? 1 : 0.12;
      firstFrame = false;

      Object.entries(nodeMap.current).forEach(([id, node]) => {
        const slot = Number(id);
        const target = computeFocus(el, node);
        const next = lerp(smoothed.current[slot] ?? target, target, lerpT);
        smoothed.current[slot] = next;
        applyFocusStyle(node, next, reduced, mobile);
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId.current);
      mq.removeEventListener('change', onMqChange);
    };
  }, [scrollRef, applyAll]);

  return registerNode;
}
