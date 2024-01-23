<script>
  import { onDestroy } from "svelte";
  import { createFieldValidator } from "../Validators/validation.js";
  import { requiredValidator } from "../Validators/validator.js";
  export let value;
  export let isValid;
  export let required;
  export let customClass;

  export let placeholder = "Please type something";
  let validate, validity;

  let validations = [];

  if (required) {
    validations = [...validations, requiredValidator()];
  }

  [validity, validate] = createFieldValidator(...validations);

  const validityUnsub = validity.subscribe((_validity) => {
    isValid = _validity.valid;
  });

  onDestroy(validityUnsub);
</script>

<textarea
class="border-0 p-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:outline-1 focus:outline-secondary  w-full {customClass} disabled:bg-slate-100"
bind:value
  {placeholder}
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
/>


