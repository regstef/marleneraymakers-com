// Main export file for all types

// Product types
export type {
  Product,
  ArtworkProduct,
  ExclusiveProduct,
  BasicProduct,
  LuxuryColor,
} from './product.types';

export { ProductType, isPurchasable, isExclusive, isArtwork, isBasic } from './product.types';

// Cart types
export type { Cart, CartItem, PurchasableProduct } from './cart.types';

export { calculateItemPrice } from './cart.types';
