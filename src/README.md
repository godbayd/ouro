
# Ouro

Ouro is a library that assists in creating snake game applications.The Business logic is handled in a set of exposed methods that allows for users to bring in behaviors as needed without needing to get too mired in the details.

## Main
**instance:** `new Ouro(xCount, yCount, speed)`
* **params**
    * xCount: string
        * defines the number of columns in the grid
    * yCount: string
        * defines the number of rows in the grid
    * speed: number(optional)
        * If game loop is being used, speed defines the number of miliseconds per frame


## Exposed Methods

* **gameLoop():** Creates an interval and accepts a callback thats first and only parameter will have in it the state, current to each interval. Note that the interval is held within the main object internally, so the running state is in effect and accessibly outside of the callback.

* **`step()`:** Probably the most crucial of the methods. `step()` takes in the current state of the grid and updates the snake and snake body, based on the current direction property(set by the method: `setDirection()`). This would normally be used within a game loop and aids in moving the snake - step by step - in an animation.

* **setDirection(direction):** Sets the direction of the moving snake. Internally this methods takes care of the rules that disallow end users to move in directly opposing direction(ie: from left to right, right to left, up to down, and down to up) and also ignores repeated direction(from left to left, up to up, etc...). This would normally be used within an event handler(probably listening for arrow button presses) made to alter the direction of the snakes movements.

    **Param: accepted direction values(all of type: String)**
    * "ArrowLeft"
    * "ArrowRight"
    * "ArrowUp"
    * "ArrowDown"


* **`startingGridState()`:** Convenience method that first initializes a grid, or replaces existing grid with a blank one(using the method: `blankGrid()`) and then updates the grid with a single starting snake value and a single starting apple value(using the internal method: `_placeSnakeAndApple()`)

* **`blankGrid()`:** Method to initialize or replace existing `grid` property with a "blank slate", which is realized as a 2d array, where the amount of inner arrays is equal to `yCount` and the inner arrays are filled with `xCount` amount of 0's(representing cell space). Note that xCount and yCount are defined when creating a new instance of Ouro.
    ### Ie:

    ```
    const O = new Ouro(3, 2).blankGrid()
    ```
    would set `O.grid` to have the value:
    ```
    [
        [0,0,0],
        [0,0,0]
    ]
    ```



<!--
Game

----exposed
`startingGridState()`:void
`step()`:void
`resetGameState()`:void
`blankGrid()`:void
setDirection(string):void
`start()`:void
`stop()`:void
`killLoop()`:void

----internal
`_updateGrid()`:void
`_placeApple()`:void
`_updateSnakeBody()`:void
`_handleEatApple()`:void
`_ateItself()`:void
`_placeSnakeAndApple()`:void
-->
