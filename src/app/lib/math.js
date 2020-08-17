export class Vector {
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

window.Matrix = Matrix;

export function getIndexFromPosition(position, horizontalTilesNumber) {
  return (position.x % horizontalTilesNumber) + (position.y * horizontalTilesNumber);
}
