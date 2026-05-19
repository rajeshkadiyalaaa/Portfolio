import { useEffect, useRef, useState, type RefObject } from 'react';
import { MOBILE_LAYOUT_MQ, REDUCED_MOTION_MQ } from '../lib/layout';

const DESKTOP_VIDEO = '/boat_peddaling.mp4';
const MOBILE_VIDEO = '/mobile-video-layout.mp4';
const DESKTOP_POSTER = '/hero-content.png';
const MOBILE_POSTER = '/hero-mobile-poster.webp';
const VISIBILITY_THRESHOLD = 0.35;

export type HeroMedia = {
  videoSrc: string;
  poster: string;
  isMobile: boolean;
};

export function getHeroMedia(): HeroMedia {
  if (typeof window === 'undefined') {
    return { videoSrc: DESKTOP_VIDEO, poster: DESKTOP_POSTER, isMobile: false };
  }
  const isMobile = window.matchMedia(MOBILE_LAYOUT_MQ).matches;
  return {
    isMobile,
    videoSrc: isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO,
    poster: isMobile ? MOBILE_POSTER : DESKTOP_POSTER,
  };
}

function shouldSkipVideo(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

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

export function useHeroVideoPlayback(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
): { skipVideo: boolean; media: HeroMedia } {
  const [skipVideo, setSkipVideo] = useState(() => shouldSkipVideo());
  const [media, setMedia] = useState<HeroMedia>(getHeroMedia);
  const playingRef = useRef(false);

  useEffect(() => {
    const syncSkip = () => setSkipVideo(shouldSkipVideo());
    syncSkip();

    const motionMq = window.matchMedia(REDUCED_MOTION_MQ);
    motionMq.addEventListener('change', syncSkip);

    const connection = (
      navigator as Navigator & { connection?: EventTarget }
    ).connection;
    connection?.addEventListener?.('change', syncSkip);

    return () => {
      motionMq.removeEventListener('change', syncSkip);
      connection?.removeEventListener?.('change', syncSkip);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_LAYOUT_MQ);
    const syncMedia = () => setMedia(getHeroMedia());
    syncMedia();
    mq.addEventListener('change', syncMedia);
    return () => mq.removeEventListener('change', syncMedia);
  }, []);

  useEffect(() => {
    if (skipVideo) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const applySource = () => {
      if (video.getAttribute('src') !== media.videoSrc) {
        video.src = media.videoSrc;
        video.load();
      }
      if (video.poster !== media.poster) {
        video.poster = media.poster;
      }
    };

    const setPlaying = (next: boolean) => {
      if (next === playingRef.current) return;
      playingRef.current = next;

      if (next) {
        applySource();
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) video.load();
        void video.play().catch(() => {
          playingRef.current = false;
        });
      } else {
        video.pause();
      }
    };

    applySource();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlaying(entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD);
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 0.6, 1] },
    );

    observer.observe(section);

    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        playingRef.current = false;
        return;
      }
      const rect = section.getBoundingClientRect();
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      setPlaying(visibleHeight / rect.height >= VISIBILITY_THRESHOLD);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    if (section.getBoundingClientRect().height > 0) {
      const rect = section.getBoundingClientRect();
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visibleHeight / rect.height >= VISIBILITY_THRESHOLD) {
        setPlaying(true);
      }
    }

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
      playingRef.current = false;
    };
  }, [sectionRef, videoRef, skipVideo, media.videoSrc, media.poster]);

  return { skipVideo, media };
}
