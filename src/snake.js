import {
    _updateGrid,
    _placeApple,
    _updateSnakeBody,
    _handleEatApple,
    _ateItself,
    _placeSnakeAndApple
} from './internals'

import {
    step,
    setDirection
} from './exposed'

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

    this.step = step.bind(this)
    this.setDirection = setDirection.bind(this)


    this._updateGrid = _updateGrid.bind(this)
    this._placeApple = _placeApple.bind(this)
    this._updateSnakeBody = _updateSnakeBody.bind(this)
    this._handleEatApple = _handleEatApple.bind(this)
    this._ateItself = _ateItself.bind(this)
    this._placeSnakeAndApple = _placeSnakeAndApple.bind(this)
}




// sets grid to have apple and snake head 
// in starting positions
Game.prototype.init = function() {
    this.blankGrid()
    this._placeSnakeAndApple()
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


export default Game
