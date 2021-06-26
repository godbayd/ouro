import Game from '../snake'

describe('snake stuff', () => {
    test('blankGrid() sets grid to all zeros', () => {
        const xCount = 40
        const yCount = 20
        const G = new Game(xCount, yCount)
        
        G.blankGrid()
        
        const containsAllZeros = G.grid.every(row => {             
            return row.every(cell => {
                return cell === 0
            })
        })
        
        expect(containsAllZeros).toBe(true)

        expect(G.grid.length).toBe(20)

        expect(G.grid[0].length).toBe(40)
    })
})