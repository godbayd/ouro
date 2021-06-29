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
    setDirection,
    resetGameState,
    blankGrid
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
const Game = function(xCount, yCount, speed) {
    this.xCount = xCount
    this.yCount = yCount
    this.speed = speed || 100
    
    this.grid = null
    this.crash = false
    this.live = false
    this.snakeCoords = null
    this.appleCoords = null
    this.bodyCoordsStore = []
    this.direction = null
    this.count = 0
    this.cell = cell

    this._loop = false
    this._alreadyChangedDirection = false

    this.step = step.bind(this)
    this.setDirection = setDirection.bind(this)
    this.resetGameState = resetGameState.bind(this)
    this.blankGrid = blankGrid.bind(this)


    this._updateGrid = _updateGrid.bind(this)
    this._placeApple = _placeApple.bind(this)
    this._updateSnakeBody = _updateSnakeBody.bind(this)
    this._handleEatApple = _handleEatApple.bind(this)
    this._ateItself = _ateItself.bind(this)
    this._placeSnakeAndApple = _placeSnakeAndApple.bind(this)
}


Game.prototype.gameLoop = function(cb) {
    const _intervalCB = function() {

        this._alreadyChangedDirection = false

        if (this._loop) {
            this.step()
            cb(this)
        }
    }

    this._interval = setInterval(_intervalCB.bind(this), 100)
    return this
}

Game.prototype.start = function() {
    this._loop = true
}

Game.prototype.stop = function() {
    this._loop = false
}

Game.prototype.killLoop = function() {
    clearInterval(this._interval)
}




// sets grid to have apple and snake head 
// in starting positions
Game.prototype.init = function() {
    this.blankGrid()
    this._placeSnakeAndApple()
}






export default Game
