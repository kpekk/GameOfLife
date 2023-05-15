<script>
  import Game from "./Game.svelte";
  import GameBoard from "./Board.svelte";
  import GameControls from "./GameControls.svelte";
  import Header from "./Header.svelte";
</script>

<main>
  <Header />
  <Game />
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
</style>
