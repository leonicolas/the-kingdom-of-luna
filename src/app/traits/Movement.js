import { Vector } from "../lib/math";

export default class Movement {

  constructor(entity) {
    entity.velocity = new Vector(0, 0);
    entity.translateX = this._translateX(entity);
    entity.translateY = this._translateY(entity);
    entity.getFuturePosition = this._futurePosition(entity);
  }

  update(entity) {
    if(entity.velocity.x) {
      entity.position.addX(entity.velocity.x);
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
      entity.direction = value > 0 ? 1 : -1;
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

  _futurePosition(entity) {
    return () => {
      return new Vector(
        entity.position.x + entity.velocity.x,
        entity.position.y + entity.velocity.y
      );
    }
  }
}
