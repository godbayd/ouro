import Game from '../snake'

describe('init stuff', () => {
    test('init() creates grid with whos cells are all zeros apart from a single 1 and a single 2', () => {
        const G = new Game(20, 20)
        
        G.init()
        
        const liveCells = G.grid.reduce((acc, row) => {
            const cellAcc = row.reduce((acc, cell) => 
                cell > 0 ? [...acc, cell] : acc
            , [])
            
            return [...acc, ...cellAcc]
        }, [])
        
        expect(liveCells.length).toBe(2)
        
        expect(
            liveCells.some(x => x === 1) &&
            liveCells.some(x => x === 2)
        ).toBe(true)
    })
})
