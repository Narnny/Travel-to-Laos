/**
 * Utility for resolving image paths reliably in development and production builds.
 * Vite automatically serves files in /public at the root path, so /public/images/foo.jpg
 * is available at /images/foo.jpg both in development and production (npm run build).
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/hero_laos_luang_prabang_1791277520221.jpg';

export function resolveImageUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  // Convert legacy or Vite development source paths to public production paths
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }

  if (url.startsWith('src/assets/images/')) {
    return url.replace('src/assets/images/', '/images/');
  }

  return url;
}

/**
 * Fallback event handler for <img onError={...} />
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback = DEFAULT_FALLBACK_IMAGE
) {
  const target = event.currentTarget;
  if (target.src !== fallback && !target.src.endsWith(fallback)) {
    target.src = fallback;
  }
}
