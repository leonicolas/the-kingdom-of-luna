import { Vector } from "../lib/math";
export default class Movement {

  constructor(entity) {
    entity.velocity = new Vector(0, 0);

    entity.translateX = (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.velocity.x = value;
    }

    entity.translateY = (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.velocity.y = value;
    }
  }

  update(entity) {
    if(entity.velocity.x) {
      entity.position.addX(entity.velocity.x);
      entity.direction = entity.velocity.x > 0 ? 1 : -1;
      entity.velocity.x = 0;
    }

    if(entity.velocity.y) {
      entity.position.addY(entity.velocity.y);
      entity.velocity.y = 0;
    }
  }
}
