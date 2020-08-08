import { updatePlayer, drawPlayer, tileBlocked, playerLocation } from './player/player.js';
import { drawLevel } from './level/level.js';
import { getPlayerDirection, resetInput, pressed} from './input/input.js';
import { tileMap } from './tiles/tile.js';

function update() {
  updatePlayer(getPlayerDirection(), pressed, tileMap)
  resetInput()
}

function draw(gameBox) {
  gameBox.innerHTML = ""
  console.log(drawPlayer)
  drawLevel(gameBox, tileMap, playerLocation)
  drawPlayer(getPlayerDirection(), 1)
}

export { draw, update }