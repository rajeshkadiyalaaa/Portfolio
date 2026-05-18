/**
 * Tapered ink-style decorative underline with center dot.
 */
type BrushUnderlineProps = {
  className?: string;
  align?: 'center' | 'start';
};

export function BrushUnderline({ className = '', align = 'center' }: BrushUnderlineProps) {
  return (
    <span
      className={`rk-brush-underline rk-brush-underline--${align} ${className}`.trim()}
      aria-hidden
    >
      <svg
        className="rk-brush-underline__svg"
        viewBox="0 0 160 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M2 8 C34 5.5 58 10.5 80 8 C102 5.5 126 10.5 158 8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M12 8 C38 6.5 62 9.5 80 8 C98 6.5 122 9.5 148 8"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M28 8 C48 7.2 64 8.8 80 8 C96 7.2 112 8.8 132 8"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.38"
        />
        <circle cx="80" cy="8" r="2.75" fill="currentColor" opacity="0.72" />
      </svg>
    </span>
  );
}
