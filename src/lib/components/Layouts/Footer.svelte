<script>
	import Svg from '$assets/svg.json';
	import Spot from '../Shared/Spot.svelte';
	import GradientBg from '../Shared/GradientBg.svelte';
	import { lang, general, translate, faqs, treatmentGroups, homeBlogs } from '$services/store';
	import HtmlText from '../Shared/HtmlText.svelte';


</script>

<footer class="relative bg-primary xl:bg-secondary mt-20 px-4 xl:px-0" aria-labelledby="footer-heading">
	<GradientBg customCss="opacity-60 hidden xl:block" />
	<!-- <img
		class="absolute opacity-10 h-full w-full object-cover  object-top z-1"
		src="/assets/img/pr-02.jpg"
		alt=""
	/> -->

	<div class="max-w-7xl mx-auto pt-8  :py-12  ">
		<div class="md:pb-8 xl:grid xl:grid-cols-6 xl:gap-6">
			<div class="xl:grid xl:col-span-2">
				<div class="first z-20">
					<a
						class="text-white text-sm font-bold leading-relaxed inline-block  whitespace-nowrap uppercase"
						href={`/${$lang}`}
					>
						<img class="h-14" src={$general?.logo} alt="ck-health" />
					</a>
					<div class="px-2 pt-2 md:pt-5 ">
						<p class="text-md tracking-tight leading-7 text-white shadows ">
							{$general?.companyShortDesc}
						</p>
						<div class="h-full w-40 pt-1 ">
							<a href="https://www.tursab.org.tr/tr/ddsv" target="_blank" ><img class="rounded" src="/assets/tursab-dvs-12296.jpg" /></a>
						</div>
					</div>
				</div>
			</div>
			<div class="second z-20 ">
				<h3 class="h-10 md:h-14  flex flex-col justify-end md:justify-center  text-xl font-semibold text-white">
					{$translate?.links}
				</h3>
				<div class="px-2 lg:pt-5">
					{#if $general}
					<ul>
						
								<li class="pt-1">
									<a href={`/${$lang}/${$general.footer1Perma}`} class="text-white text-sm font-semibold pb-1 z-40">
										{$general?.footer1}
									</a>
								</li>
								<li class="pt-2">
									<a href={`/${$lang}/${$general.footer2Perma}`} class="text-white text-sm font-semibold pb-1 z-40">
										{$general?.footer2}
									</a>
								</li>
								<li class="pt-2">
									<a href={`/${$lang}/${$general.footer3Perma}`} class="text-white text-sm font-semibold pb-1 z-40">
										{$general?.footer3}
									</a>
								</li>
								<li class="pt-2">
									<a href={`/${$lang}/${$general.footer4Perma}`} class="text-white text-sm font-semibold pb-1 z-40">
										{$general?.footer4}
									</a>
								</li>
						
					</ul>
					{/if}
				</div>
			</div>
			<div class="third z-20 ">
				<h3 class="h-10 md:h-14 flex flex-col justify-end md:justify-center text-xl font-semibold text-white">
					{$translate?.categories_BIG}
				</h3>
				<div class="px-2 lg:pt-5 ">
					<ul>
						{#if $treatmentGroups}
							{#each $treatmentGroups as group,i}
								<li class={i==0?"pt-1":"pt-2"}>
									<a href={`/${$lang}/group/${group.perma}`}  class="text-white text-sm font-semibold pb-1 z-40">
										{group?.name_BIG}
									</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
			<div class="fourth z-20 col-span-2 ">
				<h3 class="h-10 md:h-14 flex flex-col justify-end md:justify-center text-xl font-semibold text-white">
					{$translate?.lastBlogs_BIG}
				</h3>
				<div class="px-2 pt-2 lg:pt-8 h-auto ">
					<ul>
						{#if $homeBlogs}
							{#each $homeBlogs as blog, i}
								{#if i < 5 && i>2}
									<a href={`/${$lang}/blogs/${blog.perma}`} class="flex items-center gap-2 pb-4">
										<img class="h-10 w-10 object-cover" src={blog?.blogThumb} alt="" />
										<div class="flex flex-col">
											<Spot
												content={blog?.blogCat.name}
												customCss="bg-transparent text-white/80 text-left px-0 "
											/>
											<div class="text-white text-sm font-semibold pb-1 z-40">
												{blog?.blogHeader}
											</div>
										</div>
									</a>
								{/if}
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
<div class="bg-primary h-20 md:h-16 z-40 text-white py-2">
	<div class="h-full text-xs md:text-md flex flex-col md:flex-row justify-between items-center container mx-auto">
		<div class="font-semibold ">
			{@html $general?.copright}
		</div>
	
		<div class="flex justify-center">
			<a href={$general?.facebook} class="cursor-pointer pr-6 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=" "
					width="25"
					height="25"
					fill="#bc74a5"
					viewBox="0 0 35 35"
				>
					{@html Svg.facebook}
				</svg>
			</a>
			<a href={$general?.instagram} class="pr-6 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=" "
					width="25"
					height="25"
					fill="#0E3055"
					viewBox="0 0 35 35"
				>
					{@html Svg.instagram}
				</svg>
			</a>
			<a href="https://wa.me/{$general?.whatsapp1}" class="pr-6 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=""
					width="25"
					height="25"
					fill="#0E3055"
					viewBox="0 0 68 68"
				>
					{@html Svg.whatsapp2}
				</svg>
			</a>
			<a href={$general?.youtube} class="pr-5 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=" "
					width="25"
					height="25"
					viewBox="0 0 108 108"
				>
					{@html Svg.youtube}
				</svg>
			</a>
		</div>
	</div>
</div>
