import { derived, writable } from 'svelte/store';
import type { TranslationKey, SupportedLanguage, TranslationVars } from './types';

// Store for current language
export const currentLanguage = writable<SupportedLanguage>('en');

// Store for loaded translations
export const translations = writable<Record<string, unknown>>({});

// Helper to get nested value from object using dot notation
function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return the key itself as fallback
    }
  }

  return typeof current === 'string' ? current : path;
}

// Format string with variables (supports simple {variable} replacement and ICU-like plurals)
function formatString(template: string, vars?: TranslationVars): string {
  if (!vars) return template;

  let result = template;

  // Handle ICU pluralization: {count, plural, =0 {no items} =1 {one item} other {# items}}
  const pluralRegex = /{(\w+),\s*plural,\s*([^}]+)}/g;
  result = result.replace(pluralRegex, (match, varName, rules) => {
    const value = vars[varName];
    if (typeof value !== 'number') return match;

    // Parse plural rules
    const ruleRegex = /(=\d+|other)\s*{([^}]+)}/g;
    const rulesMap: Record<string, string> = {};
    let ruleMatch;

    while ((ruleMatch = ruleRegex.exec(rules)) !== null) {
      rulesMap[ruleMatch[1]] = ruleMatch[2];
    }

    // Apply rules
    if (rulesMap[`=${value}`]) {
      return rulesMap[`=${value}`].replace('#', value.toString());
    } else if (rulesMap.other) {
      return rulesMap.other.replace('#', value.toString());
    }

    return match;
  });

  // Handle simple variable replacement: {variable}
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
  });

  return result;
}

// Main translation function
export function createTranslationFunction(translations: Record<string, unknown>) {
  return function t(key: TranslationKey, vars?: TranslationVars): string {
    const value = getNestedValue(translations, key);
    return formatString(value, vars);
  };
}

// Derived store for the translation function
export const t = derived([translations, currentLanguage], ([$translations]) =>
  createTranslationFunction($translations)
);

// Load translations for a language
export async function loadTranslations(
  language: SupportedLanguage
): Promise<Record<string, unknown>> {
  try {
    const module = await import(`./locales/${language}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    // Fallback to English
    if (language !== 'en') {
      const fallback = await import('./locales/en.json');
      return fallback.default;
    }
    return {};
  }
}

// Initialize i18n with a language
export async function initializeI18n(language: SupportedLanguage) {
  const trans = await loadTranslations(language);
  translations.set(trans);
  currentLanguage.set(language);
}

// Switch language
export async function switchLanguage(language: SupportedLanguage) {
  await initializeI18n(language);
}
