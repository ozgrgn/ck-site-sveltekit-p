import { json } from '@sveltejs/kit';
import Model from '../../Model';


/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let treatment = await Model.Treatment.findOne({perma:params?.treatmentPerma}).populate("treatmentGroup");

		return json({
			status: true,
			treatment
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

