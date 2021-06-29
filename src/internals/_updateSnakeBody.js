export function _updateSnakeBody () {
    // add to snake body
    this.bodyCoordsStore.push([...this.snakeCoords])
    this.bodyCoordsStore.shift()
}

