import Vector from "./Vector";

export default class Camera {

  constructor(viewportSize, position = new Vector(0, 0)) {
    this.viewport = viewportSize;
    this.position = position;
  }
}
