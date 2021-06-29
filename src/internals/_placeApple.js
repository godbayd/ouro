// FIXME: sometimes creates an infinite loop
// generates random coords for apple,
// makes sure that snake and apple
// don't collide on inital(pre live) render
const getRandomCoords = (xCount, yCount, avoidCoords) => {
    // generates random numbers within inclusive range
    // taken from mozilla mdn web docs
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let randX = getRandomIntInclusive(0, xCount - 1)
    let randY = getRandomIntInclusive(0, yCount - 1)

    
    const doesCollide = (_appleCoords) => avoidCoords.some(coords => {
        const snakeCoords = JSON.stringify(coords)
        const appleCoords = JSON.stringify(_appleCoords)

        return snakeCoords === appleCoords
    })

    while (doesCollide([randX, randY])) {
        randX = getRandomIntInclusive(0, xCount - 1)
        randY = getRandomIntInclusive(0, yCount - 1)
    }
    
    return [randX, randY]
}


// sets apple on random grid this.cell
export function _placeApple() {
    // TODO: add avoidance of snake 
    // body as well as snake head
    // in getRandomCoords()
    this.appleCoords = getRandomCoords(
        this.xCount, 
        this.yCount, 
        [this.snakeCoords, ...this.bodyCoordsStore]
    )
    
    const [ax, ay] = this.appleCoords
    
    this.grid[ay][ax] = this.cell.apple
}
