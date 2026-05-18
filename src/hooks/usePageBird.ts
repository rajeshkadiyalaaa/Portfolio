import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { pickBirdThought } from '../data/bird-thoughts';
import { BIRD_THOUGHT_EVENT } from '../lib/birdPreference';
import { canUsePageBird, MOTION_EFFECT_MEDIA_QUERIES } from '../lib/layout';

export const BIRD_SIZE = 56;
const SCARE_RADIUS = 88;
const FLEE_UNTIL = 160;
const ROAM_SPEED = 2.2;
const LAND_SPEED = 2.8;
const FLEE_SPEED = 7.5;
const LAND_MIN_MS = 8200;
const LAND_MAX_MS = 10200;
const PERCH_CHANCE = 0.78;
const NAV_CLEARANCE = 72;
const ROAM_THOUGHT_INTERVAL_MS = 22_000;

type Mode = 'roam' | 'land' | 'flee';

type Point = { x: number; y: number };

type BirdState = {
  x: number;
  y: number;
  mode: Mode;
  target: Point;
  landUntil: number;
  flipX: boolean;
};

function getAllowedBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
  const margin = 16;
  const hero = document.getElementById('home');
  let minY = NAV_CLEARANCE;

  if (hero) {
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom > minY) {
      minY = heroRect.bottom + 12;
    }
  }

  return {
    minX: margin,
    maxX: window.innerWidth - margin - BIRD_SIZE,
    minY,
    maxY: window.innerHeight - margin - BIRD_SIZE,
  };
}

function clampToBounds(p: Point): Point {
  const b = getAllowedBounds();
  return {
    x: Math.min(b.maxX, Math.max(b.minX, p.x)),
    y: Math.min(b.maxY, Math.max(b.minY, p.y)),
  };
}

function randomInBounds(): Point {
  const b = getAllowedBounds();
  if (b.maxY <= b.minY || b.maxX <= b.minX) {
    return { x: b.minX, y: b.minY };
  }
  return {
    x: b.minX + Math.random() * (b.maxX - b.minX),
    y: b.minY + Math.random() * (b.maxY - b.minY),
  };
}

function isWithinBounds(p: Point): boolean {
  const b = getAllowedBounds();
  return p.x >= b.minX && p.x <= b.maxX && p.y >= b.minY && p.y <= b.maxY;
}

function getPerchTargets(): Point[] {
  const targets: Point[] = [];

  document.querySelectorAll<HTMLElement>('[data-bird-perch]').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;

    const point = clampToBounds({
      x: rect.left + rect.width / 2 - BIRD_SIZE / 2,
      y: rect.top - BIRD_SIZE * 0.2,
    });

    if (isWithinBounds(point)) {
      targets.push(point);
    }
  });

  return targets;
}

function findPerchElementAt(birdX: number, birdY: number): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestDist = 24;

  document.querySelectorAll<HTMLElement>('[data-bird-perch]').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;

    const px = rect.left + rect.width / 2 - BIRD_SIZE / 2;
    const py = rect.top - BIRD_SIZE * 0.2;
    const dist = Math.hypot(px - birdX, py - birdY);

    if (dist < bestDist) {
      bestDist = dist;
      best = el;
    }
  });

  return best;
}

function pickPerchOrRoamTarget(): Point {
  const perches = getPerchTargets();
  if (perches.length > 0 && Math.random() < PERCH_CHANCE) {
    return perches[Math.floor(Math.random() * perches.length)]!;
  }
  return randomInBounds();
}

function isPerchTarget(target: Point): boolean {
  return getPerchTargets().some((p) => Math.hypot(p.x - target.x, p.y - target.y) < 14);
}

function roamSpeedForTarget(target: Point): number {
  return isPerchTarget(target) ? LAND_SPEED : ROAM_SPEED;
}

function moveToward(current: Point, target: Point, speed: number): { point: Point; arrived: boolean } {
  const dx = target.x - current.x;
  const dy = target.y - current.y;
  const dist = Math.hypot(dx, dy);

  if (dist <= speed || dist < 1) {
    return { point: { ...target }, arrived: true };
  }

  return {
    point: {
      x: current.x + (dx / dist) * speed,
      y: current.y + (dy / dist) * speed,
    },
    arrived: false,
  };
}

function fleeTarget(from: Point, mouse: Point): Point {
  const dx = from.x + BIRD_SIZE / 2 - mouse.x;
  const dy = from.y + BIRD_SIZE / 2 - mouse.y;
  const len = Math.hypot(dx, dy) || 1;
  return clampToBounds({
    x: from.x + (dx / len) * FLEE_UNTIL,
    y: from.y + (dy / len) * FLEE_UNTIL,
  });
}

function applyFlipDom(
  sprite: HTMLDivElement | null,
  thought: HTMLDivElement | null,
  flipX: boolean,
): void {
  if (sprite) {
    sprite.style.transform = `scaleX(${flipX ? -1 : 1})`;
  }
  if (thought) {
    thought.classList.toggle('rk-page-bird-thought--flip', flipX);
  }
}

export function usePageBird(
  wrapRef: RefObject<HTMLDivElement | null>,
  spriteRef: RefObject<HTMLDivElement | null>,
  thoughtRef: RefObject<HTMLDivElement | null>,
  birdEnabled: boolean,
) {
  const [enabled, setEnabled] = useState(false);
  const [thought, setThought] = useState<string | null>(null);
  const [thoughtInstant, setThoughtInstant] = useState(false);

  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const birdRef = useRef<BirdState | null>(null);
  const lastModeRef = useRef<Mode | null>(null);
  const lastFlipRef = useRef(false);
  const roamThoughtAtRef = useRef(0);
  const mountedRef = useRef(true);

  const showThought = useCallback((message: string, instant: boolean) => {
    if (!mountedRef.current) return;
    setThoughtInstant(instant);
    setThought(message);
  }, []);

  const handleModeChange = useCallback((prev: Mode | null, next: Mode) => {
    if (next === 'flee') {
      showThought(pickBirdThought('flee'), true);
    } else if (next === 'land') {
      const bird = birdRef.current;
      showThought(
        pickBirdThought('land', bird ? findPerchElementAt(bird.x, bird.y) : null),
        false,
      );
    } else if (next === 'roam' && prev === 'flee') {
      showThought(pickBirdThought('roam'), false);
      roamThoughtAtRef.current = performance.now() + ROAM_THOUGHT_INTERVAL_MS;
    }
  }, [showThought]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const stopBird = () => {
      setEnabled(false);
      setThought(null);
      setThoughtInstant(false);
      birdRef.current = null;
      lastModeRef.current = null;
      lastFlipRef.current = false;
    };

    const startBird = () => {
      const start = randomInBounds();
      birdRef.current = {
        x: start.x,
        y: start.y,
        mode: 'roam',
        target: pickPerchOrRoamTarget(),
        landUntil: 0,
        flipX: false,
      };

      setEnabled(true);
      showThought(pickBirdThought('greeting'), false);
      roamThoughtAtRef.current = performance.now() + ROAM_THOUGHT_INTERVAL_MS;
      lastModeRef.current = 'roam';
    };

    const sync = () => {
      if (!birdEnabled || !canUsePageBird()) {
        stopBird();
        return;
      }
      if (!birdRef.current) startBird();
    };

    sync();

    const onResize = () => {
      const bird = birdRef.current;
      if (!bird) return;
      const clamped = clampToBounds({ x: bird.x, y: bird.y });
      bird.x = clamped.x;
      bird.y = clamped.y;
    };

    const onCustomThought = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (!message) return;
      showThought(message, false);
    };

    const media = MOTION_EFFECT_MEDIA_QUERIES.map((q) => window.matchMedia(q));
    media.forEach((mq) => mq.addEventListener('change', sync));

    window.addEventListener('resize', onResize);
    window.addEventListener(BIRD_THOUGHT_EVENT, onCustomThought);

    return () => {
      media.forEach((mq) => mq.removeEventListener('change', sync));
      window.removeEventListener('resize', onResize);
      window.removeEventListener(BIRD_THOUGHT_EVENT, onCustomThought);
      stopBird();
    };
  }, [birdEnabled, showThought]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let paused = document.hidden;

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused && birdRef.current) {
        raf = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    const tick = () => {
      raf = 0;

      if (paused || !birdRef.current) return;

      const bird = birdRef.current;
      const mouse = mouseRef.current;
      const birdCenter = { x: bird.x + BIRD_SIZE / 2, y: bird.y + BIRD_SIZE / 2 };
      const mouseDist = Math.hypot(mouse.x - birdCenter.x, mouse.y - birdCenter.y);

      if (bird.mode !== 'flee' && mouseDist < SCARE_RADIUS) {
        bird.mode = 'flee';
        bird.target = fleeTarget({ x: bird.x, y: bird.y }, mouse);
        bird.landUntil = 0;
      }

      if (bird.mode === 'roam' && performance.now() >= roamThoughtAtRef.current) {
        showThought(pickBirdThought('roam'), false);
        roamThoughtAtRef.current =
          performance.now() + ROAM_THOUGHT_INTERVAL_MS + Math.random() * 8_000;
      }

      if (bird.mode === 'flee') {
        const { point, arrived } = moveToward({ x: bird.x, y: bird.y }, bird.target, FLEE_SPEED);
        bird.x = point.x;
        bird.y = point.y;
        bird.flipX = bird.target.x < bird.x;

        if (arrived || mouseDist > SCARE_RADIUS * 1.6) {
          bird.mode = 'roam';
          bird.target = pickPerchOrRoamTarget();
        }
      } else if (bird.mode === 'land') {
        if (performance.now() >= bird.landUntil) {
          bird.mode = 'roam';
          bird.target = pickPerchOrRoamTarget();
        }
      } else {
        const { point, arrived } = moveToward(
          { x: bird.x, y: bird.y },
          bird.target,
          roamSpeedForTarget(bird.target),
        );
        bird.x = point.x;
        bird.y = point.y;
        bird.flipX = bird.target.x < bird.x;

        if (arrived) {
          const perches = getPerchTargets();
          const onPerch = perches.some((p) => Math.hypot(p.x - bird.x, p.y - bird.y) < 10);

          if (onPerch) {
            bird.mode = 'land';
            bird.landUntil =
              performance.now() + LAND_MIN_MS + Math.random() * (LAND_MAX_MS - LAND_MIN_MS);
          } else {
            bird.target = pickPerchOrRoamTarget();
          }
        }
      }

      if (bird.mode !== lastModeRef.current) {
        handleModeChange(lastModeRef.current, bird.mode);
        lastModeRef.current = bird.mode;
      }

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.transform = `translate3d(${bird.x}px, ${bird.y}px, 0)`;
      }

      if (bird.flipX !== lastFlipRef.current) {
        lastFlipRef.current = bird.flipX;
        applyFlipDom(spriteRef.current, thoughtRef.current, bird.flipX);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [enabled, wrapRef, spriteRef, thoughtRef, handleModeChange, showThought]);

  return { enabled, thought, thoughtInstant };
}
