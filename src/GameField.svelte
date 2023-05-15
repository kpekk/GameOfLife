<script>
  import GameControls from "./GameControls.svelte";

  let interval;
  let gameSpeed;

  const startGame = () => {
    clearInterval(interval);
    interval = setInterval(nextState, 1000 / gameSpeed);
  };

  const stopGame = () => {
    clearInterval(interval);
  };

  const resetField = () => {
    stopGame();
    clearInterval(interval);
    gameField = createGameFieldOfSize(5, 5);
  };

  const createGameFieldOfSize = (rows, cols) => {
    let newGameField = new Array(rows);

    for (let i = 0; i < rows; i++) {
      let row = new Array(cols);
      for (let j = 0; j < cols; j++) {
        row[j] = 0;
      }
      newGameField[i] = row;
    }

    return newGameField;
  };

  const habitantInBotRow = () => {
    for (let i = 0; i < gameField[0].length; i++) {
      if (gameField[gameField.length - 1][i]) {
        return true;
      }
    }

    return false;
  };

  const habitantInLeftRow = () => {
    for (let i = 0; i < gameField.length; i++) {
      if (gameField[i][0]) {
        return true;
      }
    }

    return false;
  };

  const habitantInRightRow = () => {
    for (let i = 0; i < gameField.length; i++) {
      if (gameField[i][gameField[0].length - 1]) {
        return true;
      }
    }

    return false;
  };

  const habitantInTopRow = () => {
    for (let i = 0; i < gameField.length; i++) {
      if (gameField[0][i] === 1) {
        return true;
      }
    }

    return false;
  };

  const increaseGameFieldSize = (field) => {
    let x_y_increase = [0, 0];

    if (habitantInTopRow()) {
      x_y_increase[0] = 1;
      field.unshift(new Array(field[0].length).fill(0));
    }
    if (habitantInBotRow()) {
      field.push(new Array(field[0].length).fill(0));
    }
    if (habitantInLeftRow()) {
      x_y_increase[1] = 1;
      for (let i = 0; i < field.length; i++) {
        field[i].unshift(0);
      }
    }
    if (habitantInRightRow()) {
      for (let i = 0; i < field.length; i++) {
        field[i].push(0);
      }
    }
    return x_y_increase;
  };

  const cellClicked = (event) => {
    let i = event.target.id.split("_")[0];
    let j = event.target.id.split("_")[1];

    if (event.target.classList.contains("inhabited")) {
      event.target.classList.remove("inhabited");
      gameField[i][j] = 0;
    } else {
      event.target.classList.add("inhabited");
      gameField[i][j] = 1;
    }
  };
  // ------------------------------------------------------------------------------------------------------------------------

  let gameField = createGameFieldOfSize(5, 5);

  // next state ============================================================
  const nextState = () => {
    cleanupField();
    let newGameField = createGameFieldOfSize(
      gameField.length,
      gameField[0].length
    );

    // todo cleanup if there are no cells in the outer 2 rows
    let x_y_increase = increaseGameFieldSize(newGameField);

    let xcoordIncrease = x_y_increase[0];
    let ycoordIncrease = x_y_increase[1];

    gameField.forEach((row, i) => {
      row.forEach((elem, j) => {
        newGameField[i + xcoordIncrease][j + ycoordIncrease] = decideFate(
          gameField[i][j],
          neighbourCount(i, j, gameField)
        );
      });
    });
    gameField = newGameField;
  };

  const firstAndLastElemCoords = (field) => {
    let firstXIndex = gameField.length;
    let lastXIndex = 0;
    let firstYIndex = gameField[0].length;
    let lastYIndex = 0;

    let boardIsEmpty = true;

    field.forEach((row, x) => {
      row.forEach((col, y) => {
        if (field[x][y]) {
          x < firstXIndex ? (firstXIndex = x) : firstXIndex;
          x > lastXIndex ? (lastXIndex = x) : lastXIndex;

          y < firstYIndex ? (firstYIndex = y) : firstYIndex;
          y > lastYIndex ? (lastYIndex = y) : lastYIndex;

          boardIsEmpty = false;
        }
      });
    });

    return boardIsEmpty
      ? [
          [0, 5],
          [0, 5],
        ]
      : [
          [firstXIndex, lastXIndex],
          [firstYIndex, lastYIndex],
        ];
  };

  const cleanupField = () => {
    let coords = firstAndLastElemCoords(gameField);

    let firstXIndex = coords[0][0];
    let lastXIndex = coords[0][1];
    let firstYIndex = coords[1][0];
    let lastYIndex = coords[1][1];

    // top and bottom row
    gameField = gameField.slice(firstXIndex < 2 ? 0 : firstXIndex - 2, lastXIndex + 3);

    // left-right
    for (let i = 0; i < gameField.length; i++) {
      gameField[i] = gameField[i].slice(firstYIndex< 2 ? 0 : firstYIndex - 2, lastYIndex + 3);
    }
  };

  const neighbourCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const neighbourCount = (i, j, field) => {
    return neighbourCoords.filter((coords) => {
      let x = i + coords[0];
      let y = j + coords[1];
      return (
        x < field.length &&
        x > -1 &&
        y < field[0].length &&
        y > -1 &&
        field[x][y] === 1
      );
    }).length;
  };

  const decideFate = (value, neighbourCount) => {
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) {
      return 0;
    } else if (value === 0 && neighbourCount === 3) {
      return 1;
    }
    return value;
  };
</script>

<div class="game-container">
  <div class="field-container">
    <table cellspacing="0">
      {#each gameField as row, i}
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
