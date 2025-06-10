import { z } from 'zod';
import {
  PUBLIC_STRAPI_URL,
  PUBLIC_STRIPE_PUBLISHABLE_KEY,
  PUBLIC_CLOUDINARY_CLOUD_NAME,
  PUBLIC_PLAUSIBLE_DOMAIN,
  PUBLIC_GTM_ID,
  PUBLIC_FB_PIXEL_ID,
} from '$env/static/public';
import { building, dev } from '$app/environment';

// Schema for public environment variables
const publicEnvSchema = z.object({
  // Required in production
  PUBLIC_STRAPI_URL: z.string().url(),
  PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),

  // Optional
  PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  PUBLIC_GTM_ID: z.string().optional(),
  PUBLIC_FB_PIXEL_ID: z.string().optional(),
});

// Create the env object from static imports
const publicEnvRaw = {
  PUBLIC_STRAPI_URL,
  PUBLIC_STRIPE_PUBLISHABLE_KEY,
  PUBLIC_CLOUDINARY_CLOUD_NAME,
  PUBLIC_PLAUSIBLE_DOMAIN,
  PUBLIC_GTM_ID,
  PUBLIC_FB_PIXEL_ID,
};

// Don't validate during build time
let publicEnv = {} as z.infer<typeof publicEnvSchema>;

if (!building) {
  try {
    // In development, allow test keys
    if (dev) {
      publicEnvSchema.shape.PUBLIC_STRAPI_URL.optional();
      publicEnvSchema.shape.PUBLIC_STRIPE_PUBLISHABLE_KEY.optional();
      publicEnvSchema.shape.PUBLIC_CLOUDINARY_CLOUD_NAME.optional();
    }

    publicEnv = publicEnvSchema.parse(publicEnvRaw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
        .join('\n');

      console.error(
        `Invalid public environment variables:\n${errorMessage}\n\nPlease check your .env file.`
      );

      // In development, use defaults
      if (dev) {
        publicEnv = {
          ...publicEnvRaw,
          PUBLIC_STRAPI_URL: publicEnvRaw.PUBLIC_STRAPI_URL || 'http://localhost:1337',
          PUBLIC_STRIPE_PUBLISHABLE_KEY:
            publicEnvRaw.PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
          PUBLIC_CLOUDINARY_CLOUD_NAME: publicEnvRaw.PUBLIC_CLOUDINARY_CLOUD_NAME || 'placeholder',
        } as z.infer<typeof publicEnvSchema>;
      } else {
        throw new Error(`Invalid public environment variables:\n${errorMessage}`);
      }
    } else {
      throw error;
    }
  }
}

export const penv = publicEnv;

// Helper to get Cloudinary URL
export function getCloudinaryUrl(publicId: string, options?: Record<string, string | number>) {
  const baseUrl = `https://res.cloudinary.com/${penv.PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformations = options
    ? '/' +
      Object.entries(options)
        .map(([k, v]) => `${k}_${v}`)
        .join(',')
    : '';
  return `${baseUrl}${transformations}/${publicId}`;
}
