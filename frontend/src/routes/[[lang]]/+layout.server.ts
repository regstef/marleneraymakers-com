import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const lang = params.lang || 'en';
	
	return {
		lang
	};
};