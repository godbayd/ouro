import {_updateGrid} from './internals/_updateGrid'
import {_placeApple} from './internals/_placeApple'
import {_updateSnakeBody} from './internals/_updateSnakeBody'
import {_handleEatApple} from './internals/_handleEatApple.js'


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
    this._updateSnakeBody = _updateSnakeBody.bind(this)
    this._handleEatApple = _handleEatApple.bind(this)
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
