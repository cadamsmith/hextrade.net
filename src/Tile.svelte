<script type="ts">
    import { ResourceType } from "./models/ResourceType";

    import type { TileData } from "./models/TileData";

    export let data : TileData;

    function getResourceName() : string {
        switch (data.resourceType)
        {
            case ResourceType.Brick: {
                return "brick";
            }
            case ResourceType.Lumber: {
                return "lumber";
            }
            case ResourceType.Ore: {
                return "ore";
            }
            case ResourceType.Grain: {
                return "grain";
            }
            case ResourceType.Wool: {
                return "wool";
            }
            case ResourceType.None: {
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

    .none {
        background-color: #A09055;
    }

    .none > .center-disc {
        display: none;
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
    }
</style>