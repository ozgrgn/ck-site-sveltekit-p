<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";
	import BlogCard from "../Shared/BlogCard.svelte";
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
  {#each slides as slide,i}


    <SplideSlide>
      <div class="p-4">
       <BlogCard blog={slide} dateColor={i % 2 == 0 ? "bg-primary" : "bg-secondary"}
       /></div>
    </SplideSlide>


    {/each}
  </Splide>
  