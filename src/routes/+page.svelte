<script lang="ts">
	import CharacterTile from '$lib/CharacterTile.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data: { characters: { path: string; stars: number; disabled: boolean }[] };

	// Gebundener Bool für die SlideToggles
	let fourStarsActive = true;
	let fiveStarsActive = true;
	let hideMarkedCharacters = false;

	let undoStack: { path: string; previousState: boolean }[] = []; // Stack für das Rückgängigmachen von Aktionen
	$: visibleCharacters = computeVisibleCharacters();

	// Sichtbare Charaktere berechnen
	function computeVisibleCharacters() {
		return data.characters.filter((char) => {
			// Filter für 4- und 5-Sterne-Charaktere
			const starsFilter =
				(fourStarsActive && char.stars === 4) || (fiveStarsActive && char.stars === 5);
			// Filter für markierte Charaktere
			const hideFilter = hideMarkedCharacters ? !char.disabled : true;
			return starsFilter && hideFilter;
		});
	}

	// Funktion für den Reset-Button
	function resetCharacters() {
		data.characters.forEach((char) => {
			char.disabled = false;
		});
		undoStack = [];
		visibleCharacters = computeVisibleCharacters();
	}

	// Funktion für den Undo-Button
	function undoLastAction() {
		const lastAction = undoStack.pop();
		if (lastAction) {
			const char = data.characters.find((c) => c.path === lastAction.path);
			if (char) {
				char.disabled = lastAction.previousState;
				visibleCharacters = computeVisibleCharacters();
			}
		}
	}

	// Funktion beim Klicken auf einen Charakter
	function toggleCharacterState(charPath: string) {
		const char = data.characters.find((c) => c.path === charPath);
		if (char) {
			// Charakter zum Undo-Stack hinzufügen
			undoStack.push({ path: char.path, previousState: char.disabled });
			// Charakter de-/aktivieren
			char.disabled = !char.disabled;
			visibleCharacters = computeVisibleCharacters();
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
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Four Stars
		</SlideToggle>
		<SlideToggle
			name="five-stars"
			bind:checked={fiveStarsActive}
			active="bg-[#C77E2C]"
			background="bg-[#936234]"
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Five Stars
		</SlideToggle>
	</div>

	<div class="flex gap-4 justify-center">
		<SlideToggle
			name="hide-marked"
			bind:checked={hideMarkedCharacters}
			active="bg-[#4CAF50]"
			background="bg-[#388E3C]"
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Hide marked Characters
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
	{#if visibleCharacters.length > 0}
		{#each visibleCharacters as char}
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
