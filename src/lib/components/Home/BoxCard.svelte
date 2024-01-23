<script>
	import { lang, desktop } from '$services/store';
	import GroupSlider from '../sliders/GroupSlider.svelte';

	export let scrollPosition = 0;
	export let boxGroups;
</script>

{#if boxGroups}
	{#if $desktop}
		{#each boxGroups as group, i}
			{#if i < 4}
				<a
					href={`/${$lang}/group/${group.perma}`}
					class="w-1/4 text-center transition-all duration-500 {scrollPosition == 0
						? ''
						: 'hover:shadow-2xl'}"
				>
					<div
						class="{scrollPosition == 0
							? ''
							: 'hover:border-0 border border-neutral-100'}  h-full p-4 transition-colors duration-500 flex flex-col justify-between"
					>
						<h2
							class="{scrollPosition == 0
								? 'text-white'
								: 'text-black'} font-bold text-2xl h-18 flex items-center justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,1)]"
						>
							{group.name_BIG}
						</h2>
						<div class="w-full flex justify-center pt-10 ">
							<img class="rounded-full w-2/3 h-auto" src={group?.groupImage} alt={group?.name} />
						</div>
						<div class="w-full flex justify-center pt-10 h-48">
							<p class="font-normal text-md text-black">
								<span> {group?.shortDesc}</span>
							</p>
						</div>
					</div>
				</a>
			{/if}
		{/each}
	{:else}
		<GroupSlider groups={boxGroups} {scrollPosition}/>
	{/if}
{/if}
