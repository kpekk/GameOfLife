
let gameField = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
]

const next = (gameField) => {
    let newGameField = []
    
    gameField.forEach((row, i) => {
        row.forEach((elem, j) => {
            console.log(elem)
        })
    });
}
