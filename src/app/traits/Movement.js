import { Vector } from "../lib/math";
export default class Movement {

  constructor(entity, initialPosition = new Vector(0, 0)) {
    entity.position = initialPosition;
    entity.direction = 1;

    entity.translateX = (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.direction = value < 0 ? -1 : 1;
      entity.position.addX(value);
    }

    entity.translateY = (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.position.addY(value);
    }
  }
}
