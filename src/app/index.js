import constants from './constants';
import Timer from './lib/Timer';

import Vector from './graphic/Vector';
import TileSet from './graphic/TileSet';

import { bindKeyboard } from './keyboard';
import { loadImage, loadSpec } from './lib/loaders';


async function init(canvas) {
  const context = canvas.getContext('2d');
  context.scale(constants.SCALE, constants.SCALE);

  const [tileSetImage, tileSetSpec] = await Promise.all([
    loadImage('tile-set.png'),
    loadSpec('tile-set.json'),
  ]);

  const gameState = { pos: new Vector(9, 6) };
  gameState.tileSet = new TileSet(tileSetImage, tileSetSpec);

  bindKeyboard(gameState);

  const timer = new Timer();
  timer.update = update(context, gameState);
  timer.start();
}

function update(context, gameState) {
  let total = 0;
  return deltaTime => {
    total += deltaTime;
    gameState.tileSet.draw(context, new Vector(0, 0), 'sea-' + ((total % 2) + 1 | 0));
  };
}

document.addEventListener('DOMContentLoaded',
  () => init(document.getElementById('canvas')));
