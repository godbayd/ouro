console.clear()

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

