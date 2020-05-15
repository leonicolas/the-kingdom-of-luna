import Timer from './Timer'
import TileSet from './TileSet'
import Keyboard from './Keyboard'
import { Keys } from './Keyboard'
import Vector from './Vector2'
import Size from './Size2'
import { loadImage } from './lib/loaders'
import Vector2 from './Vector2'

const WIDTH = 640
const HEIGHT = 480
const TILE_SIZE = 32

const VIEW_PORT_SIZE = new Size(WIDTH / TILE_SIZE, HEIGHT / TILE_SIZE)

const MAP_SIZE = new Size(VIEW_PORT_SIZE.width  * 3,
                          VIEW_PORT_SIZE.height * 3)
const MAP = new Array(MAP_SIZE.height)

let pos = new Vector(-2, -2)

async function init(canvas) {
  const context = canvas.getContext('2d')

  initMap()
  initInput()

  const tileSet = new TileSet(await loadImage('tile-set.png'))

  const timer = new Timer()
  timer.update = main(context, tileSet)
  timer.start()
}

function initMap() {
  for(let lin = 0; lin < MAP_SIZE.height; lin++) {
    MAP[lin] = new Array(MAP_SIZE.width)
    for(let col = 0; col < MAP_SIZE.width; col++) {
      if(col % VIEW_PORT_SIZE.width === 0 || lin % VIEW_PORT_SIZE.height === 0) {
        MAP[lin][col] = 'red'
      } else {
        MAP[lin][col] = ((lin + col) % 3 === 0 ? 'yellow' : 'green')
      }
    }
  }
}

function initInput() {
  const keyboard = new Keyboard();
  keyboard.addKeyListener(Keys.ArrowLeft, state => pos.x -= state)
  keyboard.addKeyListener(Keys.ArrowRight, state => pos.x += state)
  keyboard.addKeyListener(Keys.ArrowUp, state => pos.y -= state)
  keyboard.addKeyListener(Keys.ArrowDown, state => pos.y += state)
  keyboard.startListeningTo(window)
}

function main(context, tileSet) {
  return (deltaTime) => {
    update(deltaTime)
    draw(context, tileSet)
  }
}

function update() {

}

function draw(ctx, tileSet) {
  for(let x = 0; x < VIEW_PORT_SIZE.width; x++) {
    for(let y = 0; y < VIEW_PORT_SIZE.height; y++) {
      const mapX = x + pos.x
      const mapY = y + pos.y
      if(mapX < 0 || mapX > MAP_SIZE.width - 1 ||
         mapY < 0 || mapY > MAP_SIZE.height - 1) {
        tileSet.draw(ctx, new Vector2(x * TILE_SIZE, y * TILE_SIZE), 0);
      } else {
        ctx.fillStyle = MAP[mapY][mapX] || 'black'
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      }
    }
  }

  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2
  ctx.rect(
    (Math.trunc(VIEW_PORT_SIZE.width  / 2) - 1) * TILE_SIZE,
    (Math.trunc(VIEW_PORT_SIZE.height / 2) - 1) * TILE_SIZE,
    TILE_SIZE, TILE_SIZE)
  ctx.stroke()
}

document.addEventListener('DOMContentLoaded', () => init(document.getElementById('canvas')))
