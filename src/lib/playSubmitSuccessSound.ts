/** Play contact form success chime (respects reduced motion). */

const SUCCESS_SOUND_SRC = '/Sucessful_Submit.mp3';

let audio: HTMLAudioElement | null = null;

export function playSubmitSuccessSound(): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    if (!audio) {
      audio = new Audio(SUCCESS_SOUND_SRC);
      audio.preload = 'auto';
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {
      /* Autoplay policy or missing file — ignore */
    });
  } catch {
    /* Unsupported environment */
  }
}
