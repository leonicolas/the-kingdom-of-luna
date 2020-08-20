import { Vector } from "../lib/math";
import Animation from "../graphic/Animation";

export default class Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    this.states = this._createStates(entitySpec, tileSet);
    this.offset = offset.clone();
    this.position = offset.clone();
    this.flipped = false;
    this.setState('idle');
  }

  _createStates(entitySpec, tileSet) {
    return Object.keys(entitySpec.states).reduce((map, stateName) => {
      const stateAnimation = new Animation(entitySpec.states[stateName], tileSet);
      map.set(stateName, stateAnimation);
      return map;
    }, new Map());
  }

  setState(stateName) {
    this.stateAnimation = this.states.get(stateName);
  }

  translateX(value = 0) {
    if(value === 0) {
      return;
    }
    this.flipped = value < 0;
    this.position.translateX(value);
  }

  translateY(value = 0) {
    if(value === 0) {
      return;
    }
    this.position.translateY(value);
  }

  update(deltaTime) {
    this.stateAnimation.update(deltaTime);
  }

  draw(context) {
    this.stateAnimation.draw(context, this.offset.x, this.offset.y, this.flipped);
  }
}
