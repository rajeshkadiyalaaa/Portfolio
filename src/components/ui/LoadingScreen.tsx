import { LoadingSpinner } from './LoadingSpinner';

type LoadingScreenProps = {
  percent: number;
  exiting?: boolean;
};

export function LoadingScreen({ percent, exiting = false }: LoadingScreenProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className={`rk-loading-screen${exiting ? ' rk-loading-screen--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label={`Loading portfolio, ${percent} percent`}
    >
      <div className="rk-loading-screen__inner">
        {reducedMotion ? (
          <p className="rk-loading-screen__label">Loading…</p>
        ) : (
          <LoadingSpinner size={44} />
        )}
        <p className="rk-loading-screen__percent">{percent}%</p>
      </div>
    </div>
  );
}
