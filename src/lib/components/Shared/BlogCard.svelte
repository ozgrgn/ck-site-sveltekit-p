<script>

  import { lang } from "$services/store";
	import Spot from "./Spot.svelte";
	import moment from "moment";

  export let blog;
  export let dateColor;
</script>

<a class="relative flex flex-col shadow-lg h-full h-96 transition-all duration-300 hover:scale-[1.02]"  href={`/${$lang}/blogs/${blog.perma}`}>
  <img class="relative h-1/2 w-full object-cover" src={blog.blogThumb} alt="" />
  <div
    class="absolute top-64 md:top-60 right-10 {dateColor} w-14 h-14 text-white flex flex-col text-center leading-2 items-center justify-center font-semibold"
  >
    <span class="text-xl leading-5">{moment(blog?.date).format("DD")} </span><span class="text-xs uppercase">{moment(blog?.date).format("MMM")}</span>
  </div>
  <div class="bg-white w-full h-1/2 px-8 py-8 h-72">
    <Spot
      content={blog?.blogCat.name}
      customCss="bg-white text-black/60 py-2 text-left px-0 "
    />
    <h4 class="text-lg md:text-xl text-black capitalize">{blog?.blogHeader}</h4>
    <p class="text-black/70 text-sm pt-3">
      <span>
        {@html blog?.blogshortDesc && blog?.blogshortDesc.length > 150
          ? blog?.blogshortDesc.slice(0, 150) + "...  "
          : blog.blogshortDesc}
      </span>
    </p>
  </div>
</a>

