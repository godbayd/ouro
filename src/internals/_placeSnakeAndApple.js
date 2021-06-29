// fills grid with initial(pre live)
// snake and appleCoords cells
export function _placeSnakeAndApple() {
    // place snake in center
    const sx = Math.floor((this.xCount-1) / 2)
    const sy = Math.floor((this.yCount-1) / 2)
    
    // update grid
    this.snakeCoords = [sx, sy]
    
    this.grid[sy][sx] = this.cell.head
    
    this._placeApple()
}

