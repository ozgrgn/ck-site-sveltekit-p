<script>
	import RestService from '$services/rest';
	import { general, lang, translate, treatmentGroups } from '$services/store';
	import AboutRight from '$src/lib/components/About/AboutRight.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import HorizontalCard from '$src/lib/components/Shared/HorizontalCard.svelte';
	import HtmlText from '$src/lib/components/Shared/HtmlText.svelte';
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import PopupForm from '$src/lib/components/Shared/PopupForm.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
	let aboutUs;
	let staff;
	const getAboutUss = async () => {
		let getAboutUssResponse = await RestService.getAboutUss($lang);
		aboutUs = getAboutUssResponse['aboutUss'] && getAboutUssResponse['aboutUss'][0];
	};
	getAboutUss();
	const getStaffs = async () => {
		let getStaffsResponse = await RestService.getStaffs($lang);
		if (getStaffsResponse && getStaffsResponse['status']) {
			staff = getStaffsResponse['staffs'];
		} else {
			console.log(getStaffsResponse.message);
		}
	};
	getStaffs();
</script>
{#if aboutUs}
<Seo metaTitle={aboutUs?.metaTitle} metaDescription={aboutUs?.metaDescription} />
{/if}
<Overlay/>
<Hero page={$translate?.aboutUs} />
<div class="container mx-auto px-4 lg:px-24 ">
	<div class="xl:flex gap-10 pt-10">
		<div class=" w-full xl:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
			{#if aboutUs}
				<HtmlText text={aboutUs?.text1} />
				<div class="flex gap-4 py-6 w-full pr-4">
					<img class="w-1/2 h-full object-cover" src={aboutUs?.image1} alt="" />
					<img class="w-1/2 h-full object-cover" src={aboutUs?.image2} alt="" />
				</div>
				<HtmlText text={aboutUs?.text2} />
				<HtmlText text={aboutUs?.text2} />
				<HtmlText text={aboutUs?.staffText} />
			{/if}
			<div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-12 pt-4 md:h-64">
				{#if staff}
					{#each staff as s}
						<HorizontalCard
							title={s.fullName}
							shortDesc={s.text}
							image={s.image}
							titleCss="font-medium text-lg"
						/>
					{/each}
				{/if}
			</div>
		</div>
		<div class="hidden xl:block w-1/3">
			{#if $translate}
				<AboutRight general={$general} translate={$translate} treatmentGroups={$treatmentGroups} />
			{/if}
		</div>
		<div class="block xl:hidden">
			<PopupForm/>
		</div>
	</div>
</div>
