/** Bump when replacing files under public/ so browsers fetch fresh art. */
export const STATIC_ASSET_VERSION = '20260521b';

export function staticAsset(path: string): string {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${STATIC_ASSET_VERSION}`;
}
