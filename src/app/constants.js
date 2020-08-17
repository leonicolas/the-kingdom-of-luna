import { Vector, Rect } from './lib/math';

const WIDTH = 480;
const HEIGHT = 320;
const TILE_SIZE = 16;
const SCALE = 1;

const VIEW_PORT_SIZE = new Rect(
  (WIDTH / TILE_SIZE) | 0,
  (HEIGHT / TILE_SIZE) | 0
);
const VIEW_PORT_CENTER = new Vector(
  (VIEW_PORT_SIZE.width / 2) | 0,
  (VIEW_PORT_SIZE.height / 2) | 0,
);

export default {
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
  TILE_SIZE: TILE_SIZE,
  SCALE: SCALE,
  VIEW_PORT_SIZE: VIEW_PORT_SIZE,
  VIEW_PORT_CENTER: VIEW_PORT_CENTER
};
