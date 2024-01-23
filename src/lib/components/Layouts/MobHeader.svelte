<script>
	import Svg from '$assets/svg.json';

	import { navbar, lang, search, overlay, blogCats,blogCat } from '$services/store';
	import LangSelect from '$components/Form/LangSelect.svelte';
	import PopupButton from '../Button/PopupButton.svelte';
	export let treatments;
	export let treatmentGroups;
	export let langs;
	export let general;
	export let translate;
	console.log(treatments, 'treatments');

	$: navbarOpen = false;
	const langTrigger = (_lang) => {
		document.documentElement.setAttribute('lang', _lang);
		setTimeout(() => {
			lang.set(_lang);
		}, 1); // cause svelte is faster than browser
	};
	const navbarTrigger = (_navbarOpen) => {
		document.documentElement.setAttribute('navbarOpen', _navbarOpen);
		setTimeout(() => {
			navbar.set(_navbarOpen);
		}, 1);
	};
	let showSubMenu = false;
	let showSub2Menu;

	function toggleModal() {
		showSubMenu = !showSubMenu;
	}
	function closeModal() {}
	export let menu;

	function setNavbarClose() {
		navbarOpen = false;
		overlay.set(false);
		navbarTrigger(navbarOpen);
	}

	function setNavbarOpen() {
		faqOpen = false;
		treatmentOpen = false;
		treatmentActive();
		faqActive();
		navbarOpen = !navbarOpen;
		overlay.set(!$overlay);
		navbarTrigger(navbarOpen);
	}
	let faqGeneral;
	const faqActive = (groupId) => {
		if (groupId == 'general') {
			faqGeneral = true;
		} else {
			faqGeneral = false;
		}
		treatmentGroups.map((group, i) => {
			if (group._id == groupId && groupId != 'general') {
				treatmentGroups[i].faqActive = true;
			} else {
				treatmentGroups[i].faqActive = false;
			}
		});
	};
	const treatmentActive = (groupId) => {
		treatmentGroups.map((group, i) => {
			if (group._id == groupId) {
				treatmentGroups[i].treatmentActive = true;
			} else {
				treatmentGroups[i].treatmentActive = false;
			}
		});
	};
	let faqOpen = false;
	let treatmentOpen = false;
	let blogOpen = false;
</script>

<!-- {$lang} -->

<!-- <p>{hakkimizda[`${$lang}_title`]}</p> -->
<nav
	class="top-0 absolute right-0 z-50 w-full flex flex-wrap items-center justify-between px-2 lg:mr-3 my-3 navbar-expand-lg"
>
	<div class="w-full relative flex justify-between w-auto xl:static xl:block xl:justify-start">
		<a
			class="text-white text-sm font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase"
			href={`/${$lang}`}
		>
			<img class="h-auto w-36" src={general?.logo} alt="ck-health" />
		</a>
		<button
			class="cursor-pointer text-xl text-white leading-none  px-2 py-1 border border-solid border-transparent rounded bg-transparent  outline-none focus:outline-none"
			type="button"
			on:click={setNavbarOpen}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				fill="#005b70"
				viewBox="0 0 16 16"
			>
				{@html !navbarOpen ? Svg.openedToggle : Svg.closedToggle}
			</svg>
		</button>
	</div>
	<div
		class="flex flex-grow items-center {navbarOpen ? 'block' : 'hidden'}"
		id="example-navbar-warning"
	>
		<ul class=" flex flex-col xl:flex-row list-none xl:ml-auto md:px-4 ">
			<li>
				<a
					class=" hover:text-white/60 text-white px-2 py-1 pt-4 flex items-center text-sm uppercase font-bold "
					href={`/${$lang}/about`}
					on:click={setNavbarClose}
				>
					{translate?.aboutUs}
				</a>
			</li>

			<div class="dropdown inline-block relative z-20 ">
				<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
					<div
						class="flex cursor-pointer"
						on:click={() => (treatmentOpen = !treatmentOpen)}
						on:click={() => (faqOpen = false)}
						on:click={() => (blogOpen = false)}
						on:keyup
					>
						<h2>{translate?.treatments}</h2>
					</div>
				</li>

				<ul
					class="{treatmentOpen
						? 'block'
						: 'hidden'} text-sm bg-transparent text-white font-semibold  text-white w-80 z-50"
				>
					{#if treatmentGroups}
						{#each treatmentGroups as group}
							{#if !group.group}
								<li class="">
									<a
										class="pt-1 block whitespace-no-wrap "
										on:click={setNavbarClose}
										href={`/${$lang}/treatment/${group?.perma}`}>{group?.name_BIG}</a
									>
								</li>
							{:else}
								<li class="">
									<span class="py-1 ml-4 block whitespace-no-wrap cursor-pointer ">
										<a
											class="flex items-center"
											on:click={setNavbarClose}
											on:keyup
											href={`/${$lang}/group/${group?.perma}`}
											>{group?.name_BIG}

											<!-- <div class="p-[0.3rem]">{@html Svg.angleRight}</div> -->
										</a>
									</span>
									<ul class=" bg-transparent rounded  text-white ">
										<!-- {#if treatments}
											{#each treatments as treatment}
												{#if treatment.treatmentGroup._id == group._id}
													<li>
														<a
															class="pr-2 ml-8 pt-1  block whitespace-no-wrap w-full {group.treatmentActive
																? 'block'
																: 'hidden'}  "
															href={`/${$lang}/treatment/${treatment?.perma}`}
															on:click={setNavbarClose}
														>
															{treatment?.name_BIG}</a
														>
													</li>
												{/if}
											{/each}
										{/if} -->
									</ul>
								</li>
							{/if}
						{/each}
					{/if}
				</ul>
			</div>
			<div class="dropdown inline-block relative z-20 ">
				<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
					<div
						class="flex cursor-pointer"
						on:click={() => (faqOpen = !faqOpen)}
						on:click={() => (treatmentOpen = false)}
						on:click={() => (blogOpen = false)}
						on:keyup
					>
						<h2>{translate?.faq}</h2>
					</div>
				</li>
				<ul
					class="{faqOpen
						? 'block'
						: 'hidden'} text-sm  bg-transparent text-white font-semibold text-white  z-50"
				>
					{#if treatmentGroups}
						{#each treatmentGroups as group}
							<li class="" on:click={setNavbarClose} on:keyup>
								<span class="pr-2 pl-4 py-1 block whitespace-no-wrap cursor-pointer ">
									<a class="flex items-center" href={`/${$lang}/faqs/${group?.perma}`}>
										<span>{group?.name_BIG} </span>
										<!-- <div class="p-[0.3rem]">{@html Svg.angleRight}</div> -->
									</a>
								</span>
								<!-- <ul class=" bg-transparent rounded  text-white  ">
									{#if $faqs}
										{#each $faqs as faq}
											{#if faq?.treatmentGroup?._id == group._id}
												<li class="hover:underline">
													<a
														on:click={setNavbarClose}
														class="pr-2 pl-8 py-1 block whitespace-no-wrap w-52 {group.faqActive
															? 'block'
															: 'hidden'} "
														href={`/${$lang}/faq/${faq?.perma}`}
													>
														{faq?.treatment?.name_BIG ? faq?.treatment.name_BIG : faq.name}</a
													>
												</li>
											{/if}
										{/each}
									{/if}
								</ul> -->
							</li>
						{/each}
						<!-- <li class="dropdown">
							<span class="pr-2 pl-4 pt-1 pb-1 block whitespace-no-wrap cursor-pointer ">
								<div class="flex items-center" on:click={() => faqActive('general')} on:keyup>
									<span>GENERAL</span>
									<div class="p-[0.3rem]">{@html Svg.angleRight}</div>
								</div>
							</span>
							<ul class=" bg-transparent rounded absolute hidden text-white  ">
								{#if $faqs}
									{#each $faqs as faq}
										{#if !faq?.treatmentGroup && !faq.homePage}
											<li class="hover:underline">
												<a
													class="pt-1 pb-2 block whitespace-no-wrap w-52 "
													href={`/${$lang}/faq/${faq?.perma}`}
												>
													{faq?.treatment?.name_BIG ? faq?.treatment?.name_BIG : faq?.name}</a
												>
											</li>
										{/if}
									{/each}
								{/if}
							</ul>
						</li> -->
					{/if}
				</ul>
			</div>
			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				<div
					class="flex cursor-pointer"
					on:click={() => (blogOpen = !blogOpen)}
					on:click={() => (treatmentOpen = false)}
					on:click={() => (faqOpen = false)}
					on:keyup
				>
					<h2>{translate?.blog}</h2>
				</div>
			</li>
			<ul
				class="{blogOpen
					? 'block'
					: 'hidden'} text-sm  bg-transparent text-white font-semibold text-white  z-50"
			>
				{#if $blogCats}
					{#each $blogCats as bc}
						<li class="" on:click={setNavbarClose} on:keyup>
							<span class="pr-2 pl-4 py-1 block whitespace-no-wrap cursor-pointer ">
								<a class="flex items-center" href={`/${$lang}/blogs`}
								on:click={() => blogCat.set(bc._id)}
								on:click={() => {
									search.set(undefined);
								}}>
									<span class="uppercase">{bc?.name} </span>
									<!-- <div class="p-[0.3rem]">{@html Svg.angleRight}</div> -->
								</a>
							</span>
						</li>
					{/each}
				{/if}
			</ul>
			<!-- <li>
				<a
					on:click={setNavbarClose}
					href={`/${$lang}/blogs`}
					class="hover:text-white/60 text-white px-2 py-1 flex items-center text-sm uppercase font-bold"
				>
					{translate?.blog}
				</a>
			</li> -->
			<li>
				<a
					on:click={setNavbarClose}
					class="hover:text-white/60 text-white px-2 py-1 flex items-center text-sm uppercase font-bold"
					href={`/${$lang}/contact`}
				>
					{translate?.contact}
				</a>
			</li>

			<li class="flex items-center  h-8">
				<span class="relative">
					{#if $lang && langs}
						<LangSelect
							value={$lang}
							change={(value) => langTrigger(value)}
							values={langs}
							valuesKey={'lang'}
							title="Lang"
							valuesTitleKey={'lang'}
							customClass="uppercase w-12 appearance-none w-full self-center shadow-none bg-transparent text-white pl-2 focus:outline-none text-sm font-semibold "
						/>
					{/if}
				</span>
			</li>
		</ul>
	</div>
</nav>
{#if showSubMenu}
	<div
		class=" md:hidden flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center  "
	>
		<div class="relative w-auto my-6 mx-auto  ">
			<!--content-->
			<div
				class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
			>
				<!--header-->
				<div class="flex items-start justify-between p-5 border-white rounded-t ">
					<h3 class="text-xl font-semibold">{translate?.contact}</h3>
					<button
						class="p-1 ml-auto bg-transparent border-0 text-gray-700  float-right line leading-none font-semibold outline-none focus:outline-none"
						on:click={toggleModal}
					>
						<span
							class="bg-transparent text-gray-700  h-6 w-6 text-2xl leading-3	 block outline-none focus:outline-none"
						>
							×
						</span>
					</button>
				</div>
				<!--body-->
			</div>
			<!--footer-->
		</div>
	</div>
{/if}
