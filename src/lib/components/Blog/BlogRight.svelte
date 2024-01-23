<script>
	import { lang, blogCat } from '$services/store';
	import Form from '../Shared/Form.svelte';
	import HorizontalCard from '../Shared/HorizontalCard.svelte';
	import Spot from '../Shared/Spot.svelte';
	import { goto } from '$app/navigation';

	export let treatmentGroups;
	export let translate;
	export let general;
	export let blogCats;
	const gotoBlog = (catId) => {
		blogCat.set(catId);
		goto(`/${$lang}/blogs/`);
	};
</script>

<div class=" h-full ">
	<div class="p-5 border select-none ">
		<h2 class="text-2xl font-semibold text-black/80 leading-8 tracking-wide pb-2 ">
			Blog Categories
		</h2>
		{#if blogCats}
		<div
					on:click={() => {
						gotoBlog(undefined);
					}}
					
				>
					<h3 class="font-medium py-1 hover:underline select-none cursor-pointer">{translate.all} </h3>
				</div>
			{#each blogCats as category}
				<div
					on:click={() => {
						gotoBlog(category._id);
					}}
					on:click={() => {
						search.set(undefined);
					}}
				>
					<h3 class="font-medium py-1 hover:underline select-none cursor-pointer">{category.name}</h3>
				</div>
			{/each}
		{/if}
	</div>
	<div class="p-5 shadow mt-5">
		<h2 class="text-2xl font-semibold text-black/80 leading-8 tracking-wide ">
			{translate.services}
		</h2>
		<div class="flex flex-col gap-6 ">
			{#if treatmentGroups}
				{#each treatmentGroups as group, i}
					<HorizontalCard
						title={group.name}
						shortDesc={group.shortDesc}
						image={group.groupImage}
						readMore={i % 2 == 0 ? 'bg-primary' : 'bg-secondary'}
						link="group/{group.perma}"
					/>
				{/each}
			{/if}
		</div>
	</div>
	<div class="shadow p-4 pt-5 mt-5 ">
		<div class=" flex flex-col justify-center items-center">
			<Spot content={general.formSpot} customCss=" text-white bg-primary px-1" />

			<p class="py-5 text-4xl font-medium text-black/80">{general.formHeader}</p>
		</div>
		<div class="h-full">
			<Form {general} {translate} />
		</div>
	</div>
</div>
