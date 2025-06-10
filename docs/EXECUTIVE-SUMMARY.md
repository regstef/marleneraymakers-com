# Executive Summary: marleneraymakers.com - Complete Claude-Code Reference

## 1. Project Overview & Business Logic

### 1.1 Core Business Concept
Nachhaltige Luxus E-Commerce-Plattform für Made-to-Measure Mode und digitale Kunst. **KRITISCH:** Drei fundamental verschiedene Produkttypen mit unterschiedlichen Kaufprozessen und Business-Logik.

### 1.2 Die 3 Produkttypen (ZENTRAL für alle Implementierungen)

#### 1.2.1 **Artwork** (Digitale Kunst)
```yaml
Beschreibung: Digitale Kunstwerke von Marlene
Maßanfertigung: NEIN
Bestand: Unikate oder limitierte Auflage
Kaufprozess: Direkter Checkout via Stripe
Customer Journey: Browse → Add to Cart → Checkout → Payment → Confirmation
Besonderheiten:
  - Stock Management (auto-decrement bei Kauf)
  - Sobald stock_quantity = 0 → "Ausverkauft"
  - is_unique_artwork flag für Unikate
```

#### 1.2.2 **Exclusives** (Individuelle Outfits) - LEAD FUNNEL
```yaml
Beschreibung: Komplette, hochindividuelle Outfits
Maßanfertigung: JA (intensive Beratung notwendig)
Preis: Individuell nach Absprache
Kaufprozess: KEIN direkter Checkout - Lead Funnel System!
Customer Journey: Browse → "Request Consultation" → Lead Form → CRM Entry → Manual Follow-up
Lead Funnel Details:
  - Mehrstufiges Formular (Kontaktdaten, Wünsche, Budget-Range)
  - Lead-Erfassung in Strapi (ExclusiveInquiry Type)
  - Automatische E-Mail an Marlene mit Lead-Details
  - Lead-Status-Tracking für Follow-up
```

#### 1.2.3 **Basics** (Standard Made-to-Measure)
```yaml
Beschreibung: Made-to-Measure Kleidungsstücke
Maßanfertigung: JA (standardisierte Prozesse)
Preis: Festpreis
Kaufprozess: Direkter Checkout via Stripe
Customer Journey: Browse → Add to Cart → Checkout → Payment → Measurement Instructions
Nach Checkout:
  1. Bestätigungsmail mit Choozr-Link/Anleitung
  2. Kunde übermittelt Maße extern (Choozr oder manuell)
  3. Order Status: "pending_measurements_external"
```

## 2. Technical Architecture

### 2.1 Final Tech Stack
```javascript
const techStack = {
  frontend: {
    framework: 'SvelteKit 5',
    css: 'Open Props',           // CSS Custom Properties only
    ui: 'Bits UI',              // Headless components
    forms: 'Superforms + Zod',
    state: 'Svelte Stores',
    i18n: 'Built-in pattern'     // DE/EN via [[lang]] route
  },
  backend: {
    cms: 'Strapi v5',
    database: 'PostgreSQL',
    media: 'Cloudinary'
  },
  integrations: {
    payments: 'Stripe',
    email: 'Brevo',
    analytics: 'Plausible',
    measurements: 'Choozr'      // Manual integration, no API
  },
  deployment: {
    frontend: 'Vercel',
    backend: 'Railway/Render'
  }
}
```

### 2.2 Environment Variables
```env
# Frontend (.env)
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
PUBLIC_CLOUDINARY_CLOUD_NAME=...
PUBLIC_PLAUSIBLE_DOMAIN=marleneraymakers.com

# Backend (Strapi .env)
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
BREVO_API_KEY=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## 3. Complete Strapi Content Architecture

### 3.1 Collection Types

#### Product (Core Business Logic)
```javascript
{
  // Identifikation
  name: { type: 'string', required: true, localizable: true },
  slug: { type: 'uid', targetField: 'name', localizable: true },
  product_type: { 
    type: 'enumeration', 
    enum: ['artwork', 'exclusive', 'basic'], 
    required: true 
  },
  
  // Preise (NUR für artwork & basic)
  base_price: { type: 'decimal', required: false },
  currency: { type: 'string', default: 'EUR' },
  
  // Stock (NUR für artwork)
  stock_quantity: { type: 'integer', default: 1, min: 0 },
  is_unique_artwork: { type: 'boolean', default: false },
  
  // Produktion (für exclusive & basic)
  production_days: { type: 'integer', default: 14 },
  
  // Content
  description: { type: 'richtext', localizable: true },
  gallery: { type: 'media', multiple: true, required: true },
  category: { type: 'relation', relation: 'manyToOne', target: 'api::category.category' },
  care_instructions: { type: 'richtext', localizable: true },
  size_guide_notes: { type: 'richtext', localizable: true },
  
  // Meta
  seo_meta: { type: 'component', component: 'shared.seo', localizable: true },
  published_at: { type: 'datetime' }
}
```

#### Customer Order
```javascript
{
  order_number: { type: 'string', unique: true },
  product_items: { type: 'json', required: true }, // Product snapshots
  
  // Customer Info
  customer_email: { type: 'email', required: true },
  customer_name: { type: 'string', required: true },
  customer_phone: { type: 'string' },
  
  // Addresses
  shipping_address: { type: 'json', required: true },
  billing_address: { type: 'json', required: true },
  
  // Payment
  total_price: { type: 'decimal', required: true },
  currency: { type: 'string', default: 'EUR' },
  payment_provider: { type: 'string', default: 'stripe' },
  payment_intent_id: { type: 'string' },
  
  // Status & Notes
  order_status: {
    type: 'enumeration',
    enum: [
      'pending_payment',
      'payment_failed', 
      'confirmed',
      'pending_measurements_external',
      'in_production',
      'quality_check',
      'shipped',
      'delivered',
      'cancelled'
    ],
    default: 'pending_payment'
  },
  special_requests: { type: 'text' },
  production_notes: { type: 'text', private: true },
  tracking_number: { type: 'string' },
  
  // Metadata
  language_preference: { type: 'string', enum: ['de', 'en'] },
  created_at: { type: 'datetime' }
}
```

#### Exclusive Inquiry (Lead Funnel) - NEU!
```javascript
{
  // Contact Info
  full_name: { type: 'string', required: true },
  email: { type: 'email', required: true },
  phone: { type: 'string' },
  preferred_contact: { type: 'enumeration', enum: ['email', 'phone', 'whatsapp'] },
  
  // Inquiry Details
  product_reference: { type: 'relation', relation: 'manyToOne', target: 'api::product.product' },
  inquiry_type: { type: 'enumeration', enum: ['full_outfit', 'modification', 'custom_design'] },
  description: { type: 'richtext', required: true },
  inspiration_images: { type: 'media', multiple: true },
  
  // Budget & Timeline
  budget_range: { 
    type: 'enumeration', 
    enum: ['under_5000', '5000_10000', '10000_20000', 'above_20000'] 
  },
  desired_timeline: { type: 'string' },
  event_date: { type: 'date' },
  
  // Lead Management
  lead_status: {
    type: 'enumeration',
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost'],
    default: 'new'
  },
  lead_score: { type: 'integer', min: 0, max: 100 },
  assigned_to: { type: 'string', default: 'Marlene' },
  internal_notes: { type: 'text', private: true },
  
  // Tracking
  source_campaign: { type: 'string' },
  conversion_value: { type: 'decimal' },
  created_at: { type: 'datetime' }
}
```

#### Blog Post
```javascript
{
  title: { type: 'string', required: true, localizable: true },
  slug: { type: 'uid', targetField: 'title', localizable: true },
  excerpt: { type: 'text', required: true, localizable: true },
  content: { type: 'richtext', required: true, localizable: true },
  featured_image: { type: 'media', required: true },
  
  // Categorization
  blog_categories: { 
    type: 'relation', 
    relation: 'manyToMany', 
    target: 'api::blog-category.blog-category' 
  },
  tags: { type: 'json' }, // Array of strings
  
  // Meta
  author_name: { type: 'string', default: 'Marlene Raymakers' },
  publication_date: { type: 'datetime', required: true },
  reading_time: { type: 'integer' }, // in minutes
  seo_meta: { type: 'component', component: 'shared.seo', localizable: true }
}
```

#### FAQ
```javascript
{
  question: { type: 'string', required: true, localizable: true },
  answer: { type: 'richtext', required: true, localizable: true },
  applies_to_product_type: {
    type: 'enumeration',
    enum: ['artwork', 'exclusive', 'basic', 'general'],
    required: true,
    default: 'general'
  },
  category: { type: 'enumeration', enum: ['ordering', 'shipping', 'care', 'measurements', 'other'] },
  display_order: { type: 'integer', required: true }
}
```

#### Category
```javascript
{
  name: { type: 'string', required: true, localizable: true },
  slug: { type: 'uid', targetField: 'name', localizable: true },
  description: { type: 'text', localizable: true },
  image: { type: 'media' },
  parent: { type: 'relation', relation: 'manyToOne', target: 'api::category.category' },
  display_order: { type: 'integer' },
  is_active: { type: 'boolean', default: true }
}
```

#### Blog Category
```javascript
{
  name: { type: 'string', required: true, localizable: true },
  slug: { type: 'uid', targetField: 'name', localizable: true },
  description: { type: 'text', localizable: true },
  color: { type: 'string' }, // For UI theming
  display_order: { type: 'integer' }
}
```

#### Newsletter Subscription
```javascript
{
  email: { type: 'email', required: true, unique: true },
  first_name: { type: 'string' },
  language_preference: { type: 'enumeration', enum: ['de', 'en'], default: 'de' },
  subscribed_at: { type: 'datetime' },
  confirmed_at: { type: 'datetime' },
  unsubscribed_at: { type: 'datetime' },
  source: { type: 'string' }, // Where they signed up
  tags: { type: 'json' }, // For segmentation
  brevo_contact_id: { type: 'string' },
  is_confirmed_via_brevo: { type: 'boolean', default: false }
}
```

#### Page Content (Dynamic Pages)
```javascript
{
  title: { type: 'string', required: true, localizable: true },
  slug: { type: 'uid', targetField: 'title', localizable: true },
  page_type: { 
    type: 'enumeration', 
    enum: ['standard', 'legal_notice', 'privacy_policy', 'terms_conditions', 'landing'],
    default: 'standard'
  },
  content_blocks: { 
    type: 'dynamiczone', 
    components: [
      'layout.hero',
      'layout.text-block',
      'layout.image-gallery',
      'layout.cta-section',
      'layout.testimonials'
    ],
    localizable: true 
  },
  seo_meta: { type: 'component', component: 'shared.seo', localizable: true }
}
```

### 3.2 Single Types

#### Global Settings
```javascript
{
  // Site Info
  site_name: { type: 'string', localizable: true },
  tagline: { type: 'string', localizable: true },
  logo: { type: 'media' },
  favicon: { type: 'media' },
  
  // Contact
  contact_email: { type: 'email', required: true },
  contact_phone: { type: 'string' },
  whatsapp_number: { type: 'string' },
  
  // Social Media
  social_media_links: { type: 'json' }, // [{platform: 'instagram', url: '...', icon: '...'}]
  
  // Business Info
  business_address: { type: 'richtext', localizable: true },
  vat_id: { type: 'string' },
  company_registration: { type: 'string' },
  
  // Defaults
  default_currency: { type: 'string', default: 'EUR' },
  default_language: { type: 'string', default: 'de' },
  maintenance_mode: { type: 'boolean', default: false },
  
  // SEO Defaults
  default_seo_image: { type: 'media' },
  google_analytics_id: { type: 'string' },
  plausible_domain: { type: 'string' }
}
```

### 3.3 Components

#### shared.seo
```javascript
{
  meta_title: { type: 'string', required: true, maxLength: 60 },
  meta_description: { type: 'text', required: true, maxLength: 160 },
  meta_image: { type: 'media' },
  keywords: { type: 'text' },
  canonical_url: { type: 'string' },
  no_index: { type: 'boolean', default: false },
  structured_data: { type: 'json' } // For JSON-LD
}
```

## 4. Frontend Implementation Details

### 4.1 Route Structure with i18n
```typescript
src/routes/
├── [[lang]]/                       // Optional language parameter
│   ├── +layout.svelte             // Root layout with i18n setup
│   ├── +layout.server.ts          // Load global settings
│   ├── +page.svelte               // Homepage
│   ├── products/
│   │   ├── +page.svelte           // Product listing
│   │   ├── +page.server.ts        // Load products with filters
│   │   └── [slug]/
│   │       ├── +page.svelte       // Product detail (3 types logic!)
│   │       └── +page.server.ts    // Load single product
│   ├── exclusives-inquiry/        // Lead funnel form
│   │   ├── +page.svelte          
│   │   └── +page.server.ts       // Form action
│   ├── cart/
│   │   └── +page.svelte          // Shopping cart (no exclusives!)
│   ├── checkout/
│   │   ├── +page.svelte          // Stripe checkout
│   │   ├── +page.server.ts       // Create payment intent
│   │   └── success/
│   │       └── +page.svelte      // Order confirmation
│   ├── blog/
│   │   ├── +page.svelte          
│   │   ├── +page.server.ts       // Paginated blog posts
│   │   └── [slug]/
│   │       ├── +page.svelte      
│   │       └── +page.server.ts   
│   └── [slug]/                    // Dynamic pages
│       ├── +page.svelte          
│       └── +page.server.ts       
└── api/
    ├── stripe/
    │   ├── webhook/+server.ts    // Stripe webhooks
    │   └── create-payment-intent/+server.ts
    ├── newsletter/
    │   └── subscribe/+server.ts  // Brevo integration
    └── contact/
        └── exclusive-inquiry/+server.ts // Lead capture
```

### 4.2 i18n Implementation Pattern
```typescript
// routes/[[lang]]/+layout.server.ts
export const load = async ({ params, url }) => {
  const lang = params.lang || 'de'; // Default to German
  const supportedLangs = ['de', 'en'];
  
  if (!supportedLangs.includes(lang)) {
    throw redirect(307, '/de' + url.pathname.slice(3));
  }
  
  return {
    lang,
    translations: await loadTranslations(lang)
  };
};
```

### 4.3 Product Type Component Logic
```svelte
<!-- components/ProductActions.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { addToCart } from '$lib/stores/cart';
  
  export let product: Product;
  
  $: isArtwork = product.product_type === 'artwork';
  $: isExclusive = product.product_type === 'exclusive';
  $: isBasic = product.product_type === 'basic';
  $: inStock = !isArtwork || product.stock_quantity > 0;
  
  async function handleAction() {
    if (isExclusive) {
      // Redirect to lead funnel with product reference
      goto(`/${$page.params.lang}/exclusives-inquiry?product=${product.slug}`);
    } else if (inStock) {
      // Add to cart (artwork or basic)
      addToCart(product);
    }
  }
</script>

{#if isExclusive}
  <button on:click={handleAction} class="btn-exclusive">
    Request Consultation
  </button>
{:else if inStock}
  <button on:click={handleAction} class="btn-primary">
    Add to Cart - €{product.base_price}
  </button>
{:else}
  <button disabled class="btn-disabled">
    Sold Out
  </button>
{/if}

<style>
  button {
    /* Open Props styling */
    padding: var(--size-3) var(--size-6);
    border-radius: var(--radius-2);
    font-weight: var(--font-weight-6);
    transition: all var(--ease-out-2) 200ms;
  }
  
  .btn-primary {
    background: var(--gray-10);
    color: var(--gray-0);
  }
  
  .btn-exclusive {
    background: var(--gray-0);
    color: var(--gray-10);
    border: var(--border-size-2) solid var(--gray-10);
  }
  
  .btn-disabled {
    background: var(--gray-3);
    color: var(--gray-6);
    cursor: not-allowed;
  }
</style>
```

### 4.4 Exclusive Lead Funnel Form
```svelte
<!-- routes/[[lang]]/exclusives-inquiry/+page.svelte -->
<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  
  const schema = z.object({
    // Contact
    full_name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    preferred_contact: z.enum(['email', 'phone', 'whatsapp']),
    
    // Inquiry
    inquiry_type: z.enum(['full_outfit', 'modification', 'custom_design']),
    description: z.string().min(50),
    budget_range: z.enum(['under_5000', '5000_10000', '10000_20000', 'above_20000']),
    desired_timeline: z.string(),
    
    // Hidden
    product_reference: z.string().optional(),
    source_campaign: z.string().optional()
  });
  
  const { form, errors, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance class="lead-form">
  <!-- Multi-step form implementation -->
  <!-- Step 1: Contact Info -->
  <!-- Step 2: Project Details -->
  <!-- Step 3: Budget & Timeline -->
</form>
```

## 5. Critical Implementation Patterns

### 5.1 Cart Store with Type Guards
```typescript
// stores/cart.ts
import { writable, derived } from 'svelte/store';

interface CartItem {
  product: Product;
  quantity: number;
}

function createCart() {
  const { subscribe, set, update } = writable<CartItem[]>([]);
  
  return {
    subscribe,
    addItem: (product: Product) => {
      // CRITICAL: Block exclusives from cart
      if (product.product_type === 'exclusive') {
        throw new Error('Exclusive products require consultation');
      }
      
      // Check stock for artwork
      if (product.product_type === 'artwork' && product.stock_quantity < 1) {
        throw new Error('This artwork is sold out');
      }
      
      update(items => {
        const existing = items.find(item => item.product.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          items.push({ product, quantity: 1 });
        }
        return items;
      });
    },
    
    canCheckout: derived(
      this,
      $cart => $cart.length > 0 && 
               $cart.every(item => ['artwork', 'basic'].includes(item.product.product_type))
    )
  };
}

export const cart = createCart();
```

### 5.2 Open Props Theme Setup
```css
/* app.css */
@import "open-props/style";
@import "open-props/normalize";

/* Brand Colors - Only 3! */
:root {
  /* Primary Palette */
  --color-ink: var(--gray-10);     /* Schwarz */
  --color-canvas: var(--gray-0);   /* Weiß */
  --color-accent: var(--gray-5);   /* Grau */
  
  /* Semantic Mappings */
  --color-primary: var(--color-ink);
  --color-secondary: var(--color-canvas);
  --color-muted: var(--color-accent);
  
  /* Surface Colors */
  --surface-1: var(--color-canvas);
  --surface-2: var(--gray-1);
  --surface-3: var(--gray-2);
  
  /* Text Colors */
  --text-1: var(--color-ink);
  --text-2: var(--gray-7);
  --text-3: var(--gray-6);
  
  /* State Colors (using grays) */
  --color-success: var(--gray-8);
  --color-warning: var(--gray-7);
  --color-error: var(--gray-9);
}

/* Component Base Styles */
.btn {
  /* Consistent button styling */
  font-family: var(--font-sans);
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-6);
  padding: var(--size-2) var(--size-4);
  border-radius: var(--radius-2);
  border: var(--border-size-1) solid transparent;
  cursor: pointer;
  transition: all var(--ease-out-2) 150ms;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.card {
  background: var(--surface-1);
  border: var(--border-size-1) solid var(--gray-3);
  border-radius: var(--radius-3);
  padding: var(--size-4);
  box-shadow: var(--shadow-2);
}
```

Exzellentes Feedback von Gemini! Das Prinzip des "Walking Skeleton" und vertikalen Slicings ist genau richtig. Hier die überarbeitete Roadmap:

## 6. Implementation Roadmap with PRD Structure (Revised)

### Phase 0: Foundation (Week 1)
- **PRD-001**: Project Setup & Development Environment
  - SvelteKit initialization with TypeScript
  - Open Props & Bits UI setup
  - ESLint, Prettier, Git hooks
  - CI/CD pipeline setup
  - Deployment target for "Walking Skeleton"

- **PRD-002**: Strapi Backend Foundation
  - Strapi v5 setup with PostgreSQL
  - Basic auth & security
  - Cloudinary plugin configuration
  - API permissions setup

### Phase 1: Core Architecture & Walking Skeleton (Week 2)
- **PRD-003**: Design System & Components
  - Open Props theme customization (3 colors only)
  - Primitive components with Bits UI
  - Component documentation

- **PRD-004**: Layout & Navigation
  - Header/Footer components
  - Multi-language routing (DE/EN)
  - Mobile navigation
  - Language switcher

- **PRD-005**: Homepage - Static Shell
  - Basic homepage structure
  - Hero section placeholder
  - Static content blocks
  - First deployable version

### Phase 2: Content Management & Core Pages (Week 3-4)
- **PRD-006**: Legal Pages & Global Elements
  - Legal page content type in Strapi
  - Impressum, Datenschutz, AGB pages
  - Footer links integration
  - Early compliance check

- **PRD-007**: Homepage - Dynamic Content
  - Connect homepage to Strapi
  - Dynamic hero content
  - Editable text blocks
  - CMS workflow validation

- **PRD-008**: Brand & Storytelling Pages
  - About page with rich content
  - Process/Philosophy page
  - Team/Story components
  - Brand narrative setup

- **PRD-009**: Contact Form - MVP
  - Simple contact form
  - Email notification via Brevo
  - No CRM integration yet
  - Basic validation

- **PRD-010**: Core Content Types
  - Blog, FAQ, Page Content types
  - Rich text configuration
  - Media management setup

### Phase 3: Product Experience (Week 5-6)
- **PRD-011**: Product Content Architecture
  - Product types (Artwork, Exclusive, Basic)
  - Category system
  - Admin panel customization
  - Sample product data

- **PRD-012**: Product Catalog
  - Product listing page
  - Type-based filtering (critical!)
  - Category navigation
  - Search functionality

- **PRD-013**: Product Detail Pages
  - Three-type logic implementation
  - Gallery component
  - Product actions by type
  - Stock display for Artwork

- **PRD-014**: Homepage - Product Integration
  - Featured products section
  - Dynamic product showcases
  - Type-specific CTAs

### Phase 4: Commerce Foundation (Week 7)
- **PRD-015**: Shopping Cart
  - Cart state management
  - Type validation (no Exclusives!)
  - localStorage persistence
  - Cart drawer UI

- **PRD-016**: Exclusives Lead Funnel
  - Multi-step inquiry form
  - Lead capture in Strapi
  - Qualification logic
  - Email notifications

### Phase 5: Checkout & Orders (Week 8-9)
- **PRD-017**: Stripe Checkout Integration
  - Payment intent creation
  - Checkout form with Stripe Elements
  - Address collection
  - Tax calculation

- **PRD-018**: Order Management
  - Order creation in Strapi
  - Webhook handling
  - Stock decrement for Artwork
  - Order confirmation page

- **PRD-019**: Post-Purchase Flow
  - Confirmation emails via Brevo
  - Measurement instructions for Basics
  - Order status tracking
  - Customer communication

### Phase 6: Marketing & Blog (Week 10)
- **PRD-020**: Blog System
  - Blog listing with pagination
  - Blog detail pages
  - Category filtering
  - Related posts

- **PRD-021**: Newsletter & Email Marketing
  - Newsletter signup forms
  - Brevo list integration
  - Double opt-in flow
  - Welcome email series

- **PRD-022**: FAQ System
  - FAQ page structure
  - Product-type filtering
  - Search functionality
  - Accordion UI

### Phase 7: SEO & Performance (Week 11)
- **PRD-023**: SEO Implementation
  - Dynamic meta tags
  - Structured data (Product, Article)
  - XML sitemap generation
  - Open Graph tags

- **PRD-024**: Performance Optimization
  - Image optimization pipeline
  - Code splitting
  - Edge caching strategy
  - Core Web Vitals optimization

### Phase 8: Launch Preparation (Week 12)
- **PRD-025**: Analytics & Monitoring
  - Plausible Analytics setup
  - Sentry error tracking
  - Performance monitoring
  - Conversion tracking

- **PRD-026**: Final Testing & Content
  - E2E test scenarios
  - Content review & polish
  - Legal compliance check
  - Launch checklist

- **PRD-027**: Production Deployment
  - Vercel configuration
  - Strapi production setup
  - DNS & SSL
  - Backup procedures

## 7. Key Success Criteria

### Technical Requirements
- Lighthouse Score: >95 (all categories)
- Core Web Vitals: All green
- Zero accessibility errors
- Full TypeScript coverage
- 100% mobile responsive

### Business Logic Verification
- [ ] Artwork: Can purchase until stock = 0
- [ ] Exclusives: Can ONLY request consultation
- [ ] Basics: Can purchase + get measurement info
- [ ] Cart: Rejects exclusive products
- [ ] Lead Funnel: Captures all required data

### Code Quality Standards
```typescript
// Example: Type-safe product handling
type ProductType = 'artwork' | 'exclusive' | 'basic';

interface ProductConfig {
  purchasable: boolean;
  hasStock: boolean;
  requiresMeasurements: boolean;
  hasLeadFunnel: boolean;
}

const PRODUCT_CONFIG: Record<ProductType, ProductConfig> = {
  artwork: {
    purchasable: true,
    hasStock: true,
    requiresMeasurements: false,
    hasLeadFunnel: false
  },
  exclusive: {
    purchasable: false,
    hasStock: false,
    requiresMeasurements: true,
    hasLeadFunnel: true  // CRITICAL!
  },
  basic: {
    purchasable: true,
    hasStock: false,
    requiresMeasurements: true,
    hasLeadFunnel: false
  }
};
```

## 8. Critical Notes for Claude-Code

1. **IMMER Product Type prüfen bei:**
   - Add to Cart Aktionen
   - Checkout Prozess
   - Preis-Anzeige
   - CTA Buttons

2. **Lead Funnel für Exclusives:**
   - Ist KEIN simples Kontaktformular
   - Braucht Follow-up Capabilities
   - Integration mit CRM-Funktionalität in Strapi

3. **Open Props Styling:**
   - NUR die 3 definierten Farben nutzen
   - Keine Utility Classes wie Tailwind
   - Semantic CSS bevorzugen

4. **i18n Pattern:**
   - Alle User-facing Strings lokalisierbar
   - URL-basiertes Language Switching
   - Strapi Content ist multilingual

5. **State Management:**
   - Svelte Stores für global state
   - Keine externe State Library
   - Cart muss Product Types validieren

---

**Version:** 2.0  
**Last Updated:** Current  
**Purpose:** Primary reference for Claude-Code implementation  
**Critical Focus:** Product type logic & Lead funnel for Exclusives