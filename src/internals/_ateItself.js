// when snake head collides into its body
// set crash to true
export function _ateItself() {
    const collision = this.bodyCoordsStore.some(function (bodyCoords) {
        const sc = JSON.stringify(this.snakeCoords)
        const bc = JSON.stringify(bodyCoords)

        return bc === sc
    }, this)

    if (collision) {
        this.crash = true
    }
}

