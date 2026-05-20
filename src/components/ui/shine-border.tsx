/**
 * Contact form wrapper — static rounded border frame.
 */
import type { ReactNode } from 'react';

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
};

export function ShineBorder({ children, className = '' }: ShineBorderProps) {
  return (
    <div className={`rk-shine-border${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
