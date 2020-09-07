import { Vector } from "../lib/math";

export default class Sprite {

  constructor(entitySpec, tileSet, position = new Vector()) {
    this.position = position;
    this.states = this._createStates(entitySpec, tileSet);
    this.setState(this.states.keys().next().value);
    this.traits = new Set();
  }

  _createStates(entitySpec, tileSet) {
    return entitySpec.states
      .reduce((map, stateName) => {
        map.set(stateName, tileSet.get(stateName));
        return map;
      }, new Map());
  }

  addTrait(trait) {
    this.traits.add(trait);
  }

  setState(stateName) {
    this.currentState = this.states.get(stateName);
  }

  update(deltaTime, gameContext) {
    this.traits.forEach(trait => trait.update && trait.update(this, deltaTime, gameContext));
  }

  draw(context, camera) {
    this.currentState.draw(
      context,
      this.position.x - camera.position.x,
      this.position.y - camera.position.y,
      this.direction < 0
    );
  }
}
