<script>
	export let content;
	export let customCss;
</script>

<div class="w-fit text-xs tracking-[0.2em]  {customCss ? customCss : 'text-white'} ">
	<p>{content}</p>
</div>
