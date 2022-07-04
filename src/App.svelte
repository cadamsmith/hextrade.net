<script lang="ts">
    import Board from './Board.svelte';

    import {TileMap, TileMapConfig} from './models/TileMap';

    const map = new TileMap(TileMapConfig.fromClassicBoard());
    $: tileDatas = map.getData();
</script>

<section>
    <Board tileMap={tileDatas} />
</section>

<style>
    section {
        display: flex;
        justify-content: center;
    }
</style>