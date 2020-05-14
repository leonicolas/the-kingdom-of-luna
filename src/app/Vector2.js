export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  equals(vector) {
    return vector &&
      vector.x === this.x &&
      vector.y === this.y
  }
}
