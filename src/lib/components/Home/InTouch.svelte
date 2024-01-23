<script>

	import Form from '../Shared/Form.svelte';
	import GradientBg from '../Shared/GradientBg.svelte';
	import Spot from '../Shared/Spot.svelte';
	export let homePage
	export let translate
	export let general
</script>

<div id="guess" />

<div class="w-full relative h-screen flex items-center justify-center ">
	<img class="h-full object-cover w-full" src="/assets/img/formBg.webp" alt="" />

	<div class="absolute">
		<div class="relative w-full flex justify-center ">
			<div class="flex ">
				<div class="relative h-[35rem] w-[22rem] hidden lg:block">
					<GradientBg />
					<div
						class="absolute uppercase w-full text-white/90 px-20 py-48 text-center text-2xl font-bold top-0 leading-16"
					>
						<h4>
							<span class="text-6xl">{homePage.formSlogan1}</span> {homePage.formSlogan2}
						</h4>
						<a href="https://wa.me/{general?.whatsapp1}" >
						<button
							class="w-full bg-primary  shadow border-white  text-sm text-white  font-semibold py-2 rounded my-5"
						>
						{homePage.formButton}
						</button>
					</a>
					</div>
				</div>
				<div class="relative h-[35rem] w-screen md:w-[44rem] bg-white/90">
					<div class="absolute left-0 w-screen md:w-[44rem] py-20">
						<div class=" flex flex-col justify-center items-center">
							<Spot content={general.formSpot} customCss="text-white bg-primary px-1" />

							<p class="py-5 text-5xl font-medium text-black/80">{general.formHeader}</p>
						</div>
						<div class="mx-12 ">
							<Form {translate}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
