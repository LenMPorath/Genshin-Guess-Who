<script lang="ts">
    import CharacterTile from "$lib/CharacterTile.svelte";
	import { SlideToggle } from "@skeletonlabs/skeleton";

    export let data: { characters: { path: string; stars: number }[] };
    let fourStarsActive = true;
    let fiveStarsActive = true;

    // Berechnete Liste der gefilterten Charaktere
    $: filteredCharacters = data.characters.filter(
        char => (fourStarsActive && char.stars === 4) || (fiveStarsActive && char.stars === 5)
    );
</script>

<!-- Filter-Slider -->
<div class="flex gap-4 p-2 justify-center">
    <SlideToggle name="four-stars" bind:checked={fourStarsActive} active=bg-[#B180BA] background=bg-[#645D87] size="lg">
        Four Stars
    </SlideToggle>
    <SlideToggle name="five-stars" bind:checked={fiveStarsActive} active=bg-[#C77E2C] background=bg-[#936234] size="lg">
        Five Stars
    </SlideToggle>
</div>
<!-- Grid-Container für die Kacheln -->
<div class="flex flex-wrap gap-3 p-2 justify-center">
    {#if filteredCharacters.length > 0}
        {#each filteredCharacters as char}
            <CharacterTile charIconPath={char.path} />
        {/each}
    {:else}
        <p class="col-span-full text-center text-primary-700-200-token">No characters available.</p>
    {/if}
</div>
