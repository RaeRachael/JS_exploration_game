import { getPlayerDirection, resetInput, isKeyPressed } from './input/input.js';
import { updatePlayer, drawPlayer, playerLocation, checkBlocked } from './player/player.js';
import { drawLevel, drawGridOffset } from './level/level.js';
import { getTileMap } from './tiles/tile.js';

function update() {
  updatePlayer(getPlayerDirection(), isKeyPressed(), getTileMap())
  resetInput()
}

function draw(gameBox) {
  gameBox.innerHTML = ""
  drawLevel(gameBox, getTileMap(), playerLocation)
  stepAnimation(0)
}

function stepAnimation(step) {
  let direction = getPlayerDirection()
  if ( checkBlocked(direction, getTileMap()) === false || step === 0 ) { drawGridOffset(direction, step) }
  drawPlayer(direction, step)
}

export { draw, update, stepAnimation }
