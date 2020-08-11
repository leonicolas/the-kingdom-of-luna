import constants from './constants';
import Timer from './lib/Timer';

import TileSet from './graphic/TileSet';
import GameMap from './graphic/GameMap';

import { bindKeyboard } from './keyboard';
import { loadImage, loadSpec } from './lib/loaders';
import Camera from './graphic/Camera';
import Compositor from './graphic/Compositor';
import Entity from './entities/Entity';
import Keyboard from './lib/Keyboard';

async function init(canvas) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(constants.SCALE, constants.SCALE);

  const [tileSetImage, tileSetSpec, mapSpec, playerSpec] = await Promise.all([
    loadImage('tile-set.png'),
    loadSpec('tile-set.json'),
    loadSpec('map.json'),
    loadSpec('player.json'),
  ]);

  const keyboard = new Keyboard();
  const tileSet = new TileSet(tileSetSpec, tileSetImage);
  const camera = new Camera(constants.VIEW_PORT_SIZE);
  const player = new Entity(playerSpec, tileSet, constants.VIEW_PORT_CENTER);

  const compositor = new Compositor();
  compositor.addLayer(new GameMap(mapSpec['luna'], tileSet));
  compositor.addLayer(player);

  const gameContext = {
    player
  };

  bindKeyboard(keyboard, player);
  bindKeyboard(keyboard, camera.position);
  keyboard.startListeningTo(window);

  const timer = new Timer();
  timer.update = deltaTime => {
    compositor.update(deltaTime, gameContext);
    compositor.draw(context, camera);
  }
  timer.start();
}

document.addEventListener('DOMContentLoaded', () => init(document.getElementById('canvas')));
