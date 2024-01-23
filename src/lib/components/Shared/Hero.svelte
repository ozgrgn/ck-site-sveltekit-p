<script>
	import { lang, overlay } from '$services/store';
	import GradientBg from './GradientBg.svelte';

	export let page;
	export let pageLink;
	export let page2;
</script>

<div class="relative  h-64 md:h-96 ">
	<!-- <img class="h-96 object-cover w-full " src="/assets/img/pr-13.jpg" alt="" /> -->
	<GradientBg customCss="opacity-90" />

	<div class="absolute top-0 h-full w-full bg-primary opacity-60 " />

	<div
		class="absolute top-0 h-full w-full bg-black transition-all duration-500  {$overlay
			? 'opacity-70 z-40'
			: 'opacity-0'}"
	/>
	<div
		class="absolute top-5 md:top-0 h-full w-full flex flex-col justify-center items-center text-3xl md:text-7xl font-medium text-white text-center"
	>
		<h4>{page2 ? page2 : page}</h4>
		<div class="text-sm text-white/80 pt-2">
			{#if page2}
				<a href={`/${$lang}`}> Home </a> /
				<a href={`/${$lang}/${pageLink}`}>{page} </a>
				/ {page2}
			{:else}
				<a href={`/${$lang}`}> Home </a> / {page}
			{/if}
		</div>
	</div>
</div>
