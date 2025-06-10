<script lang="ts">
  import { page } from '$app/stores';
  import { currentLanguage, translations, createTranslationFunction } from '$lib/i18n';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Initialize i18n stores with server data
  $: {
    translations.set(data.translations);
    currentLanguage.set(data.lang);
  }

  // Create translation function for immediate use
  $: translate = createTranslationFunction(data.translations);
</script>

<svelte:head>
  <html lang={data.lang}></html>
</svelte:head>

<div class="app">
  <header>
    <nav>
      <a href="/{data.lang}" class="logo">{translate('common.brand')}</a>
      <ul>
        <li><a href="/{data.lang}">{translate('nav.home')}</a></li>
        <li><a href="/{data.lang}/products">{translate('nav.artwork')}</a></li>
        <li><a href="/{data.lang}/exclusives">{translate('nav.exclusives')}</a></li>
        <li><a href="/{data.lang}/products?type=basic">{translate('nav.basics')}</a></li>
        <li><a href="/{data.lang}/cart">{translate('nav.cart')}</a></li>
      </ul>
      <div class="lang-switcher">
        <a href="/en{$page.url.pathname.slice(3)}" class:active={data.lang === 'en'}>EN</a>
        <a href="/de{$page.url.pathname.slice(3)}" class:active={data.lang === 'de'}>DE</a>
      </div>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>{translate('footer.copyright', { year: new Date().getFullYear() })}</p>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    border-bottom: 1px solid var(--color-accent);
  }

  nav {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    text-decoration: none;
    color: var(--color-ink);
  }

  ul {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--color-ink);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  a:hover {
    opacity: 0.7;
  }

  .lang-switcher {
    display: flex;
    gap: 1rem;
  }

  .lang-switcher a {
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;
  }

  .lang-switcher a.active {
    border-color: var(--color-ink);
  }

  main {
    flex: 1;
  }

  footer {
    border-top: 1px solid var(--color-accent);
    padding: 2rem;
    text-align: center;
    color: var(--color-accent);
  }
</style>
