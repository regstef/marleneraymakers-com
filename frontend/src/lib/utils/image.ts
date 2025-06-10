/**
 * Image optimization utilities
 * Placeholder for future image optimization features
 */

import { penv } from '$lib/env.public';

export interface ImageTransform {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'scale' | 'fit' | 'fill' | 'crop' | 'pad';
}

/**
 * Generate Cloudinary URL with transformations
 */
export function getOptimizedImageUrl(publicId: string, transforms: ImageTransform = {}): string {
  const baseUrl = `https://res.cloudinary.com/${penv.PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const defaultTransforms = {
    q: transforms.quality || 'auto',
    f: transforms.format || 'auto',
  };

  const allTransforms: Record<string, string | number> = {
    ...defaultTransforms,
  };

  if (transforms.width) allTransforms.w = transforms.width;
  if (transforms.height) allTransforms.h = transforms.height;
  if (transforms.fit) allTransforms.c = transforms.fit;

  const transformString = Object.entries(allTransforms)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  publicId: string,
  widths: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(publicId, { width, format: 'auto' });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Calculate sizes attribute for responsive images
 */
export function calculateSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { mobile = '100vw', tablet = '50vw', desktop = '33vw' } = config;

  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

/**
 * Preload critical images
 */
export function preloadImage(url: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages(selector = 'img[data-lazy]'): void {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll<HTMLImageElement>(selector);

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;

          if (src) {
            img.src = src;
            img.removeAttribute('data-lazy');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Get blur data URL for placeholder
 * This is a placeholder - in production, generate actual blur hashes
 */
export function getBlurDataUrl(color = '#f3f4f6'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(color)}' filter='url(%23b)'/%3E%3C/svg%3E`;
}
