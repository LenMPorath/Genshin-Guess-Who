<script lang="ts">
    export let charIconPath: string;
    
    $: charName = formatCharacterName(charIconPath);
    let disabled: boolean = false;

    function formatCharacterName(path: string): string {
    // Extract the last part of the path after the last slash
    const fileName = path.split('/').pop();
    if (!fileName) {
        throw new Error("Invalid path");
    }

    // Remove the file extension (.webp)
    const baseName = fileName.replace('.webp', '');

    // Replace underscores with spaces and capitalize each word
    const formattedName = baseName
        .split('_') // Split by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words with spaces

    return formattedName;
}
</script>

<div
    class="w-[6%] h-auto bg-primary-600-300-token shadow-md rounded-lg flex flex-col items-center p-3 space-y-2 
    border border-primary-500-400-token hover:shadow-lg transition-all duration-200 
    cursor-pointer relative box-border"
    class:opacity-50={disabled}
    on:click={() => { disabled = !disabled }}
>
    <div class="w-[100%] h-auto bg-gray-100 rounded-full overflow-hidden border border-gray-300">
        <img src={charIconPath} alt={charName} class="object-cover w-full h-full" />
    </div>

    <!-- Charaktername -->
    <h1 class="text-center text-xs break-normal font-semibold text-gray-800">
        {charName}
    </h1>

    <!-- "Disabled"-Overlay, falls nötig -->
    {#if disabled}
        <div class="absolute bg-gray-400 bg-opacity-50 rounded-lg flex items-center justify-center">
        </div>
    {/if}
</div>
