<script lang="ts">
    import Tile from './Tile.svelte';

    import type { TileMap } from './models/TileMap/TileMap';
    import { TileRowIndentationScheme } from './models/TileMap/TileRowIndentationScheme';

    export let tileMap : TileMap;

    $: indentationClass = tileMap.tileRowIndentationScheme == TileRowIndentationScheme.Even
        ? 'tabbed-even-rows'
        : 'tabbed-odd-rows';

    function handleAddToBoard(event: CustomEvent) {
        console.log(event.detail.position);
        tileMap.handleAddTile(event.detail.position);
        refreshTiles();
    }

    function refreshTiles() {
        tileMap._data = tileMap._data;
    }
    
</script>

<div class="tile-rows {indentationClass}">
    {#each tileMap._data as tileRow}
        <div class="tile-row">
            {#each tileRow as tileData}
                <Tile on:addToBoard={handleAddToBoard} data={tileData} />
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