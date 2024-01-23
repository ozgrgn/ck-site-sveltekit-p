<script>
	import Spot from "../Shared/Spot.svelte";
export let homePage
export let translate


</script>
{#if homePage}
<div class="container px-4 md:mx-auto px:0 xl:px-28 pt-24 pb-10  lg:pt-28">
  <div class="md:flex md:gap-4">
    <div class="md:w-2/5 relative">
      <img
        class=" h-[28rem] w-96 object-cover"
        src={homePage.signImage}
        alt="CK Health"
      />
      <div class="absolute -bottom-3 -left-3">
        <img class="h-36 w-36" src="/assets/img/signSmallBg.webp" alt="CK Health Antalya" />
        <div
          class="h-36 w-36 absolute top-0 left-0 text-white flex items-center justify-center "
        >
          <div class="flex flex-col ">
            <span class="text-5xl font-bold"> +{homePage.signYear}</span>
            <span class="text-md text-center">{translate.years}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="md:w-3/5 h-auto flex flex-col justify-between py-8 md:py-2 text-center md:text-left ">
    <Spot content={homePage.signSpot} customCss="text-white bg-secondary px-1"/>
      <div class="">
        <h2 class="font-bold text-4xl leading-tight	">
          {homePage.signHeader}
        </h2>
      </div>
      <div
        class="lg:grid lg:grid-cols-2 grid-rows-2 gap-10 py-10 text-sm font-medium leading-6"
      >
        <span
          >{homePage.signText1}</span
        >
        <span
          >{homePage.signText2}</span
        >
        <span
          >{homePage.signText3}</span
        >
        <span
          >{homePage.signText4}</span
        >
      </div>
      <div class="flex text-left">
        <img class="h-12 w-12 rounded-full" src={homePage.signAvatar} alt="CK Manager" />
        <div class="flex flex-col justify-center h-12 px-4 w-1/2">
          <p class="leading-2">
            <span class="text-md md:text-lg font-medium "> {homePage.signManager} </span>
          </p>
          <p class="leading-2 flex justify-start">
            <span class="text-[0.7rem] font-normal tracking-widest "
              >{homePage.signManagerTitle} </span
            >
          </p>
        </div>
        <div class="w-1/2s flex justify-start">
        <!-- <img class="h-12" src="/assets/img/signature.png" alt=""> -->
      </div></div>
    </div>
  </div>
</div>
{/if}
