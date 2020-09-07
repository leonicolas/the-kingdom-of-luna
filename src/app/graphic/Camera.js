import { Vector } from "../lib/math";

export default class Camera {

  constructor(viewportSize, position = new Vector(0, 0)) {
    this.viewport = viewportSize;
    this.position = position;
  }

  translateX(value) {
    if(value === 0) {
      return;
    }
    this.position.addX(value);
  }

  translateY(value) {
    if(value === 0) {
      return;
    }
    this.position.addY(value);
  }
}
