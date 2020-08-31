import { loadImage, loadSpec } from './lib/loaders';
import constants from './constants';
import Timer from './lib/Timer';

import TileSet from './graphic/TileSet';
import GameMap from './graphic/GameMap';
import Camera from './graphic/Camera';
import Player from './entities/Player';
import Compositor from './graphic/Compositor';

export default class Game {

  constructor(buffer, control) {
    this.buffer = buffer;
    this.context = {};
    this.control = control;
  }

  async load() {
    const [tileSetImage, tileSetSpec, mapSpec, playerSpec] = await Promise.all([
      loadImage('tile-set.png'),
      loadSpec('tile-set.json'),
      loadSpec('map.json'),
      loadSpec('player.json'),
    ]);

    this.tileSet = new TileSet(tileSetSpec, tileSetImage);
    this.camera = new Camera(constants.VIEW_PORT_SIZE);

    this.context.player = new Player(playerSpec, this.tileSet, constants.VIEW_PORT_CENTER);
    this.context.map = new GameMap(mapSpec['luna'], this.tileSet);

    this.compositor = new Compositor();
    this.compositor.addLayer(this.context.map.background());
    this.compositor.addObject(this.context.player);
    this.compositor.addLayer(this.context.map.foreground());

    this.control.bind(this.context.player);
    this.control.bind(this.camera);
  }

  start() {
    const timer = new Timer();
    timer.update = deltaTime => {
      this.tileSet.update(deltaTime, this.context);
      this.compositor.update(deltaTime, this.context);
      this.compositor.draw(this.buffer, this.camera);
    }
    timer.start();
  }
}
