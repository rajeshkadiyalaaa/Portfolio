/**
 * Shared water-ripple animator — one RAF loop for all section canvases.
 */

export type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
};

type Surface = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  root: HTMLElement;
  ripples: Ripple[];
  lastSpawn: { x: number; y: number; time: number };
  size: { width: number; height: number; dpr: number };
};

const RIPPLE_COLOR = '55, 72, 82';
const MAX_RIPPLES = 24;
const SPAWN_DISTANCE = 28;
const SPAWN_INTERVAL_MS = 55;
const EXPAND_SPEED = 1.75;
const FADE_RATE = 0.007;
const IDLE_STOP_MS = 220;

const surfaces = new Map<number, Surface>();
let nextSurfaceId = 1;
let rafId = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
let documentHidden = false;

function drawRipple(ctx: CanvasRenderingContext2D, ripple: Ripple): void {
  const { x, y, radius, opacity } = ripple;
  const progress = ripple.radius / ripple.maxRadius;
  const alpha = opacity * (1 - progress * 0.85);

  if (alpha <= 0.006) return;

  ctx.save();
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${RIPPLE_COLOR}, ${alpha * 0.95})`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.82, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${RIPPLE_COLOR}, ${alpha * 0.65})`;
  ctx.lineWidth = 1.75;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.58, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${RIPPLE_COLOR}, ${alpha * 0.4})`;
  ctx.lineWidth = 1.15;
  ctx.stroke();

  ctx.restore();
}

function hasActiveRipples(): boolean {
  for (const surface of surfaces.values()) {
    if (surface.ripples.length > 0) return true;
  }
  return false;
}

function scheduleIdleStop(): void {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    idleTimer = null;
    if (!hasActiveRipples()) stopLoop();
  }, IDLE_STOP_MS);
}

function tick(): void {
  rafId = 0;

  if (documentHidden || surfaces.size === 0) {
    if (hasActiveRipples()) {
      rafId = requestAnimationFrame(tick);
    }
    return;
  }

  let anyRipples = false;

  for (const surface of surfaces.values()) {
    const { ctx, ripples, size } = surface;
    ctx.clearRect(0, 0, size.width, size.height);

    for (let i = ripples.length - 1; i >= 0; i -= 1) {
      const ripple = ripples[i];
      ripple.radius += EXPAND_SPEED;
      ripple.opacity -= FADE_RATE;

      if (ripple.radius >= ripple.maxRadius || ripple.opacity <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      drawRipple(ctx, ripple);
      anyRipples = true;
    }

    if (ripples.length > 0) anyRipples = true;
  }

  if (anyRipples) {
    rafId = requestAnimationFrame(tick);
  } else {
    scheduleIdleStop();
  }
}

function startLoop(): void {
  if (rafId || documentHidden) return;
  rafId = requestAnimationFrame(tick);
}

function stopLoop(): void {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function touchEngine(): void {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
  startLoop();
}

function resizeSurface(surface: Surface): void {
  const rect = surface.root.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  surface.size = { width: rect.width, height: rect.height, dpr };
  surface.canvas.width = Math.floor(rect.width * dpr);
  surface.canvas.height = Math.floor(rect.height * dpr);
  surface.canvas.style.width = `${rect.width}px`;
  surface.canvas.style.height = `${rect.height}px`;
  surface.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function registerWaterSurface(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
): number {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return -1;

  const id = nextSurfaceId++;
  const surface: Surface = {
    canvas,
    ctx,
    root,
    ripples: [],
    lastSpawn: { x: 0, y: 0, time: 0 },
    size: { width: 0, height: 0, dpr: 1 },
  };

  surfaces.set(id, surface);
  resizeSurface(surface);
  return id;
}

export function resizeWaterSurface(id: number): void {
  const surface = surfaces.get(id);
  if (!surface) return;
  resizeSurface(surface);
}

export function unregisterWaterSurface(id: number): void {
  surfaces.delete(id);
  if (surfaces.size === 0) stopLoop();
}

export function spawnWaterRipple(
  id: number,
  clientX: number,
  clientY: number,
  touch: boolean,
): void {
  const surface = surfaces.get(id);
  if (!surface) return;

  const rect = surface.root.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  if (x < -24 || y < -24 || x > rect.width + 24 || y > rect.height + 24) return;

  const now = performance.now();
  const last = surface.lastSpawn;
  const dx = x - last.x;
  const dy = y - last.y;
  const dist = Math.hypot(dx, dy);
  const minDist = touch ? 34 : SPAWN_DISTANCE;
  const minInterval = touch ? 72 : SPAWN_INTERVAL_MS;

  if (dist < minDist && now - last.time < minInterval) return;

  surface.lastSpawn = { x, y, time: now };

  const pushRipple = (rx: number, ry: number) => {
    const maxRadius = 96 + Math.random() * 72;
    surface.ripples.push({
      x: rx,
      y: ry,
      radius: 6 + Math.random() * 8,
      maxRadius,
      opacity: 0.62 + Math.random() * 0.24,
    });
    if (surface.ripples.length > MAX_RIPPLES) {
      surface.ripples.splice(0, surface.ripples.length - MAX_RIPPLES);
    }
  };

  pushRipple(x, y);
  if (dist > minDist * 1.8) {
    pushRipple(x + (Math.random() - 0.5) * 12, y + (Math.random() - 0.5) * 12);
  }

  touchEngine();
}

function onVisibilityChange(): void {
  documentHidden = document.hidden;
  if (documentHidden) {
    stopLoop();
  } else if (hasActiveRipples()) {
    startLoop();
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', onVisibilityChange);
}
