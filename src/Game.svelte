<script>
  import Board from "./Board.svelte";
  import GameControls from "./GameControls.svelte";

  let interval;
  let gameSpeed;

  let board;

  const startGame = () => {
    clearInterval(interval);

    interval = setInterval(() => {
      board.nextState();
    }, 1000 / gameSpeed);
  };

  // todo stop method is not working
  const stopGame = () => {
    clearInterval(interval);
  };

  const resetBoard = () => {
    stopGame();
    clearInterval(interval);
    board.resetBoard();
  };
</script>

<div class="game-container">
  <Board bind:this={board} />
  <GameControls
    on:resetField={resetBoard}
    on:pauseGame={stopGame}
    on:startGame={startGame}
    bind:gameSpeed
  />
</div>

<style>
  .game-container {
    height: 85%;
  }
</style>
