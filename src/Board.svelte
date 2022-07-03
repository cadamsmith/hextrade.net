<script lang="ts">
    import { ResourceType } from './models/ResourceType';
    import { TileData } from './models/TileData';

    import Tile from './Tile.svelte';

    const ROW_LENGTHS = [3, 4, 5, 4, 3];

    function getTileDatas() {
        let scores = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

        let resourceTypes = [
            ... new Array(3).fill(ResourceType.Brick),
            ... new Array(4).fill(ResourceType.Lumber),
            ... new Array(3).fill(ResourceType.Ore),
            ... new Array(4).fill(ResourceType.Grain),
            ... new Array(4).fill(ResourceType.Wool),
        ];

        scores = shuffle(scores);
        resourceTypes = shuffle(resourceTypes);

        let tileDatas = new Array<TileData>();
        for (let i = 0; i < resourceTypes.length; i++) {
            tileDatas.push(new TileData(resourceTypes[i], scores[i]));
        }
        console.log(tileDatas);

        let blankTileData = new TileData(ResourceType.None, 0);
        let blankTileIndex = Math.floor(Math.random() * (tileDatas.length + 1));
        console.log(blankTileIndex);

        tileDatas = [... tileDatas.slice(0, blankTileIndex), blankTileData, ... tileDatas.slice(blankTileIndex)]
        console.log(tileDatas);

        return tileDatas;
    }

    let boardConfig = getTileDatas();

    let counter = 0;
    function getNextTileData() : TileData {
        const data = boardConfig[counter];
        counter++;

        return data;
    }

    function shuffle(array: any[]) : any[] {
        let shuffled = array;
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
</script>

<div class="tile-rows">
    {#if boardConfig.length != 0}
        {#each ROW_LENGTHS as ROW_LENGTH, _}
            <div class="tile-row">
                {#each Array(ROW_LENGTH) as _}
                    <Tile data={getNextTileData()} />
                {/each}
            </div>
        {/each}
    {/if}
</div>

<style>
    .tile-rows {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .tile-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>