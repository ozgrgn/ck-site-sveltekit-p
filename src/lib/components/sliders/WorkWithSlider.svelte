<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import Spot from '../Shared/Spot.svelte';
	export let slides;
	export let category;
</script>

<Splide
	aria-label="My Favorite Images"
	options={{
		type: 'loop',
		arrows: false,
		pagination: false,
		autoplay: true,
    interval: 2000,

	}}
>
	{#each slides as slide}
		<SplideSlide>
			<div class="relative h-full">
				<div class="h-full">
					<img class="h-full w-full object-cover " src={slide?.image} alt={slide?.name} />
				</div>
				<div class="absolute top-0 bg-black/10 h-full w-full z-20" />
			</div>
		</SplideSlide>
	{/each}
</Splide>
