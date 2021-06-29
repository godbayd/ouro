import Game from '../src/snake'
import Board from './js/board'
import './css/main.css'

window.onload = e => {
    const G = new Game(20, 20)
    const B = new Board(G, 300, 300, 100)

    G.init()
    B.init()
    B.paint(G.grid)
    
    document.querySelector('#count').innerText = G.count

    const highScore = parseInt(localStorage.getItem('snakeHighScore'), 10) ?? '0'
    document.querySelector('#high-score').innerText = highScore

    // unofficial
    document.querySelector('#reset').onclick = () => {
        // NOTE: this series of methods may do
        // well, consilidated into a single method
        // for re use
        G.resetGameState()
        G.init()
        B.paint(G.grid)
        document.querySelector('#count').innerText = G.count


    }
}
