// generates random numbers within inclusive range
// taken from mozilla mdn web docs
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// generates random coors for apple,
// makes sure that snake and apple
// dont collide on inital(pre live) render
const getRandomCoords = (xCount, yCount, [notX, notY]) => {
    let randX = getRandomIntInclusive(0, xCount - 1)
    let randY = getRandomIntInclusive(0, yCount - 1)
    
    while ((randX === notX) && (randY === notY)) {
        randX = getRandomIntInclusive(0, xCount - 1)
        randY = getRandomIntInclusive(0, yCount - 1)
    }
    
    return [randX, randY]
}



// (x,y)Count are the number of cells on x and y axis
const Game = function(xCount, yCount) {
    this.xCount = xCount
    this.yCount = yCount
}



// fills grid with new data
Game.prototype.updateGrid = function() {
    const [sx, sy] = this.snakeCoords
    const [ax, ay] = this.appleCoords
    
    this.blankBoard()
    
    this.grid[sy][sx] = cell.head
    this.grid[ay][ax] = cell.apple
}


// updates non-space cell data based on 
// current direction
Game.prototype.step = function() {
    const [sx, sy] = this.snakeCoords
    
    switch(this.direction) {
        case "ArrowUp":
            if (sy > 0) {
                this.snakeCoords = [sx, sy - 1]
            } else {
                this.crash = true
            }
            break
        case "ArrowDown":
            if (sy < this.yCount - 1) {
                this.snakeCoords = [sx, sy + 1]
            } else {
                this.crash = true
            }
            break
        case "ArrowLeft":
            if (sx > 0) {
                this.snakeCoords = [sx - 1, sy]
            } else {
                this.crash = true
            }
            break
        case "ArrowRight":
            if (sx < this.xCount - 1) {
                this.snakeCoords = [sx + 1, sy]
            } else {
                this.crash = true
            }
            break
    }

    this.updateGrid()
}



Game.prototype.init = function() {
    this.blankBoard()
    this.placeSnakeAndApple()
}



// fills grid with initial(pre live)
// snake and appleCoords cells
Game.prototype.placeSnakeAndApple = function() {
    // place snake in center
    const sx = Math.floor((this.xCount-1) / 2)
    const sy = Math.floor((this.yCount-1) / 2)
    
    // update grid
    this.snakeCoords = [sx, sy]
    this.appleCoords = getRandomCoords(this.xCount, this.yCount, [sx, sy])
    
    this.grid[sy][sx] = cell.head
    
    const [ax, ay] = this.appleCoords
    this.grid[ay][ax] = cell.apple
}



// sets grid to blank slate(all 0's 
// which represent empty space)
Game.prototype.blankBoard = function() {
    this.grid = []

    const row = []

    for (let i = 0; i < this.xCount; i++) {
        row.push(cell.space)
    }

    for (let i = 0; i < this.yCount; i++) {
        this.grid.push([...row])
    }
}
