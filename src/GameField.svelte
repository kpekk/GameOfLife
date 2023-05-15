<script>
  import GameControls from "./GameControls.svelte";
  import GameBoard from "./GameBoard";

  let gb = new GameBoard(5, 5);

  let interval;
  let gameSpeed;

  const startGame = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      gb.nextState();
      gb = gb;
    }, 1000 / gameSpeed);
  };

  // todo stop method is not working
  const stopGame = () => {
    clearInterval(interval);
  };

  const resetField = () => {
    stopGame();
    clearInterval(interval);
    gb.resetBoard();
    gb = gb
  };

  const cellClicked = (event) => {
    let i = event.target.id.split("_")[0];
    let j = event.target.id.split("_")[1];

    if (event.target.classList.contains("inhabited")) {
      event.target.classList.remove("inhabited");
      gb.setCell(i, j, 0);
    } else {
      event.target.classList.add("inhabited");
      gb.setCell(i, j, 1);
    }
  };

</script>

<div class="game-container">
  <div class="field-container">
    <table cellspacing="0">
      {#each gb.board as row, i}
        <tr>
          {#each row as elem, j}
            <td
              id="{i}_{j}"
              class:inhabited={elem === 1}
              on:mousedown={cellClicked}
            />
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  <GameControls
    on:resetField={resetField}
    on:pauseGame={stopGame}
    on:startGame={startGame}
    bind:gameSpeed
  />
</div>

<style>
  .game-container {
    height: 85%;
  }

  .field-container {
    width: 80%;
    border: 0.1rem solid var(--secondary);
    margin: 0 auto;
    height: 65%;
  }

  table {
    height: 100%;
    width: 100%;
  }

  td {
    border: 0.1rem solid var(--darker);
  }

  .inhabited {
    background-color: var(--primary);
  }
</style>
