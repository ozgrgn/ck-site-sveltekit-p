<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';

	const deleteBlogCatApprove = (blogCatId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteBlogCat(blogCatId);
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
		let treatmentGroups;
	const getTreatmentGroups = async () => {
		let response = await RestService.getTreatmentGroups(undefined, undefined);
		treatmentGroups = response['treatmentGroups'];
	};
	getTreatmentGroups();
	export let data;

	let blogCat;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'name', customValue: null },
		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null },
		{ key: 'treatmentGroup', customValue: null },
		{ key: 'order', customValue: null },
		{ key: 'image', customValue: null },
		{ key: 'perma', customValue: null },


	];

	const updateBlogCat = async () => {
		let editedBlogCat = {};
		values.map((v) => {
			editedBlogCat[v.key] = blogCat[v.key].value;
		});

		let response = await RestService.updateBlogCat(blogCat._id, editedBlogCat);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/blogCat');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getBlogCat = async () => {
		let response = await RestService.getBlogCat(data.blogCatId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['blogCat'][v.key] = {
						value: response['blogCat'][v.key][v.customValue]
					};
				} else {
					response['blogCat'][v.key] = { value: response['blogCat'][v.key] };
				}
			});
			blogCat = {
				...response['blogCat']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getBlogCat();

	const deleteBlogCat = async (blogCatId) => {
		let response = await RestService.deleteBlogCat(blogCatId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/blogCat');
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
					goto('/panel/blogCat');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteBlogCatApprove(data.blogCatId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Blog Kategorisini güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if blogCat}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={blogCat.lang.value}
									bind:isValid={blogCat.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<Input
								bind:value={blogCat.order.value}
								bind:isValid={blogCat.order.isValid}
								placeholder={'Sıra'}
								required={false}
							/>
						</div>
					</div>
				
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Kategorisi İsmi
							</label>
							<Input
								bind:value={blogCat.name.value}
								bind:isValid={blogCat.name.isValid}
								placeholder={'Kategori İsmi'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedavi Grubu Bağlantısı
							</label>
							{#if treatmentGroups}
								<Select
									bind:value={blogCat.treatmentGroup.value}
									bind:isValid={blogCat.treatmentGroup.isValid}
									values={treatmentGroups}
									title={'Kategori Seçin'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
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
								bind:value={blogCat.perma.value}
								bind:isValid={blogCat.perma.isValid}
								placeholder={'plastic-surgery'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Başlığı Max 50 ({blogCat?.metaTitle?.value?.length
									? blogCat?.metaTitle?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blogCat.metaTitle.value}
								bind:isValid={blogCat.metaTitle.isValid}
								placeholder={'Blog Kategori Sayfası Meta Başlığı 50 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Açıklası Max 150 ({blogCat?.metaDescription?.value?.length
									? blogCat?.metaDescription?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blogCat.metaDescription.value}
								bind:isValid={blogCat.metaDescription.isValid}
								placeholder={'Blog Kategori Sayfası Meta Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Kategorisi Resim (334x376)
							</label>
							<Image
								bind:value={blogCat.image.value}
								bind:isValid={blogCat.image.isValid}
							/>
						</div>
					</div>
				</div>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateBlogCat()}
								disabled={!blogCat.lang.isValid}
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
