import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { treatmentGroupId } = params;

		console.log('treatmentGroupId', treatmentGroupId);
		if (!treatmentGroupId) {
			throw new Error(
				JSON.stringify({
					en: `treatmentGroupId field is required`,
					tr: `treatmentGroupId alanı zorunlu`
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

		let { lang, name, name_BIG, shortDesc, groupImage, group, order, perma } = data;

		const upsertedTreatmentGroup = await Model.TreatmentGroup.findByIdAndUpdate(
			treatmentGroupId,
			{
				lang, name, name_BIG, shortDesc, groupImage, group, order, perma
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			treatmentGroup: upsertedTreatmentGroup
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
		let treatmentGroup = await Model.TreatmentGroup.findById(params?.treatmentGroupId);

		return json({
			status: true,
			treatmentGroup
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
		let treatmentGroup = await Model.TreatmentGroup.findByIdAndDelete(params?.treatmentGroupId);

		return json({
			status: true,
			treatmentGroup
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
