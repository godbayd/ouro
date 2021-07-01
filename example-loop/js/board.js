// TODO: move ui stuff into demo folder. Isolate game console.logic stuff to be
// then focal point



const Board = function(game, width, height, speed) {
    this.width  = width
    this.height = height
    this.game = game
    this.speed = speed

    this.canv = document.querySelector('#canv')
    this.canv.width = this.width
    this.canv.height = this.height

    this.ctx = this.canv.getContext('2d')
    this.canv.style.backgroundColor = 'white'
    
    this.handleArrowKeyDown = this.handleArrowKeyDown.bind(this)
}



// Store new high score in local storage
Board.prototype.handleNewHighScore = function() {
    const oldHighScore = parseInt(localStorage.getItem('snakeHighScore') ?? 0, 10)
    console.log(`old high score: ${oldHighScore}`)

    if (!oldHighScore || (this.game.count > oldHighScore)) {
        localStorage.setItem('snakeHighScore', this.game.count)
    }

    const highScore = localStorage.getItem('snakeHighScore') ?? '0'
    document.querySelector('#high-score').innerText = highScore
}




// Change direction via keydown event
// constrains directions to not move in
// the direct opposite direction
Board.prototype.handleArrowKeyDown = function({key}) {

    const isValidDirection = [
        'ArrowUp', 
        'ArrowDown', 
        'ArrowLeft',  
        'ArrowRight'
    ].includes(key)

    if (isValidDirection) {
        this.game.setDirection(key)
    }
    
    
    // when game hasn't started yet
    // initialize game loop
    if (!this.game.loop) {
        this.game.loop = true
    }
}



Board.prototype.bindListeners = function() {
    window.addEventListener('keydown', this.handleArrowKeyDown)
}


Board.prototype._cellColor = function(c) {
    const {cell} = this.game

    switch(c) {
        case cell.space:
            return 'transparent'

        case cell.head:
        case cell.body:
            return 'black'

        case cell.apple:
            return 'red'

        default:
            return null
    }
}



// FIXME: make private
Board.prototype.drawCell = function(x, y, w, h, cell) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'rgba(0,0,0,0.4)'
    this.ctx.fillStyle = this._cellColor(cell)
    this.ctx.rect(x, y, w, h)
    this.ctx.stroke()
    this.ctx.fill()
}



// paints grid to DOM using game.grid state
Board.prototype.paint = function(grid) {
    this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
    
    const cellW = this.width / this.game.xCount
    const cellH = this.height / this.game.yCount

    this.game.grid.forEach((row, gridY) => {
        row.forEach((cell, gridX) => {
            const x = gridX * cellW
            const y = gridY * cellH

            this.drawCell(x, y, cellW, cellH, cell)
        }, this)
    }, this)
}



export default Board
