import type { ParamMatcher } from '@sveltejs/kit';

// This matcher ensures that the [lang] parameter is either 'en' or 'de'.
// Any other value will result in a 404.
export const match: ParamMatcher = (param) => {
  return ['en', 'de'].includes(param);
};
