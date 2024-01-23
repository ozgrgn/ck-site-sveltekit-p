<script>
	import BlogSlider from '../sliders/BlogSlider.svelte';
	import BlogCard from './BlogCard.svelte';
	import Spot from './Spot.svelte';
	export let homePage;
	export let blogs;
	export let blogCats;
	export let category

</script>

<div class="container mx-auto ">
	<div class=" flex flex-col justify-center items-center">
		<Spot content={homePage?.lastBlogsSpot} customCss="text-white bg-primary px-1" />

		<p class="py-5 text-5xl font-medium text-black/80">{homePage?.lastBlogsHeader}</p>
	</div>
<BlogSlider slides={blogs} />
</div>
