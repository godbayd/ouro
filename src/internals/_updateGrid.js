// fills grid with new data
// based on updated state
export function _updateGrid () {
    const [sx, sy] = this.snakeCoords
    const [ax, ay] = this.appleCoords
    
    this.blankGrid()
    
    this.grid[sy][sx] = this.cell.head
    this.grid[ay][ax] = this.cell.apple
    
    this.__handleEatApple()

    this.bodyCoordsStore.forEach(function([_sx, _sy]) {
        this.grid[_sy][_sx] = this.cell.body
    }, this)
}

