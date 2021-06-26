import Game from '../snake'

const usedState = {
    grid: [],
    crash: true,
    live: true,
    snakeCoords: [],
    appleCoords: [],
    bodyCoordsStore: [[], []],
    direction: 'down',
    count: 7
}

const initState = {
    grid: null,
    crash: false,
    live: false,
    snakeCoords: null,
    appleCoords: null,
    bodyCoordsStore: [],
    direction: null,
    count: 0
}

describe('resetGameState() stuff', () => {
    test('will reset modified state back to initial state', () => {
        const G = new Game(20, 20)
        
        G.blankGrid()
        
        // Ensures that at least some props
        // don't match with initState.
        // This means that state has been modified.
        const mockedUsedState = 
            Object.keys(G).some((acc, k) => {
                return G[k] === usedState[k]
            })
            
        expect(mockedUsedState).toBe(true)

        // modify state
        Object.keys(usedState).forEach(k => {
            G[k] = usedState[k]
        })
        
        G.resetGameState()
        
        // Ensures that at all props
        // match with initState.
        // This means that state been reset.
        const successfullyReset = 
            Object.keys(initState).every((acc, k) => {
                return G[k] === initState[k]
            })
            
        expect(successfullyReset).toBe(true)
    })
})
