import Vector from "../graphic/Vector";

export default class Player {

  constructor(playerSprite) {
    this.sprite = playerSprite;
    this.position = new Vector(15, 10);
  }

  draw(context, camera) {
    this.sprite.draw(context, this.position);
  }
}
