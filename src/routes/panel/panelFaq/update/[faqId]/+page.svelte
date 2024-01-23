<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import Textarea from '$src/lib/components/Form/Textarea.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';

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
	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	export let data;
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

	let faq;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'name', customValue: null },
		{ key: 'faq1q', customValue: null },
		{ key: 'faq2q', customValue: null },
		{ key: 'faq3q', customValue: null },
		{ key: 'faq4q', customValue: null },
		{ key: 'faq5q', customValue: null },
		{ key: 'faq6q', customValue: null },
		{ key: 'faq7q', customValue: null },
		{ key: 'faq8q', customValue: null },
		{ key: 'faq9q', customValue: null },
		{ key: 'faq10q', customValue: null },
		{ key: 'faq1a', customValue: null },
		{ key: 'faq2a', customValue: null },
		{ key: 'faq3a', customValue: null },
		{ key: 'faq4a', customValue: null },
		{ key: 'faq5a', customValue: null },
		{ key: 'faq6a', customValue: null },
		{ key: 'faq7a', customValue: null },
		{ key: 'faq8a', customValue: null },
		{ key: 'faq9a', customValue: null },
		{ key: 'faq10a', customValue: null },
		{ key: 'homePage', customValue: null },
		{ key: 'treatment', customValue: null },
		{ key: 'treatmentGroup', customValue: null },
		{ key: 'perma', customValue: null }
	];

	const updateFaq = async () => {
		if (faq.homePage.value) {
			faq.name.value = undefined;
			faq.treatment.value = undefined;
			faq.treatmentGroup.value = undefined;
		}
		let editedFaq = {};
		values.map((v) => {
			editedFaq[v.key] = faq[v.key].value;
		});

		let response = await RestService.updateFaq(faq._id, editedFaq);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/panelFaq');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getFaq = async () => {
		let response = await RestService.getFaq(data.faqId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['faq'][v.key] = {
						value: response['faq'][v.key][v.customValue]
					};
				} else {
					response['faq'][v.key] = { value: response['faq'][v.key] };
				}
			});
			faq = {
				...response['faq']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getFaq();

	const deleteFaq = async (faqId) => {
		let response = await RestService.deleteFaq(faqId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/panllFaq');
		} else {
			ToastService.success('İşlem başarılı');
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex justify-between">
			<button
				class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/panelFaq');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteFaqApprove(data.faqId)}
			>
				<i class="fa fa-trash" />
				Sil
			</button>
		</div>

		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between">
					<h3 class="font-semibold text-lg text-blueGray-700">SSS güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if faq}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={faq.lang.value}
									bind:isValid={faq.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3 flex flex-col items-center">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="rectangleBanner">
								Anasayfa mı?
							</label>

							<Switch bind:value={faq.homePage.value} />
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İsim
							</label>
							<Input
								bind:value={faq.name.value}
								bind:isValid={faq.name.isValid}
								placeholder={'İsim'}
								required={false}
								disabled={faq.homePage.value}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedavi Kategorisi
							</label>
							{#if treatmentGroups}
								<Select
									bind:value={faq.treatmentGroup.value}
									bind:isValid={faq.treatmentGroup.isValid}
									values={treatmentGroups}
									title={'Kategori Seçin'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
									disabled={faq.homePage.value}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedavi (Var ise)
							</label>
							{#if treatments}
								<Select
									bind:value={faq.treatment.value}
									bind:isValid={faq.treatment.isValid}
									values={treatments}
									title={'Tedavi Seçin'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
									disabled={faq.homePage.value}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Perma
							</label>
							<Input
								bind:value={faq.perma.value}
								bind:isValid={faq.perma.isValid}
								placeholder={'face-lifting'}
								required={false}
								disabled={faq.homePage.value}

							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 1
							</label>
							<Input
								bind:value={faq.faq1q.value}
								bind:isValid={faq.faq1q.isValid}
								placeholder={'Soru 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 1
							</label>
							<Textarea
								bind:value={faq.faq1a.value}
								bind:isValid={faq.faq1a.isValid}
								placeholder={'Cevap 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 2
							</label>
							<Input
								bind:value={faq.faq2q.value}
								bind:isValid={faq.faq2q.isValid}
								placeholder={'Soru 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 2
							</label>
							<Textarea
								bind:value={faq.faq2a.value}
								bind:isValid={faq.faq2a.isValid}
								placeholder={'Cevap 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 3
							</label>
							<Input
								bind:value={faq.faq3q.value}
								bind:isValid={faq.faq3q.isValid}
								placeholder={'Soru 3'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 3
							</label>
							<Textarea
								bind:value={faq.faq3a.value}
								bind:isValid={faq.faq3a.isValid}
								placeholder={'Cevap 3'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 4
							</label>
							<Input
								bind:value={faq.faq4q.value}
								bind:isValid={faq.faq4q.isValid}
								placeholder={'Soru 4'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 4
							</label>
							<Textarea
								bind:value={faq.faq4a.value}
								bind:isValid={faq.faq4a.isValid}
								placeholder={'Cevap 4'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 5
							</label>
							<Input
								bind:value={faq.faq5q.value}
								bind:isValid={faq.faq5q.isValid}
								placeholder={'Soru 5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 5
							</label>
							<Textarea
								bind:value={faq.faq5a.value}
								bind:isValid={faq.faq5a.isValid}
								placeholder={'Cevap 5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 6
							</label>
							<Input
								bind:value={faq.faq6q.value}
								bind:isValid={faq.faq6q.isValid}
								placeholder={'Soru 6'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 6
							</label>
							<Textarea
								bind:value={faq.faq6a.value}
								bind:isValid={faq.faq6a.isValid}
								placeholder={'Cevap 6'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 7
							</label>
							<Input
								bind:value={faq.faq7q.value}
								bind:isValid={faq.faq7q.isValid}
								placeholder={'Soru 7'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 7
							</label>
							<Textarea
								bind:value={faq.faq7a.value}
								bind:isValid={faq.faq7a.isValid}
								placeholder={'Cevap 7'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 8
							</label>
							<Input
								bind:value={faq.faq8q.value}
								bind:isValid={faq.faq8q.isValid}
								placeholder={'Soru 8'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 8
							</label>
							<Textarea
								bind:value={faq.faq8a.value}
								bind:isValid={faq.faq8a.isValid}
								placeholder={'Cevap 8'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 9
							</label>
							<Input
								bind:value={faq.faq9q.value}
								bind:isValid={faq.faq9q.isValid}
								placeholder={'Soru 9'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 9
							</label>
							<Textarea
								bind:value={faq.faq9a.value}
								bind:isValid={faq.faq9a.isValid}
								placeholder={'Cevap 9'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Soru 10
							</label>
							<Input
								bind:value={faq.faq10q.value}
								bind:isValid={faq.faq10q.isValid}
								placeholder={'Soru 10'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cevap 10
							</label>
							<Textarea
								bind:value={faq.faq10a.value}
								bind:isValid={faq.faq10a.isValid}
								placeholder={'Cevap 10'}
								required={false}
							/>
						</div>
					</div>
				</div>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateFaq()}
								disabled={!faq.lang.isValid}
								class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
								type="button"
							>
								Güncelle
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
