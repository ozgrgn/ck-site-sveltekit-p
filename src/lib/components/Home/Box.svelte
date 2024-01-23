<script>
  import BoxCard from "./BoxCard.svelte";

  export let scrollPosition;
  export let boxGroups
</script>

<div class="md:flex justify-center container mx-auto">
  <div
    class="{scrollPosition != 0
      ? 'bg-white '
      : 'bg-transparent'} transition-colors duration-500 h-[30rem] w-full flex z-20 "
  >
<BoxCard {boxGroups} {scrollPosition} />
  </div>
</div>
