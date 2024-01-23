<script>
	import RestService from '$services/rest';
	import BlogsRight from '$src/lib/components/Blog/BlogsRight.svelte';
	import BlogCard from '$src/lib/components/Shared/BlogCard.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';
	import { fly } from 'svelte/transition';
	import { lang, general, translate, treatmentGroups, blogCat, search } from '$services/store';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import Form from '$src/lib/components/Shared/Form.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	let selectedBlogCat;
	$: if ($blogCat && blogCats) {
		selectedBlogCat = blogCats.find((a) => a._id == $blogCat);
	}
	let blogs;
	let blogCount;
	let limit = 10;
	const getBlogs = async (cat, more, search) => {
		if (!more) {
			limit = 10;
		}
		let getBlogsResponse = await RestService.getBlogs(
			$lang,
			undefined,
			cat,
			undefined,
			limit,
			undefined,
			undefined,
			search
		);
		if (getBlogsResponse && getBlogsResponse['status']) {
			blogs = getBlogsResponse['blogs'];
			blogCount = getBlogsResponse['count'];
		} else {
			console.log(getBlogsResponse.message);
		}
	};
	$: getBlogs($blogCat, false, $search);
	let blogsPage;
	const getBlogsPages = async () => {
		let getBlogsPagesResponse = await RestService.getBlogsPages($lang);
		blogsPage = getBlogsPagesResponse['blogsPages'] && getBlogsPagesResponse['blogsPages'][0];
	};
	getBlogsPages();
	let blogCats;
	const getBlogCats = async ($lang) => {
		let getBlogCatsResponse = await RestService.getBlogCats($lang);
		if (getBlogCatsResponse && getBlogCatsResponse['status']) {
			blogCats = getBlogCatsResponse['blogCats'];
		} else {
			console.log(getBlogCatsResponse.message);
		}
	};
	getBlogCats($lang);
</script>

<Seo
	metaTitle={!selectedBlogCat ? 'Blog Categories' : selectedBlogCat?.metaTitle}
	metaDescription={selectedBlogCat?.metaDescription}
/>

<Overlay />
{#if blogsPage}
	<Hero page={blogsPage.spot} />
{/if}
<div class="container mx-auto lg:px-24 mt-10 ">
	<div class=" flex flex-col justify-center items-center">
		{#if blogsPage}
			<Spot content={blogsPage.spot} customCss="text-white bg-primary px-1" />

			<p class="py-5 text-5xl font-medium text-black/80">{blogsPage.header}</p>
		{/if}
	</div>
	<div class="lg:flex  gap-10  px-4 lg:px-0 select-none">
		<!-- <div class="p-5 shadow mb-5 lg:hidden">
			<h2 class="text-2xl font-semibold text-black/80 leading-8 tracking-wide pb-2 ">
				{$translate.categories}
			</h2>
			{#if blogCats}
				{#each blogCats as category}
					<div
						class="cursor-pointer select-none"
						on:click={() => {
							blogCat.set(category._id);
						}}
						on:keydown
					>
						<h3 class="font-medium py-1 text-black/80 hover:underline">{category.name}</h3>
					</div>
				{/each}
			{/if}
		</div> -->
		<div class="w-full block lg:hidden">
			{#if blogCats}
				<BlogsRight
					treatmentGroups={$treatmentGroups}
					translate={$translate}
					general={$general}
					{blogCats}
					{blogs}
				/>
			{/if}
		</div>
		<div class="w-full lg:w-2/3 ">
			<div class="flex flex-col lg:grid lg:grid-cols-2 gap-5 text-sm text-black/80 leading-6">
				{#if blogs}
					{#each blogs as blog, i}
						<div transition:fly class="h-[34rem]">
							<BlogCard {blog} dateColor={i % 2 == 0 ? 'bg-primary' : 'bg-secondary'} />
						</div>
					{/each}
				{/if}
			</div>
			{#if blogs}
				<div class="flex justify-center">
					<button
						class="w-1/3 {limit > blogCount
							? 'hidden'
							: ''} bg-secondary text-sm text-white font-bold py-2 rounded my-5"
						on:click={() => (limit = limit + 10)}
						on:click={() => getBlogs($blogCat, true, $search)}
					>
						{$translate?.loadMore}
					</button>
				</div>
			{/if}
		</div>
		<div class="w-1/3 hidden lg:block">
			{#if blogCats}
				<BlogsRight
					treatmentGroups={$treatmentGroups}
					translate={$translate}
					general={$general}
					{blogCats}
					{blogs}
				/>
			{/if}
		</div>
		<div class="shadow p-4 pt-5 mt-5 sticky top-5 left-0 block lg:hidden ">
			<div class=" flex flex-col justify-center items-center">
				<Spot content={$general.formSpot} customCss="text-white bg-primary px-1" />

				<p class="py-5 text-4xl font-medium text-black/80">{$general.formHeader}</p>
			</div>
			<Form general={$general} translate={$translate} />
		</div>
	</div>
</div>
