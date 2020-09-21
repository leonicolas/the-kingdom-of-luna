import Animation from "./Animation";
import Tile from "./Tile";
import { Vector } from "../lib/math";

export default class TileSet {
  constructor(tileSetSpec, tileSetImage) {
    this.tileSize = tileSetSpec.tileSize;
    this.tileSet = this._loadTileSet(tileSetSpec, tileSetImage);
    this.animations = this._loadAnimations(tileSetSpec);
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

  _loadTileSet(tileSetSpec, tileSetImage) {
    const tiles = new Map();
    Object
      .keys(tileSetSpec.tiles)
      .forEach(tileName => {
        const tileData = tileSetSpec.tiles[tileName];
        const total = tileData.position[2] || 1;
        for(let num = 0; num < total; num++) {
          const tileSpec = Object.assign({}, tileData, {
            position: new Vector(tileData.position[0] + num, tileData.position[1]),
            size: this.tileSize,
          });
          const name = tileName + (total > 1 ? `-${num + 1}` : '');
          tiles.set(name, new Tile(name, tileSpec, tileSetImage));
        }
      });
    return tiles;
  }

  _loadAnimations(tileSetSpec) {
    const animations = new Map();
    Object
      .keys(tileSetSpec.animations)
      .forEach(animationName => {
        const animationData = tileSetSpec.animations[animationName];
        animations.set(animationName, new Animation(animationName, animationData, this));
      });
    return animations;
  }
}
