import { useEffect, useState, type ReactNode } from 'react';
import { runInitialLoad } from '../../lib/preloadAssets';
import { LoadingScreen } from './LoadingScreen';

type AppGateProps = {
  children: ReactNode;
};

const EXIT_MS = 480;

export function AppGate({ children }: AppGateProps) {
  const skipLoader = import.meta.env.DEV;
  const [percent, setPercent] = useState(10);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>(skipLoader ? 'done' : 'loading');

  useEffect(() => {
    if (skipLoader) return;

    document.body.classList.add('rk-is-loading');

    let cancelled = false;

    runInitialLoad(({ percent: next }) => {
      if (!cancelled) setPercent(next);
    }).then(() => {
      if (cancelled) return;
      setPercent(100);
      setPhase('exit');
      window.setTimeout(() => {
        if (!cancelled) setPhase('done');
      }, EXIT_MS);
    });

    return () => {
      cancelled = true;
      document.body.classList.remove('rk-is-loading');
    };
  }, [skipLoader]);

  useEffect(() => {
    if (phase === 'done') {
      document.body.classList.remove('rk-is-loading');
    }
  }, [phase]);

  const showLoader = phase === 'loading' || phase === 'exit';
  const showApp = phase === 'done';

  return (
    <>
      {showLoader ? <LoadingScreen percent={percent} exiting={phase === 'exit'} /> : null}
      <div
        className={`rk-app-shell${showApp ? ' rk-app-shell--visible' : ' rk-app-shell--hidden'}`}
        aria-hidden={!showApp}
      >
        {showApp ? children : null}
      </div>
    </>
  );
}
