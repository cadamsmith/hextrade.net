<script type="ts">
    import type { TileData } from "./models/TileData";
    import { ResourceTileType } from "./models/ResourceTileType";
    import { NonResourceTileType } from "./models/NonResourceTileType";

    export let data : TileData;

    function getResourceName() : string {
        switch (data.tileType)
        {
            case ResourceTileType.Brick: {
                return "brick";
            }
            case ResourceTileType.Lumber: {
                return "lumber";
            }
            case ResourceTileType.Ore: {
                return "ore";
            }
            case ResourceTileType.Grain: {
                return "grain";
            }
            case ResourceTileType.Wool: {
                return "wool";
            }
            case NonResourceTileType.Desert: {
                return "desert";
            }
            case NonResourceTileType.None: {
                return "none";
            }
        }
    }
</script>

<div class="tile-content {getResourceName()}">
    <div class="center-disc">
        <p class="tile-score">{data.score}</p>
    </div>
</div>

<style>
    .tile-content {
        display: flex;
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

    .none {
        background-color: pink;
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