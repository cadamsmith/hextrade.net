<script type="ts">
    import type { TileData } from "./models/TileData";
    import { NonResourceTileType } from "./models/NonResourceTileType";
    import { getAllTileMarkerNumbers } from './models/DiceRollResult';
    import { getAllTileTypes } from "./models/TileType";

    export let data : TileData;

    $: hideTileMarker = data.score == 0
        || data.tileType == NonResourceTileType.Desert
        || data.tileType == NonResourceTileType.Empty;

    $: hideEditTileMarker = data.tileType == NonResourceTileType.Desert
        || data.tileType == NonResourceTileType.Empty;

    let tileMarkerNumbers = getAllTileMarkerNumbers();
    let tileTypes = getAllTileTypes();

    function handleChangeTileType(event: Event) {
        const select = event.target as HTMLSelectElement;

        const isDesert = select.value === NonResourceTileType.Desert;
        const isNone = select.value === NonResourceTileType.Empty;

        if (isDesert || isNone) {
            data.score = 0;
        }
    }
</script>

<div class="tile-content {data.tileType}">
        {#if data.isEditing}
            <select bind:value={data.tileType} on:input={handleChangeTileType}>
                {#each tileTypes as tileType}
                    <option value={tileType}>{tileType}</option>
                {/each}
            </select>

            {#if !hideEditTileMarker}
                <select bind:value={data.score}>
                    <option value="0">none</option>
                    {#each tileMarkerNumbers as tileMarkerNumber}
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

    .desert > .center-disc, .none > .center-disc {
        display: none;
    }

    .water {
        background-color: #13E5FD;
    }

    .empty {
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