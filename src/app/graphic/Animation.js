export default class Animation {

  constructor(animationName, animationSpec, tileSet) {
    this.animationName = animationName;
    this.interval = animationSpec.interval;
    this.frames = this._createFrames(animationSpec, tileSet);
    this.elapsedTime = 0;
    this.index = 0;
    this.solid = animationSpec.solid;
  }

  isSolid() {
    return this.solid;
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

  _createFrames(animationSpec, tileSet) {
    let tiles = animationSpec.tiles;
    if(animationSpec.frames) {
      const tileName = tiles;
      tiles = Array.from(Array(animationSpec.frames).keys())
        .map(index => `${tileName}-${index + 1}`);
    }

    return tiles.map(tileName => {
      return tileSet.get(tileName);
    });
  }
}
