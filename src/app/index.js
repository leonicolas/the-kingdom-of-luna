import constants from './constants';
import Timer from './lib/Timer';

import Vector from './graphic/Vector';
import TileSet from './graphic/TileSet';
import GameMap from './graphic/GameMap';

import { bindKeyboard } from './keyboard';
import { loadImage, loadSpec } from './lib/loaders';


async function init(canvas) {
  const context = canvas.getContext('2d');
  context.scale(constants.SCALE, constants.SCALE);

  const [tileSetImage, tileSetSpec, mapSpec] = await Promise.all([
    loadImage('tile-set.png'),
    loadSpec('tile-set.json'),
    loadSpec('map.json')
  ]);

  const tileSet = new TileSet(tileSetImage, tileSetSpec);
  const map = new GameMap(mapSpec, tileSet);
  const gameContext = {
    state: { pos: new Vector(9, 6) },
    tileSet,
    map,
  };

  bindKeyboard(gameContext);

  const timer = new Timer();
  timer.update = update(context, gameContext);
  timer.start();
}

function update(context, gameContext) {
  return deltaTime => {
    gameContext.map.draw(context, 'luna');
  };
}

document.addEventListener('DOMContentLoaded',
  () => init(document.getElementById('canvas')));
