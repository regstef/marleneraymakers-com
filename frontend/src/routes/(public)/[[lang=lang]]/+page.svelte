<script lang="ts">
  import type { PageData } from './$types';
  import { t } from '$lib/i18n';
  // Test path alias imports
  import { Button } from '$components/ui/button';
  import { isPurchasable, ProductType } from '$types/product.types';
  import type { ExclusiveProduct } from '$types/product.types';
  import { formatCurrency } from '$utils/currency';

  export let data: PageData;

  // Test data to verify types and imports work
  const testProduct: ExclusiveProduct = {
    id: 'test-001',
    slug: 'exclusive-piece',
    name: 'Test Exclusive',
    description: 'Testing path aliases',
    images: [],
    type: ProductType.EXCLUSIVE,
    inquiryContact: 'contact@marleneraymakers.com',
    estimatedPriceRange: formatCurrency(1000000) + ' - ' + formatCurrency(2500000),
  };

  // This should be false for exclusive products
  const canPurchase = isPurchasable(testProduct);
  console.log('Test: Can purchase exclusive product?', canPurchase); // Should log: false
</script>

<svelte:head>
  <title>{$t('homepage.welcome')} | {$t('common.brand')}</title>
</svelte:head>

<section class="hero">
  <h1>{$t('homepage.welcome')}</h1>
  <p class="tagline">{$t('homepage.tagline')}</p>
</section>

<section class="categories">
  <div class="category">
    <h2>{$t('nav.artwork')}</h2>
    <p>Unique digital art pieces available for direct purchase</p>
    <Button href="/{data.lang}/products">{$t('homepage.shop_now')}</Button>
  </div>

  <div class="category">
    <h2>{$t('nav.exclusives')}</h2>
    <p>One-of-a-kind custom pieces requiring personal consultation</p>
    <Button href="/{data.lang}/exclusives" variant="secondary">{$t('homepage.learn_more')}</Button>
  </div>

  <div class="category">
    <h2>{$t('nav.basics')}</h2>
    <p>Made-to-measure essentials with timeless design</p>
    <Button href="/{data.lang}/products?type=basic">{$t('homepage.shop_now')}</Button>
  </div>
</section>

<!-- Button Component Demo Section (remove in production) -->
<section class="button-demo">
  <h2>Button Component Demo</h2>

  <div class="demo-group">
    <h3>Variants</h3>
    <div class="button-row">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  </div>

  <div class="demo-group">
    <h3>Sizes</h3>
    <div class="button-row">
      <Button size="small">Small Button</Button>
      <Button size="medium">Medium Button</Button>
      <Button size="large">Large Button</Button>
    </div>
  </div>

  <div class="demo-group">
    <h3>As Link</h3>
    <div class="button-row">
      <Button href="/{data.lang}/about">Link Button</Button>
      <Button href="/{data.lang}/about" variant="secondary">Secondary Link</Button>
    </div>
  </div>
</section>

<style>
  .hero {
    text-align: center;
    padding: 8rem 2rem;
    max-width: var(--container-max);
    margin: 0 auto;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .tagline {
    font-size: 1.5rem;
    color: var(--color-accent);
    font-weight: 300;
  }

  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .category {
    text-align: center;
    padding: 3rem 2rem;
    border: 1px solid var(--color-accent);
    transition: all 0.3s ease;
  }

  .category:hover {
    border-color: var(--color-ink);
    transform: translateY(-2px);
  }

  .category h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .category p {
    color: var(--color-accent);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .tagline {
      font-size: 1.25rem;
    }

    .categories {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  /* Button Demo Section */
  .button-demo {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: var(--size-8) var(--size-4);
    background-color: var(--gray-1);
    border-block-start: 1px solid var(--gray-3);
  }

  .button-demo h2 {
    font-size: var(--font-size-5);
    margin-block-end: var(--size-6);
    text-align: center;
  }

  .demo-group {
    margin-block-end: var(--size-6);
  }

  .demo-group h3 {
    font-size: var(--font-size-3);
    margin-block-end: var(--size-3);
    color: var(--gray-7);
  }

  .button-row {
    display: flex;
    gap: var(--size-4);
    flex-wrap: wrap;
    align-items: center;
  }
</style>
