export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  translateX(value) {
    this.x += value;
  }

  translateY(value) {
    this.y += value;
  }

  translate(offset) {
    this.translateX(offset.x);
    this.translateY(offset.y);
  }

  equals(position) {
    return position &&
      position.x === this.x &&
      position.y === this.y;
  }
}
