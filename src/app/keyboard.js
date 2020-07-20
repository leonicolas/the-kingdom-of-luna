import Keyboard, { Keys } from './lib/Keyboard';

export function bindKeyboard(position) {
  const keyboard = new Keyboard();
  keyboard.addKeyListener(Keys.ArrowLeft, state => position.x -= state);
  keyboard.addKeyListener(Keys.ArrowRight, state => position.x += state);
  keyboard.addKeyListener(Keys.ArrowUp, state => position.y -= state);
  keyboard.addKeyListener(Keys.ArrowDown, state => position.y += state);
  keyboard.startListeningTo(window);
}
