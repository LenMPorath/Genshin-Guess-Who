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
	import PrivacyPolicyModal from '$lib/PrivacyPolicyModal.svelte';
	import PatchNotesModal from '$lib/PatchNotesModal.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// necessary for modals
	initializeStores();

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


	function openPatchNotesModal() {
		const modal: ModalSettings = {
			type: 'component',
			component: { ref: PatchNotesModal }
		};
		modalStore.trigger(modal);
	}
	
	function openPrivacyPolicyModal() {
		const modal: ModalSettings = {
			type: 'component',
			component: { ref: PrivacyPolicyModal }
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
				<div class="flex flex-col sm:flex-row items-baseline space-x-2">
					<div class="flex flex-row items-baseline sm:-space-x-2 space-x-1">
						<strong data-cy="text-headline" class="text-xl uppercase sm:mr-3"
							>Genshin Guess Who</strong
						>
						<button
							class="text"
							data-cy="text-headline-version"
							on:click={() => openPatchNotesModal()}
						>
							v1.4.0
						</button>
					</div>
					<p data-cy="text-sub-headline" class="text-sm uppercase">Made by Len</p>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button
					class="sm:text-sm text-xs"
					data-cy="button-privacy-policy"
					on:click={() => openPrivacyPolicyModal()}
				>
					Privacy Policy
				</button>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
