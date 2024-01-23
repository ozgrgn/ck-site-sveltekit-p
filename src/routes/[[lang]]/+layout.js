
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	if (!params.lang) {
		params.lang = "en"
	}
	return {
		lang: params.lang,
		treatmentPerma:params.treatment,
		faqPerma:params.faq,
		blogPerma:params.blogs,
		groupPerma:params.group,
		faqsPerma:params.faqs
	

	};
}



