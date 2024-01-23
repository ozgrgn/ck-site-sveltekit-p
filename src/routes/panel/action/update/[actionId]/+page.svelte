<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';

	const deleteActionApprove = (actionId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteAction(actionId);
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
	

	let action;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'name', customValue: null },
		{ key: 'text', customValue: null },
		{ key: 'order', customValue: null },
	];

	const updateAction = async () => {
		let editedAction = {};
		editedAction.images = action.images;
		editedAction.logos = action.logos;
		values.map((v) => {
			editedAction[v.key] = action[v.key].value;
		});

		let response = await RestService.updateAction(action._id, editedAction);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/action');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getAction = async () => {
		let response = await RestService.getAction(data.actionId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['action'][v.key] = {
						value: response['action'][v.key][v.customValue]
					};
				} else {
					response['action'][v.key] = { value: response['action'][v.key] };
				}
			});
			action = {
				...response['action']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getAction();

	const deleteAction = async (actionId) => {
		let response = await RestService.deleteAction(actionId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/action');
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
					goto('/panel/action');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteActionApprove(data.actionId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Adım sayfasını güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if action}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={action.lang.value}
									bind:isValid={action.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Başlık
							</label>
							<Input
								bind:value={action.name.value}
								bind:isValid={action.name.isValid}
								placeholder={'Başlık'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Açıklama
							</label>
							<Input
								bind:value={action.text.value}
								bind:isValid={action.text.isValid}
								placeholder={'text'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<Input
								bind:value={action.order.value}
								bind:isValid={action.order.isValid}
								placeholder={'Sıralama'}
								required={false}
							/>
						</div>
					</div>
				
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateAction()}
								disabled={!action.lang.isValid}
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
