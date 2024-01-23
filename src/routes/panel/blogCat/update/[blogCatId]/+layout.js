/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		blogCatId: params.blogCatId
	};
}
