<script>
	import RestService from '$services/rest';
	import BlogRight from '$src/lib/components/Blog/BlogRight.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';
	import { lang, general, translate, treatmentGroups } from '$services/store';
	import HtmlText from '$src/lib/components/Shared/HtmlText.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import PopupButton from '$src/lib/components/Button/PopupButton.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	export let data;
	let blog;
	let blogCats;
	let loading;
	const getBlogs = async (perma) => {
		let getBlogsResponse = await RestService.getBlogs(
			$lang,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			perma
		);
		blog = getBlogsResponse['blogs'] && getBlogsResponse['blogs'][0];
		loading = true;
	};
	$: getBlogs(data.blogPerma);
	const getBlogCats = async ($lang) => {
		let getBlogCatsResponse = await RestService.getBlogCats($lang);
		blogCats = getBlogCatsResponse['blogCats'];
	};
	getBlogCats($lang);

	window.scrollTo({
		behavior: 'smooth'
	});
</script>
<Seo metaTitle={blog?.blogHeader} metaDescription={blog?.blogshortDesc} />

<Overlay />
{#if blog}
	<Hero page="Blog" page2={blog?.blogCat.name} pageLink="blogs" />
	<div class="container mx-auto lg:px-14">
		<div class="lg:flex gap-10 pt-10 px-4 lg:px-0">
			<div class="w-full lg:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
				<div class="flex flex-col justify-center items-center pb-5">
					<Spot content={blog?.blogCat.name} customCss="text-white bg-secondary px-1 mt-2" />
					<div>
						<h2 class="font-bold text-4xl text-center lg:text-left leading-tight">
							{blog?.blogHeader}
						</h2>
					</div>
				</div>
				<img class="w-full h-fit object-cover" src={blog?.blogImage} alt={blog?.blogHeader} />
				{#if blog && blog.textId}
					<div class="flex flex-col bg-secondary/10 p-2">
						<span class="font-semibold"> Contents </span>
						<a class="h-4 pl-2 text-xs text-secondary font-semibold truncate " href="#first">
							{blog.textId}
						</a>
						<a
							class="{blog?.text2Id
								? ''
								: 'hidden'} h-4 pl-2 text-xs text-secondary font-semibold truncate"
							href="#second">{blog.text2Id}</a
						>
						<a
							class="{blog?.text3Id
								? ''
								: 'hidden'} h-4 pl-2 text-xs text-secondary font-semibold truncate"
							href="#third">{blog.text3Id}</a
						>
					</div>
				{/if}
				<div class="">
					<div id="first" class="pt-4">
						<HtmlText text={blog?.text} />
					</div>
					<div id="second" class={blog.text2 ? 'pt-2' : 'hidden'}>
						<HtmlText text={blog?.text2} />
					</div>
					<div id="third" class={blog.text3 ? 'pt-2' : 'hidden'}>
						<HtmlText text={blog?.text3} />
					</div>
				</div>
				<PopupButton
					customCss="bg-secondary/50 w-fit font-semibold px-2 rounded-xl cursor-pointer"
					buttonText={blog.blogContactLink ? blog.blogContactLink : $general.blogContactLink}
				/>
			</div>

			<div class="w-full lg:w-1/3 mt-24">
				<BlogRight
					treatmentGroups={$treatmentGroups}
					translate={$translate}
					general={$general}
					{blogCats}
				/>
			</div>
		</div>
	</div>
{/if}
