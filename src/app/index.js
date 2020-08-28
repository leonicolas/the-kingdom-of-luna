
import constants from './constants';

import Keyboard, { Keys } from './control/Keyboard';
import Game from './Game';

async function init(canvas) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(constants.SCALE, constants.SCALE);

  const keyMap = new Map();
  keyMap.set(Keys.ArrowLeft, (entity, keyState) => entity.translateX(-keyState));
  keyMap.set(Keys.ArrowRight, (entity, keyState) => entity.translateX(keyState));
  keyMap.set(Keys.ArrowUp, (entity, keyState) => entity.translateY(-keyState));
  keyMap.set(Keys.ArrowDown, (entity, keyState) => entity.translateY(keyState));

  const control = new Keyboard(keyMap);
  const game = new Game(context, control);
  await game.load();
  game.start();
  control.startListeningTo(window);
}

document.addEventListener('DOMContentLoaded', () => init(document.getElementById('canvas')));
