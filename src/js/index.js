console.clear()
import {log, select} from './utils'
import Game from './game'
import Board from './gui/board'
import '../css/main.css'
import './utils'


console.log(null ?? 'hello')

window.onload = e => {
    const G = new Game(20, 20)
    const B = new Board(300, 300, G)

    G.init()
    B.init()
    B.paint(G.grid)
    
    select('#count').innerText = G.count

    // unofficial
    select('#reset').onclick = () => {
        // NOTE: this series of methods may do
        // well consilidated into a single method
        // for re use
        G.resetGameState()
        G.init()
        B.paint(G.grid)
        select('#count').innerText = G.count
    }
}

