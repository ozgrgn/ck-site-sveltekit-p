<script>
  import { DateInput } from "date-picker-svelte";
  import moment from "moment";
  export let value;
  if (value) {
    value = moment(value).second(0).millisecond(0).toDate();
  }
  export let placeholder = "Tarih seçiniz";
</script>

<DateInput
  closeOnSelection={true}
  {placeholder}
  format="dd.MM.yyyy"
  bind:value
/>
