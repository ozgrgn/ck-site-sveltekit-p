<script>
	import Select from '$components/Form/Select.svelte';
	import { bind } from 'svelte-simple-modal';
	import { modal } from '$services/store';
	import { goto } from '$app/navigation';
	import Alert from '$components/Panel/Alert.svelte';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';
	import { TranslateApiMessage } from '$services/language';
	import ToastService from '$services/toast';

	const deleteFaqApprove = (faqId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteFaq(faqId);
					}
					modal.set(null);
				}
			})
		);
	};
	let limit = 10;
	let skip = 0;
	let totalDataCount = 0;
	let color = 'light';
	let treatmentGroup;
	let treatment;
	let lang = undefined;
	let langs;

	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	let treatmentGroups;
	const getTreatmentGroups = async () => {
		let response = await RestService.getTreatmentGroups(undefined, undefined);
		treatmentGroups = response['treatmentGroups'];
	};
	getTreatmentGroups();
	let treatments;
	const getTreatments = async () => {
		let response = await RestService.getTreatments(undefined, undefined);
		treatments = response['treatments'];
	};
	getTreatments();

	let faqs;
	const getFaqs = async () => {
		let getFaqsResponse = await RestService.getFaqs(
			lang,
			undefined,
			treatment,
			treatmentGroup,
			undefined,
			limit,
			skip
		);
		if (getFaqsResponse['status']) {
			faqs = getFaqsResponse['faqs'];
			totalDataCount = getFaqsResponse['count'];
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getFaqs();
	});

	const deleteFaq = async (faqId) => {
		let response = await RestService.deleteFaq(faqId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			getFaqs();
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const _pages = () => {
		if (totalDataCount > limit) {
			return new Array(Math.ceil(totalDataCount / limit));
		} else {
			return [1];
		}
	};

	const ceilAndCalculate = () => {
		if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
			skip = skip + limit;
			getFaqs();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/panelFaq/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">SSS</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if faqs}
					<table class="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if langs}
										<Select
											bind:value={lang}
											change={() => getFaqs()}
											values={langs}
											title={'Dil Seçin'}
											valuesKey={'lang'}
											valuesTitleKey={'name'}
											customClass={'w-full'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if treatmentGroups}
										<Select
											bind:value={treatmentGroup}
											change={() => getFaqs()}
											values={treatmentGroups}
											title={'Kategori Seçin'}
											valuesKey={'_id'}
											valuesTitleKey={'name'}
											customClass={'w-full'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if treatments}
										<Select
											bind:value={treatment}
											change={() => getFaqs()}
											values={treatments}
											title={'Tedavi Seçin'}
											valuesKey={'_id'}
											valuesTitleKey={'name'}
											customClass={'w-full'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Anasayfa?
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									İsim
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								/>
							</tr>
						</thead>
						<tbody>
							{#each faqs as faq}
								<tr>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{faq.lang}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{faq.treatmentGroup?.name ? faq.treatmentGroup?.name : '-'}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{faq.treatment?.name ? faq.treatment?.name : '-'}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{faq.homePage ? 'EVET' : 'HAYIR'}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{faq?.name ? faq?.name : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										<button
											class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
											on:click={goto(`/panel/panelFaq/update/${faq._id.toString()}`)}
										>
											Düzenle
										</button>
										<button
											on:click={() => deleteFaqApprove(faq._id.toString())}
											class="bg-white text-blue-600 hover:bg-[#6e6e85] hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
			<hr class="my-4 md:min-w-full" />
			{#if faqs}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getFaqs();
						}}
						values={[{ limit: 10 }, { limit: 20 }, { limit: 50 }, { limit: 100 }]}
						title={'Select page'}
						valuesKey={'limit'}
						valuesTitleKey={'limit'}
						customClass={'border border-blue-600 text-blue-600 py-1 w-full mx-16 lg:mx-0 lg:w-auto'}
					/>

					<button
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
						type="button"
						on:click={() => {
							skip != 0 ? (skip = skip - limit) : (skip = skip);
							getFaqs();
						}}
					>
						Geri
					</button>
					{#each _pages() as page, i}
						<button
							class="border {skip == limit * i
								? 'bg-blue-600 text-white'
								: 'bg-white text-blue-600 border-blue-600'} font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
							class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
							type="button"
							on:click={() => {
								skip = limit * i;
								getFaqs();
							}}
						>
							{i + 1}
						</button>
					{/each}

					<button
						onclick={ceilAndCalculate}
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
						type="button"
					>
						Sonraki
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
