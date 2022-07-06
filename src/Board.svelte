<script lang="ts">
    import Tile from './Tile.svelte';

    import type { TileData } from './models/TileData';

    export let tileMap : TileData[][];
</script>

<div class="tile-rows">
    {#each tileMap as tileRow}
        <div class="tile-row">
            {#each tileRow as tileData}
                <Tile data={tileData} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .tile-rows {
        display: inline-flex;
        flex-direction: column;

        margin: 0 auto;
    }

    .tile-row {
        display: flex;
    }

    .tile-row:nth-of-type(2n - 1) {
        margin-left: 50px;
    }

    .tile-row:not(:nth-of-type(1)) {
        margin-top: -29px;
    }
</style>