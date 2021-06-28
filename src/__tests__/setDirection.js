import Game from '../snake'


describe('Attempting to change direction that IS NOT a directly opposite direction should successfully change direction', () => {
    const attemptLateralMovement = (currentDir, setDir) => {
        const G = new Game(20, 20)

        // existing direction
        G.direction = currentDir

        // attempt to update direction
        G.setDirection(setDir)

        // direction should not have changed 
        // to attempted direction
        expect(G.direction).toEqual(setDir)
   }


    test('from up, attempting left', () => {
        attemptLateralMovement('ArrowUp', 'ArrowLeft')
    })

    test('from up, attempting right', () => {
        attemptLateralMovement('ArrowUp', 'ArrowRight')
    })

    test('from down, attempting left', () => {
        attemptLateralMovement('ArrowDown', 'ArrowLeft')
    })

    test('from down, attempting right', () => {
        attemptLateralMovement('ArrowDown', 'ArrowRight')
    })

    test('from left, attempting up', () => {
        attemptLateralMovement('ArrowLeft', 'ArrowUp')
    })

    test('from left, attempting down', () => {
        attemptLateralMovement('ArrowLeft', 'ArrowDown')
    })

    test('from right, attempting up', () => {
        attemptLateralMovement('ArrowRight', 'ArrowUp')
    })

    test('from right, attempting down', () => {
        attemptLateralMovement('ArrowRight', 'ArrowDown')
    })
})




describe('Attempting to change direction to a directly opposite direction should not be ignored and not change update direction', () => {

    const attemptOpposingDirection = (currentDir, setDir) => {
        const G = new Game(20, 20)

        // existing direction
        G.direction = currentDir

        // attempt to update direction
        G.setDirection(setDir)

        // direction should not have changed 
        // to attempted direction
        expect(G.direction).toEqual(currentDir)
   }

    test('from up, attempting down', () => {
        attemptOpposingDirection('ArrowUp', 'ArrowDown')
    })

    test('from down, attempting up', () => {
        attemptOpposingDirection('ArrowDown', 'ArrowUp')
    })

    test('from left, attempting right', () => {
        attemptOpposingDirection('ArrowLeft', 'ArrowRight')
    })

    test('from right, attempting left', () => {
        attemptOpposingDirection('ArrowRight', 'ArrowLeft')
    })
})
