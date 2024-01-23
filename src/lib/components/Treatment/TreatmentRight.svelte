<script>
	import RestService from '$services/rest';
	import Form from '../Shared/Form.svelte';
	import HorizontalCard from '../Shared/HorizontalCard.svelte';
	import Spot from '../Shared/Spot.svelte';
	export let translate;
  export let general;
  export let blogs
  console.log(blogs)


</script>

<div class="shadow p-4 pt-5">
	<div class=" flex flex-col justify-center items-center">
		<Spot content={general.formSpot} customCss="text-white bg-primary px-1" />

		<p class="py-5 text-4xl font-medium text-black/80">{general.formHeader}</p>
	</div>
	<Form {translate} />
</div>
<h2 class="{blogs&&blogs[0]?"block":"hidden"} text-2xl font-semibold text-black/80 leading-8 tracking-wide mt-10">Blog & News</h2>
<div class="flex flex-col gap-6 pt-4">
	{#if blogs}
		{#each blogs as blog, i}
			<HorizontalCard
				title={blog.blogHeader}
				image={blog.blogThumb}
				category={blog?.blogCat?.name}
				readMore={i % 2 == 0 ? 'bg-primary' : 'bg-secondary'}
				titleCss="font-medium text-md leading-5 pb-1"
				link="blogs/{blog.perma}"

			/>
		{/each}
	{/if}
</div>
