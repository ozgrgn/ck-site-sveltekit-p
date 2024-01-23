<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";
	import Spot from "../Shared/Spot.svelte";
export let slides
export let category
</script>
  
  <Splide
    aria-label="My Favorite Images"
    options={{
        type:"loop",
      arrows: false,
      pagination: false,
      autoplay:true,
    }}
  >  
  {#each slides as slide}


    <SplideSlide>
        <a href={slide?.perma} class="relative h-full">
          <div class="h-full">
      <img
        class="h-full w-full object-cover "
        src={slide?.image}
        alt={slide?.name}
      />  
    </div>
      <div class="absolute top-0 bg-black/10 h-full w-full z-20"></div>
      <div class="absolute left-0 bottom-[1.9rem] 2xl:bottom-12  px-8 z-30">
        <Spot
          content={category}
          customCss="text-white font-semibold py-2 text-left"
        />
        <h4 class="text-xl text-white capitalize ">{slide?.name}</h4>
      </a>
    </SplideSlide>


    {/each}
  </Splide>
  