/**
 * Free-roaming Lottie bird — explores the page (except Hero), perches on UI, flees from cursor.
 */
import { useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useBirdPreference } from '../../hooks/useBirdPreference';
import { usePageBird } from '../../hooks/usePageBird';
import { BirdThought } from './BirdThought';

const LOTTIE_SRC = '/Black_bird.lottie';

export function PageBird() {
  const { birdEnabled } = useBirdPreference();
  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const { enabled, thought, thoughtInstant } = usePageBird(
    wrapRef,
    spriteRef,
    thoughtRef,
    birdEnabled,
  );

  if (!birdEnabled || !enabled) return null;

  return (
    <div ref={wrapRef} className="rk-page-bird-wrap" aria-hidden>
      <BirdThought
        ref={thoughtRef}
        text={thought}
        visible={Boolean(thought)}
        instant={thoughtInstant}
      />
      <div ref={spriteRef} className="rk-page-bird__sprite">
        <DotLottieReact
          src={LOTTIE_SRC}
          loop
          autoplay
          className="rk-page-bird__lottie"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}

export default PageBird;
