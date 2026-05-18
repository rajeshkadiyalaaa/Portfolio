/**
 * Shared section eyebrow label — lines, diamonds, uppercase orange text.
 */
import type { ReactNode } from 'react';

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`rk-section-label-wrap ${className}`.trim()}>
      <span className="rk-section-label-line" aria-hidden />
      <span className="rk-section-label-diamond" aria-hidden />
      <p className="rk-section-label">{children}</p>
      <span className="rk-section-label-diamond" aria-hidden />
      <span className="rk-section-label-line" aria-hidden />
    </div>
  );
}
