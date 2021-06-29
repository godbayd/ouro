// sets grid to blank slate(all 0's 
// which represent empty space).
// updates grid
export function blankGrid() {
    this.grid = []

    const row = []

    for (let i = 0; i < this.xCount; i++) {
        row.push(this.cell.space)
    }

    for (let i = 0; i < this.yCount; i++) {
        this.grid.push([...row])
    }

    return this
}


