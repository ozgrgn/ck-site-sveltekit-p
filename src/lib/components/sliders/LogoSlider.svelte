<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { desktop } from '$services/store';

	export let logoSlides;


</script>

<Splide
	aria-label="My Favorite Images"
	options={{
		type: 'loop',
		
		arrows: false,
		pagination: false,
		autoplay: true,
		breakpoints: {
					'768': {
						perPage: 2
					},
					'1024': {
						perPage: 3
					},
					'1280': {
						perPage: 6
					},
					'1920': {
						perPage: 6
					},
					'3000': {
						perPage: 6
					}
				}
	}}
>

	{#each logoSlides as slider}
		<SplideSlide>
			<div class="flex justify-center items-center">
			<img class="h-32 object-cover " src={slider?.image} alt={slider?.perma} />
		</div>
		</SplideSlide>
	{/each}

</Splide>
