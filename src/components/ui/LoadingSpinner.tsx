/** 12-bar radial spinner (from loading.txt), styled with portfolio tokens. */

const BARS = [
  { animationDelay: '-1.2s', transform: 'rotate(.0001deg) translate(146%)' },
  { animationDelay: '-1.1s', transform: 'rotate(30deg) translate(146%)' },
  { animationDelay: '-1.0s', transform: 'rotate(60deg) translate(146%)' },
  { animationDelay: '-0.9s', transform: 'rotate(90deg) translate(146%)' },
  { animationDelay: '-0.8s', transform: 'rotate(120deg) translate(146%)' },
  { animationDelay: '-0.7s', transform: 'rotate(150deg) translate(146%)' },
  { animationDelay: '-0.6s', transform: 'rotate(180deg) translate(146%)' },
  { animationDelay: '-0.5s', transform: 'rotate(210deg) translate(146%)' },
  { animationDelay: '-0.4s', transform: 'rotate(240deg) translate(146%)' },
  { animationDelay: '-0.3s', transform: 'rotate(270deg) translate(146%)' },
  { animationDelay: '-0.2s', transform: 'rotate(300deg) translate(146%)' },
  { animationDelay: '-0.1s', transform: 'rotate(330deg) translate(146%)' },
] as const;

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
};

export function LoadingSpinner({ size = 40, className = '' }: LoadingSpinnerProps) {
  return (
    <div
      className={`rk-loading-spinner ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="rk-loading-spinner__hub" style={{ width: size, height: size }}>
        {BARS.map((bar) => (
          <div
            key={bar.transform}
            className="rk-loading-spinner__bar"
            style={{
              animationDelay: bar.animationDelay,
              transform: bar.transform,
            }}
          />
        ))}
      </div>
    </div>
  );
}
