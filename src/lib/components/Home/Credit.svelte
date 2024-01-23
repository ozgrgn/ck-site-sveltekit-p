<script>
	import Svg from '../../assets/svg.json';
	import PopupButton from '../Button/PopupButton.svelte';
	export let homePage;
	export let general;
</script>

<div class="w-screen relative">
	<img
		class="h-[34rem] object-cover object-top w-full"
		src={homePage?.middleBannerImage}
		alt="CK Surgery"
	/>
	<div class="absolute w-[34rem] text-white font-bold bottom-16 right-28 flex gap-6">
		<PopupButton
			customCss="bg-primary shadow hover:scale-[1.03] transition-all duration-500 p-2 w-1/2"
			buttonText={general?.headerbutton}
		/>
    
		<button class="bg-secondary shadow hover:scale-[1.03] transition-all duration-500 p-2 w-1/2 ">
			<a href="https://wa.me/{general?.whatsapp1}" class="flex justify-center items-center">
				<svg class="h-5 w-5 pt-1 pr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64 ">
					{@html Svg.whatsapp}
				</svg><span>WHATSAPP</span>
			</a></button
		>

	</div>
	<div class="absolute top-24 right-28">
		<img
			class=" relative h-80 w-[34rem] object-cover"
			src="/assets/img/secondBannerBg.jpg"
			alt="CK Financial Applications"
		/>

		<a href={homePage?.middleBannerLink} target="_blank" class=" h-80 absolute top-0 text-white w-full flex flex-col justify-center">
			<h4 class="text-3xl font-bold text-center ">{homePage?.middleBannerTop}</h4>

			<div class="flex justify-center items-end">
				<span class="text-[10rem] font-medium leading-tight">{homePage?.middleBannerCenter1}</span
				><span class="absolute right-36 bottom-20 pb-[0.35rem]"
					>{homePage?.middleBannerCenter2}</span
				>
			</div>
			<span class="tracking-widest text-center text-sm">{homePage?.middleBannerBottom}</span>
		</a>
	</div>
</div>
