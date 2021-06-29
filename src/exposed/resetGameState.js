// resets Game class to initial state
export function resetGameState() {
    this.grid = null
    this.crash = false
    this.live = false
    this.snakeCoords = null
    this.appleCoords = null
    this.bodyCoordsStore = []
    this.direction = null
    this.count = 0
    this._loop = false
    this.__alreadyChangedDirection = false

    return this
}




