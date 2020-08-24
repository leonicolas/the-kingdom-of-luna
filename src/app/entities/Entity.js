import { Vector } from "../lib/math";

export default class Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    this.states = this._createStates(entitySpec, tileSet);
    this.offset = offset.clone();
    this.position = offset.clone();
    this.flipped = false;
    this.setState(this.states.keys().next().value);
  }

  _createStates(entitySpec, tileSet) {
    return entitySpec.states
      .reduce((map, stateName) => {
        map.set(stateName, tileSet.get(stateName));
        return map;
      }, new Map());
  }

  setState(stateName) {
    this.currentState = this.states.get(stateName);
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

  update() {
  }

  draw(context) {
    this.currentState.draw(context, this.offset.x, this.offset.y, this.flipped);
  }
}
