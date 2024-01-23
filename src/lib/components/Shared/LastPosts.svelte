<script>
	import BlogCard from './BlogCard.svelte';
	import BlogCatSlider from '../sliders/BlogCatSlider.svelte';
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
	<div class="grid grid-cols-3 gap-6 ">
		<div class="grid grid-rows-4 gap-6">
			<div class="row-span-3">
				<BlogCard blog={blogs[0]} dateColor="bg-primary" />
			</div>
			<a href={homePage.lastBlogLeftLinkPerma} class="shadow-lg relative">
				<img class="h-full w-full object-cover" src="/assets/img/blogBg.jpg" alt="" />
				<div
					class="absolute top-0 font-bold text-lg text-white left-0 text-center w-full h-full flex flex-col items-center justify-center gap-6"
				>
					<h5>{homePage.lastBlogLeftLinkName}</h5>
					<img class="h-6 w-6 object-cover" src="/assets/img/icon-link.png" alt="" />
				</div>
			</a>
		</div>
		<div class="grid grid-rows-4 gap-6">
			<a href={homePage.lastBlogTopLinkPerma} class="shadow-lg relative">
				<img class="h-full" src="/assets/img/blogBg.jpg" alt="" />
				<div
					class="absolute top-0 font-bold text-lg text-white left-0 text-center w-full h-full flex flex-col items-center justify-center gap-6"
				>
					<h5>{homePage.lastBlogTopLinkName}</h5>
					<img class="h-6 w-6 object-cover" src="/assets/img/icon-link.png" alt="" />
				</div>
			</a>
			<div class="row-span-3">
				<BlogCard blog={blogs[1]} dateColor="bg-secondary" />
			</div>
		</div>
		<div class="flex flex-col gap-6 h-full">
			<div class=" flex shadow-lg h-full w-full border">
				<BlogCatSlider {category} slides={blogCats}/>
			</div>
			<a href="blogs/{homePage.lastBlogRightLinkPerma}" class="h-full w-full shadow-lg">
				<img class="h-full w-full object-cover" src={homePage.lastBlogRightLinkImage} alt="" />
			</a>
		</div>
	</div>
</div>
