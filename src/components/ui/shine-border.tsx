/**
 * Animated shine border wrapper — orange/white gradient, slow rotation.
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
