<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'headerbutton', customValue: null },
		{ key: 'slogan1', customValue: null },
		{ key: 'slogan2', customValue: null },

		{ key: 'phone1', customValue: null },
		{ key: 'phone2', customValue: null },
		{ key: 'whatsapp1', customValue: null },
		{ key: 'whatsapp2', customValue: null },

		{ key: 'address1', customValue: null },
		{ key: 'address2', customValue: null },
		{ key: 'email1', customValue: null },
		{ key: 'email2', customValue: null },

		{ key: 'facebook', customValue: null },
		{ key: 'instagram', customValue: null },
		{ key: 'youtube', customValue: null },

		{ key: 'companyShortDesc', customValue: null },
		{ key: 'copright', customValue: null },
		{ key: 'maplink', customValue: null },
		{ key: 'logo', customValue: null },
		{ key: 'googleRate', customValue: null },
		{ key: 'trustPilotRate', customValue: null },
		{ key: 'facebookRate', customValue: null },

		{ key: 'faqHeader', customValue: null },
		{ key: 'faqSpot', customValue: null },

		{ key: 'formSpot', customValue: null },
		{ key: 'formHeader', customValue: null },

		{ key: 'generalMetaTitle', customValue: null },
		{ key: 'generalMetaDescription', customValue: null },

		{ key: 'footer1', customValue: null },
		{ key: 'footer1Perma', customValue: null },
		{ key: 'footer2', customValue: null },
		{ key: 'footer2Perma', customValue: null },
		{ key: 'footer3', customValue: null },
		{ key: 'footer3Perma', customValue: null },
		{ key: 'footer4', customValue: null },
		{ key: 'footer4Perma', customValue: null },
		{ key: 'cookies', customValue: null },
		{ key: 'blogContactLink', customValue: null },

	];

	const addGeneral = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = general[v.key]?.value;
		});

		let response = await RestService.addGeneral(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/general');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let general = {};

	values.map((v) => {
		if (v.defaultValue) {
			general[v.key] = { value: v.defaultValue };
		} else {
			general[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/general');
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
					<h3 class="font-semibold text-lg text-blueGray-700">Dil Ekle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={general.lang.value}
									bind:isValid={general.lang.isValid}
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
								Header Buton
							</label>
							<Input
								bind:value={general.headerbutton.value}
								bind:isValid={general.headerbutton.isValid}
								placeholder={'Header Button (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Slogan 1
							</label>
							<Input
								bind:value={general.slogan1.value}
								bind:isValid={general.slogan1.isValid}
								placeholder={'Slogan 1'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Slogan 2
							</label>
							<Input
								bind:value={general.slogan2.value}
								bind:isValid={general.slogan2.isValid}
								placeholder={'Slogan 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								SSS Spot
							</label>
							<Input
								bind:value={general.faqSpot.value}
								bind:isValid={general.faqSpot.isValid}
								placeholder={'SSS Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								SSS Başlık
							</label>
							<Input
								bind:value={general.faqHeader.value}
								bind:isValid={general.faqHeader.isValid}
								placeholder={'SSS Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Spot
							</label>
							<Input
								bind:value={general.formSpot.value}
								bind:isValid={general.formSpot.isValid}
								placeholder={'Form Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Başlık
							</label>
							<Input
								bind:value={general.formHeader.value}
								bind:isValid={general.formHeader.isValid}
								placeholder={'Form Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon 1
							</label>
							<Input
								bind:value={general.phone1.value}
								bind:isValid={general.phone1.isValid}
								placeholder={'Telefon 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon 2
							</label>
							<Input
								bind:value={general.phone2.value}
								bind:isValid={general.phone2.isValid}
								placeholder={'Telefon 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Whatsapp 1
							</label>
							<Input
								bind:value={general.whatsapp1.value}
								bind:isValid={general.whatsapp1.isValid}
								placeholder={'Whatsapp 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Whatsapp 2
							</label>
							<Input
								bind:value={general.whatsapp2.value}
								bind:isValid={general.whatsapp2.isValid}
								placeholder={'Whatsapp 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Email 1
							</label>
							<Input
								bind:value={general.email1.value}
								bind:isValid={general.email1.isValid}
								placeholder={'Email 1'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Email 2
							</label>
							<Input
								bind:value={general.email2.value}
								bind:isValid={general.email2.isValid}
								placeholder={'Email 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Adres 1
							</label>
							<Input
								bind:value={general.address1.value}
								bind:isValid={general.address1.isValid}
								placeholder={'Adres 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Adres 2
							</label>
							<Input
								bind:value={general.address2.value}
								bind:isValid={general.address2.isValid}
								placeholder={'Adres 2'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Facebook Linki
							</label>
							<Input
								bind:value={general.facebook.value}
								bind:isValid={general.facebook.isValid}
								placeholder={'Facebook'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Instagram Linki
							</label>
							<Input
								bind:value={general.instagram.value}
								bind:isValid={general.instagram.isValid}
								placeholder={'Instagram'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Youtube Linki
							</label>
							<Input
								bind:value={general.youtube.value}
								bind:isValid={general.youtube.isValid}
								placeholder={'Youtube'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Google Puanı
							</label>
							<Input
								bind:value={general.googleRate.value}
								bind:isValid={general.googleRate.isValid}
								placeholder={'5.0/5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								TrustPilot Puanı
							</label>
							<Input
								bind:value={general.trustPilotRate.value}
								bind:isValid={general.trustPilotRate.isValid}
								placeholder={'5.0/5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Facebook Puanı
							</label>
							<Input
								bind:value={general.facebookRate.value}
								bind:isValid={general.facebookRate.isValid}
								placeholder={'5.0/5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link1
							</label>
							<Input
								bind:value={general.footer1.value}
								bind:isValid={general.footer1.isValid}
								placeholder="Footer Link 1"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link1 Perma
							</label>
							<Input
								bind:value={general.footer1Perma.value}
								bind:isValid={general.footer1Perma.isValid}
								placeholder="Footer Link 1 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link2
							</label>
							<Input
								bind:value={general.footer2.value}
								bind:isValid={general.footer2.isValid}
								placeholder="Footer Link 2"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link2 Perma
							</label>
							<Input
								bind:value={general.footer2Perma.value}
								bind:isValid={general.footer2Perma.isValid}
								placeholder="Footer Link 2 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link3
							</label>
							<Input
								bind:value={general.footer3.value}
								bind:isValid={general.footer3.isValid}
								placeholder="Footer Link 3"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link3 Perma
							</label>
							<Input
								bind:value={general.footer3Perma.value}
								bind:isValid={general.footer3Perma.isValid}
								placeholder="Footer Link 3 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link4
							</label>
							<Input
								bind:value={general.footer4.value}
								bind:isValid={general.footer4.isValid}
								placeholder="Footer Link 4"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link4 Perma
							</label>
							<Input
								bind:value={general.footer4Perma.value}
								bind:isValid={general.footer4Perma.isValid}
								placeholder="Footer Link 4 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Şirket Kısa Açıklaması Max 200 ({general?.companyShortDesc?.value?.length
									? general?.companyShortDesc?.value?.length
									: 0})
							</label>
							<Input
								bind:value={general.companyShortDesc.value}
								bind:isValid={general.companyShortDesc.isValid}
								placeholder={'Şirket Kısa Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Sonu Link Yazısı
							</label>
							<Input
								bind:value={general.blogContactLink.value}
								bind:isValid={general.blogContactLink.isValid}
								placeholder={'Blog Sonu Link Yazısı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Copright Yazısı
							</label>
							<Input
								bind:value={general.copright.value}
								bind:isValid={general.copright.isValid}
								placeholder={'Copright Yazısı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Harita Linki
							</label>
							<Input
								bind:value={general.maplink.value}
								bind:isValid={general.maplink.isValid}
								placeholder={'Harita Linki Giriniz (Orta)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Logo (300x109)
							</label>
							<Image
								bind:value={general.logo.value}
								bind:isValid={general.logo.isValid}
								placeholder={'Logo'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cookies Policy
							</label>
							<TextEditor
								bind:value={general.copright.value}
								bind:isValid={general.copright.isValid}
								placeholder="Cookies Policy"
								required={false}
							/>
						</div>
					</div>
				</div>
				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!general.lang.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addGeneral()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
