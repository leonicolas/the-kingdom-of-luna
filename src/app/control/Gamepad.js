const PRESSED = 1;
const RELEASED = 0;

export const Keys = {
  Space: 'Space',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
};

export default class Gamepad {

  constructor() {
    this.keyStates = new Map();
    this.listeners = new Map();
  }

  bind(entity) {
    this.keyMap.forEach((callback, keyCode) => {
      this.addKeyListener(keyCode, keyState => {
        callback(entity, keyState);
      })
    });
  }

  addKeyListener(keyCode, callback) {
    if(!this.listeners.has(keyCode)) {
      this.listeners.set(keyCode, new Set());
    }
    this.listeners.get(keyCode).add(callback);
  }

  startListeningTo(eventSource) {
    eventSource.addEventListener("gamepadconnected", (event) => {
      this.gamepadIndex = event.gamepad.index;
      setInterval(() => {
        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if(!gamepad) return;

        gamepad.buttons.forEach((buttonData, index) => {
          if(!buttonData.pressed) return;
          console.log(`Button ${index} pressed. Value: ${buttonData.value}`);
        });

        gamepad.axes.forEach((axisData, index) => {
          if(!axisData || axisData === -1) return;
          console.log(`Axis ${index} pressed. Value: ${axisData}`);
        });

      }, 100);
      console.log(event);
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
