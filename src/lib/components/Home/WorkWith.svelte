<script>
	import Spot from '../Shared/Spot.svelte';
	import WorkWithSlider from '../sliders/WorkWithSlider.svelte';

	export let homePage;
	export let translate;
</script>

{#if homePage}
	<div class="container px-4 md:mx-auto px:0 xl:px-28 pt-24 pb-10  lg:pt-28">
		<div class="md:flex md:gap-8">
			<div class="md:w-1/2 relative py-2">
				<WorkWithSlider slides={homePage.workWithImages} />
			</div>

			<div
				class="md:w-3/5 h-auto flex flex-col justify-start py-8 md:py-2 text-center md:text-left "
			>
				<Spot content={homePage.workWithSpot} customCss="text-white bg-secondary px-1" />
				<div class="">
					<h2 class="font-bold  text-3xl leading-tight">
						{homePage.workWithHeader}
					</h2>
				</div>
				<div class="text-xs font-medium text-black/80 leading-6 pt-4">
					<span>{@html homePage.workWithText}</span>
				</div>

			</div>
		</div>
	</div>
{/if}
