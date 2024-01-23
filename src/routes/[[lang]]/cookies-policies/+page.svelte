<script>
	import RestService from '$services/rest';
	import { general, translate,treatmentGroups} from '$services/store';
	import AboutRight from '$src/lib/components/About/AboutRight.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import HorizontalCard from '$src/lib/components/Shared/HorizontalCard.svelte';
	import HtmlText from '$src/lib/components/Shared/HtmlText.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';

</script>
<Overlay/>
<Hero page={$general?.footer4} />
<div class="container mx-auto lg:px-24 px-4 ">
	<div class="md:flex gap-10 pt-10">
		<div class="w-full md:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
			{#if $general}
				<HtmlText text={$general?.cookies} />
				
				{/if}
		</div>
		<div class="w-1/3 hidden md:block">
			{#if $translate}
				<AboutRight general={$general} translate={$translate} treatmentGroups={$treatmentGroups} />
			{/if}
		</div>
	</div>
</div>
