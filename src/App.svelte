<script>
  import GameBoard from "./GameBoard.svelte";
  import GameControls from "./GameControls.svelte";
  import Header from "./Header.svelte";
</script>

<main>
  <Header />

  <GameBoard />
  <!-- <GameControls height={"15%"}/> -->
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
</style>
