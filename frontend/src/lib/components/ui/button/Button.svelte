<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let href: string | undefined = undefined;
</script>

{#if href}
  <a {href} class="btn" data-variant={variant} data-size={size} {...$$restProps}>
    <slot />
  </a>
{:else}
  <button
    type="button"
    class="btn"
    data-variant={variant}
    data-size={size}
    on:click
    {...$$restProps}
  >
    <slot />
  </button>
{/if}

<style>
  /* Base Button mit 100% Open Props */
  .btn {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--size-2);

    /* Typography */
    font-family: var(--font-sans);
    font-weight: var(--font-weight-6);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    text-align: center;
    line-height: 1;

    /* Interactivity */
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;

    /* Transitions */
    transition:
      background-color var(--animation-duration) var(--ease-luxury),
      color var(--animation-duration) var(--ease-luxury),
      border-color var(--animation-duration) var(--ease-luxury),
      transform 50ms var(--ease-luxury);

    /* Reset */
    border: var(--border-size-2) solid transparent;
    background: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  /* Sizes mit Open Props */
  .btn[data-size='small'] {
    font-size: var(--font-size-0);
    padding-inline: var(--size-4);
    padding-block: var(--size-2);
  }

  .btn[data-size='medium'] {
    font-size: var(--font-size-1);
    padding-inline: var(--size-6);
    padding-block: var(--size-3);
  }

  .btn[data-size='large'] {
    font-size: var(--font-size-2);
    padding-inline: var(--size-8);
    padding-block: var(--size-4);
  }

  /* Variants mit Open Props */
  .btn[data-variant='primary'] {
    background-color: var(--brand-black);
    color: var(--brand-white);
    border-color: var(--brand-black);
  }

  .btn[data-variant='primary']:hover {
    background-color: var(--brand-gray);
    border-color: var(--brand-gray);
  }

  .btn[data-variant='secondary'] {
    background-color: transparent;
    color: var(--brand-black);
    border-color: var(--brand-black);
  }

  .btn[data-variant='secondary']:hover {
    background-color: var(--brand-black);
    color: var(--brand-white);
  }

  .btn[data-variant='ghost'] {
    background-color: transparent;
    color: var(--brand-black);
    border-color: transparent;
  }

  .btn[data-variant='ghost']:hover {
    background-color: var(--surface-3);
  }

  /* States */
  .btn:active {
    transform: translateY(1px);
  }

  .btn:focus-visible {
    outline: var(--border-size-2) solid var(--focus);
    outline-offset: var(--size-1);
  }

  .btn:disabled,
  .btn[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .btn {
      border-width: var(--border-size-3);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }
</style>
