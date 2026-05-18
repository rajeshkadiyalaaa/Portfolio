/**
 * Lake-surface ripples — registers with shared waterRippleEngine (single RAF).
 */
import { useEffect, useRef } from 'react';
import { useWaterRippleEnabled } from '../../hooks/useMotionEffects';
import {
  registerWaterSurface,
  resizeWaterSurface,
  spawnWaterRipple,
  unregisterWaterSurface,
} from '../../lib/waterRippleEngine';

type WaterRippleProps = {
  className?: string;
};

export function WaterRipple({ className = '' }: WaterRippleProps) {
  const enabled = useWaterRippleEnabled();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceIdRef = useRef(-1);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const host = root.closest('[data-water-ripple]') as HTMLElement | null;
    if (!host) return;

    const id = registerWaterSurface(root, canvas);
    surfaceIdRef.current = id;
    if (id < 0) return;

    const resize = () => resizeWaterSurface(id);

    const onPointerMove = (event: PointerEvent) => {
      spawnWaterRipple(id, event.clientX, event.clientY, event.pointerType === 'touch');
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      spawnWaterRipple(id, event.clientX, event.clientY, true);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
      unregisterWaterSurface(id);
      surfaceIdRef.current = -1;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className={`rk-water-ripple${className ? ` ${className}` : ''}`}
      aria-hidden
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
