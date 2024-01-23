import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 10);

		let translates = await Model.Translate.find({}, {}, { limit, skip });

		let count = await Model.Translate.countDocuments({});
		return json({
			status: true,
			translates,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = ['lang'];
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.json();

		if (requiredFieldsForPost) {
			requiredFieldsForPost.map((value) => {
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

		let { lang, category, category_BIG, categories, categories_BIG, services, blog, contact, aboutUs, treatments, faq, faq_long, years, freeConsultation, freeConsultation_BIG, lastBlogs, lastBlogs_BIG, otherTopics, yourName, yourMail, yourPhone, yourMessage, phoneRequired, nameRequired, mailRequired, send, phone, email, whatsapp, address, image, readMore, postedOn, treatment, treatment_BIG, links, mailSent, search, loadMore,all
		} = data;
		let translates = await Model.Translate.findOne({ lang: lang }, {}, {});
		if (lang && translates) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedTranslate = await Model.Translate.findOneAndUpdate(
			{ lang },
			{
				lang, category, category_BIG, categories, categories_BIG, services, blog, contact, aboutUs, treatments, faq, faq_long, years, freeConsultation, freeConsultation_BIG, lastBlogs, lastBlogs_BIG, otherTopics, yourName, yourMail, yourPhone, yourMessage, phoneRequired, nameRequired, mailRequired, send, phone, email, whatsapp, address, image, readMore, postedOn, treatment, treatment_BIG, links, mailSent, search, loadMore,all
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
