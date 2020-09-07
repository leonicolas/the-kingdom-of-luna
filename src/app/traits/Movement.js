import { Vector } from "../lib/math";
export default class Movement {

  constructor(entity) {
    entity.velocity = new Vector(0, 0);
    entity.translateX = this._translateX(entity);
    entity.translateY = this._translateY(entity);
    entity.getFuturePosition = this._getFuturePosition(entity);
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

  _translateX(entity) {
    return (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.velocity.x = value;
    }
  }

  _translateY(entity) {
    return (value = 0) => {
      if(value === 0) {
        return;
      }
      entity.velocity.y = value;
    }
  }

  _getFuturePosition(entity) {
    return () => {
      if(entity.velocity.x || entity.velocity.y) {
        return entity.position.clone().add(entity.velocity);
      }
    }
  }
}
