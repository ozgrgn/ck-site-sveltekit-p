<script>
	import Spot from "./Spot.svelte";
	import { lang } from '$services/store';



  export let title;
  export let shortDesc;
  export let image;
  export let readMore;
  export let titleCss;
  export let category;
  export let link;
</script>
{#if link}
<a href={`/${$lang}/${link}`} class="flex gap-4 items-center ">
  <div class="w-1/3">
    <img class="border border-black/5" src={image} alt="" />
  </div>

  <div class="w-2/3 h-full flex flex-col justify-center">
    {#if category}
      <Spot
        content={category}
        customCss="text-black/60 text-left px-0 "
      />
    {/if}
    <h2 class="{titleCss}">{title}</h2>
    {#if shortDesc}
      <p class="pt-1 text-sm">
        {@html shortDesc && shortDesc.length > 90
          ? shortDesc.slice(0, 90) + "...  "
          : shortDesc}
      </p>
    {/if}
    {#if readMore}
      <Spot content="READ MORE" customCss="{readMore} text-white px-1 " />
    {/if}
  </div>
</a>
{:else}
<div  class="flex gap-4 items-center ">
  <div class="w-1/3">
    <img class="border border-black/5" src={image} alt="" />
  </div>

  <div class="w-2/3 h-full flex flex-col justify-center">
    {#if category}
      <Spot
        content={category}
        customCss="text-black/60 text-left px-0 "
      />
    {/if}
    <h2 class="{titleCss}">{title}</h2>
    {#if shortDesc}
      <p class="pt-1 text-sm">
        {@html shortDesc && shortDesc.length > 90
          ? shortDesc.slice(0, 90) + "...  "
          : shortDesc}
      </p>
    {/if}
    {#if readMore}
      <Spot content="READ MORE" customCss="{readMore} text-white px-1 " />
    {/if}
  </div>
</div>
{/if}