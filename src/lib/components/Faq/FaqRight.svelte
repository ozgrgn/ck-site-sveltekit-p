<script>
	import Form from '../Shared/Form.svelte';
	import HorizontalCard from '../Shared/HorizontalCard.svelte';
	import Spot from '../Shared/Spot.svelte';

	export let general;
	export let translate;
  export let treatmentGroups

	let blogs = [
		{
			category: 'RHINOPLASTY',
			title: 'Nose Job in Turkey',
			text: 'As you know the priority of rhinoplasty patients is that the operation is successful. For this reason, determining the right place where you will have surgery by taking the ',
			image: '/assets/img/blog1.webp'
		},
		{
			category: 'OBESITY SURGERY',
			title: 'Which Weight Loss Surgery is the best for me?',
			text: 'There are 3 most popular weight loss surgery preferred all around the world. These are Gastric Balloon Treatment, Gastric Bypass Surgery and Gastric Sleeve Surgery. Weight loss surgery ',
			image: '/assets/img/blog2.jpeg'
		},
		{
			category: 'RHINOPLASTY',
			title: 'Nose Job in Turkey',
			text: 'As you know the priority of rhinoplasty patients is that the operation is successful. For this reason, determining the right place where you will have surgery by taking the ',
			image: '/assets/img/blog1.webp'
		}
	];
</script>

<div class="shadow p-4 pt-5">
	<div class=" flex flex-col justify-center items-center">
		<Spot content={general.formSpot} customCss="text-white bg-primary px-1" />

		<p class="py-5 text-4xl font-medium text-black/80">{general.formHeader}</p>
	</div>
	<Form {translate} />
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
