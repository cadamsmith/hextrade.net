<script lang="ts">
    import Board from './Board.svelte';

    import {TileMap, TileMapConfig} from './models/TileMap';

    const map = new TileMap(TileMapConfig.fromClassicBoard());
    $: tileDatas = map.getData();

    let isInEditMode = false;

    function editBoard() {
        isInEditMode = true;
        map.startEditing();
        tileDatas = tileDatas;
    }

    function finishEditBoard() {
        isInEditMode = false;
        map.stopEditing();
        tileDatas = tileDatas;
    }
</script>

<section>
    <Board tileMap={tileDatas} />

    {#if isInEditMode}
        <button class="action-btn save-btn" on:click={finishEditBoard}>☑️ done!</button>
    {:else}
        <button class="action-btn edit-btn" on:click={editBoard}>edit board</button>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .action-btn {
        width: 75px;
    }
</style>