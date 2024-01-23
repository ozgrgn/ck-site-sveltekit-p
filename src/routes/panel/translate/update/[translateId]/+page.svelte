<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';

	const deleteTranslateApprove = (translateId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteTranslate(translateId);
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
	

	let translate;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'category', customValue: null },
		{ key: 'category_BIG', customValue: null },
		{ key: 'categories', customValue: null },
		{ key: 'categories_BIG', customValue: null },
		{ key: 'services', customValue: null },

		{ key: 'blog', customValue: null },
		{ key: 'contact', customValue: null },
		{ key: 'aboutUs', customValue: null },
		{ key: 'treatments', customValue: null },
		{ key: 'faq', customValue: null },
		{ key: 'faq_long', customValue: null },

		{ key: 'years', customValue: null },
		{ key: 'freeConsultation', customValue: null },
		{ key: 'freeConsultation_BIG', customValue: null },
		{ key: 'lastBlogs', customValue: null },
		{ key: 'lastBlogs_BIG', customValue: null },
		{ key: 'otherTopics', customValue: null },

		{ key: 'yourName', customValue: null },
		{ key: 'yourPhone', customValue: null },
		{ key: 'yourMail', customValue: null },
		{ key: 'yourMessage', customValue: null },
		
		{ key: 'phoneRequired', customValue: null },
		{ key: 'nameRequired', customValue: null },
		{ key: 'mailRequired', customValue: null },
		{ key: 'send', customValue: null },


		{ key: 'phone', customValue: null },
		{ key: 'email', customValue: null },
		{ key: 'whatsapp', customValue: null },
		{ key: 'address', customValue: null },
		{ key: 'image', customValue: null },
		{ key: 'readMore', customValue: null },
		{ key: 'postedOn', customValue: null },
		{ key: 'treatment', customValue: null },
		{ key: 'treatment_BIG', customValue: null },
		{ key: 'links', customValue: null },
		{ key: 'mailSent', customValue: null },
		{ key: 'search', customValue: null },
		{ key: 'loadMore', customValue: null },
		{ key: 'all', customValue: null }


	];

	const updateTranslate = async () => {
		let editedTranslate = {};
		values.map((v) => {
			editedTranslate[v.key] = translate[v.key].value;
		});

		let response = await RestService.updateTranslate(translate._id, editedTranslate);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/translate');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getTranslate = async () => {
		let response = await RestService.getTranslate(data.translateId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['translate'][v.key] = {
						value: response['translate'][v.key][v.customValue]
					};
				} else {
					response['translate'][v.key] = { value: response['translate'][v.key] };
				}
			});
			translate = {
				...response['translate']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getTranslate();

	const deleteTranslate = async (translateId) => {
		let response = await RestService.deleteTranslate(translateId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/translate');
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
					goto('/panel/translate');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteTranslateApprove(data.translateId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Çevirileri güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if translate}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={translate.lang.value}
									bind:isValid={translate.lang.isValid}
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
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Kategori
							</label>
							<Input
								bind:value={translate.category.value}
								bind:isValid={translate.category.isValid}
								placeholder={'Category'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								KATEGORİ
							</label>
							<Input
								bind:value={translate.category_BIG.value}
								bind:isValid={translate.category_BIG.isValid}
								placeholder={'Büyük Harf'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Kategoriler
							</label>
							<Input
								bind:value={translate.categories.value}
								bind:isValid={translate.categories.isValid}
								placeholder={'Kategoriler'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								KATEGORİLER
							</label>
							<Input
								bind:value={translate.categories_BIG.value}
								bind:isValid={translate.categories_BIG.isValid}
								placeholder={'Büyük Harf'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Servisler
							</label>
							<Input
								bind:value={translate.services.value}
								bind:isValid={translate.services.isValid}
								placeholder={'Servisler'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog
							</label>
							<Input
								bind:value={translate.blog.value}
								bind:isValid={translate.blog.isValid}
								placeholder={'Blog'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İletişim
							</label>
							<Input
								bind:value={translate.contact.value}
								bind:isValid={translate.contact.isValid}
								placeholder={'İletişim'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Hakkımızda
							</label>
							<Input
								bind:value={translate.aboutUs.value}
								bind:isValid={translate.aboutUs.isValid}
								placeholder={'Hakkımızda'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedaviler
							</label>
							<Input
								bind:value={translate.treatments.value}
								bind:isValid={translate.treatments.isValid}
								placeholder={'Tedaviler'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								SSS
							</label>
							<Input
								bind:value={translate.faq.value}
								bind:isValid={translate.faq.isValid}
								placeholder={'SSS'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sık Sorulan Sorular
							</label>
							<Input
								bind:value={translate.faq_long.value}
								bind:isValid={translate.faq_long.isValid}
								placeholder={'Sık Sorulan Sorular'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yıl
							</label>
							<Input
								bind:value={translate.years.value}
								bind:isValid={translate.years.isValid}
								placeholder={'(Years)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Ücretsiz Danışma
							</label>
							<Input
								bind:value={translate.freeConsultation.value}
								bind:isValid={translate.freeConsultation.isValid}
								placeholder={'Free Consultation'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								ÜCRETSİZ DANIŞMA
							</label>
							<Input
								bind:value={translate.freeConsultation_BIG.value}
								bind:isValid={translate.freeConsultation_BIG.isValid}
								placeholder={'FREE CONSULTATION'}
								required={false}
							/>
						</div>
					</div>
				
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Yazılar
							</label>
							<Input
								bind:value={translate.lastBlogs.value}
								bind:isValid={translate.lastBlogs.isValid}
								placeholder={'Last Blogs'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								SON YAZILAR
							</label>
							<Input
								bind:value={translate.lastBlogs_BIG.value}
								bind:isValid={translate.lastBlogs_BIG.isValid}
								placeholder={'LAST BLOGS'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Diğer Başlıklar
							</label>
							<Input
								bind:value={translate.otherTopics.value}
								bind:isValid={translate.otherTopics.isValid}
								placeholder={'Other Topics'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İsminiz
							</label>
							<Input
								bind:value={translate.yourName.value}
								bind:isValid={translate.yourName.isValid}
								placeholder={'Your Name'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefonunuz
							</label>
							<Input
								bind:value={translate.yourPhone.value}
								bind:isValid={translate.yourPhone.isValid}
								placeholder={'Your Phone'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Mailiniz
							</label>
							<Input
								bind:value={translate.yourMail.value}
								bind:isValid={translate.yourMail.isValid}
								placeholder={'Your E-mail'}
								required={false}
							/>
						</div>
					</div>
				
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Mesajınız
							</label>
							<Input
								bind:value={translate.yourMessage.value}
								bind:isValid={translate.yourMessage.isValid}
								placeholder={'Your Message'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon Gerekli 
							</label>
							<Input
								bind:value={translate.phoneRequired.value}
								bind:isValid={translate.phoneRequired.isValid}
								placeholder={'Phone Required'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İsim Gerekli
							</label>
							<Input
								bind:value={translate.nameRequired.value}
								bind:isValid={translate.nameRequired.isValid}
								placeholder={'Name Required'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Mail Gerekli
							</label>
							<Input
								bind:value={translate.mailRequired.value}
								bind:isValid={translate.mailRequired.isValid}
								placeholder={'Mail Required'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Gönder
							</label>
							<Input
								bind:value={translate.send.value}
								bind:isValid={translate.send.isValid}
								placeholder={'Send'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Gönderildi
							</label>
							<Input
								bind:value={translate.mailSent.value}
								bind:isValid={translate.mailSent.isValid}
								placeholder={'Form Gönderildi'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon  
							</label>
							<Input
								bind:value={translate.phone.value}
								bind:isValid={translate.phone.isValid}
								placeholder={'Phone'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								E-Posta  
							</label>
							<Input
								bind:value={translate.email.value}
								bind:isValid={translate.email.isValid}
								placeholder={'E-mail'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Whatsapp  
							</label>
							<Input
								bind:value={translate.whatsapp.value}
								bind:isValid={translate.whatsapp.isValid}
								placeholder={'Whatsapp'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Adres  
							</label>
							<Input
								bind:value={translate.address.value}
								bind:isValid={translate.address.isValid}
								placeholder={'Address'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Resim  
							</label>
							<Input
								bind:value={translate.image.value}
								bind:isValid={translate.image.isValid}
								placeholder={'Image'}
								required={false}
							/>
						</div>
					</div>
									<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Devamı  
							</label>
							<Input
								bind:value={translate.readMore.value}
								bind:isValid={translate.readMore.isValid}
								placeholder={'ReadMore'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yayınlanan Yer  
							</label>
							<Input
								bind:value={translate.postedOn.value}
								bind:isValid={translate.postedOn.isValid}
								placeholder={'Posted On'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedavi  
							</label>
							<Input
								bind:value={translate.treatment.value}
								bind:isValid={translate.treatment.isValid}
								placeholder={'Treatment'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								TEDAVİ 
							</label>
							<Input
								bind:value={translate.treatment_BIG.value}
								bind:isValid={translate.treatment_BIG.isValid}
								placeholder={'TREATMENT'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Links 
							</label>
							<Input
								bind:value={translate.links.value}
								bind:isValid={translate.links.isValid}
								placeholder={'LINKS'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Daha Fazla Yükle 
							</label>
							<Input
								bind:value={translate.loadMore.value}
								bind:isValid={translate.loadMore.isValid}
								placeholder={'Load More'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Arama 
							</label>
							<Input
								bind:value={translate.search.value}
								bind:isValid={translate.search.isValid}
								placeholder={'Search'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tümü 
							</label>
							<Input
								bind:value={translate.all.value}
								bind:isValid={translate.all.isValid}
								placeholder={'All'}
								required={false}
							/>
						</div>
					</div>
					
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateTranslate()}
								disabled={!translate.lang.isValid}
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
