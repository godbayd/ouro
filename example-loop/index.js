import Game from '../src/snake'
import Board from './js/board'
import './css/main.css'

window.onload = e => {
    const G = new Game(20, 20)
    const B = new Board(G, 300, 300, 100)

    G.init()
    B.bindListeners()
    B.paint()

    G.gameLoop(function({count}) {
        const countEl = document.querySelector('#count')

        if (String(countEl.innerText) !== G.count) {
            countEl.innerText = count
        }


        const highScore = parseInt(localStorage.getItem('snakeHighScore'), 10) ?? '0'

        const highScoreEl = document.querySelector('#high-score')

        if (highScoreEl.innerText !== highScore) {
            highScoreEl.innerText = highScore
        }

        B.paint()
    }).start()
    

    // unofficial
    const resetBtn = document.querySelector('#reset')
    resetBtn.onclick = () => {
        G.resetGameState()
        G.start()
        G.init()
        B.paint(G.grid)
        document.querySelector('#count').innerText = G.count
    }
}

