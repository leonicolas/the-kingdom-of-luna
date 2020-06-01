import constants from './constants';
import Timer from './lib/Timer';

import Vector from './graphic/Vector';
import TileSet from './graphic/TileSet';
import GameMap from './graphic/GameMap';

import { bindKeyboard } from './keyboard';
import { loadImage, loadSpec } from './lib/loaders';
import Size from './graphic/Size';
import Camera from './graphic/Camera';

async function init(canvas) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(constants.SCALE, constants.SCALE);

  const [tileSetImage, tileSetSpec, mapSpec] = await Promise.all([
    loadImage('tile-set.png'),
    loadSpec('tile-set.json'),
    loadSpec('map.json')
  ]);

  const tileSet = new TileSet(tileSetImage, tileSetSpec);
  const lunaMap = new GameMap(mapSpec['luna'], tileSet);
  const camera = new Camera(constants.VIEW_PORT_SIZE);

  const gameContext = {
    tileSet,
    lunaMap,
  };

  bindKeyboard(camera.position);

  const timer = new Timer();
  timer.update = deltaTime => {
    gameContext.lunaMap.update(deltaTime);
    gameContext.lunaMap.draw(context, camera);
  }
  timer.start();
}

document.addEventListener('DOMContentLoaded', () => init(document.getElementById('canvas')));
