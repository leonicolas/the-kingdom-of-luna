import Keyboard, { Keys } from './lib/Keyboard';

export function bindKeyboard(keyboard, position) {
  keyboard.addKeyListener(Keys.ArrowLeft, state => position.translateX(-state));
  keyboard.addKeyListener(Keys.ArrowRight, state => position.translateX(state));
  keyboard.addKeyListener(Keys.ArrowUp, state => position.translateY(-state));
  keyboard.addKeyListener(Keys.ArrowDown, state => position.translateY(state));
}
