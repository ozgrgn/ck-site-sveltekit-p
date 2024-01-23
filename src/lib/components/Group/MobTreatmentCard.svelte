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
	
	<div class="w-1/2 flex flex-col justify-around py-4 px-4 h-auto border border-secondary/5 ">
		<Spot content={treatment?.treatmentGroup.name} customCss="{spot} text-white px-1" />
		<div class="h-20 md:h-16 flex items-center ">
			<h2 class="font-semibold text-md pt-1 leading-5 md:leading-tight ">{treatment?.name}</h2>
		</div>
		
		{#if readMore}
			<Spot content="READ MORE" customCss="{readMore} text-xs font-semibold shadow text-white mt-2 md:mt-5  px-2 " />
		{/if}
	</div>
</a>
