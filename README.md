# Ouro

Ouro is a library that assists in creating snake game applications.The Business logic is handled in a set of exposed methods that allows for users to bring in behaviors as needed without needing to get too mired in the details.


## Examples
`npm run example`
* [without gameLoop](../example)

`npm run example-loop`
* [gameLoop example](../example)


## Main
**instance:** `new Ouro(xCount, yCount, speed)`
* **params**
    * xCount: number
        * defines the number of columns in the grid
    * yCount: number
        * defines the number of rows in the grid
    * speed: number(optional)
        * If game loop is being used, speed defines the number of miliseconds per frame. If not specified, the default speed is 100.


## Exposed Properties

* **`grid: Array<Array<number>>`:** Houses the game state that should be reflected in a game board.
* **`crash: Boolean`:** Indicates whether or not the snake has reached a crash state. 
* **`appleCoords: [number, number]`:** x and y value that point to the coordinates of the apple cell
* **`snakeCoords: [number, number]`:** Same as appleCoords but for snake head coordinates
* **`bodyCoordsStore: Array<[number, number]>`:** Essentially a queue that houses the `snakeCoords` of the snake body cells
* **`direction: string`:** Current direction that `step()` should use to update grid. Essentially the direction that the snake should move within the grid.
* **`count: number`:** How many times the snake head cell collides with the apple cell. Essentially a score of how many times the snake successfully ate an apple.
* **`cell: { head: number, body: number, apple: number, space: number }`:** A frozen object. Object that gives names to the number values used within `grid` to represent snakes head, body and apple cells


<!--
    this.grid = null
    this.crash = false
    this.snakeCoords = null
    this.appleCoords = null
    this.bodyCoordsStore = []
    this.direction = null
    this.count = 0
    this.cell = cell
-->




## Exposed Methods

* **`blankGrid():void`:** Method to initialize or replace existing `grid` property with a "blank slate", which is realized as a 2d array, where the amount of inner arrays is equal to `yCount` and the inner arrays are filled with `xCount` amount of 0's(representing cell space). Note that xCount and yCount are defined when creating a new instance of Ouro.
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

* **`startingGridState():void`:** Convenience method that first initializes a grid, or replaces existing grid with a blank one(using the method: `blankGrid()`) and then updates the grid with a single starting snake value and a single starting apple value(using the internal method: `_placeSnakeAndApple()`)

* **`step():void`:** Probably the most crucial of the methods. `step()` takes in the current state of the grid and updates the snake and snake body, based on the current direction property(set by the method: `setDirection()`). This would normally be used within a game loop and aids in moving the snake - step by step - in an animation.

* **`setDirection(direction: string):void`:** Sets the direction of the moving snake. Internally this methods takes care of the rules that disallow end users to move in directly opposing direction(ie: from left to right, right to left, up to down, and down to up) and also ignores repeated direction(from left to left, up to up, etc...). This would normally be used within an event handler(probably listening for arrow button presses) made to alter the direction of the snakes movements.

    **direction param accepted values**: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"

* **`resetGameState():void`:** Resets the Ouro instance to it's prototypes state. Note: this is a pretty heavy handed method, if any properties are meant to be preserved, take propper care when using this method. Once this method is called, even the grid will have a null value and need.

* **`gameLoop():void`:** Creates an interval and accepts a callback thats first and only parameter will have in it the state, current to each interval. Note that the interval is held within the main object internally, so the running state is in effect and accessible outside of the callback.
    



## Todos
- add an options to choose between interval and animation frame in gameLoop
- change setDirection args to accept more generic values. ie: left, right etc... instead of ArrowLeft, ArrowRight...



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
