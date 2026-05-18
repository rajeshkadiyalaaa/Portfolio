import { forwardRef } from 'react';
import { useBirdTypewriter } from '../../hooks/useBirdTypewriter';

type BirdThoughtProps = {
  text: string | null;
  visible: boolean;
  instant?: boolean;
};

export const BirdThought = forwardRef<HTMLDivElement, BirdThoughtProps>(function BirdThought(
  { text, visible, instant = false },
  ref,
) {
  const display = useBirdTypewriter(visible ? text : null, instant);
  const showCursor = !instant && display.length < (text?.length ?? 0);

  if (!visible || !text) return null;

  return (
    <div ref={ref} className="rk-page-bird-thought" aria-hidden>
      <p className="rk-page-bird-thought__text">
        {display}
        {showCursor ? <span className="rk-page-bird-thought__cursor" aria-hidden /> : null}
      </p>
    </div>
  );
});
