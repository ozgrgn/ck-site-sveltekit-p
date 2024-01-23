<script>
	import RestService from '$services/rest';

	export let data;
	let treatmentGroup;
	let treatments;
	console.log(data.groupPerma, 'groupperma');
	import { lang, general, translate, faqs, treatmentGroups } from '$services/store';
	import MobTreatmentCard from '$src/lib/components/Group/MobTreatmentCard.svelte';
	import TreatmentCard from '$src/lib/components/Group/TreatmentCard.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';

	const getTreatmentGroups = async (lang, perma) => {
		let getTreatmentGroupsResponse = await RestService.getTreatmentGroups(
			lang,
			undefined,
			undefined,
			perma
		);
		treatmentGroup = getTreatmentGroupsResponse && getTreatmentGroupsResponse['treatmentGroups'][0];
		getTreatments();
	};
	const getTreatments = async () => {
		let getTreatmentsResponse = await RestService.getTreatments($lang, treatmentGroup._id);
		if (getTreatmentsResponse['status']) {
			treatments = getTreatmentsResponse['treatments'];
		} else {
			console.log(getTreatmentsResponse.message);
		}
	};
	$: getTreatmentGroups($lang, data.groupPerma);
</script>

<Seo
	metaTitle={treatmentGroup ? `CK Health Turkey | ${treatmentGroup.name}` : ''}
	metaDescription={treatmentGroup ? treatmentGroup.metaDescription : ''}
/>
<Overlay />
{#if treatmentGroup}
	<Hero page={treatmentGroup.name} />
{/if}
<div class="container mx-auto px-4 md:px-0 ">
	<div class="flex flex-col md:grid md:grid-cols-2 gap-10 pt-16 md:pt-10">
		{#if treatments}
			{#each treatments as treatment, i}
				<div class="hidden lg:block">
					<TreatmentCard
						{treatment}
						lang={$lang}
						readMore={i % 2 == 0 ? 'bg-primary' : 'bg-secondary'}
						spot={i % 2 == 0 ? 'bg-secondary' : 'bg-primary'}
					/>
				</div>
				<div class="block lg:hidden">
					<MobTreatmentCard
						{treatment}
						lang={$lang}
						readMore={i % 2 == 0 ? 'bg-primary' : 'bg-secondary'}
						spot={i % 2 == 0 ? 'bg-secondary' : 'bg-primary'}
					/>
				</div>
			{/each}
		{/if}
	</div>
</div>
