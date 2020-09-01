import { Vector } from "../lib/math";

export default class Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    this.position = new Vector(0, 0);
    this.states = this._createStates(entitySpec, tileSet);
    this.offset = offset.clone();
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

  draw(context) {
    this.currentState.draw(
      context,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.direction < 0
    );
  }
}
