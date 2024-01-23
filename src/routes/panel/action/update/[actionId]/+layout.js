/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		actionId: params.actionId
	};
}
