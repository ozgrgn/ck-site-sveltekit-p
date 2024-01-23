<script>
	import { onMount } from 'svelte';
	import { overlay } from '$services/store';
	import { general } from '$services/store';
	import Hero from '../Shared/Hero.svelte';

	export let scrollPosition;

	// let heroVideo={loop:true};
	// onMount(() => {
	//   if (typeof heroVideo.loop == "boolean") {
	//     heroVideo.loop = true;
	//   } else {
	//     heroVideo.on(
	//       "ended",
	//       () => {
	//         this.currentTime = 0;
	//         this.play();
	//       },
	//       false
	//     );
	//   }
	// })
</script>

<section class="showcase" id="home">
	{#if $general}
		<div class="video-container">
			<video autoplay="autoplay" muted playsinline loop preload="auto"
				><source src="/assets/11.mp4" type="video/mp4" />
			</video>
		</div>
	{/if}
	<div class="content content-end text-gray-300">
		<div class=" mt-[28rem] text-center">
			<h1 class="text-3xl md:text-5xl tracking-tight font-black text-white ">
				{#if $general}
					<span class=" block xl:inline"
						><h2
							class="drop-shadow-[0_35px_35px_rgba(0,0,0,1)] transition-all duration-500 {$overlay
								? 'opacity-0'
								: 'opacity-100'}"
						>
							{$general.slogan1} <br />
							{$general.slogan2}
						</h2>
					</span>
				{/if}
			</h1>
		</div>
	</div>
</section>

<style>
	.showcase {
		height: 100vh;
		position: relative;
	}
	/* TODO, Fallback background here */
	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.video-container video {
		min-width: 100%;
		min-height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}
	.video-container:after {
		content: '';
		z-index: 1;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: #00000031;
		position: absolute;
	}
	.content {
		box-shadow: inset 50vw 0 70px -7px rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		/* background-color: rgba(0, 0, 0, 0.5); */
	}
</style>
