<script>

	import { modal } from '$services/store';
	import PopupForm from '../Shared/PopupForm.svelte';
	const showModal = () => modal.set(PopupForm);
    export let buttonText;
    export let customCss;

</script>



<button
	class={customCss}
	on:click={()=>showModal()}
>
	{buttonText}
</button>
