<script lang="ts">
    import { PlayerColor } from './models/PlayerColor';
    import { TileType } from './models/TileType';
    import { RoadData } from './models/RoadData';
    import { RoadOrientation } from './models/RoadOrientation';
    import { TileData } from './models/TileData';
    
    import Road from './Road.svelte';
    import Tile from './Tile.svelte';

    const ROW_LENGTHS = [3, 4, 5, 4, 3];
    
    let boardConfig : TileData[];
    let tileCounter = 0;

    let isPlacingRoad = false;

    $: roadConfig = new Array<RoadData>(24).fill(
        new RoadData(RoadOrientation.Vertical, false, isPlacingRoad)
    );
    $: console.log('roadConfig: ' + roadConfig);

    let roadCounter = 0;

    let currentPlayerColor = PlayerColor.None;

    initializeBoard();

    function getTileDatas() {
        let scores = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

        let resourceTypes = [
            ... new Array(3).fill(TileType.Brick),
            ... new Array(4).fill(TileType.Lumber),
            ... new Array(3).fill(TileType.Ore),
            ... new Array(4).fill(TileType.Grain),
            ... new Array(4).fill(TileType.Wool),
        ];

        scores = shuffle(scores);
        resourceTypes = shuffle(resourceTypes);

        let tileDatas = new Array<TileData>();
        for (let i = 0; i < resourceTypes.length; i++) {
            tileDatas.push(new TileData(resourceTypes[i], scores[i]));
        }

        let blankTileData = new TileData(TileType.None, 0);
        let blankTileIndex = Math.floor(Math.random() * (tileDatas.length + 1));

        tileDatas = [... tileDatas.slice(0, blankTileIndex), blankTileData, ... tileDatas.slice(blankTileIndex)];

        return tileDatas;
    }

    function initializeBoard() {
        tileCounter = 0;
        boardConfig = getTileDatas();

        roadCounter = 0;
    }

    function getNextTileData() : TileData {
        const data = boardConfig[tileCounter];
        tileCounter++;

        return data;
    }

    function getNextRoadData() : RoadData {
        const data = roadConfig[roadCounter];
        roadCounter++;

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

    function startPlaceRoad(playerColor: PlayerColor) {
        currentPlayerColor = playerColor;
        isPlacingRoad = true;

        roadConfig = roadConfig;

        console.log(roadConfig);
    }
</script>

<div class="tile-rows">
    {#if boardConfig.length != 0}
        {#each ROW_LENGTHS as ROW_LENGTH, _}
            <div class="tile-row">
                <Road data={getNextRoadData()} />

                {#each Array(ROW_LENGTH) as _}
                    <Tile data={getNextTileData()} />

                    <Road data={getNextRoadData()} />
                {/each}
            </div>
        {/each}
    {/if}
</div>

<button class="red-road-btn" on:click={() => startPlaceRoad(PlayerColor.Red)}>Place Red Road</button>
<button class="blue-road-btn" on:click={() => startPlaceRoad(PlayerColor.Blue)}>Place Blue Road</button>
<button class="orange-road-btn" on:click={() => startPlaceRoad(PlayerColor.Orange)}>Place Orange Road</button>
<button class="white-road-btn" on:click={() => startPlaceRoad(PlayerColor.White)}>Place White Road</button>

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
        align-items: center;
    }

    .tile-row:not(:nth-of-type(1)) {
        margin-top: -29px;
    }
</style>