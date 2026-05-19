/**
 * Scroll-triggered reveal — fade/slide in once when entering viewport.
 */
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { prefersReducedMotion } from '../../lib/layout';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Transition delay in ms (for stagger) */
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  title?: string;
};

export function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Component = 'div',
  style,
  href,
  target,
  rel,
  'aria-label': ariaLabel,
  title,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'rk-reveal',
    `rk-reveal--${variant}`,
    visible ? 'rk-reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </Component>
  );
}
