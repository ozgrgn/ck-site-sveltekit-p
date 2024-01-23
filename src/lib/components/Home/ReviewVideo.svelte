<script>
  import { onMount } from "svelte";
 
  let multiVideo;
  onMount(() => {
    if (typeof multiVideo.loop == "boolean") {
      multiVideo.loop = true;
    } else {
      multiVideo.on(
        "ended",
        () => {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
  });
</script>

<section class="showcase" id="homes">
  <div class="video-container ">
    <video
      src="/assets/multi.mp4"
      autoplay
      muted
      playsinline
      bind:this={multiVideo}
    />
    <div class="absolute top-0 left-0 w-full " />
  </div>
</section>

<style>
  .showcase {
    height: 100%;
    position: relative;
  }
  /* TODO, Fallback background here */
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
      height: 100%;
    overflow: hidden;
  }
  .video-container video {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
  .video-container:after {
    content: "";
    z-index: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #00000031;
    position: absolute;
  }
  .content {
    box-shadow: inset 50vw 0 70px -7px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    /* background-color: rgba(0, 0, 0, 0.5); */
  }
</style>
