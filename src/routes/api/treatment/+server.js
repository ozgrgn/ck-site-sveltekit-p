import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;
		let treatmentGroup = url.searchParams.get('treatmentGroup') ?? undefined;
		if (treatmentGroup) query.treatmentGroup = treatmentGroup;

		let treatments = await Model.Treatment.find(query, {}, { limit, skip }).populate(
			'treatmentGroup'
		).sort({order:1});
		let count = await Model.Treatment.countDocuments({});
		return json({
			status: true, 
			treatments,
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

		let {
			lang,
			treatmentGroup,
			name,
			name_BIG,
			text,
			treatmentThumbImage,
			treatmentImage,
			metaTitle,
			metaDescription,
			order,
			perma,
			treatmentShortDesc
		} = data;
		const treatments = new Model.Treatment({
			lang,
			treatmentGroup,
			name,
			name_BIG,
			text,
			treatmentThumbImage,
			treatmentImage,
			metaTitle,
			metaDescription,
			order,
			perma,
			treatmentShortDesc
		});

		await treatments.save();

		return json({
			status: true,
			treatments: treatments
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
