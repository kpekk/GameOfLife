
  let gameField = new Array(4);

  for (let i = 0; i < gameField.length; i++) {
    let row = new Array(4);
    for (let j = 0; j < row.length; j++) {
      row[j] = 0;
    }
    gameField[i] = row;
  }


//todo koopia
console.log(gameField.slice())

let row = new Array(4).fill(30)
gameField.unshift(row) //=  [row,...gameField]

console.log(gameField)

