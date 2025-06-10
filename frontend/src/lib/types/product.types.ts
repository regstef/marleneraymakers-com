// The discriminant for our union type. Using a string enum is robust.
export enum ProductType {
  ARTWORK = 'artwork', // Direct purchase
  EXCLUSIVE = 'exclusive', // Lead funnel only
  BASIC = 'basic', // Made-to-measure
}

// Define available colors for the luxury aesthetic.
export type LuxuryColor = 'black' | 'white' | 'gray';

// Base interface with common properties for all product types.
interface ProductBase {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[]; // URLs to images
  type: ProductType; // The critical discriminant property
}

// Artwork: Standard e-commerce product.
export interface ArtworkProduct extends ProductBase {
  type: ProductType.ARTWORK;
  price: number; // in cents to avoid floating point issues
  stock: number;
  availableColors?: LuxuryColor[];
}

// Exclusives: Cannot be purchased directly. It's a lead generator.
export interface ExclusiveProduct extends ProductBase {
  type: ProductType.EXCLUSIVE;
  // No price or stock. Maybe has contact info or gallery details.
  inquiryContact: string; // e.g., email or phone number
  estimatedPriceRange?: string; // e.g., "€10,000 - €25,000"
}

// Basics: Made-to-measure with customization.
export interface BasicProduct extends ProductBase {
  type: ProductType.BASIC;
  basePrice: number; // Price before customizations
  customizationOptions?: {
    name: string; // e.g., "Size", "Material"
    options: string[]; // e.g., ["S", "M", "L", "XL"]
    priceModifier?: number; // Additional cost in cents
  }[];
  leadTime?: string; // e.g., "4-6 weeks"
}

// The discriminated union. This is our main Product type.
export type Product = ArtworkProduct | ExclusiveProduct | BasicProduct;

// Type guard to check if a product can be added to the cart.
export function isPurchasable(product: Product): product is ArtworkProduct | BasicProduct {
  return product.type === ProductType.ARTWORK || product.type === ProductType.BASIC;
}

// Type guard for exclusive products
export function isExclusive(product: Product): product is ExclusiveProduct {
  return product.type === ProductType.EXCLUSIVE;
}

// Type guard for artwork products
export function isArtwork(product: Product): product is ArtworkProduct {
  return product.type === ProductType.ARTWORK;
}

// Type guard for basic products
export function isBasic(product: Product): product is BasicProduct {
  return product.type === ProductType.BASIC;
}
