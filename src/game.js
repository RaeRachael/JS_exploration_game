import { getPlayerDirection, resetInput, pressed, walk} from './input/input.js';
import { updatePlayer, drawPlayer, playerLocation } from './player/player.js';
import { drawLevel } from './level/level.js';
import { tileMap } from './tiles/tile.js';

function update() {
  updatePlayer(getPlayerDirection(), pressed, walk, tileMap)
  resetInput()
}

function draw(gameBox) {
  gameBox.innerHTML = ""
  drawLevel(gameBox, tileMap, playerLocation)
  drawPlayer(getPlayerDirection(), 1)
}

export { draw, update }