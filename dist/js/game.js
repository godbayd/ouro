/*
 * GAME
 *
 * ----exposed
 * init():void
 * step():void
 * resetGameState():void
 * blankBoard():void
 *
 * ----internal
 * _updateGrid():void
 * _placeApple():void
 * _updateSnakeBody():void
 * _handleEatApple():void
 * _ateItself():void
 * _placeSnakeAndApple():void
 */



// TODO: make apple coords avoid snake body as well.
// generates random coors for apple,
// makes sure that snake and apple
// dont collide on inital(pre live) render
const getRandomCoords = (xCount, yCount, [notX, notY]) => {
    // generates random numbers within inclusive range
    // taken from mozilla mdn web docs
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

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
    this.direction = null
    this.count = 0
}




// sets grid to have apple and snake head 
// in starting positions
Game.prototype.init = function() {
    this.blankBoard()
    this._placeSnakeAndApple()
}




// set snakes next position(head and body) based on 
// direction and crash conditions.
// finally updates grid
Game.prototype.step = function() {
    if (this.crash) {
        return
    }
    
    const [sx, sy] = this.snakeCoords
    
    this._updateSnakeBody()

    // sets next snake head position based on 
    // direction if it's inbound
    // else set crash to true
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
    
    this._ateItself()

    this._updateGrid()
}





// resets Game class to initial state
Game.prototype.resetGameState = function() {
    this.grid = null
    this.crash = false
    this.live = false
    this.snakeCoords = null
    this.appleCoords = null
    this.bodyCoordsStore = []
    this.direction = null
    this.count = 0
}




// sets grid to blank slate(all 0's 
// which represent empty space).
// updates grid
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




// fills grid with new data
// based on updated state
Game.prototype._updateGrid = function() {
    const [sx, sy] = this.snakeCoords
    const [ax, ay] = this.appleCoords
    
    this.blankBoard()
    
    this.grid[sy][sx] = cell.head
    this.grid[ay][ax] = cell.apple
    
    this.__handleEatApple()

    this.bodyCoordsStore.forEach(function([_sx, _sy]) {
        this.grid[_sy][_sx] = cell.body
    }, this)
}




// sets apple on random grid cell
Game.prototype._placeApple = function() {
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




Game.prototype._updateSnakeBody = function() {
    // add to snake body
    this.bodyCoordsStore.push([...this.snakeCoords])
    this.bodyCoordsStore.shift()
}




// when snake head collides with apple
// add to snake body
Game.prototype.__handleEatApple = function() {
    const isEaten = this.snakeCoords[0] === this.appleCoords[0] && 
                    this.snakeCoords[1] === this.appleCoords[1]
    if (isEaten) {
        log(`*** eaten at: ${JSON.stringify(this.snakeCoords)}`)
        
        // add to snake body
        this.bodyCoordsStore.push([...this.snakeCoords])
        this._placeApple()
        this.count++
    }
}


// when snake head collides into its body
// set crash to true
Game.prototype._ateItself = function() {
    const collision = this.bodyCoordsStore.some(function (bodyCoords) {
        const sc = JSON.stringify(this.snakeCoords)
        const bc = JSON.stringify(bodyCoords)

        return bc === sc
    }, this)

    if (collision) {
        this.crash = true
    }
}




// fills grid with initial(pre live)
// snake and appleCoords cells
Game.prototype._placeSnakeAndApple = function() {
    // place snake in center
    const sx = Math.floor((this.xCount-1) / 2)
    const sy = Math.floor((this.yCount-1) / 2)
    
    // update grid
    this.snakeCoords = [sx, sy]
    
    this.grid[sy][sx] = cell.head
    
    this._placeApple()
}



