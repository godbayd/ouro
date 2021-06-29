// set snakes next position(head and body) based on 
// direction and crash conditions.
// finally updates grid
export function step() {
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



