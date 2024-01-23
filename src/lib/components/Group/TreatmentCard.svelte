<script>
	import Spot from '../Shared/Spot.svelte';

	export let treatment;
	export let readMore;
    export let spot;
    export let lang
</script>

<a href={`/${lang}/treatment/${treatment.perma}`} class="w-full flex h-auto shadow hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-500 ">
	<div class="w-1/2 ">
		<img src={treatment?.treatmentThumbImage} alt="" />
	</div>
	<div class="w-1/2 lg:pt-10 pt-2 px-5 h-auto border border-secondary/5 ">
		<Spot content={treatment?.treatmentGroup.name} customCss="{spot} text-white px-1" />
		<div class="h-12">
			<h2 class="font-semibold  text-xl pt-1 leading-tight">{treatment?.name}</h2>
		</div>
		<p class="text-black/70 hidden lg:block xl:h-32 text-sm pt-5">
			{@html treatment?.treatmentShortDesc && treatment?.treatmentShortDesc.length > 225
				? treatment?.treatmentShortDesc.slice(0, 225) + '...  '
				: treatment.treatmentShortDesc}
		</p>
		{#if readMore}
			<Spot content="READ MORE" customCss="{readMore} hidden lg:block font-semibold shadow text-white mt-5 py-1 px-2 " />
		{/if}
	</div>
</a>
