<script>
	import Form from '$src/lib/components/Shared/Form.svelte';
	import Hero from '$src/lib/components/Shared/Hero.svelte';
	import Spot from '$src/lib/components/Shared/Spot.svelte';

	import { lang, general, translate } from '$services/store';
	console.log($general,"general")
	import Overlay from '$src/lib/components/Shared/Overlay.svelte';
	import Seo from '$src/lib/components/Shared/Seo.svelte';
</script>
<Seo metaTitle={"Contact | Ck Health Turkey"} metaDescription={$general?.companyShortDesc} />
<Overlay/>
<Hero page={$translate.contact} />
<div class="container mx-auto mt-10 lg:px-20 px-4 md:px-0">
	<div class="lg:flex gap-10">
		<div class="w-full lg:w-1/2">
			<div class="shadow p-4 py-10 mt-5">
				<div class=" flex flex-col justify-center items-start">
					{#if $general}
					<Spot content={$general.formSpot} customCss="text-white bg-primary px-1" />
					<h4 class="py-5 text-4xl font-medium text-black/80">{$general.formHeader}</h4>
					<p class="h-24 lg:h-14 text-xs text-black/60 tracking-widest">
						{$general?.companyShortDesc}
					</p>
					{/if}
				</div>

				<Form general={$general} translate={$translate} />
			</div>
		</div>
		<div class="w-full flex flex-col items-center  lg:w-1/2 mt-5">
			<iframe
				title="CK Health Location"
				src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d25532.996058544526!2d30.619898001850583!3d36.87540571570344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d36.8627951!2d30.634431199999998!4m5!1s0x14c391628923427d%3A0x660af3a5b9e7b624!2sAkkuyu%2C%20CkHealth%20Turkey%20Medical%20Center%20-%20Obesity%20Surgery%20%2C%20Gastric%20Sleeve-%20Plastic%20Surgery%20-%20Dental%20Treatment%2C%201334.%20Sk%20No%3A8%20D%3A%20blok%20Ofis%20No%207%20Casamax%2C%2007070%20Konyaalt%C4%B1%2FAntalya!3m2!1d36.8885173!2d30.638790699999998!5e0!3m2!1str!2str!4v1676232442336!5m2!1str!2str"
				width="100%"
				height="400"
				style="border:0;"
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>
			<div class="lg:flex w-full gap-4 pt-5 lg:pt-0">
				<div class="w-full lg:w-1/2 flex flex-col tracking-widest text-[0.7rem] text-black/70">
					<div class="flex items-center gap-4 mt-4 ">
						<div class="flex w-full border-b gap-4 items-center">
							<span class="font-semibold uppercase w-16 ">{$translate.address}:</span>
							<span>{$general.address1}</span>
						</div>
					</div>
					<div class=" flex items-center gap-4 pt-2">
						<div class="flex w-full border-b gap-4 items-center ">
							<span class="font-semibold w-16">STATE:</span>
							<span>{$general.address2}</span>
						</div>
					</div>
				</div>
				<div class="w-full lg:w-1/2 flex flex-col tracking-widest text-[0.7rem] text-black/70">
					<div class="flex items-center gap-4 lg:mt-4 mt-2 ">
						<div class="flex w-full border-b gap-4 items-center">
							<span class="font-semibold w-16">{$translate.email}</span>
							<span>{$general.email1}</span>
						</div>
					</div>
					<div class=" flex items-center gap-4 pt-2 lg:pt-1">
						<div class="flex w-full border-b gap-4 items-center ">
							<span class="font-semibold w-16">{$translate.phone}</span>
							<a href="tel:{$general.phone1}">{$general.phone1}</a>
						</div>
                       
					</div> <div class="flex items-center gap-4 pt-2 lg:pt-1">
                            <div class="flex w-full border-b gap-4 items-center">
                                <span class="font-semibold w-16">{$translate.whatsapp}</span>
                                <a href="https://wa.me/{$general?.whatsapp1}">{$general.whatsapp1}</a>
                            </div>
                        </div>
				</div>
			</div>
		</div>
	</div>
</div>
