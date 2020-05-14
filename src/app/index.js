import Timer from './Timer'
import Keyboard from './Keyboard'
import { Keys } from './Keyboard'
import Vector from './Vector2'
import Size from './Size2'

const WIDTH = 640
const HEIGHT = 480
const TILE_SIZE = 32

const VIEW_PORT_SIZE = new Size(WIDTH / TILE_SIZE, HEIGHT / TILE_SIZE)

const MAP_SIZE = new Size(VIEW_PORT_SIZE.width  * 3,
                          VIEW_PORT_SIZE.height * 3)
const MAP = new Array(MAP_SIZE.height);

let pos = new Vector()

function init() {
  const canvas = createBoard(WIDTH, HEIGHT)
  const context = canvas.getContext('2d')

  initMap();
  initInput()

  const timer = new Timer()
  timer.update = main(context)
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

function main(context) {
  return (deltaTime) => {
    update(deltaTime)
    draw(context)
  }
}

function update() {

}

function draw(ctx) {
  for(let col = 0; col < VIEW_PORT_SIZE.width; col++) {
    for(let lin = 0; lin < VIEW_PORT_SIZE.height; lin++) {
      const mapCol = col + pos.x
      const mapLin = lin + pos.y
      if(mapCol < 0 || mapCol > MAP_SIZE.width - 1 ||
         mapLin < 0 || mapLin > MAP_SIZE.height - 1) {
        ctx.fillStyle = 'black'
      } else {
        ctx.fillStyle = MAP[mapLin][mapCol] || 'black'
      }
      ctx.fillRect(col * TILE_SIZE, lin * TILE_SIZE, TILE_SIZE, TILE_SIZE)
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

function createBoard(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  document.body.appendChild(canvas)
  return canvas
}

document.addEventListener('DOMContentLoaded', init)
