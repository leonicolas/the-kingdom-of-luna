import Keyboard, { Keys } from './lib/Keyboard';

export function bindKeyboard(gameContext) {
  const keyboard = new Keyboard();
  const pos = gameContext.state.pos;
  keyboard.addKeyListener(Keys.ArrowLeft, state => pos.x -= state);
  keyboard.addKeyListener(Keys.ArrowRight, state => pos.x += state);
  keyboard.addKeyListener(Keys.ArrowUp, state => pos.y -= state);
  keyboard.addKeyListener(Keys.ArrowDown, state => pos.y += state);
  keyboard.startListeningTo(window);
}
