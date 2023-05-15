export default class Board {
    //todo error if elem on border
  constructor(rows, cols) {
    this.board = this.createBoardOfSize(rows, cols);
  }

  setCell = (i, j, value) => {
    this.board[i][j] = value;
  };

  createBoardOfSize = (rows, cols) => {
    let newBoard = new Array(rows);

    for (let i = 0; i < rows; i++) {
      let row = new Array(cols);
      for (let j = 0; j < cols; j++) {
        row[j] = 0;
      }
      newBoard[i] = row;
    }

    return newBoard;
  };

  resetBoard = () => {
    this.board = this.createBoardOfSize(5, 5);
  };

  habitantInBotRow = () => {
    for (let i = 0; i < this.board[0].length; i++) {
      if (this.board[this.board.length - 1][i]) {
        return true;
      }
    }

    return false;
  };

  habitantInLeftRow = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][0]) {
        return true;
      }
    }

    return false;
  };

  habitantInRightRow = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][this.board[0].length - 1]) {
        return true;
      }
    }

    return false;
  };

  habitantInTopRow = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[0][i] === 1) {
        return true;
      }
    }

    return false;
  };

  increaseSizeIfNeeded = () => {
    let x_increased = 0;
    let y_increased = 0;

    //todo move the actual unshifting to another method and call that inside the habitantinxx method
    if (this.habitantInTopRow()) {
      x_increased = 1;
      this.board.unshift(new Array(this.board[0].length).fill(0));
    }
    if (this.habitantInBotRow()) {
      this.board.push(new Array(this.board[0].length).fill(0));
    }
    if (this.habitantInLeftRow()) {
      y_increased = 1;
      for (let i = 0; i < this.board.length; i++) {
        this.board[i].unshift(0);
      }
    }
    if (this.habitantInRightRow()) {
      for (let i = 0; i < this.board.length; i++) {
        this.board[i].push(0);
      }
    }
    return [x_increased, y_increased];
  };

  firstAndLastElemCoords = () => {
    let firstXIndex = this.board.length;
    let lastXIndex = 0;
    let firstYIndex = this.board[0].length;
    let lastYIndex = 0;

    let boardIsEmpty = true;

    this.board.forEach((row, x) => {
      row.forEach((col, y) => {
        if (this.board[x][y]) {
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

  cleanupOuterRows = () => {
    let coords = this.firstAndLastElemCoords(this.board);

    let firstXIndex = coords[0][0];
    let lastXIndex = coords[0][1];
    let firstYIndex = coords[1][0];
    let lastYIndex = coords[1][1];

    // top and bottom row
    this.board = this.board.slice(
      firstXIndex < 2 ? 0 : firstXIndex - 2,
      lastXIndex + 3
    );

    // left-right
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = this.board[i].slice(
        firstYIndex < 2 ? 0 : firstYIndex - 2,
        lastYIndex + 3
      );
    }
  };

  neighbourCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  neighbourCount = (i, j) => {
    return this.neighbourCoords.filter((coords) => {
      let x = i + coords[0];
      let y = j + coords[1];
      return (
        x < this.board.length &&
        x > -1 &&
        y < this.board[0].length &&
        y > -1 &&
        this.board[x][y] === 1
      );
    }).length;
  };

  decideFate = (value, neighbourCount) => {
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) {
      return 0;
    } else if (value === 0 && neighbourCount === 3) {
      return 1;
    }
    return value;
  };

  nextState = () => {
    console.log(this.board)
    this.cleanupOuterRows();

    let x_y_increase = this.increaseSizeIfNeeded(); //increaseGameFieldSize(newGameField);
    let xcoordIncrease = x_y_increase[0];
    let ycoordIncrease = x_y_increase[1];

    let newGameBoard = this.createBoardOfSize(
      this.board.length,
      this.board[0].length
    );

    this.board.forEach((row, i) => {
      row.forEach((elem, j) => {
        newGameBoard[i + xcoordIncrease][j + ycoordIncrease] = this.decideFate(
          this.board[i][j],
          this.neighbourCount(i, j)
        );
      });
    });
    this.board = newGameBoard;
  };
}
