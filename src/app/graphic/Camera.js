import { Vector } from "../lib/math";

export default class Camera {

  constructor(viewportSize, subjectPosition = new Vector(), offset = new Vector()) {
    this.viewport = viewportSize;
    this.subjectPosition = subjectPosition;
    this.offset = offset;
    this.lastPosition = subjectPosition.clone();
  }

  get position() {
    this.lastPosition.set(
      this.subjectPosition.x + this.offset.x,
      this.subjectPosition.y + this.offset.y
    );
    return this.lastPosition;
  }
}
