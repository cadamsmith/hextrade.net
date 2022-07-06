<script lang="ts">
    import Board from './Board.svelte';

    import {TileMap, TileMapConfig} from './models/TileMap';

    let map = new TileMap(TileMapConfig.fromClassicBoard());
    $: tileDatas = map.getData();

    let isInEditMode = false;

    function editBoard() {
        isInEditMode = true;
        map.startEditing();
        updateTileMap();
    }

    function finishEditBoard() {
        isInEditMode = false;
        map.stopEditing();
        updateTileMap();
    }

    function randomizeBoard() {
        isInEditMode = false;
        map = new TileMap(TileMapConfig.fromClassicBoard());
        updateTileMap();
    }

    // have to do this because array reactivity is weird in Svelte
    function updateTileMap() {
        tileDatas = tileDatas;
    }
</script>

<section>
    <Board tileMap={tileDatas} />

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