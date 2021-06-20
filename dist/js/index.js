console.clear()

const log = console.log
const select = x => document.querySelector(x)


window.onload = e => {
    const G = new Game(20, 20)
    const B = new Board(300, 300, G)

    G.init()
    B.init()
    B.paint(G.grid)
}

