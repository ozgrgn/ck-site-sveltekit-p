<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import Spot from '../Shared/Spot.svelte';
	import { lang } from '$services/store';

	export let groups;
	export let scrollPosition;
</script>

<div class="container z-20">
	<div
		class=" mx-4 md:mx-0 lg:mx-4 shadow-2xl {scrollPosition != 0
			? 'bg-white '
			: 'bg-transparent'} transition-colors duration-500 z-20 "
	>
		<Splide
			aria-label="My Favorite Images"
			options={{
				type: 'loop',
				arrows: false,
				pagination: false,
				autoplay: true,
				interval: 2000,
				breakpoints: {
					'768': {
						perPage: 1
					},
					'1024': {
						perPage: 2
					},
					'1280': {
						perPage: 4
					}
				}
			}}
		>
			{#each groups as group}
				<SplideSlide>
					<a
						href={`/${$lang}/group/${group.perma}`}
						class=" text-center transition-all duration-500"
					>
						<div
							class="{scrollPosition == 0
								? ''
								: 'hover:border-0 border border-neutral-100'} p-4 transition-colors duration-500 flex flex-col justify-between"
						>
							<h2
								class="{scrollPosition == 0
									? 'text-white'
									: 'text-black'} font-bold text-2xl h-18 flex items-center justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,1)]"
							>
								{group.name_BIG}
							</h2>
							<div class="w-full flex justify-center pt-10 ">
								<img class="rounded-full w-2/3 h-auto" src={group?.groupImage} alt={group?.name} />
							</div>
							<div class="w-full flex justify-center pt-10 h-48">
								<p class="font-normal text-md text-black">
									<span> {group?.shortDesc}</span>
								</p>
							</div>
						</div>
					</a>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</div>
