import Vector from './Vector';
import Animation from './Animation';
import constants from '../constants';

export default class Sprite {
  constructor(spriteSpec, tileSet) {
    this.animation = new Animation(spriteSpec, tileSet);
    this.flip = false;
  }

  flipLeft() {
    this.flip = true;
  }

  flipRight() {
    this.flip = false;
  }

  update(deltaTime) {
    this.animation.update(deltaTime);
  }

  draw(context, position) {
    this.animation.draw(context, position, this.flip);
  }
}
