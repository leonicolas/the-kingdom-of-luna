import Vector from './graphic/Vector';
import Size from './graphic/Size';

const WIDTH = 640;
const HEIGHT = 480;
const TILE_SIZE = 16;
const SCALE = 1;

const VIEW_PORT_SIZE = new Size(
  (WIDTH / TILE_SIZE / SCALE) | 0,
  (HEIGHT / TILE_SIZE / SCALE) | 0
);
const VIEW_PORT_CENTER = new Vector(
  (VIEW_PORT_SIZE.width / 2) | 0,
  (VIEW_PORT_SIZE.height / 2) | 0,
);

const MAP_SIZE = new Size(
  VIEW_PORT_SIZE.width  * 3,
  VIEW_PORT_SIZE.height * 3
);
const MAP = new Array(MAP_SIZE.height);

export default {
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
  TILE_SIZE: TILE_SIZE,
  SCALE: SCALE,
  VIEW_PORT_SIZE: VIEW_PORT_SIZE,
  VIEW_PORT_CENTER: VIEW_PORT_CENTER,
  MAP_SIZE: MAP_SIZE,
  MAP: MAP,
};
