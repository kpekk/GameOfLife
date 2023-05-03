<script>
    import Frame from "./Frame.svelte";

    export let height
</script>

<div class="game-container" style="height:{height}">

<Frame />
</div>

<style>
 .game-container{
    width: 80%;
    border: 1px solid red;
    margin: 0 auto;
 }
</style>
