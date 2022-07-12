<script type="ts">
    import { createEventDispatcher } from 'svelte';
    import type { TileData } from "./models/Tile/TileData";
    import { NonBoardTileType } from "./models/Tile/TileType";
    import { getAllTileScoreOptions } from './models/DiceRoll/DiceRollResult';
    import { getAllBoardTileTypes } from "./models/Tile/TileType";

    export let data : TileData;

    $: isBoardTileType = data.tileType != NonBoardTileType.Void;

    $: hideTileMarker = data.score == 0|| !isBoardTileType;

    $: hideEditTileMarker = !isBoardTileType;

    let tileScoreOptions = getAllTileScoreOptions();
    let tileTypeOptions = getAllBoardTileTypes();

    const dispatch = createEventDispatcher();

    function handleAddToBoard() {
        dispatch('addToBoard', {
            position: data.position,
        });
    }

</script>

<div class="tile-content {data.tileType} class:editing={data.isEditing}">
    {#if isBoardTileType}
        {#if data.isEditing}
            <select bind:value={data.tileType}>
                {#each tileTypeOptions as tileType}
                    <option value={tileType}>{tileType}</option>
                {/each}
            </select>

            {#if !hideEditTileMarker}
                <select bind:value={data.score}>
                    <option value={0}>none</option>
                    {#each tileScoreOptions as tileMarkerNumber}
                        <option value={tileMarkerNumber}>{tileMarkerNumber}</option>
                    {/each}
                </select>
            {/if}
        {:else}
            {#if !hideTileMarker}
                <div class="center-disc">
                    <p class="tile-score">{data.score}</p>
                </div>
            {/if}
        {/if}
    {:else}
        {#if data.isEditing}
            <select bind:value={data.tileType} on:change={handleAddToBoard}>
                {#each tileTypeOptions as tileType}
                    <option value={tileType}>{tileType}</option>
                {/each}
            </select>
        {/if}
    {/if}

    <p class="position-text">r{data.position.x} c{data.position.y}</p>
</div>

<style>
    .tile-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 115px;
        text-align: center;

        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        
        background-color: red;

        position: relative;
    }

    .position-text {
        position: absolute;
        bottom: 0;
        display: none;
    }

    .brick {
        background-color: #A4553C;
    }

    .lumber {
        background-color: #326C42;
    }

    .ore {
        background-color: #74777F;
    }

    .grain {
        background-color: #CEA322;
    }

    .wool {
        background-color: #77B336;
    }

    .desert {
        background-color: #A09055;
    }

    .desert > .center-disc {
        display: none;
    }

    .water {
        background-color: #13E5FD;
    }

    .void {
        background-color: transparent;
    }

    .center-disc {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 35px;
        height: 35px;

        border: 2px solid black;
        border-radius: 50%;

        background-color: white;

        user-select: none;
    }
</style>