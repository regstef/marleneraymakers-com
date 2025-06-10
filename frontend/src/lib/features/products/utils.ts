// Product-specific utility functions
import type { Product } from '$types/product.types';

export function getProductUrl(product: Product, lang: string): string {
  const basePath = `/${lang}`;

  switch (product.type) {
    case 'artwork':
      return `${basePath}/products/${product.slug}`;
    case 'exclusive':
      return `${basePath}/exclusives/${product.slug}`;
    case 'basic':
      return `${basePath}/products/${product.slug}`;
    default:
      return basePath;
  }
}
