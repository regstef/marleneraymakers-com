import type { LayoutServerLoad } from './$types';
import { loadTranslations } from '$lib/i18n';
import type { SupportedLanguage } from '$lib/i18n/types';

export const load: LayoutServerLoad = async ({ params, url }) => {
  const lang = (params.lang || 'en') as SupportedLanguage;

  // Validate language
  const supportedLanguages: SupportedLanguage[] = ['en', 'de'];
  const validLang = supportedLanguages.includes(lang) ? lang : 'en';

  // Load translations
  const translations = await loadTranslations(validLang);

  return {
    lang: validLang,
    translations,
    url: url.pathname,
  };
};
