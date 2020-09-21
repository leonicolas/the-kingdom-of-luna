
import constants from './constants';

import Keyboard, { Keys } from './control/Keyboard';
import Game from './Game';
import Gamepad from './control/Gamepad';

async function init(canvas) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(constants.SCALE, constants.SCALE);

  const gamepad = new Gamepad();
  gamepad.startListeningTo(window);

  const keyMap = new Map();
  keyMap.set(Keys.ArrowLeft, (entity, keyState) => entity.translateX && entity.translateX(-keyState));
  keyMap.set(Keys.ArrowRight, (entity, keyState) => entity.translateX && entity.translateX(keyState));
  keyMap.set(Keys.ArrowUp, (entity, keyState) => entity.translateY && entity.translateY(-keyState));
  keyMap.set(Keys.ArrowDown, (entity, keyState) => entity.translateY && entity.translateY(keyState));
  keyMap.set(Keys.KeyI, (entity, keyState) => keyState && entity.toggle && entity.toggle(keyState));

  const keyboard = new Keyboard(keyMap);
  const game = new Game(context, keyboard);

  await game.load();
  game.start();

  keyboard.startListeningTo(window);
}

document.addEventListener('DOMContentLoaded', () => init(document.getElementById('canvas')));
