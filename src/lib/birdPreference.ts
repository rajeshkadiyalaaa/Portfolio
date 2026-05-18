const STORAGE_KEY = 'rk-bird-enabled';
export const BIRD_TOGGLE_EVENT = 'rk-bird-toggle';
export const BIRD_THOUGHT_EVENT = 'rk-bird-thought';

export function getBirdEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) return true;
  return stored === 'true';
}

export function setBirdEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEY, String(enabled));
  window.dispatchEvent(new CustomEvent(BIRD_TOGGLE_EVENT, { detail: enabled }));
}

export function emitBirdThought(message: string): void {
  window.dispatchEvent(new CustomEvent(BIRD_THOUGHT_EVENT, { detail: message }));
}
