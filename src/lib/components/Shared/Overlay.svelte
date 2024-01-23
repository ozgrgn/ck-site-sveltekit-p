<script>
	    import { overlay,desktop } from "$services/store";
		import { fade } from 'svelte/transition';
console.log($desktop,"fffff")
</script>
{#if $overlay}
<div transition:fade
		class="absolute top-0 h-full w-full bg-black z-40 {$overlay
			? $desktop?'opacity-70':'opacity-90'
			: 'opacity-0'}"
	/>
	{/if}