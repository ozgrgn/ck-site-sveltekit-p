<script>
	import Svg from '$assets/svg.json';

	import { navbar, lang, search, faqs, overlay, blogCats, blogCat } from '$services/store';
	import LangSelect from '$components/Form/LangSelect.svelte';
	import PopupButton from '../Button/PopupButton.svelte';
	export let treatments;
	export let treatmentGroups;
	export let langs;
	export let general;
	export let translate;

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

	function setNavbarClose() {
		navbarOpen = false;
		navbarTrigger(navbarOpen);
	}

	function setNavbarOpen() {
		navbarOpen = !navbarOpen;
		navbarTrigger(navbarOpen);
	}
</script>

<!-- {$lang} -->

<!-- <p>{hakkimizda[`${$lang}_title`]}</p> -->
<nav
	class="top-0 absolute right-0 z-50 w-full flex flex-wrap items-center justify-between px-2 lg:mr-3 my-3 navbar-expand-lg"
>
	<div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
		<a
			class="text-white text-sm font-bold leading-relaxed inline-block ml-6 py-2 whitespace-nowrap uppercase"
			href={`/${$lang}`}
		>
			<img class="h-auto w-44" src={general?.logo} alt="ck-health" />
		</a>
		<button
			class="cursor-pointer text-xl text-white leading-none px-2 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
			type="button"
			on:click={setNavbarOpen}
		/>
	</div>
	<div
		class="lg:flex flex-grow items-center {navbarOpen ? 'block' : 'hidden'}"
		id="example-navbar-warning"
	>
		<ul class=" flex flex-col lg:flex-row list-none lg:ml-auto ">
			<li>
				<a
					class="{$overlay
						? 'opacity-50'
						: 'opacity-100'}  hover:text-white/60 text-white px-2 py-2 flex items-center text-sm uppercase font-bold "
					href={`/${$lang}/about`}
					on:click={setNavbarClose}
				>
					{translate?.aboutUs}
				</a>
			</li>
			<li>
				<a
					class="{$overlay
						? 'opacity-50'
						: 'opacity-100'}  hover:text-white/60 text-white px-2 py-2 flex items-center text-sm uppercase font-bold "
					href={`/${$lang}/howwework`}
					on:click={setNavbarClose}
				>
					How Do We Work
				</a>
			</li>

			<div
				class="{$overlay ? 'dropdown' : ''} inline-block relative z-20 "
				on:mouseover={() => overlay.set(true)}
				on:mouseleave={() => overlay.set(false)}
				on:click={() => overlay.set(false)}
				on:keydown
				on:focus
			>
				<li class="text-white px-2 py-2 flex items-center text-sm uppercase font-bold">
					<div class="flex cursor-pointer">
						<h2 class={$overlay ? 'opacity-50' : 'opacity-100'}>{translate?.treatments}</h2>
					</div>
				</li>
				<ul
					class="dropdown-content text-sm pt-4 bg-transparent text-white font-semibold absolute hidden text-white w-52 z-50"
				>
					{#if treatmentGroups}
						{#each treatmentGroups as group}
							{#if !group.group}
								<li class="">
									<a
										class="py-2 -ml-6 block whitespace-no-wrap hover hover:underline "
										href={`/${$lang}/treatment/${group?.perma}`}>{group?.name_BIG}</a
									>
								</li>
							{:else}
								<li class="dropdown">
									<span class="py-2 -ml-6 block whitespace-no-wrap cursor-pointer ">
										<div class="flex items-center">
											<a href={`/${$lang}/group/${group?.perma}`}>{group?.name_BIG} </a>
											<div class="p-[0.3rem]">{@html Svg.angleRight}</div>
										</div>
									</span>
									<ul
										class="dropdown-content bg-transparent rounded absolute hidden text-white ml-40 -mt-9 "
									>
										{#if treatments}
											{#each treatments as treatment}
												{#if treatment.treatmentGroup._id == group._id}
													<li class="hover:underline">
														<a
															class="pr-2 mx-4 pt-1 pb-1 block whitespace-no-wrap w-56  "
															href={`/${$lang}/treatment/${treatment?.perma}`}
														>
															{treatment?.name_BIG}</a
														>
													</li>
												{/if}
											{/each}
										{/if}
									</ul>
								</li>
							{/if}
						{/each}
					{/if}
				</ul>
			</div>
			<div
				class="{$overlay ? 'dropdown' : ''} inline-block relative z-20 "
				on:mouseover={() => overlay.set(true)}
				on:mouseleave={() => overlay.set(false)}
				on:click={() => overlay.set(false)}
				on:keydown
				on:focus
			>
				<li class="text-white px-2 py-2 flex items-center text-sm uppercase font-bold">
					<div class="flex cursor-pointer">
						<h2 class={$overlay ? 'opacity-50' : 'opacity-100'}>{translate?.faq}</h2>
					</div>
				</li>
				<ul
					class="dropdown-content text-sm pt-4 bg-transparent text-white font-semibold absolute hidden text-white w-52 z-50"
				>
					{#if treatmentGroups}
						{#each treatmentGroups as group}
							<li class="dropdown">
								<span class="py-2 -ml-10 block whitespace-no-wrap cursor-pointer ">
									<div class="flex items-center">
										<span>{group?.name_BIG} </span>
										<div class="p-[0.3rem]">{@html Svg.angleRight}</div>
									</div>
								</span>
								<ul
									class="dropdown-content bg-transparent rounded absolute hidden text-white ml-36 -mt-9 "
								>
									{#if $faqs}
										{#each $faqs as faq}
											{#if faq?.treatmentGroup?._id == group._id}
												<li class="hover:underline">
													<a
														class="pr-2 mx-4 pt-1 pb-2 block whitespace-no-wrap w-48  "
														href={`/${$lang}/faq/${faq?.perma}`}
													>
														{faq?.treatment?.name_BIG ? faq?.treatment.name : faq.name}</a
													>
												</li>
											{/if}
										{/each}
									{/if}
								</ul>
							</li>
						{/each}
						<li class="dropdown">
							<span class="py-2 -ml-10 block whitespace-no-wrap cursor-pointer ">
								<div class="flex items-center">
									<span>OTHER TOPICS</span>
									<div class="p-[0.3rem]">{@html Svg.angleRight}</div>
								</div>
							</span>
							<ul
								class="dropdown-content bg-transparent rounded absolute hidden text-white ml-36 -mt-9 "
							>
								{#if $faqs}
									{#each $faqs as faq}
										{#if !faq?.treatmentGroup && !faq.homePage}
											<li class="hover:underline">
												<a
													class="pr-2 mx-4 pt-1 pb-2 block whitespace-no-wrap w-48  "
													href={`/${$lang}/faq/${faq?.perma}`}
												>
													{faq?.treatment?.name_BIG ? faq?.treatment?.name_BIG : faq?.name}</a
												>
											</li>
										{/if}
									{/each}
								{/if}
							</ul>
						</li>
					{/if}
				</ul>
			</div>
			<li>
				<!-- <a
					class="hover:text-white/60 text-white px-2 py-2 flex items-center text-sm uppercase font-bold {$overlay
						? 'opacity-50'
						: 'opacity-100'}"
					href={`/${$lang}/blogs`}
				>
					
				</a> -->
				<div
					class="{$overlay ? 'dropdown' : ''} inline-block relative z-20 "
					on:mouseover={() => overlay.set(true)}
					on:mouseleave={() => overlay.set(false)}
					on:click={() => overlay.set(false)}
					on:keydown
					on:focus
				>
					<li class="text-white px-2 py-2 flex items-center text-sm uppercase font-bold">
						<div class="flex cursor-pointer ">
							<a
								
								class="hover:text-white/60 text-white  flex items-center text-sm uppercase font-bold {$overlay
									? 'opacity-50'
									: 'opacity-100'}"
								href={`/${$lang}/blogs`}
							>
								<h2 class={$overlay ? 'opacity-100' : 'opacity-100'}>{translate?.blog}</h2>
							</a>
						</div>
					</li>
					<ul
						class="dropdown-content pt-4  -ml-10 text-sm font-semibold hidden bg-transparent rounded absolute  text-white "
					>
						{#if $blogCats}
							{#each $blogCats as bc}
								<li class="hover:underline uppercase ">
									<a
										class="pr-2 mx-4 pt-3 pb-2 block whitespace-no-wrap w-48  "
										on:click={() => blogCat.set(bc._id)}
										on:click={() => {
											search.set(undefined);
										}}
										href={`/${$lang}/blogs`}
									>
										{bc?.name}
									</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</li>
			<li>
				<a
					class="hover:text-white/60 text-white px-2 py-2 flex items-center text-sm uppercase font-bold {$overlay
						? 'opacity-50'
						: 'opacity-100'}"
					href={`/${$lang}/contact`}
				>
					{translate?.contact}
				</a>
			</li>
			<li class="flex items-center">
				<PopupButton
					customCss=" hidden md:block bg-button text-white bg-transparent border-white border active:bg-secondary text-xs font-bold uppercase px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
					buttonText={general?.headerbutton}
				/>
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
							customClass="uppercase w-12 appearance-none w-full self-center shadow-none bg-transparent text-white pl-3 focus:outline-none text-sm font-semibold {$overlay
								? 'opacity-50'
								: 'opacity-100'}"
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

<!-- <div
  class="{$overlay
    ? 'opacity-50'
    : 'opacity-0'} transition-all duration-500  absolute h-screen  inset-0 z-40 bg-black"
/> -->
<style>
	.dropdown:hover > .dropdown-content {
		display: block;
	}
</style>
