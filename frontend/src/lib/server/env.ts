import { z } from 'zod';
import { building } from '$app/environment';

// Schema for server-side environment variables
const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(), // Optional for now

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),

  // Brevo (Email)
  BREVO_API_KEY: z.string().min(1).optional(),

  // Cloudinary
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),

  // Development
  DEBUG: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .default('false'),
  RATE_LIMIT_PER_MINUTE: z.string().transform(Number).pipe(z.number().positive()).default('60'),

  // Feature flags
  FEATURE_NEWSLETTER: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .default('true'),
  FEATURE_REVIEWS: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .default('false'),
  FEATURE_WISHLIST: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .default('false'),
});

// Don't validate during build time
let serverEnv = {} as z.infer<typeof serverEnvSchema>;

if (!building) {
  try {
    serverEnv = serverEnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
        .join('\n');

      throw new Error(
        `Invalid environment variables:\n${errorMessage}\n\nPlease check your .env file.`
      );
    }
    throw error;
  }
}

export const env = serverEnv;

// Export feature flags separately for convenience
export const features = {
  newsletter: serverEnv.FEATURE_NEWSLETTER,
  reviews: serverEnv.FEATURE_REVIEWS,
  wishlist: serverEnv.FEATURE_WISHLIST,
} as const;
