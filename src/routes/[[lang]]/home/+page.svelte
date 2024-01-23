<script>
	import Box from '$src/lib/components/Home/Box.svelte';
	import Credit from '$src/lib/components/Home/Credit.svelte';
	import HomeFaq from '$src/lib/components/Home/HomeFaq.svelte';
	import InTouch from '$src/lib/components/Home/InTouch.svelte';
	import Reviews from '$src/lib/components/Home/Reviews.svelte';
	import ReviewVideo from '$src/lib/components/Home/ReviewVideo.svelte';
	import Sign from '$src/lib/components/Home/Sign.svelte';
	import Steps from '$src/lib/components/Home/Steps.svelte';
	import VideoBanner from '$src/lib/components/Home/VideoBanner.svelte';
	import LastPosts from '$src/lib/components/Shared/LastPosts.svelte';
	import LogoSlider from '$src/lib/components/sliders/LogoSlider.svelte';
	export let data;
	let scrollPosition;

	let homePage;
	let reviews;
	let referenceLogos;
	let faqs;
	let blogs;
	let blogCats;
	let actions;
	const getHomePages = async (lang) => {
		let getHomePagesResponse = await RestService.getHomePages(lang);
		homePage = getHomePagesResponse['homePages'] && getHomePagesResponse['homePages'][0];
	};
	const getFaqs = async (lang) => {
		let getFaqsResponse = await RestService.getFaqs(lang, true);
		faqs = getFaqsResponse['faqs'];
	};
	const getActions = async (lang) => {
		let getActionsResponse = await RestService.getActions(lang);
		actions = getActionsResponse['actions'];
	};
	const getBlogs = async (lang) => {
		let getBlogsResponse = await RestService.getBlogs(lang, true);
		blogs = getBlogsResponse['blogs'];
	};
	const getReviews = async (lang) => {
		let getReviewsResponse = await RestService.getReviews(lang);
		reviews = getReviewsResponse['reviews'];
	};
	const getReferenceLogos = async (lang) => {
		let getReferenceLogosResponse = await RestService.getReferenceLogos(lang);
		referenceLogos = getReferenceLogosResponse['referenceLogos'];
	};
	const getBlogCats = async (lang) => {
		let getBlogCatsResponse = await RestService.getBlogCats(lang);
		blogCats = getBlogCatsResponse['blogCats'];
	};
	getFaqs(data.lang);
	getHomePages(data.lang);
	getReviews(data.lang);
	getReferenceLogos(data.lang);
	getActions(data.lang);
	getBlogs(data.lang);
	getBlogCats(data.lang);
</script>

<svelte:window bind:scrollY={scrollPosition} />
<div class=" w-full h-full ">
	<VideoBanner bind:scrollPosition slogan1={data.general.slogan1} slogan2={data.general.slogan2} />
	<div class="-mt-16 w-full">
		<Box boxGroups={data.treatmentGroups} bind:scrollPosition />
	</div>
	<Sign homePage={data.homePage} translate={data.translate} />
	{#if scrollPosition > 0}
		<div class="flex h-full pt-10">
			<div class="w-1/2 h-[35rem] ">
				<ReviewVideo />
			</div>
			<div class="relative w-1/2 h-full bg-white">
				<div class="absolute w-full top-20 left-0 z-[2000000]">
					<Reviews
						general={data.general}
						translate={data.translate}
						reviews={data.reviews}
						spot={data.homePage.reviewSpot}
						header={data.homePage.reviewHeader}
					/>
				</div>
				<img class="h-[35rem] object-cover" src="/assets/img/reviewsBg.jpg" alt="" />
			</div>
		</div>

		<div class="pt-10 flex justify-center mx-auto">
			<LogoSlider logoSlides={data.referenceLogos} />
		</div>
		<div class="pt-28 flex justify-center mx-auto">
			<Steps
				spot={data.homePage.actionSpot}
				header={data.homePage.actionHeader}
				steps={data.actions}
			/>
		</div>
		<div class="pt-28 flex justify-center mx-auto">
			<Credit homePage={data.homePage} />
		</div>
		<div class="pt-28 lg:px-28 container flex justify-center mx-auto">
			<HomeFaq homePage={data.homePage} general={data.general} faqs={data.faqs} />
		</div>
		<div class="pt-28">
			<InTouch homePage={data.homePage} translate={data.translate} />
		</div>
		<div class="pt-28 lg:px-28 container flex justify-center mx-auto">
			<LastPosts
				category={data.translate.category_BIG}
				blogCats={data.blogCats}
				homePage={data.homePage}
				blogs={data.blogs}
			/>
		</div>
	{/if}
</div>
