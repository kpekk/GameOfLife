let gameField = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

const next = (gameField) => {
    // TODO find a better way to copy the gamefield
    let newGameField = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]

    gameField.forEach((row, i) => {
        row.forEach((elem, j) => {
            newGameField[i][j] = decideFate(gameField[i][j],neighbourCount(i,j))
        })
    });
    console.log(newGameField)
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

const decideFate = (value, neighbourCount) => {
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) { // over- or underpopulation
        return 0
    }
    else if (value === 0  && neighbourCount === 3){ //resurrection
        return  1
    }
    return value //nothing happens
}

next(gameField)
