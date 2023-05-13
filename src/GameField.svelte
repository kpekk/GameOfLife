<script>
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
    let x_y_increase = [0,0]

    if (habitantInTopRow()) {
      x_y_increase[0] = 1
      field.unshift(new Array(field[0].length).fill(0));
    }
    if (habitantInBotRow()) {
      field.push(new Array(field[0].length).fill(0));
    }
    if (habitantInLeftRow()) {
      x_y_increase[1] = 1
      for (let i = 0; i < field.length; i++) {
        field[i].unshift(0);
      }
    }
    if (habitantInRightRow()) {
      for (let i = 0; i < field.length; i++) {
        field[i].push(0);
      }
    }
    return x_y_increase
  };

  const cellClicked = (event) => {
    console.log("clicked cell: ", event.target.id);
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
  const next = () => {
    let newGameField = createGameFieldOfSize(
      gameField.length,
      gameField[0].length
    );

    let x_y_increase = increaseGameFieldSize(newGameField);

    // todo only 1 if row added was top or left
    let xcoordIncrease = x_y_increase[0]
    let ycoordIncrease = x_y_increase[1]

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
  // neighbour count ========================================================
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

  // change cell val according to neighbourcount ==========================
  const decideFate = (value, neighbourCount) => {
    // console.log(value);
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) {
      // over- or underpopulation
      return 0;
    } else if (value === 0 && neighbourCount === 3) {
      //resurrection
      return 1;
    }
    return value; //nothing happens
  };
</script>

<div style="height: 85%;">
  <div class="game-container" style="height:65%">
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
  <div class="controls-container" style="height:25%">
    <div class="buttons">
      <button on:click={next}>Start</button>
      <button>Pause</button>
      <button>Reset</button>
    </div>
  </div>
</div>

<style>
  .game-container {
    width: 80%;
    border: 1px solid red;
    margin: 0 auto;
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
