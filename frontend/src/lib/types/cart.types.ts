import type { ArtworkProduct, BasicProduct } from './product.types';

// Only purchasable products can be in the cart.
export type PurchasableProduct = ArtworkProduct | BasicProduct;

export interface CartItem {
  productId: string;
  quantity: number;
  // Store the full product data for easy display in the cart,
  // or just the ID and fetch details on the cart page for freshness.
  // Storing full data is simpler for now.
  product: PurchasableProduct;
  // Store selected customizations for Basics
  selectedOptions?: Record<string, string>; // { "Size": "M", "Material": "Cotton" }
  // Calculated price including customizations
  itemPrice: number; // in cents
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  totalPrice: number; // in cents
}

// Helper function to calculate item price with customizations
export function calculateItemPrice(
  product: PurchasableProduct,
  selectedOptions?: Record<string, string>
): number {
  if (product.type === 'artwork') {
    return product.price;
  }

  // For basic products, start with base price
  let price = product.basePrice;

  // Add customization costs if applicable
  if (product.customizationOptions && selectedOptions) {
    product.customizationOptions.forEach((option) => {
      const selectedValue = selectedOptions[option.name];
      if (selectedValue && option.priceModifier) {
        price += option.priceModifier;
      }
    });
  }

  return price;
}
