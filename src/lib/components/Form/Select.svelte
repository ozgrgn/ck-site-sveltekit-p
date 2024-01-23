<script>
	import { onDestroy } from 'svelte';
	import { TranslateApiMessage } from '$services/language';
	import { createFieldValidator } from '../Validators/validation.js';
	import { requiredValidator } from '../Validators/validator.js';
	export let value = null;
	export let isUnit = false;
	export let values = undefined;
	export let valuesKey = undefined;
	export let valuesTitleKey = undefined;
	export let valuesTitleKeySub = undefined;
	export let secondTitleKey = undefined;
	export let title = 'Select';
	export let change = () => {};
	export let customClass = '';
	export let isValid = undefined;
	export let required = undefined;
	export let disabled = undefined;

	let validate, validity;

	let validations = [];

	if (required) {
		validations = [...validations, requiredValidator()];
	}

	[validity, validate] = createFieldValidator(...validations);

	const validityUnsub = validity.subscribe((_validity) => {
		if (value && value == null) {
			isValid = false;
		} else {
			isValid = _validity.valid;
		}
	});

	onDestroy(validityUnsub);
</script>

<select
	class="border-0 px-2 h-9 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:outline-1 focus:outline-secondary w-full {customClass} disabled:bg-slate-100"
	class:field-danger={!$validity.valid}
	class:field-success={$validity.valid}
	use:validate={value}
	bind:value
	{disabled}
	on:change={change(value)}
>
	<option value={null}>{title}</option>
	{#each values as _value}
		<option value={_value[valuesKey]}>
			{#if valuesTitleKeySub}
				{_value[valuesTitleKey][valuesTitleKeySub]}
			{:else if isUnit && _value['number']}
				{_value[valuesTitleKey] + ' (' + _value['number'] + ')'}
			{:else}{_value[valuesTitleKey]}
				{#if secondTitleKey}
					- {_value[secondTitleKey]}
				{/if}
			{/if}
		</option>
	{/each}
</select>

{#if $validity.dirty && !$validity.valid}
	<span class="text-blue-600 text-xs">
		{$TranslateApiMessage($validity.message)}
	</span>
{/if}
