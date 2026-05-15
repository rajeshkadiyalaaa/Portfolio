import { useEffect, type RefObject } from 'react';

const VIDEO_SRC = '/boat_peddaling.mp4';
const VISIBILITY_THRESHOLD = 0.35;

function shouldSkipVideo(): boolean {
  if (typeof window === 'undefined') return false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return true;
  if (connection?.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)) {
    return true;
  }

  return false;
}

function isHeroVisible(section: HTMLElement): boolean {
  const rect = section.getBoundingClientRect();
  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight / rect.height >= VISIBILITY_THRESHOLD;
}

export function useHeroVideoPlayback(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>
): boolean {
  const skipVideo = shouldSkipVideo();

  useEffect(() => {
    if (skipVideo) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let playing = false;

    const ensureSource = () => {
      if (!video.getAttribute('src')) {
        video.src = VIDEO_SRC;
      }
    };

    const setPlaying = (next: boolean) => {
      if (next === playing) return;
      playing = next;

      if (next) {
        ensureSource();
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          video.load();
        }
        void video.play().catch(() => {
          playing = false;
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlaying(entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD);
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 0.6, 1] }
    );

    observer.observe(section);

    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        playing = false;
        return;
      }
      setPlaying(isHeroVisible(section));
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    if (isHeroVisible(section)) {
      ensureSource();
      setPlaying(true);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
      playing = false;
    };
  }, [sectionRef, videoRef, skipVideo]);

  return skipVideo;
}
