import Ouro from '../ouro'

describe('step() direction stuff', () => {
    const G = new Ouro(20, 20)
    
    G.blankGrid()
    
    G.snakeCoords = [4, 4]
    G.appleCoords = [7, 7]
    
    // note that the below tests will
    // update the state left by the previous
    
    
    test('up', () => {
        G.direction = 'ArrowUp'
        G.step()
        
        expect(G.snakeCoords).toEqual([4, 3])
    })
    
    test('down', () => {
        G.direction = 'ArrowDown'
        G.step()
        
        // 4, 4 becuase last state was 4, 3
        expect(G.snakeCoords).toEqual([4, 4])
    })
    
    
    test('left', () => {
        G.direction = 'ArrowLeft'
        G.step()
        
        expect(G.snakeCoords).toEqual([3, 4])
    })
    
    test('right', () => {
        G.direction = 'ArrowRight'
        G.step()
        
        // 4, 4 becuase last state was 3, 4
        expect(G.snakeCoords).toEqual([4, 4])
    })
})
