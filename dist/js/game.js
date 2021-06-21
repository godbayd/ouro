// TODO: re place apple when it has been eaten
// TODO: make sure to only be able to change direction once per step
// if coming from left and up left is hit very quickly, before the step is over
// it can break the no direct opposite direction rule


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
    
    this.grid = null
    this.crash = false
    this.live = false
    this.snakeCoords = null
    this.appleCoords = null
    this.bodyCoordsStore = []
}


Game.prototype._eatApple = function() {
    const isEaten = this.snakeCoords[0] === this.appleCoords[0] && 
                    this.snakeCoords[1] === this.appleCoords[1]
    if (isEaten) {
        log(`*** eaten at: ${JSON.stringify(this.snakeCoords)}`)
        // add to snake body
        this.bodyCoordsStore.push([...this.snakeCoords])
        this.placeApple()
    }
}


// fills grid with new data
Game.prototype.updateGrid = function() {
    const [sx, sy] = this.snakeCoords
    const [ax, ay] = this.appleCoords
    
    this.blankBoard()
    
    this.grid[sy][sx] = cell.head
    this.grid[ay][ax] = cell.apple
    
    this._eatApple()
    this.bodyCoordsStore.forEach(function([_sx, _sy]) {
        // log(this)
        this.grid[_sy][_sx] = cell.body
    }, this)
}


// updates non-space cell data based on 
// current direction
Game.prototype.step = function() {
    const [sx, sy] = this.snakeCoords
    // log(this.snakeCoords)
    // log(
    //     this.bodyCoordsStore.reduce((acc, coords) => {
    //         return acc + ', ' + JSON.stringify(coords)
    //     }, 'store: ')
    // )
    
    this.bodyCoordsStore.push([...this.snakeCoords])
    this.bodyCoordsStore.shift()
    
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


Game.prototype.placeApple = function() {
    // TODO: add avoidance of snake 
    // body as well as snake head
    // in getRandomCoords()
    this.appleCoords = getRandomCoords(
        this.xCount, 
        this.yCount, 
        this.snakeCoords
    )
    
    const [ax, ay] = this.appleCoords
    
    this.grid[ay][ax] = cell.apple
}

// fills grid with initial(pre live)
// snake and appleCoords cells
Game.prototype.placeSnakeAndApple = function() {
    // place snake in center
    const sx = Math.floor((this.xCount-1) / 2)
    const sy = Math.floor((this.yCount-1) / 2)
    
    // update grid
    this.snakeCoords = [sx, sy]
    
    this.grid[sy][sx] = cell.head
    
    this.placeApple()
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
