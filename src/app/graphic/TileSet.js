import Animation from "./Animation";
import Tile from "./Tile";

export default class TileSet {
  constructor(tileSetSpec, tileSetImage) {
    this.tileSize = tileSetSpec.tileSize;
    this.tileSet = this._loadTileSet(tileSetSpec, tileSetImage);
    this.animations = this._loadAnimations(tileSetSpec);
  }

  _loadTileSet(tileSetSpec, tileSetImage) {
    const tiles = new Map();
    Object
      .keys(tileSetSpec.tiles)
      .forEach(tileName => {
        const tileData = Object.assign(
          { size: this.tileSize },
          tileSetSpec.tiles[tileName]
        );
        tiles.set(tileName, new Tile(tileData, tileSetImage));
      });
    return tiles;
  }

  _loadAnimations(tileSetSpec) {
    const animations = new Map();
    Object
      .keys(tileSetSpec.animations)
      .forEach(animationName => {
        const animationData = tileSetSpec.animations[animationName];
        animations.set(animationName, new Animation(animationData, this));
      });
    return animations;
  }

  update(deltaTime) {
    this.animations.forEach(animation => {
      animation.update(deltaTime);
    });
  }

  get(tileName) {
    return (this.animations && this.animations.has(tileName))
      ? this.animations.get(tileName)
      : this.tileSet.get(tileName);
  }
}
