export default class Animation {

  constructor(animationSpec, tileSet) {
    this.animationSpec = animationSpec;
    this.tileSet = tileSet;
    this.elapsedTime = 0;
    this.index = 0;
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime * 1000;
    if(this.elapsedTime > this.animationSpec.interval) {
      this.index = ++this.index % this.animationSpec.tiles.length;
      this.elapsedTime = 0;
    }
  }

  draw(context, x, y, flip) {
    const tileName = this.animationSpec.tiles[this.index];
    this.tileSet.get(tileName).draw(context, x, y, flip);
  }
}
