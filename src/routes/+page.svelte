<script lang="ts">
	import CharacterTile from '$lib/CharacterTile.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data: { characters: { path: string; stars: number; disabled: boolean }[] };

	let fourStarsActive = true;
	let fiveStarsActive = true;

	// Undo-Stack
	let undoStack: { path: string; previousState: boolean }[] = [];

	// Berechnete Liste der gefilterten Charaktere
	$: filteredCharacters = data.characters.filter(
		(char) => (fourStarsActive && char.stars === 4) || (fiveStarsActive && char.stars === 5)
	);

	// Setze alle Charaktere auf `disabled = false`
	function resetCharacters() {
		data.characters.forEach((char) => {
			char.disabled = false;
		});
		filteredCharacters = [...filteredCharacters];
		undoStack = [];
	}

	function toggleCharacterState(charPath: string) {
		const char = data.characters.find((c) => c.path === charPath);
		if (char) {
			// Zustand zum Undo-Stack hinzufügen
			undoStack.push({ path: char.path, previousState: char.disabled });
			// Zustand umschalten
			char.disabled = !char.disabled;
			filteredCharacters = [...filteredCharacters];
		}
	}

	function undoLastAction() {
		const lastAction = undoStack.pop();
		if (lastAction) {
			const char = data.characters.find((c) => c.path === lastAction.path);
			if (char) {
				char.disabled = lastAction.previousState;
				filteredCharacters = [...filteredCharacters];
			}
		}
	}
</script>

<div class="flex flex-col items-center gap-4 p-2 sm:flex-row sm:justify-center">
	<div class="flex gap-4 justify-center">
		<SlideToggle
			name="four-stars"
			bind:checked={fourStarsActive}
			active="bg-[#B180BA]"
			background="bg-[#645D87]"
		>
			Four Stars
		</SlideToggle>
		<SlideToggle
			name="five-stars"
			bind:checked={fiveStarsActive}
			active="bg-[#C77E2C]"
			background="bg-[#936234]"
		>
			Five Stars
		</SlideToggle>
	</div>
	
	<div class="flex gap-4 justify-center">
		<button
			class="btn variant-filled rounded-full w-1/2 sm:w-auto sm:mt-0"
			on:click={resetCharacters}
		>
			Reset Characters
		</button>
		<button
			class="btn variant-filled rounded-full w-1/2 sm:w-auto sm:mt-0"
			on:click={undoLastAction}
		>
			Undo
		</button>
	</div>
</div>

<div class="flex flex-wrap gap-3 p-2 justify-center">
	{#if filteredCharacters.length > 0}
		{#each filteredCharacters as char}
			<CharacterTile
				charIconPath={char.path}
				bind:disabled={char.disabled}
				onToggle={toggleCharacterState}
			/>
		{/each}
	{:else}
		<p class="col-span-full text-center text-primary-700-200-token">No characters available.</p>
	{/if}
</div>
