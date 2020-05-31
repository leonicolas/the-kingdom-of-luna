import Vector from './Vector';
import { calcIndex } from '../lib/math'

export default class GameMap {
  constructor(mapSpec, tileSet) {
    this.tileSet = tileSet;
    this.mapSpec = mapSpec;
  }

  draw(context, mapName) {
    const tileSize = this.tileSet.tileSize;
    const map = this.mapSpec[mapName];

    for(let x = 0; x < map.width; x++) {
      for(let y = 0; y < map.height; y++) {
        const tileName = map.tiles[calcIndex(x, y, map.width)] || map.defaultTile;
        this.tileSet.draw(
          context,
          new Vector(x * tileSize, y * tileSize),
          tileName
        );
      }
    }
  }
}
