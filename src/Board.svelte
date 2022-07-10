<script lang="ts">
    import Tile from './Tile.svelte';

    import type { TileMap } from './models/TileMap';

    export let tileMap : TileMap;
    $: console.log(tileMap);
    $: console.log(tileMap.isFirstRowLeftJustified);
</script>

<div class="tile-rows {tileMap.isFirstRowLeftJustified ? 'tabbed-even-rows' : 'tabbed-odd-rows'}">
    {#each tileMap._data as tileRow}
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

    .tile-rows.tabbed-odd-rows > .tile-row:nth-of-type(2n - 1) {
        margin-left: 50px;
    }

    .tile-rows.tabbed-even-rows > .tile-row:nth-of-type(2n) {
        margin-left: 50px;
    }

    .tile-row:not(:nth-of-type(1)) {
        margin-top: -29px;
    }
</style>