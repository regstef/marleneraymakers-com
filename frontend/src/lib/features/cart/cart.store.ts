import { writable, derived } from 'svelte/store';
import type { Cart, CartItem } from '$types/cart.types';
import type { ArtworkProduct, BasicProduct } from '$types/product.types';
import { calculateItemPrice } from '$types/cart.types';

// Initialize empty cart
const initialCart: Cart = {
  items: [],
  itemCount: 0,
  totalPrice: 0,
};

// Create the writable store
const { subscribe, set, update } = writable<Cart>(initialCart);

// Helper function to calculate cart totals
function calculateTotals(items: CartItem[]): { itemCount: number; totalPrice: number } {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => {
    return total + item.itemPrice * item.quantity;
  }, 0);

  return { itemCount, totalPrice };
}

// Cart store with methods
export const cart = {
  subscribe,

  addItem: (
    product: ArtworkProduct | BasicProduct,
    quantity: number = 1,
    selectedOptions?: Record<string, string>
  ) => {
    update((currentCart) => {
      // Calculate item price based on product type and options
      const itemPrice = calculateItemPrice(product, selectedOptions);

      // Check if item already exists with same options
      const existingItemIndex = currentCart.items.findIndex(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        currentCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        currentCart.items.push({
          productId: product.id,
          quantity,
          product,
          selectedOptions,
          itemPrice, // Store the calculated price
        });
      }

      // Recalculate totals
      const { itemCount, totalPrice } = calculateTotals(currentCart.items);
      currentCart.itemCount = itemCount;
      currentCart.totalPrice = totalPrice;

      return currentCart;
    });
  },

  removeItem: (productId: string) => {
    update((currentCart) => {
      currentCart.items = currentCart.items.filter((item) => item.productId !== productId);

      // Recalculate totals
      const { itemCount, totalPrice } = calculateTotals(currentCart.items);
      currentCart.itemCount = itemCount;
      currentCart.totalPrice = totalPrice;

      return currentCart;
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    update((currentCart) => {
      const item = currentCart.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);

        // Remove item if quantity is 0
        if (item.quantity === 0) {
          currentCart.items = currentCart.items.filter((item) => item.productId !== productId);
        }

        // Recalculate totals
        const { itemCount, totalPrice } = calculateTotals(currentCart.items);
        currentCart.itemCount = itemCount;
        currentCart.totalPrice = totalPrice;
      }

      return currentCart;
    });
  },

  clear: () => set(initialCart),
};

// Derived store for checking if cart is empty
export const isCartEmpty = derived(cart, ($cart) => $cart.items.length === 0);
