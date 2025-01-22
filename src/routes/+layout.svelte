<script lang="ts">
	import '$src/app.postcss';
	import {
		AppShell,
		AppBar,
		Modal,
		initializeStores,
		getModalStore,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import FullscreenModal from '$lib/FullscreenModal.svelte';

	// SkeletonUI Stores initialisieren
	initializeStores();

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const modalStore = getModalStore();

	const modalComponent: ModalComponent = { ref: FullscreenModal };
	const cBase = 'bg-surface-100-800-token w-screen h-screen p-4 flex justify-center items-center';

	function openModal() {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}
</script>

<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex flex-col sm:flex-row items-baseline">
					<strong class="text-xl uppercase sm:mr-3">Genshin Guess Who</strong>
					<p class="text-sm uppercase">Made by Len</p>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="sm:text-sm text-xs" on:click={() => openModal()}> Privacy Policy </button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>

{#if $modalStore[0]}
	<div class="modal-example-fullscreen {cBase}">
		<div class="flex flex-col items-center space-y-4">
			<h2 class="h2">Full Screen Modal</h2>
			<p>This demonstrates a full screen modal dialog.</p>
			<button class="btn variant-filled" on:click={parent.onclose}>× Close</button>
		</div>
	</div>
{/if}
