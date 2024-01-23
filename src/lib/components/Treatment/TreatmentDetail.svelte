<script>
	import HtmlText from "../Shared/HtmlText.svelte";


  export let treatment
</script>

<div class=" w-full lg:w-2/3 flex flex-col gap-2 text-sm text-black/80 leading-6">
  <img class="w-full  object-cover pb-2" src={treatment.treatmentImage} alt="" />

 <HtmlText text={treatment.text}/>
</div>
