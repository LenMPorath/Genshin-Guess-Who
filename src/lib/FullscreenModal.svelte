<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Notes: Use `w-screen h-screen` to fit the visible canvas size.
	const cBase = 'bg-surface-100-800-token w-screen h-screen p-4 flex justify-center items-center';

	const dynamicSmallTextSize = 'sm:text-sm md:text-xs lg:text-sm text-sm';
	const dynamicHeadlineTextSize = 'sm:text md:text/sm lg:text text-lg';
</script>

{#if $modalStore[0]}
	<div class="modal-example-fullscreen {cBase}">
		<div class="flex flex-col items-center space-y-5">
			<div class="space-y-4 sm:space-y-2 text-gray-800 dark:text-gray-200">
				<h1 class="sm:text-3xl text-xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					No Data Collection
				</h3>
				<p class={dynamicSmallTextSize}>
					This application does not collect personal data. No cookies or analytics tools are used to
					track user behavior.
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					External Links
				</h3>
				<p class={dynamicSmallTextSize}>
					Links to external websites may be included. Please refer to their privacy policies as we
					are not responsible for their practices.
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					Server Logging
				</h3>
				<p class={dynamicSmallTextSize}>
					Server logs may record IP addresses and timestamps for security purposes but are not used
					to identify individuals.
				</p>
				<h3 class="{dynamicHeadlineTextSize} font-semibold text-gray-900 dark:text-white">
					Changes to This Policy
				</h3>
				<p class={dynamicSmallTextSize}>
					This privacy policy may be updated. The latest version will always be published on this
					page.
				</p>
			</div>
			<button class="btn btn-sm lg:btn variant-filled" on:click={parent.onClose}>× Close</button>
		</div>
	</div>
{/if}
