<script lang="ts">
    import Board from './Board.svelte';

    import {TileMapConfig} from './models/TileMap/TileMapConfig';
    import {TileMap} from './models/TileMap/TileMap';

    let map = new TileMap(TileMapConfig.fromClassicBoard());

    let isInEditMode = false;

    function editBoard() {
        isInEditMode = true;
        map.startEditing();
        refreshTiles();
    }

    function finishEditBoard() {
        isInEditMode = false;
        map.stopEditing();
        refreshTiles();
    }

    function randomizeBoard() {
        isInEditMode = false;
        map = new TileMap(TileMapConfig.fromClassicBoard());
        refreshTiles();
    }

    // have to do this because array reactivity is weird in Svelte
    function refreshTiles() {
        map._data = map._data;
    }
</script>

<section>
    <Board tileMap={map} />

    <div>
        {#if isInEditMode}
            <button class="action-btn save-btn" on:click={finishEditBoard}>☑️ done!</button>
        {:else}
            <button class="action-btn edit-btn" on:click={editBoard}>edit board</button>
        {/if}

        <button class="action-btn randomize-btn" on:click={randomizeBoard}>randomize!</button>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .action-btn {
        width: 100px;
    }
</style>