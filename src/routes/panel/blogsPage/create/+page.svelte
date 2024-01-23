<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';

	  let langs; const getLangs = async () => {
    let response = await RestService.getLanguages(undefined, undefined);
    langs = response["languages"];
  };
  getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'spot', customValue: null },
		{ key: 'header', customValue: null },
		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null }
	];

	const addBlogsPage = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = blogsPage[v.key]?.value;
		});

		let response = await RestService.addBlogsPage(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/blogsPage');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let blogsPage = {};

	values.map((v) => {
		if (v.defaultValue) {
			blogsPage[v.key] = { value: v.defaultValue };
		} else {
			blogsPage[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/blogsPage');
			}}
		>
			<i class="fa fa-arrow-left" />
			Geri
		</button>
		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between">
					<h3 class="font-semibold text-lg text-blueGray-700">Blog Sayfası Ekle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={blogsPage.lang.value}
									bind:isValid={blogsPage.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Spot
							</label>
							<Input
								bind:value={blogsPage.spot.value}
								bind:isValid={blogsPage.spot.isValid}
								placeholder={'Blog sayfası Spotu'}
								required={true}
							/>
						</div>
					</div>

					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Başlık
							</label>
							<Input
								bind:value={blogsPage.header.value}
								bind:isValid={blogsPage.header.isValid}
								placeholder={'Blog sayfası Başlığı'}
								required={true}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Başlığı Max 50 ({blogsPage?.metaTitle?.value?.length
									? blogsPage?.metaTitle?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blogsPage.metaTitle.value}
								bind:isValid={blogsPage.metaTitle.isValid}
								placeholder={'Blog sayfası Meta Başlığı 50 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Açıklası Max 150 ({blogsPage?.metaDescription?.value?.length
									? blogsPage?.metaDescription?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blogsPage.metaDescription.value}
								bind:isValid={blogsPage.metaDescription.isValid}
								placeholder={'Blog sayfası Meta Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!blogsPage.lang.isValid ||
								!blogsPage.spot.isValid ||
								!blogsPage.header.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addBlogsPage()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
