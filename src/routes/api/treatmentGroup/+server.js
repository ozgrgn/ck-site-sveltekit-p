import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {}
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 10);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang
		let perma = url.searchParams.get('perma') ?? undefined;
		if (perma) query.perma = perma
		let treatmentGroups = await Model.TreatmentGroup.find(query, {}, { limit, skip }).sort({order:1});
		let count = await Model.TreatmentGroup.countDocuments({});
		return json({
			status: true,
			treatmentGroups,
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

		let { lang, name, name_BIG, shortDesc, groupImage, group, order, perma
		} = data;
		const treatmentGroups = new Model.TreatmentGroup({ lang, name, name_BIG, shortDesc, groupImage, group, order, perma });

		await treatmentGroups.save()

		return json({
			status: true,
			treatmentGroups: treatmentGroups
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
