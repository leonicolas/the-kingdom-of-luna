import { castArray } from './lib/utils';

export default class Sprite {
  constructor(tileSet, tiles = [0], frameTimeInSec = 1) {
    this.tileSet = tileSet;
    this.tiles = castArray(tiles);
    this.frameTime = frameTimeInSec;
    this.internalTime = 0;
    this.frame = 0;
  }

  update(deltaTime) {
    this.internalTime += deltaTime;
    if(this.internalTime > this.frameTime)   {
      this.internalTime = 0;
      this.frame = ++this.frame % this.tiles.length;
    }
  }

  draw(context, position) {
    this.tileSet.draw(
      context,
      position,
      this.tiles[this.frame]);
  }
}
