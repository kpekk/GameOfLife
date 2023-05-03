<script>
    export let height;
</script>

<div class="controls-container" style="height:{height}">
    <div class="buttons">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
    </div>
</div>

<style>
    .controls-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .buttons {
        width: 40%;
        display: flex;
        justify-content: space-around;
    }
</style>
