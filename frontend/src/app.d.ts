// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      // Add user session, language preference, etc.
      language?: 'en' | 'de';
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env?: Record<string, unknown>;
    }
  }

  // Environment variable types
  namespace NodeJS {
    interface ProcessEnv {
      // Public variables
      PUBLIC_STRAPI_URL: string;
      PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      PUBLIC_PLAUSIBLE_DOMAIN?: string;
      PUBLIC_GTM_ID?: string;
      PUBLIC_FB_PIXEL_ID?: string;

      // Private variables
      DATABASE_URL?: string;
      STRIPE_SECRET_KEY?: string;
      STRIPE_WEBHOOK_SECRET?: string;
      BREVO_API_KEY?: string;
      CLOUDINARY_API_KEY?: string;
      CLOUDINARY_API_SECRET?: string;

      // Development
      DEBUG?: string;
      RATE_LIMIT_PER_MINUTE?: string;

      // Feature flags
      FEATURE_NEWSLETTER?: string;
      FEATURE_REVIEWS?: string;
      FEATURE_WISHLIST?: string;
    }
  }
}

export {};
