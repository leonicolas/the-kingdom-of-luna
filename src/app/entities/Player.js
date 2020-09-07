import Sprite from "../graphic/Sprite";

import Movement from "../traits/Movement";
import Collision from "../traits/Collision";
import { Vector } from "../lib/math";

export default class Player extends Sprite {

  constructor(entitySpec, tileSet, offset = new Vector()) {
    super(entitySpec, tileSet, offset);
    this.addTrait(new Movement(this));
    this.addTrait(new Collision(this));
  }
}
