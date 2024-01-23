<script>
	import { lang,blogCat,search } from '$services/store';
	import Input from '../Form/Input.svelte';
	import Form from '../Shared/Form.svelte';
	import HorizontalCard from '../Shared/HorizontalCard.svelte';
	import Spot from '../Shared/Spot.svelte';
	import Svg from '../../assets/svg.json';
	export let treatmentGroups;
	export let translate;
	export let general;
	export let blogCats;
</script>
<div class="p-5 shadow">
    <div class="relative">
      <Input
        bind:value={$search}
        placeholder={translate.search}
        customClass="pl-10"
      />
      <div class="absolute top-2 left-2">
		{@html Svg.search}
	</div>
    </div>
  </div>
<div class="p-5 mt-5 mb-5 lg:mb-0 shadow">
	<h2 class="text-2xl font-semibold text-black/80 leading-8 tracking-wide pb-2 ">
		{translate.categories}
	</h2>
	{#if blogCats}
	<div
				class="cursor-pointer"
				on:click={() => {
					blogCat.set(undefined);
				}}
				on:click={() => {
					search.set(undefined);
				}}
				on:keydown
			>
				<h3 class="font-medium py-1 text-black/80 hover:underline {$blogCat==undefined?"font-semibold text-secondary":""}">{translate.all}</h3>
			</div>
		{#each blogCats as category}
			<div
				class="cursor-pointer"
				on:click={() => {
					blogCat.set(category._id);
				}}
					on:click={() => {
						search.set(undefined);
					}}
				on:keydown
			>
				<h3 class="font-medium py-1 text-black/80 hover:underline {category._id==$blogCat?"font-semibold text-secondary":""}">{category.name}</h3>
			</div>
		{/each}
	{/if}
</div>

<div class="p-5 shadow mt-5 hidden lg:block">
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
<div class="shadow p-4 pt-5 mt-5 sticky top-5 left-0 hidden lg:block ">
	<div class=" flex flex-col justify-center items-center">
		<Spot content={general.formSpot} customCss="text-white bg-primary px-1" />

		<p class="py-5 text-4xl font-medium text-black/80">{general.formHeader}</p>
	</div>
	<Form {general} {translate} />
</div>
