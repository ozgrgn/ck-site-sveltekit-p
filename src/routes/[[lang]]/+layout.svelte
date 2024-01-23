<script>
	import RestService from '$services/rest';
	import Modal from 'svelte-simple-modal';
	import { isDesktop } from '$src/lib/utils/isDesktop.js';

	import { modal } from '$services/store';
	import '$src/app.css';
	import Footer from '$src/lib/components/Layouts/Footer.svelte';
	import Header from '$src/lib/components/Layouts/Header.svelte';
	import {
		lang,
		general,
		translate,
		faqs,
		treatmentGroups,
		treatments,
		homeBlogs,
		desktop,
		blogCats
	} from '$services/store';
	import { onMount } from 'svelte';
	import MobHeader from '$src/lib/components/Layouts/MobHeader.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import WhatsappButton from '$src/lib/components/Shared/WhatsappButton.svelte';
	export let data;
	lang.set(data.lang);
	desktop.set(isDesktop());
	let languages;

	const getLanguages = async () => {
		let getLanguagesResponse = await RestService.getLanguages();
		languages = getLanguagesResponse && getLanguagesResponse['languages'];
	};

	const getGenerals = async (lang) => {
		let getGeneralsResponse = await RestService.getGenerals(lang);
		general.set(getGeneralsResponse['generals'] && getGeneralsResponse['generals'][0]);
	};

	const getTranslates = async (lang) => {
		let getTranslatesResponse = await RestService.getTranslates(lang);
		translate.set(getTranslatesResponse['translates'] && getTranslatesResponse['translates'][0]);
	};

	const getFaqs = async (lang) => {
		let getFaqsResponse = await RestService.getFaqs(lang, false);
		faqs.set(getFaqsResponse && getFaqsResponse['faqs']);
	};

	const getTreatmentGroups = async (lang) => {
		let getTreatmentGroupsResponse = await RestService.getTreatmentGroups(lang);
		treatmentGroups.set(
			getTreatmentGroupsResponse && getTreatmentGroupsResponse['treatmentGroups']
		);
	};

	const getTreatments = async (lang) => {
		let getTreatmentsResponse = await RestService.getTreatments(lang);
		treatments.set(getTreatmentsResponse && getTreatmentsResponse['treatments']);
	};
	const getBlogCats = async ($lang) => {
		let getBlogCatsResponse = await RestService.getBlogCats($lang);
		if (getBlogCatsResponse && getBlogCatsResponse['status']) {
			blogCats.set(getBlogCatsResponse&& getBlogCatsResponse['blogCats'])
		} else {
			console.log(getBlogCatsResponse.message);
		}
	};

	const getBlogs = async ($lang) => {
		let getBlogsResponse = await RestService.getBlogs($lang, true);
		homeBlogs.set(getBlogsResponse && getBlogsResponse['blogs']);
	};


	onMount(() => {
		getLanguages(data.lang);
		getGenerals(data.lang);
		getTranslates(data.lang);
		getFaqs(data.lang);
		getBlogs(data.lang);
		getBlogCats(data.lang);
		getTreatments(data.lang);
		getTreatmentGroups(data.lang);
	});
	let scrollPosition;

</script>

<svelte:window bind:scrollY={scrollPosition} />
<Modal show={$modal} />
<div class="">
	{#if $treatments && $translate && $treatmentGroups}
		{#if $desktop}
			<Header
				treatments={$treatments}
				treatmentGroups={$treatmentGroups}
				faqs={$faqs}
				langs={languages}
				general={$general}
				translate={$translate}
				blogCats={$blogCats}
			/>
		{:else}
			<MobHeader
				treatments={$treatments}
				treatmentGroups={$treatmentGroups}
				faqs={$faqs}
				langs={languages}
				general={$general}
				translate={$translate}
			/>
		{/if}
		<slot />

		<div
			class="w-56 z-[100000000] rounded  text-white bottom-5 left-3 md:left-5 transition-all duration-1000 fixed  {scrollPosition >
			100 
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<WhatsappButton general={$general}/>
		</div>
		<Footer treatmentGroups={$treatmentGroups} blogs={$homeBlogs} />
	{/if}
</div>
