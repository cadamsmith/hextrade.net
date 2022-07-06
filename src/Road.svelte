
<script lang="ts">
    import type { RoadData } from "./models/RoadData";
    import { RoadOrientation } from "./models/RoadOrientation";

    export let data : RoadData;

    function getRoadOrientation() : string {
        switch (data.orientation)
        {
            case RoadOrientation.Vertical: {
                return "vertical";
            }
            case RoadOrientation.PositiveIncline: {
                return "positive-incline";
            }
            case RoadOrientation.NegativeIncline: {
                return "negative-incline";
            }
        }
    }
</script>

<div class="road-material {getRoadOrientation()}" class:is-placed={data.isPlaced} class:is-placeable={data.isPlaceable}></div>

<style>
    .road-material {
        width: 10px;
        height: 60px;
        z-index: 1000;

        visibility: hidden;

        margin: 0 -5px;
    }

    .positive-incline {
        transform: rotate(-30deg);
    }

    .negative-incline {
        transform: rotate(30deg);
    }

    .red {
        background-color: red;
    }

    .blue {
        background-color: blue;
    }

    .orange {
        background-color: orange;
    }

    .white {
        background-color: white;
    }

    .is-placed {
        visibility: visible;
    }

    .is-placeable {
        visibility: visible;
        
    }
</style>