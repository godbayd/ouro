import Ouro from '../src/ouro'
import Board from './js/board'
import './css/main.css'

window.onload = e => {
    const Snake = new Ouro(20, 20)
    const B = new Board(Snake, 300, 300, 100)

    Snake.startingGridState()
    B.bindListeners()
    B.paint()

    Snake.gameLoop(function({count}) {
        B.handleNewHighScore()

        const countEl = document.querySelector('#count')

        if (String(countEl.innerText) !== Snake.count) {
            countEl.innerText = count
        }


        const highScore = parseInt(localStorage.getItem('snakeHighScore'), 10) || '0'

        const highScoreEl = document.querySelector('#high-score')

        if (highScoreEl.innerText !== highScore) {
            highScoreEl.innerText = highScore
        }

        B.paint()
    }).start()
    

    // unofficial
    const resetBtn = document.querySelector('#reset')
    resetBtn.onclick = () => {
        Snake
            .resetGameState()
            .startingGridState()
            .start()

        B.paint(Snake.grid)

        document.querySelector('#count').innerText = Snake.count
    }
}

