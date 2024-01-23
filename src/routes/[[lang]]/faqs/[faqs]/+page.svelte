<script>
	import RestService from '$services/rest';

	export let data;
	let treatmentGroup;
	let treatments;
	import { lang, general, translate, faqs, treatmentGroups } from '$services/store';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';

	const getTreatmentGroups = async (lang, perma) => {
		let getTreatmentGroupsResponse = await RestService.getTreatmentGroups(
			lang,
			undefined,
			undefined,
			perma
		);
		treatmentGroup = getTreatmentGroupsResponse && getTreatmentGroupsResponse['treatmentGroups'][0];

		// getTreatments();
	};
	$: getTreatmentGroups($lang, data.faqsPerma);

</script>

<Overlay />
{#if treatmentGroup}
	<Hero page2={treatmentGroup.name} page="Faq" />
{/if}
<div class="container mx-auto px-4 md:px-0 ">
	<div class="w-full flex flex-col items-center justify-center text-center pt-10">
	{#if treatmentGroup}
	<Spot content={treatmentGroup.name} customCss="bg-primary text-center text-white px-1" />
	{/if}
	{$translate.faq_long}
</div>
	<div class="grid grid-cols-2 gap-5 pt-10">
		{#if $faqs && treatmentGroup}
			{#each $faqs as faq, i}
				{#if faq.treatmentGroup && treatmentGroup._id == faq.treatmentGroup._id}
					<div class="block lg:hidden">
						<a
							href={`/${lang}/faq/${faq.perma}`}
							class="w-full flex h-auto shadow hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-500 "
						>
							<div
								class="w-full flex flex-col justify-around py-4 px-4 h-auto border border-secondary/5 "
							>
								<div class="h-12 flex items-center ">
									<h2 class="font-semibold text-md pt-1 leading-5 md:leading-tight ">
										{faq?.name}
									</h2>
								</div>

								<Spot
									content="READ MORE"
									customCss="{i % 2 == 0
										? 'bg-primary'
										: 'bg-secondary'}  text-xs font-semibold shadow text-white mt-2 md:mt-5  px-2 "
								/>
							</div>
						</a>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
