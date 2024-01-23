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

<Seo
	metaTitle={'How We Do Work | CK Health Turkey'}
	metaDescription={'Ck Health Turkey enables patients to travel safely and comfortably with the approval of the Ministry of Health and the Ministry of Tourism in Turkey.'}
/>
<Overlay />
<Hero page="How We Do Work" />
<div class="container mx-auto px-4 lg:px-24 ">
	<div class="xl:flex gap-10 pt-10">
		<div class=" w-full xl:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
			<div class="md:pt-5">
				<iframe
					width="100%"
					height="400"
					src="https://www.youtube.com/embed/CZskLI4x4PA"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				/>
			</div>
			<h2 class="text-xl font-semibold pt-5">How We Do Work</h2>
			<p>
				Ck Health Turkey, under the name of Sazen Turizm, enables patients to travel safely and
				comfortably with the approval of the Ministry of Health and the Ministry of Tourism in
				Turkey. You can find the necessary information and approvals of the Ministry of Tourism and
				Ministry of Health in the links below.
			</p>
			<div class="flex pt-5 gap-5">
				<img class="h-20 object-cover" src="/assets/img/tursab.png" alt="" />
				<img class="h-20 object-cover" src="/assets/img/saglik-bakanligi.png" alt="" />
			</div>
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
			<PopupForm />
		</div>
	</div>
</div>
