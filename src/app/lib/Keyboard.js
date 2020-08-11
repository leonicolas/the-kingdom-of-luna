const PRESSED = 1;
const RELEASED = 0;

export const Keys = {
  Space: 'Space',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
};

export default class Keyboard {

  constructor() {
    this.keyStates = new Map();
    this.listeners = new Map();
  }

  addKeyListener(keyCode, callback) {
    if(!this.listeners.has(keyCode)) {
      this.listeners.set(keyCode, new Set());
    }
    this.listeners.get(keyCode).add(callback);
  }

  startListeningTo(eventSource) {
    // Attach to the key down and up events.
    ['keydown', 'keyup'].forEach(eventName => {
      eventSource.addEventListener(eventName, event => this._handleEvent(event));
    });
  }

  resetListeners() {
    this.listeners.clear();
    this.keyStates.clear();
  }

  getKeyState(keyCode) {
    return this.keyStates.get(keyCode);
  }

  _handleEvent(event) {
    const keyCode = event.code;

    // Checks if there is a listener for the pressed key
    if(!this.listeners.has(keyCode)) return;

    // Prevent the default browser behavior
    event.preventDefault();

    // Checks if the key was already in the state
    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
    if(this.keyStates.get(keyCode) === keyState) return;

    // Save the current key state and trigger the listener callback
    this.keyStates.set(keyCode, keyState);
    this.listeners.get(keyCode).forEach(callback => callback(keyState, this));
  }
}
