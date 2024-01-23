<script>
	import { emailValidator, requiredValidator, lengthValidator } from '../Validators/validator.js';
	import { createFieldValidator } from '../Validators/validation.js';
	import { TranslateApiMessage } from '$services/language';

	import { onDestroy } from 'svelte';
	export let value = undefined;
	export let isValid = undefined;
	export let required = undefined;
	export let type = undefined;
	export let disabled = undefined;
	export let autocomplete = undefined;
	export let minLength = null;
	export let maxLength;
	export let placeholder = 'Please type something';
	export let customClass = '';
	export let change = () => {};
	export let input = () => {};
	let validate, validity;

	let validations = [];

	if (required) {
		validations = [...validations, requiredValidator()];
	}

	if (type && type == 'email') {
		validations = [...validations, emailValidator()];
	}
	[validity, validate] = createFieldValidator(...validations);

	if (minLength || maxLength) {
		validations = [...validations, lengthValidator(minLength, maxLength)];
	}
	const validityUnsub = validity.subscribe((_validity) => {
		isValid = _validity.valid;
	});

	onDestroy(validityUnsub);
</script>

<input
	class="border-0 px-2 h-9 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:outline-1 focus:outline-secondary w-full {customClass} disabled:bg-slate-100"
	type="text"
	bind:value
	{placeholder}
	on:change={change(value)}
	on:input={input(value)}
	class:field-danger={!$validity.valid}
	class:field-success={$validity.valid}
	use:validate={value}
	{disabled}
	{autocomplete}
/>

{#if $validity.dirty && !$validity.valid}
	<div class="w-full text-center flex justify-center">
		<span class="text-red-600 text-sm text-center">
			{$TranslateApiMessage($validity.message)}
		</span>
	</div>
{/if}
