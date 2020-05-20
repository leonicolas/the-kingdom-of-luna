export default class Position {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  equals(position) {
    return position &&
      position.x === this.x &&
      position.y === this.y
  }
}
