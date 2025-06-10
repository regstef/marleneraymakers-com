import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, request } = event;

  // If the user requests the root, redirect to their preferred language
  if (url.pathname === '/') {
    // Check Accept-Language header for browser preference
    const acceptLanguage = request.headers.get('accept-language');
    let preferredLang = 'en'; // default

    if (acceptLanguage) {
      // Simple check for German preference
      if (acceptLanguage.toLowerCase().includes('de')) {
        preferredLang = 'de';
      }
    }

    // Check if user has a language preference cookie
    const langCookie = event.cookies.get('lang');
    if (langCookie && ['en', 'de'].includes(langCookie)) {
      preferredLang = langCookie;
    }

    throw redirect(302, `/${preferredLang}`);
  }

  // Extract language from URL if present
  const langMatch = url.pathname.match(/^\/(en|de)(\/|$)/);
  if (langMatch) {
    const lang = langMatch[1];
    // Set language cookie for future visits
    event.cookies.set('lang', lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  }

  return resolve(event);
};
