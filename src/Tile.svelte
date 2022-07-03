<script>
    export let score;
</script>

<div class="hexagon">
    <div class="center-disc">
        <p class="tile-score">{score}</p>
    </div>
</div>

<style>
    .hexagon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 115px;
        text-align: center;

        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        
        background-color: red;
    }

    .center-disc {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 35px;
        height: 35px;

        border: 2px solid black;
        border-radius: 50%;

        background-color: yellow;
    }
</style>