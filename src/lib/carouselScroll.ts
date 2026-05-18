/** Smooth horizontal scroll with ease-out quart */
export function smoothScrollTo(
  el: HTMLElement,
  targetLeft: number,
  duration = 480,
): void {
  const start = el.scrollLeft;
  const delta = targetLeft - start;
  const ts = performance.now();
  const easeOut = (t: number) => 1 - (1 - t) ** 4;

  const step = (now: number) => {
    const t = Math.min((now - ts) / duration, 1);
    el.scrollLeft = start + delta * easeOut(t);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function getScrollTargetForSlot(
  scrollEl: HTMLElement,
  slot: number,
): number {
  const node = scrollEl.querySelector<HTMLElement>(`[data-carousel-slot="${slot}"]`);
  if (!node) return scrollEl.scrollLeft;
  return node.offsetLeft + node.offsetWidth / 2 - scrollEl.clientWidth / 2;
}

export function getCenteredSlot(scrollEl: HTMLElement): number {
  const mid = scrollEl.scrollLeft + scrollEl.clientWidth / 2;
  let best = 0;
  let bestDist = Infinity;

  scrollEl.querySelectorAll<HTMLElement>('[data-carousel-slot]').forEach((node) => {
    const slot = Number(node.dataset.carouselSlot);
    if (Number.isNaN(slot)) return;
    const center = node.offsetLeft + node.offsetWidth / 2;
    const d = Math.abs(center - mid);
    if (d < bestDist) {
      bestDist = d;
      best = slot;
    }
  });

  return best;
}
