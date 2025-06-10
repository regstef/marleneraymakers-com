/**
 * Format a price in cents to a currency string
 * @param cents - Price in cents
 * @param locale - Locale for formatting (default: 'en-US')
 * @param currency - Currency code (default: 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(
  cents: number,
  locale: string = 'en-US',
  currency: string = 'EUR'
): string {
  const amount = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Parse a currency string to cents
 * @param value - Currency string (e.g., "€123.45")
 * @returns Price in cents
 */
export function parseCurrency(value: string): number {
  // Remove all non-numeric characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, '');
  const floatValue = parseFloat(cleanValue);

  if (isNaN(floatValue)) {
    return 0;
  }

  // Convert to cents and round to avoid floating point issues
  return Math.round(floatValue * 100);
}
