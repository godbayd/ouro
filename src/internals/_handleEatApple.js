// when snake head collides with apple
// add to snake body
export function _handleEatApple () {
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

