import constants from './constants';
import Timer from './Timer';
import TileSet from './TileSet';
import Sprite from './Sprite';
import Keyboard, { Keys } from './Keyboard';

import { loadImage } from './lib/loaders';

import Position from './Position';

const gameState = { pos: new Position(9, 6) };
const timer = new Timer();

async function init(canvas) {
  const context = canvas.getContext('2d');
  context.scale(constants.SCALE, constants.SCALE);

  const tileSet = new TileSet(await loadImage('tile-set.png'), constants.TILE_SIZE);

  initMap(tileSet);
  initInput();

  const water = new Sprite(tileSet, [new Position(0, 0), new Position(1, 0)]);
  timer.update = main(context, water);
  timer.start();
}

function initMap(tileSet) {
  // Temporary map initialization
  const green = new Sprite(tileSet, new Position(2, 0));
  const grass = new Sprite(tileSet, new Position(3, 0));
  const rock = new Sprite(tileSet, new Position(0, 1));
  for(let lin = 0; lin < constants.MAP_SIZE.height; lin++) {
    constants.MAP[lin] = new Array(constants.MAP_SIZE.width)
    for(let col = 0; col <constants. MAP_SIZE.width; col++) {
      if(col % constants.VIEW_PORT_SIZE.width === 0 || lin % constants.VIEW_PORT_SIZE.height === 0) {
        constants.MAP[lin][col] = rock;
      } else {
        constants.MAP[lin][col] = Math.random() < 0.2 ? grass : green;
      }
    }
  }
}

function initInput() {
  const keyboard = new Keyboard();
  const pos = gameState.pos;
  keyboard.addKeyListener(Keys.ArrowLeft, state => pos.x -= state);
  keyboard.addKeyListener(Keys.ArrowRight, state => pos.x += state);
  keyboard.addKeyListener(Keys.ArrowUp, state => pos.y -= state);
  keyboard.addKeyListener(Keys.ArrowDown, state => pos.y += state);
  keyboard.startListeningTo(window);
}

function main(context, sprite) {
  return (deltaTime) => {
    update(deltaTime, sprite);
    draw(context, sprite);
  }
}

function update(deltaTime, sprite) {
  sprite.update(deltaTime);
}

function draw(context, sprite) {
  // Temporary drawing
  const pos = gameState.pos;
  for(let x = 0; x < constants.VIEW_PORT_SIZE.width; x++) {
    for(let y = 0; y < constants.VIEW_PORT_SIZE.height; y++) {
      const mapX = x + pos.x - constants.VIEW_PORT_CENTER.x;
      const mapY = y + pos.y - constants.VIEW_PORT_CENTER.y;
      if(mapX < 0 || mapX > constants.MAP_SIZE.width - 1 ||
         mapY < 0 || mapY > constants.MAP_SIZE.height - 1) {
        sprite.draw(context, new Position(x * constants.TILE_SIZE, y * constants.TILE_SIZE));
      } else {
        constants.MAP[mapY][mapX].draw(context, new Position(x * constants.TILE_SIZE, y * constants.TILE_SIZE));
      }
    }
  }

  // Temporary player position mark
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 2;
  context.rect(
    constants.VIEW_PORT_CENTER.x * constants.TILE_SIZE,
    constants.VIEW_PORT_CENTER.y * constants.TILE_SIZE,
    constants.TILE_SIZE,
    constants.TILE_SIZE);
  context.stroke();
}

document.addEventListener('DOMContentLoaded',
  () => init(document.getElementById('canvas')));
// Pauses the time when the windows is not visible
document.addEventListener('visibilitychange',
  () => document.hidden ? timer.pause() : timer.start(),
  false);
