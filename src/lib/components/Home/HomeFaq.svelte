<script>
	import FaqDetail from '../Shared/FaqDetail.svelte';
	import Spot from '../Shared/Spot.svelte';
	export let faq;
	export let general;
	
</script>

<div class="w-full flex flex-col justify-center items-center">
	<Spot content={general?.faqSpot} customCss="text-white bg-secondary px-1" />
	<div>
		<h2 class="font-bold text-3xl md:text-4xl leading-tight	text-center">{general?.faqHeader}</h2>
	</div>
	<div class="w-full">
		<FaqDetail {faq} />
	</div>
</div>
