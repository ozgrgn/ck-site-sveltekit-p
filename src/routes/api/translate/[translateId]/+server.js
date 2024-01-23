import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { translateId } = params;

		if (!translateId) {
			throw new Error(
				JSON.stringify({
					en: `translateId field is required`,
					tr: `translateId alanı zorunlu`
				})
			);
		}

		if (requiredFieldsForPatch) {
			requiredFieldsForPatch.map((value) => {
				if (!data[value]) {
					throw new Error(
						JSON.stringify({
							en: `${value} field is required`,
							tr: `${value} alanı zorunlu`
						})
					);
				}
			});
		}

		let {
			lang,
			category,
			category_BIG,
			categories,
			categories_BIG,
			services,
			blog,
			contact,
			aboutUs,
			treatments,
			faq,
			faq_long,
			years,
			freeConsultation,
			freeConsultation_BIG,
			lastBlogs,
			lastBlogs_BIG,
			otherTopics,
			yourName,
			yourMail,
			yourPhone,
			yourMessage,
			phoneRequired,
			nameRequired,
			mailRequired,
			send,
			phone,
			email,
			whatsapp,
			address,
			image,
			readMore,
			postedOn,
			treatment,
			treatment_BIG,
			links,
			mailSent,
			search,
			loadMore,
			all
		} = data;

		const upsertedTranslate = await Model.Translate.findByIdAndUpdate(
			translateId,
			{
				lang,
				category,
				category_BIG,
				categories,
				categories_BIG,
				services,
				blog,
				contact,
				aboutUs,
				treatments,
				faq,
				faq_long,
				years,
				freeConsultation,
				freeConsultation_BIG,
				lastBlogs,
				lastBlogs_BIG,
				otherTopics,
				yourName,
				yourMail,
				yourPhone,
				yourMessage,
				phoneRequired,
				nameRequired,
				mailRequired,
				send,
				phone,
				email,
				whatsapp,
				address,
				image,
				readMore,
				postedOn,
				treatment,
				treatment_BIG,
				links,
				mailSent,
				search,
				loadMore,
				all
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			translate: upsertedTranslate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let translate = await Model.Translate.findById(params?.translateId);

		return json({
			status: true,
			translate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	try {
		let translate = await Model.Translate.findByIdAndDelete(params?.translateId);

		return json({
			status: true,
			translate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
