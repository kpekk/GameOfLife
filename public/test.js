let gameField = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

const next = (gameField) => {
    console.log(gameField)
    console.log('ok')
    let newGameField = [...gameField]

    gameField.forEach((row, i) => {
        row.forEach((elem, j) => {
            console.log(i, j, neighbourCount(i, j))
            //todo neighhbourscount
            // newGameField[i][j] = gameField[i][j]
            newGameField[i][j] = 1//decideFate(gameField[i][j],neighbourCount(i,j))
        })
    });
    console.log('1',gameField)

    console.log('2',newGameField)
}



const decideFate = (value, neighbourCount) => {
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) { // over- or underpopulation
        return 0
    }
    else if ((value === 0 || value === undefined) && neighbourCount === 3){ //resurrection
        return  1
    }
}

const neighbourCoords = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

const neighbourCount = (i, j) => {
    return neighbourCoords.filter(coords => {
        let x = i + coords[0]
        let y = j + coords[1]
        return (x < gameField.length && x > -1)
            && (y < gameField[0].length && y > -1)
            && gameField[x][y] === 1
    }).length
}

console.log(gameField)
next(gameField)
// console.log(neighbourCount(2,1))
