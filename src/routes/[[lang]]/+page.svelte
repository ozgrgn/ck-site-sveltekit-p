<script>
	import RestService from '$services/rest';

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
	import { lang, general, translate, treatmentGroups, homeBlogs, desktop } from '$services/store';
	import { onMount } from 'svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	import MobCredit from '$src/lib/components/Home/MobCredit.svelte';
	import Form from '$src/lib/components/Shared/Form.svelte';
	import PopupForm from '$src/lib/components/Shared/PopupForm.svelte';
	import MobLastPosts from '$src/lib/components/Shared/MobLastPosts.svelte';
	import WorkWith from '$src/lib/components/Home/WorkWith.svelte';

	let scrollPosition;

	let homePage;
	let reviews;
	let referenceLogos;
	let faq;
	let blogCats;
	let actions;
	const getHomePages = async ($lang) => {
		let getHomePagesResponse = await RestService.getHomePages(undefined, undefined, $lang);
		homePage = getHomePagesResponse['homePages'] && getHomePagesResponse['homePages'][0];
	};

	const getReferenceLogos = async ($lang) => {
		let getReferenceLogosResponse = await RestService.getReferenceLogos(
			undefined,
			undefined,
			$lang
		);
		if (getReferenceLogosResponse && getReferenceLogosResponse['status']) {
			referenceLogos = getReferenceLogosResponse['referenceLogos'];
		} else {
			console.log(getReferenceLogosResponse.message);
		}
	};

	const getActions = async ($lang) => {
		let getActionsResponse = await RestService.getActions(undefined, undefined, $lang);
		if (getActionsResponse && getActionsResponse['status']) {
			actions = getActionsResponse['actions'];
		} else {
			console.log(getActionsResponse.message);
		}
	};

	const getReviews = async ($lang) => {
		let getReviewsResponse = await RestService.getReviews($lang);
		if (getReviewsResponse && getReviewsResponse['status']) {
			reviews = getReviewsResponse['reviews'];
		} else {
			console.log(getReviewsResponse.message);
		}
	};

	const getBlogCats = async ($lang) => {
		let getBlogCatsResponse = await RestService.getBlogCats($lang);
		if (getBlogCatsResponse && getBlogCatsResponse['status']) {
			blogCats = getBlogCatsResponse['blogCats'];
		} else {
			console.log(getBlogCatsResponse.message);
		}
	};

	const getFaqs = async (lang) => {
		let getFaqsResponse = await RestService.getFaqs(lang, true);
		faq = getFaqsResponse['faqs'] && getFaqsResponse['faqs'][0];
	};

	onMount(() => {
		getHomePages($lang);
		getReferenceLogos($lang);
		getActions($lang);
		getReviews($lang);
		getBlogCats($lang);
		getFaqs($lang);
	});
</script>

<svelte:window bind:scrollY={scrollPosition} />

<div class=" w-full h-full ">
	<VideoBanner bind:scrollPosition />

	<div class="-mt-16 w-full">
		<Box boxGroups={$treatmentGroups} bind:scrollPosition />
	</div>
	<Sign {homePage} translate={$translate} />
	<div class="md:flex h-full md:pt-10">
		<div class="w-full md:w-1/2 h-[28rem] md:h-[35rem]">
			<ReviewVideo />
		</div>
		{#if homePage && $general}
			<div class="relative md:w-1/2 h-full bg-white">
				<div class="absolute w-full top-20 md:top-10 lg:top-20 left-0 z-[2000000]">
					<Reviews
						{$general}
						translate={$translate}
						{reviews}
						spot={homePage.reviewSpot}
						header={homePage.reviewHeader}
					/>
				</div>
				<img class="h-[35rem] w-full object-cover" src="/assets/img/reviewsBg.jpg" alt="" />
			</div>
		{/if}
	</div>

	<div class="pt-10 w-full flex justify-center mx-auto">
		{#if referenceLogos}
			<LogoSlider logoSlides={referenceLogos} />
		{/if}
	</div>
	<div class="pt-14 md:pt-28 flex justify-center mx-auto">
		{#if homePage && actions}
			<Steps spot={homePage.actionSpot} header={homePage.actionHeader} steps={actions} />
		{/if}
	</div>
	<div class="pt-16 md:pt-28 flex justify-center mx-auto">
		{#if homePage && general}
			{#if $desktop}
				<Credit {homePage} general={$general} />
			{/if}
		{/if}
	</div>
	<div class="pt-0 md:pt-28 px-4 lg:px-28 container flex justify-center mx-auto">
		{#if homePage && faq && $general}
			<HomeFaq {homePage} general={$general} {faq} />
		{/if}
	</div>
	<div class="pt-16 flex justify-center mx-auto">
		{#if homePage && general}
			{#if !$desktop}
				<MobCredit {homePage} general={$general} />
			{/if}
		{/if}
	</div>

	<div class="pt-8 md:pt-28">
		{#if homePage && $translate}
			{#if $desktop}
				<InTouch general={$general} {homePage} translate={$translate} />
			{:else}
				<div class="px-4 ">
					<PopupForm translate={$translate} />
				</div>
			{/if}
		{/if}
	</div>
	{#if $desktop}
	<WorkWith {homePage} translate={$translate} />
	{/if}
	<div class="pt-10 lg:pt-28 lg:px-28 container md:hidden xl:flex justify-center mx-auto">
		{#if $translate && blogCats && $homeBlogs && $desktop}
			<LastPosts category={$translate.category_BIG} {blogCats} {homePage} blogs={$homeBlogs} />
		{/if}

		{#if $translate && $homeBlogs && !$desktop}
			<MobLastPosts {homePage} blogs={$homeBlogs} />
		{/if}
	</div>
</div>
{#if homePage}
	<Seo metaTitle={homePage?.metaTitle} metaDescription={homePage?.metaDescription} />
{/if}
