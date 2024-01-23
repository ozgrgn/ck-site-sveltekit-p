<script>
	import Form from "../Shared/Form.svelte";
	import HorizontalCard from "../Shared/HorizontalCard.svelte";
	import Spot from "../Shared/Spot.svelte";
export let treatmentGroups
export let translate
export let general

  
</script>

<h2 class="text-2xl font-semibold text-black/80 leading-8 tracking-wide">
  {translate.services}
</h2>
<div class="flex flex-col gap-6 pt-4">
  {#if treatmentGroups}
    {#each treatmentGroups as group, i}
      <HorizontalCard
        title={group.name}
        shortDesc={group.shortDesc}
        image={group.groupImage}
        readMore={i % 2 == 0 ? "bg-primary" : "bg-secondary"}
        link="group/{group.perma}"
      />
    {/each}
  {/if}
</div>
<div class="shadow my-10 p-4 pt-5">
  <div class=" flex flex-col justify-center items-center">
    <Spot content={general.formSpot} customCss="text-white bg-primary px-1" />

    <p class="py-5 text-4xl font-medium text-black/80">{general.formHeader}</p>
  </div>
  <Form {translate}/>
</div>
