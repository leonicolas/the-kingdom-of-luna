import Entity from "./Entity";

import Movement from "../traits/Movement";
import { Vector } from "../lib/math";

export default class Player extends Entity {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    super(entitySpec, tileSet, offset);
    this.addTrait(new Movement(this));
  }
}
