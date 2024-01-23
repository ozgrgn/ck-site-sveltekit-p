<script>
	import RestService from '$services/rest';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import TreatmentDetail from '$src/lib/components/Treatment/TreatmentDetail.svelte';
	import TreatmentRight from '$src/lib/components/Treatment/TreatmentRight.svelte';
	import { general, translate } from '$services/store';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import PopupForm from '$src/lib/components/Shared/PopupForm.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	export let data;
	let treatment;
	let blogs;

	const getTreatment = async (treatmentPerma) => {
		let getTreatmentResponse = await RestService.getTreatmentViaPerma(treatmentPerma);
		if (getTreatmentResponse && getTreatmentResponse['status']) {
			treatment = getTreatmentResponse['treatment'];
		} else {
			console.log(getTreatmentResponse.message);
		}

		getBlogs(treatment._id);
	};
	$: getTreatment(data.treatmentPerma);
	const getBlogs = async (treatmentId) => {
		let getBlogsResponse = await RestService.getBlogs(undefined, undefined, undefined, treatmentId);
		if (getBlogsResponse && getBlogsResponse['status']) {
			blogs = getBlogsResponse['blogs'];
		} else {
			console.log(getBlogsResponse.message);
		}
	};
</script>

<svelte:head>
	<title>{treatment?.metaTitle}</title>
	<meta name="description" content={treatment?.metaDescription} />
</svelte:head>

<Overlay />

{#if treatment}
	<Hero
		page={treatment.treatmentGroup.name}
		page2={treatment.name}
		pageLink={`group/${treatment.treatmentGroup.perma}`}
	/>
	<div class="container mx-auto lg:px-24 px-4 ">
		<div class="lg:flex gap-10 pt-10">
			<TreatmentDetail {treatment} />

			<div class="w-1/3 hidden lg:block">
				<TreatmentRight general={$general} {blogs} translate={$translate} />
			</div>
		</div>
	</div>
{/if}
<div class="block lg:hidden mx-4">
	<PopupForm />
</div>
