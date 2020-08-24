export default class Animation {

  constructor(animationSpec, tileSet) {
    this.interval = animationSpec.interval;
    this.frames = this._createFrames(animationSpec, tileSet);
    this.elapsedTime = 0;
    this.index = 0;
  }

  _createFrames(animationSpec, tileSet) {
    return animationSpec.tiles.map(tileName => {
      return tileSet.get(tileName);
    });
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime * 1000;
    if(this.elapsedTime > this.interval) {
      this.index = ++this.index % this.frames.length;
      this.elapsedTime = 0;
    }
  }

  draw(context, x, y, flip = false) {
    this.frames[this.index].draw(context, x, y, flip);
  }
}
