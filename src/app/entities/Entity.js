import { Vector } from "../lib/math";
import Movement from "../traits/Movement";

export default class Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    this.states = this._createStates(entitySpec, tileSet);
    this.offset = offset.clone();
    this.setState(this.states.keys().next().value);
    this.traits = new Set();
    this.traits.add(new Movement(this));
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
    this.traits.forEach(trait => trait.update && trait.update(deltaTime, gameContext));
  }

  draw(context) {
    this.currentState.draw(context, this.offset.x, this.offset.y, this.direction < 0);
  }
}
