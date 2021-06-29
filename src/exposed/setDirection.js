export function setDirection(dir) {
    const sDir = this.direction

    const badDirection = sDir === dir ||
        (sDir === 'ArrowLeft') && (dir === 'ArrowRight') ||
        (sDir === 'ArrowRight') && (dir === 'ArrowLeft') ||
        (sDir === 'ArrowUp') && (dir === 'ArrowDown') ||
        (sDir === 'ArrowDown') && (dir === 'ArrowUp');

    if (!badDirection && !this._alreadyChangedDirection) {
        this._alreadyChangedDirection = true
        this.direction = dir

    } 

    return this
}
