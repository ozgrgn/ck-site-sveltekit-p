<script>
	import { fly } from 'svelte/transition';
	import HtmlText from './HtmlText.svelte';
	export let faq;
let faqs 
$: changeFaq (faq) 


const changeFaq = async (faq) =>{
	 faqs = [
		{ _id: 1, active: true, question: faq?.faq1q, answer: faq?.faq1a },
		{ _id: 2, active: false, question: faq?.faq2q, answer: faq?.faq2a },
		{ _id: 3, active: false, question: faq?.faq3q, answer: faq?.faq3a },
		{ _id: 4, active: false, question: faq?.faq4q, answer: faq?.faq4a },
		{ _id: 5, active: false, question: faq?.faq5q, answer: faq?.faq5a },
		{ _id: 6, active: false, question: faq?.faq6q, answer: faq?.faq6a },
		{ _id: 7, active: false, question: faq?.faq7q, answer: faq?.faq7a },
		{ _id: 8, active: false, question: faq?.faq8q, answer: faq?.faq8a },
		{ _id: 9, active: false, question: faq?.faq9q, answer: faq?.faq9a },
		{ _id: 10, active: false, question: faq?.faq10q, answer: faq?.faq10a }
	];
}
	const opened = (a) =>
		faqs.map((faq, index) => {
			if (faqs[index]._id == a) {
				faq.active = true;
			} else {
				faqs[index].active = false;
			}
		});
</script>

<div class="mt-6">
	{#if faqs}
		{#each faqs as faq}
			{#if faq.question}
				<div class="shadow mt-[0.1rem] rounded-lg ">
					<button
						on:click={() => opened(faq._id)}
						on:keydown
						class="flex items-center justify-between text-left md:text-center w-full p-4"
					>
						<h2 class="font-semibold text-md md:text-lg text-primary w-full">
							{faq.question}
						</h2>

						<span class="text-gray-400 bg-gray-200 rounded-full">
							{#if faq.active}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M18 12H6"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6"
									fill="#005b70"
									viewBox="0 0 24 24"
									stroke="#005b70"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							{/if}
						</span>
					</button>
					{#if faq.active}
						<div in:fly={{ y: 200, duration: 200 }}>
							<hr class="border-gray-200" />
							<p class="py-4 md:py-8 px-4 text-sm text-primary/90">
								<HtmlText text={ faq.answer}/>
							</p>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	{/if}
</div>
