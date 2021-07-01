export function setDirection(dir) {
    const sDir = this.direction

    const badDirection = sDir === dir ||
        (sDir === 'ArrowLeft') && (dir === 'ArrowRight') ||
        (sDir === 'ArrowRight') && (dir === 'ArrowLeft') ||
        (sDir === 'ArrowUp') && (dir === 'ArrowDown') ||
        (sDir === 'ArrowDown') && (dir === 'ArrowUp');

    // only check if !_alreadyChangedDirection if this._interval has been updated
    // this ensures that gameLoop is an optional feature and lib can still be used flexibly
    if (!badDirection && (this._interval ? !this._alreadyChangedDirection : true)) {
        this._alreadyChangedDirection = true
        this.direction = dir

    } 

    return this
}
