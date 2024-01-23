<script>
	import RestService from '$services/rest';
	import Input from '../Form/Input.svelte';
	import PhoneInput from '../Form/PhoneInput.svelte';
	import Textarea from '../Form/Textarea.svelte';
	import { lang } from '$services/store';
	import { goto } from '$app/navigation';

	import { TranslateApiMessage } from '$services/language';

	export let translate;
	let formStatus=false;
	let warn = false;
	let name;
	let nameIsValid;
	let email;
	let emailIsValid;

	let phone;
	let phoneIsValid;
	let dialCode;
	let message;
	let messageIsValid;
	let loading;

	const sendMail = async () => {
		if (!name || !phone) {
			warn = true;
			return;
		}
		loading=true
		phone = dialCode + phone.replace(/\s/g, '');
		let getMailResponse = await RestService.sendMail($lang, name, phone, email, message);
		
		if (getMailResponse['status']) {
			warn = false;
			formStatus = true;
			loading=false
			goto(`/${$lang}/thankyou/`);

		} else {
			ToastService.error($TranslateApiMessage(getMailResponse.message));
			loading=false
		}
		
	};


</script>

{#if translate}
	{#if !formStatus}
		<div class="flex flex-col gap-2">
			<div
				class="text-center text-red-500 flex flex-col text-xs contact__msg {warn == true
					? ''
					: 'hidden'}"
				role="alert"
			>
				<span>{name ? '' : translate.nameRequired}</span>
				<span>{name && !phone ? translate.phoneRequired : ''}</span>
			</div>
			<Input
				customClass="h-12 text-sm font-semibold text-black/60 pl-2  focus:border-0"
				bind:value={name}
				bind:isValid={nameIsValid}
				type="text"
				name="name"
				placeholder={translate?.yourName}
				autocomplete="name"
			/>
	
			<Input
				customClass="h-12 text-sm font-semibold text-black/60 pl-2  focus:border-0"
				bind:value={email}
				bind:isValid={emailIsValid}
				type="text"
				name="email"
				placeholder={translate?.yourMail}
				autocomplete="email"
			/>
			<PhoneInput
			customClass="h-12 text-sm font-semibold text-black/60 pl-2 focus:border-0"
			bind:value={phone}
			bind:isValid={phoneIsValid}
			bind:dialCode
			type="text"
			name="name"
			placeholder={translate?.yourPhone}
			autocomplete="phone"
		/>
			<Textarea
				customClass="h-20 text-sm font-semibold text-black/60 pl-2 focus:border-0"
				bind:value={message}
				bind:isValid={messageIsValid}
				type="text"
				name="message"
				placeholder={translate?.yourMessage}
			/>
			<button
				class="w-full bg-secondary text-sm text-white font-bold py-2 rounded my-5"
				disabled={loading}
				on:click|preventDefault={sendMail}
			>
				{translate?.send}
			</button>
		</div>
	{:else}
		<div class="bg-green-200 text-center text-black/70 w-full contact__msg {formStatus == true ? '' : 'hidden'}" role="alert">
			{translate.mailSent}
		</div>
	{/if}
{/if}
