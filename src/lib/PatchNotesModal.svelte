<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// exposes parent props to this component
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// w-screen h-screen to fit the visible canvas size
	const cBase = 'bg-surface-100-800-token w-screen h-screen p-4 flex justify-center items-center';

	const dynamicSmallTextSize = 'sm:text-sm md:text-xs lg:text-sm text-sm';
	const dynamicHeadlineTextSize = 'sm:text md:text/sm lg:text text-lg';
</script>

{#if $modalStore[0]}
	<div data-cy="modal-privacy" class="modal-example-fullscreen {cBase}">
		<div class="flex flex-col items-center space-y-5">
			<div class="space-y-4 sm:space-y-2 text-gray-800 dark:text-gray-200">
				<div class="flex items-baseline space-x-4">
					<h1 class="sm:text-3xl text-xl font-bold text-gray-900 dark:text-white">
						Patch Notes
					</h1>
					<p class={dynamicSmallTextSize}>Last updated: Aug 14th, 2025</p>
				</div>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.4.0
				</h3>
				<p class={dynamicSmallTextSize}>
					Added Genshin Impact 5.8 and 6.0 characters
				</p>
				<p class={dynamicSmallTextSize}>
					Added HSR 3.2, 3.3, 3.4, 3.5, 3.6 characters
				</p>
				<p class={dynamicSmallTextSize}>
					Updated all HSR Icons
				</p>
				<p class={dynamicSmallTextSize}>
					Improved Light/Dark-Mode
				</p>
				<p class={dynamicSmallTextSize}>
					Added Patch Notes
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.3.0
				</h3>
				<p class={dynamicSmallTextSize}>
					Added Genshin Impact 5.6 and 5.7 characters
				</p>
				<p class={dynamicSmallTextSize}>
					Added a new drawer in the accordion for additional information regarding the currently supported game versions
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.2.0b
				</h3>
				<p class={dynamicSmallTextSize}>
					Added missing March 7th (Hunt), Changed some styling
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.2.0a
				</h3>
				<p class={dynamicSmallTextSize}>
					Removed a bug, where upon switching between Genshin and HSR mode, already selected Tiles won't be reset
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.2.0
				</h3>
				<p class={dynamicSmallTextSize}>
					Added HSR Characters up to 3.1
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.1.0a
				</h3>
				<p class={dynamicSmallTextSize}>
					Aesthetic Changes
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.1.0 
				</h3>
				<p class={dynamicSmallTextSize}>
					Added an Accordion Drawer on top of the page for game rules and more information
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					1.0.0
				</h3>
				<p class={dynamicSmallTextSize}>
					Base Release
				</p>
			</div>
			<button
				class="btn btn-sm lg:btn variant-filled"
				data-cy="button-modal-privacy-close"
				on:click={parent.onClose}>× Close</button
			>
		</div>
	</div>
{/if}
