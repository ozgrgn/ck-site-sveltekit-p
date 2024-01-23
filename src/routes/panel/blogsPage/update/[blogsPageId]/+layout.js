/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		blogsPageId: params.blogsPageId
	};
}
