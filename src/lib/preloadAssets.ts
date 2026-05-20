/**
 * Preload critical portfolio assets (no PDFs) before first paint of the main app.
 */

import { MOBILE_LAYOUT_MQ } from './layout';
import { staticAsset } from './staticAssets';

export type PreloadProgress = {
  /** Snapped to 10, 20, … 100 */
  percent: number;
};

type ProgressCallback = (progress: PreloadProgress) => void;

const IMAGE_URLS = [
  '/profile.png',
  '/hero-content.png',
  '/hero-mobile-poster.webp',
  '/mountain-art.webp',
  '/mountain-right.webp',
  '/about-footer.webp',
  '/about-footer-1280.webp',
  '/projects-footer.webp',
  '/projects-footer-1280.webp',
  staticAsset('/background/about_upper_left.png'),
  staticAsset('/background/about_upper_right.png'),
  staticAsset('/background/upper_left.png'),
  staticAsset('/background/upper_right.png'),
  staticAsset('/background/downleft.png'),
  staticAsset('/background/downright.png'),
  staticAsset('/background/contact_upper_left.png'),
  staticAsset('/background/contact_down_left.png'),
  staticAsset('/background/contact_down_right.png'),
  '/Project_Images/Assistant.png',
  '/Project_Images/Dental_caries.png',
  '/Project_Images/image_style_Transfer.png',
  '/Project_Images/MCQS.png',
  '/Project_Images/Point of sale.png',
] as const;

const LOTTIE_URL = '/Black_bird.lottie';

const FONT_FAMILIES = [
  "400 1em 'DM Sans'",
  "300 1em 'DM Sans'",
  "500 1em 'DM Sans'",
  "700 1em 'Playfair Display'",
  "900 1em 'Playfair Display'",
  "400 1em 'Cormorant SC'",
  "500 1em 'Cormorant SC'",
  "600 1em 'Cormorant SC'",
  "700 1em 'Cormorant SC'",
];

const MIN_LOADER_MS = 900;
const MAX_LOADER_MS = 14_000;
const PER_TASK_TIMEOUT_MS = 8_000;

function snapPercent(completed: number, total: number): number {
  if (total <= 0) return 100;
  const raw = (completed / total) * 100;
  return Math.min(100, Math.max(10, Math.ceil(raw / 10) * 10));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        window.clearTimeout(timer);
        reject(err);
      });
  });
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`image: ${src}`));
    img.src = src;
  });
}

function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const done = () => {
      video.removeAttribute('src');
      video.load();
      resolve();
    };

    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('error', () => reject(new Error(`video: ${src}`)), { once: true });
    video.src = src;
  });
}

function preloadFetch(src: string): Promise<void> {
  return fetch(src, { cache: 'force-cache' }).then(
    (res) => {
      if (!res.ok) throw new Error(`fetch: ${src}`);
    },
    () => {
      throw new Error(`fetch: ${src}`);
    },
  );
}

function preloadFonts(): Promise<void> {
  if (!document.fonts?.load) {
    return document.fonts?.ready ?? Promise.resolve();
  }

  return Promise.all(
    FONT_FAMILIES.map((spec) =>
      document.fonts.load(spec).catch(() => undefined),
    ),
  ).then(() => document.fonts.ready);
}

function getHeroVideoUrl(): string {
  if (typeof window === 'undefined') return '/boat_peddaling.mp4';
  return window.matchMedia(MOBILE_LAYOUT_MQ).matches
    ? '/mobile-video-layout.mp4'
    : '/boat_peddaling.mp4';
}

/** Build preload task list for the current viewport (hero video matches mobile/desktop). */
function buildPreloadTasks(): Array<() => Promise<void>> {
  const heroVideo = getHeroVideoUrl();
  const wrap = (fn: () => Promise<void>) => () =>
    withTimeout(fn(), PER_TASK_TIMEOUT_MS).catch(() => undefined);

  return [
    wrap(preloadFonts),
    wrap(() => preloadVideo(heroVideo)),
    wrap(() => preloadFetch(LOTTIE_URL)),
    ...IMAGE_URLS.map((src) => wrap(() => preloadImage(src))),
  ];
}

/**
 * Run all preload tasks; reports 10%–100% progress. Resolves even if some assets fail.
 */
async function preloadPortfolioAssets(
  onProgress?: ProgressCallback,
): Promise<void> {
  const tasks = buildPreloadTasks();
  const total = tasks.length;
  let completed = 0;

  const report = () => {
    onProgress?.({ percent: snapPercent(completed, total) });
  };

  report();

  const started = performance.now();

  await Promise.all(
    tasks.map(async (task) => {
      await task();
      completed += 1;
      report();
    }),
  );

  const elapsed = performance.now() - started;
  if (elapsed < MIN_LOADER_MS) {
    await new Promise((r) => window.setTimeout(r, MIN_LOADER_MS - elapsed));
  }

  onProgress?.({ percent: 100 });
}

export async function runInitialLoad(onProgress?: ProgressCallback): Promise<void> {
  const cap = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MAX_LOADER_MS);
  });

  await Promise.race([preloadPortfolioAssets(onProgress), cap]);
  onProgress?.({ percent: 100 });
}
