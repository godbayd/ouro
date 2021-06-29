import {_updateGrid} from './internals/_updateGrid'
import {_placeApple} from './internals/_placeApple'
/*
 * GAME
 *
 * ----exposed
 * init():void
 * step():void
 * resetGameState():void
 * blankGrid():void
 * setDirection(string):void
 *
 * ----internal
 * _updateGrid():void
 * _placeApple():void
 * _updateSnakeBody():void
 * _handleEatApple():void
 * _ateItself():void
 * _placeSnakeAndApple():void
 */



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


// provides clearer semantics for 
// grid values
const cell = Object.freeze({
    space: 0,
    head: 1,
    body: 11,
    apple: 2
})


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
    this.cell = cell

    this._updateGrid = _updateGrid.bind(this)
    this._placeApple = _placeApple.bind(this)
}








// sets grid to have apple and snake head 
// in starting positions
Game.prototype.init = function() {
    this.blankGrid()
    this._placeSnakeAndApple()
}




Game.prototype.setDirection = function(dir) {
    const sDir = this.direction

    const badDirection = sDir === dir ||
        (sDir === 'ArrowLeft') && (dir === 'ArrowRight') ||
        (sDir === 'ArrowRight') && (dir === 'ArrowLeft') ||
        (sDir === 'ArrowUp') && (dir === 'ArrowDown') ||
        (sDir === 'ArrowDown') && (dir === 'ArrowUp');

    if (!badDirection) {
        this.direction = dir

    } else {
        return 
    }
    
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

    // TODO: make switch match generic direction
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
Game.prototype.blankGrid = function() {
    this.grid = []

    const row = []

    for (let i = 0; i < this.xCount; i++) {
        row.push(cell.space)
    }

    for (let i = 0; i < this.yCount; i++) {
        this.grid.push([...row])
    }
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
        console.log(`*** eaten at: ${JSON.stringify(this.snakeCoords)}`)
        
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


export default Game
