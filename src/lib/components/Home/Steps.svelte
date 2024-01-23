<script>
	import Spot from '../Shared/Spot.svelte';
	import { desktop } from '$services/store';

	export let steps;
	export let spot;
	export let header;
	let hover = [];

	let activeStep = 0;
	
	const mobileActive = async (i) => {
		activeStep = i;
		for (let a = 0; a < 8; a++) {
		if (a==i) {
			steps[a].hover = true;
		}else {
			steps[a].hover = false;
		}
	}
	};
	if(!$desktop) {
		mobileActive(0)
	};
</script>

<div class="container mx-auto px-4 md:px-20 w-full">
	<div class="flex flex-col items-center justify-center md:pb-8">
		<Spot content={spot} customCss="text-white bg-primary px-1" />

		<h3 class="font-bold text-4xl leading-tight">{header}</h3>
	</div>

	{#if $desktop}
		<div class="container mx-auto h-auto w-full flex gap-20 h-72">
			<div class="w-1/4 h-auto flex flex-col justify-between">
				{#if steps}
					{#each Array(4) as step, i}
						<div
							on:click={() => (activeStep = i)}
							on:keydown
							on:mouseover={() => (steps[i].hover = true)}
							on:mouseleave={() => (steps[i].hover = false)}
							on:focus
							class=" grid grid-cols-6 w-full items-center"
						>
							<div class="col-span-5 cursor-pointer">
								<h4
									class="{steps[i].hover
										? 'text-secondary'
										: ''} transition-all text-lg {activeStep == i ? 'font-black' : 'font-medium '}"
								>
									{steps[i].name}
								</h4>
							</div>
							<button
								class="{i % 2 == 0 ? 'bg-primary' : 'bg-secondary'} rounded-full {activeStep == i
									? 'relative'
									: ''} h-10 w-10 font-bold text-white">{steps[i].order}</button
							>
						</div>
					{/each}
				{/if}
			</div>
			<div class="relative w-2/4 shadow">
				<img class="h-72 w-full object-fit shadow-2xl" src="/assets/img/actionBg.jpg" alt="" />
				<div
					class="absolute w-full text-white top-0 h-full text-center p-10 flex flex-col justify-center gap-5"
				>
					<h3 class="font-bold text-3xl ">
						{steps[activeStep].order} - {@html steps[activeStep].name}
					</h3>
					<p class="font-medium">
						{steps[activeStep].text}
					</p>
				</div>
			</div>
			<div class="w-1/4 h-auto flex flex-col justify-between">
				{#if steps}
					{#each Array(4) as step, i}
						<div
							on:click={() => (activeStep = i + 4)}
							on:keydown
							on:mouseover={() => (steps[i + 4].hover = true)}
							on:mouseleave={() => (steps[i + 4].hover = false)}
							on:focus
							class=" grid grid-cols-6 w-full items-center "
						>
							<div class="col-span-5 cursor-pointer">
								<h4
									class="{steps[i + 4].hover ? 'text-secondary' : ''} text-lg {activeStep == i + 4
										? 'font-black'
										: 'font-medium'}"
								>
									{@html steps[i + 4].name}
								</h4>
							</div>
							<button
								class="{(i + 4) % 2 == 0 ? 'bg-primary' : 'bg-secondary'} {steps[i + 4].hover
									? 'relative'
									: ''} rounded-full h-10 w-10 font-bold text-white">{steps[i + 4].order}</button
							>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex justify-center gap-2 px-2 py-4">
			{#if steps}
				{#each Array(8) as step, i}
					<button
						on:click={() => mobileActive(i)}
						class="{i % 2 == 0 ? 'bg-primary' : 'bg-secondary'} rounded-full {steps[i].hover
							? 'relative'
							: ''} h-9 w-9 font-bold text-white">{steps[i].order}</button
					>
				{/each}
			{/if}
		</div>
		<div class="relative w-full shadow">
			<img class="h-72 w-full object-fit shadow-2xl" src="/assets/img/actionBg.jpg" alt="" />
			<div
				class="absolute w-full text-white top-0 h-full text-center p-5 flex flex-col justify-center gap-5"
			>
				<h3 class="font-bold text-2xl ">
					{steps[activeStep].order} - {@html steps[activeStep].name}
				</h3>
				<p class="font-medium">
					{steps[activeStep].text}
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	button::after {
		content: '';
		width: 30px;
		height: 30px;
		border-radius: 100%;
		border: 4px solid #65bdc2;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: ring 1s infinite;
	}
	@keyframes ring {
		0% {
			width: 30px;
			height: 30px;
			opacity: 1;
		}
		100% {
			width: 70px;
			height: 70px;
			opacity: 0;
		}
	}
</style>
