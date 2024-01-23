<script>
	import { translate, general } from '$services/store';
	import Form from './Form.svelte';
	import Spot from './Spot.svelte';


</script>

<div class="container mx-auto border border-black/5 md:border-none shadow-lg md:shadow my-10 p-4 pt-5">
	<div class=" flex flex-col justify-center items-center">
		<Spot content={$general.formSpot} customCss="text-white bg-primary px-1" />

		<p class="py-5 text-4xl font-medium text-black/80">{$general.formHeader}</p>
	</div>
	<Form translate={$translate} />
</div>
