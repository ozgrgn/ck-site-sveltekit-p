<script>
	import Svg from '../../assets/svg.json';
	import PopupButton from '../Button/PopupButton.svelte';
	export let homePage;
	export let general;
</script>

<div class="w-screen relative">
	<div class=" px-4 container mx-auto md:px-0 ">
		<img
			class="w-full relative h-80 object-cover mb-4"
			src="/assets/img/secondBannerBg.jpg"
			alt="CK Financial Applications"
		/>

		<a
			href={homePage?.middleBannerLink} target="_blank"
			class="h-80 absolute top-0 left-0 text-white w-full flex flex-col justify-center"
		>
			<h4 class="text-2xl font-bold text-center ">{homePage?.middleBannerTop}</h4>

			<div class="flex justify-center">
				<span class="relative text-[10rem] font-medium leading-tight"
					>{homePage?.middleBannerCenter1}<span
						class="absolute bottom-4 right-4 text-sm pb-[0.35rem]"
						>{homePage?.middleBannerCenter2}</span
					></span
				>
			</div>
			<span class="tracking-widest text-center text-sm">{homePage?.middleBannerBottom}</span>
		</a>
		<div class=" text-white font-bold  flex gap-6">
			<PopupButton
				customCss="bg-primary text-sm shadow hover:scale-[1.03] transition-all duration-500 p-2 w-1/2"
				buttonText={general?.headerbutton}
			/>

			<button
				class="bg-secondary text-sm shadow hover:scale-[1.03] transition-all duration-500 p-2 w-1/2 "
			>
				<a href="https://wa.me/{general?.whatsapp1}" class="flex justify-center items-center">
					<svg
						class="h-5 w-5 pt-[0.1rem]  pr-1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 64 64 "
					>
						{@html Svg.whatsapp}
					</svg><span>WHATSAPP</span>
				</a></button
			>
		</div>
	</div>
</div>
