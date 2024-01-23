<script>
	import RestService from '$services/rest';

	import FaqRight from '$src/lib/components/Faq/FaqRight.svelte';
	import FaqDetail from '$src/lib/components/Shared/FaqDetail.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';
	import { lang, translate, general, treatmentGroups } from '$services/store';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import PopupForm from '$src/lib/components/Shared/PopupForm.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	export let data;
	let faq;
	const getFaqs = async (lang, perma) => {
		let getFaqsResponse = await RestService.getFaqs(lang, false, undefined, undefined, perma);
		faq = getFaqsResponse['faqs'] && getFaqsResponse['faqs'][0];
	};
	$: getFaqs($lang, data.faqPerma);
</script>
<Seo
	metaTitle={faq ? `${faq.name} FAQ | CK Health Turkey` : ''}
/>
<Overlay/>
{#if faq}
<Hero page={faq.treatmentGroup && faq?.treatmentGroup.name ? faq?.treatmentGroup.name : 'FAQ'} />
{/if}
<div class="container mx-auto px-4 ">
	<div class="lg:flex gap-10 pt-10">
		<div class="w-full lg:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
			<div class="flex flex-col justify-center items-center">
				{#if faq}
					<Spot
						content={faq.treatmentGroup && faq?.treatmentGroup.name ? faq?.treatmentGroup.name : 'GENERAL QUESTIONS'}
						customCss="text-white bg-secondary px-1 "
					/>
				{/if}
				<div>
					{#if faq}
						<h2 class="font-bold text-4xl leading-tight	">
							{faq?.name ? faq?.name : faq?.treatment?.name}
						</h2>
					{/if}
				</div>
			</div>
			{#if faq}
				<FaqDetail bind:faq={faq} />
			{/if}
		</div>
		<div class="w-1/3 mt-24 hidden lg:block">
			<FaqRight general={$general} translate={$translate} treatmentGroups={$treatmentGroups} />
		</div>
		<div class="block lg:hidden">
		<PopupForm/></div>
	</div>
</div>
