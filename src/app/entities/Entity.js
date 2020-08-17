import { Vector } from "../lib/math";
import Sprite from "../graphic/Sprite";

const LEFT = -1;
const RIGHT = 1;

export default class Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    this.states = this._createStates(entitySpec, tileSet);
    this.state = 'idle';
    this.offset = offset.clone();
    this.position = offset.clone();
    this.direction = RIGHT;
    this.sprite = this.states.get(this.state);
  }

  _createStates(entitySpec, tileSet) {
    return Object.keys(entitySpec.states).reduce((map, stateName) => {
      map.set(stateName, new Sprite(entitySpec.states[stateName], tileSet));
      return map;
    }, new Map());
  }

  translateX(value = 0) {
    if(value === 0) {
      return;
    }
    this.direction = value >= 0 ? RIGHT : LEFT;
    if(this.direction === RIGHT) {
      this.sprite.flipRight();
    }
    else if(this.direction === LEFT) {
      this.sprite.flipLeft();
    }

    this.position.translateX(value);
  }

  translateY(value = 0) {
    if(value === 0) {
      return;
    }
    this.position.translateY(value);
  }

  update(deltaTime, gameContext) {
    this.sprite.update(deltaTime);
  }

  draw(context) {
    this.sprite.draw(context, this.offset);
  }
}
