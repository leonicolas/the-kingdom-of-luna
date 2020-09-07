export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  addX(value) {
    this.x += value;
  }

  addY(value) {
    this.y += value;
  }

  add(vector) {
    this.addX(vector.x);
    this.addY(vector.y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(vector) {
    return vector &&
      vector.x === this.x &&
      vector.y === this.y;
  }
}

export class Rect {
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }
}

export class Matrix {

  constructor() {
    this.matrix = [];
  }

  get(x, y) {
    const col = this.matrix[x];
    return col ? col[y] : undefined;
  }

  put(x, y, value) {
    if(!this.matrix[x]) {
      this.matrix[x] = [];
    }
    this.matrix[x][y] = value;
  }
}

export function getIndexFromPosition(position, horizontalTilesNumber) {
  return (position.x % horizontalTilesNumber) + (position.y * horizontalTilesNumber);
}
