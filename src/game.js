import { getPlayerDirection, resetInput, isKeyPressed } from './input/input.js'
import { updatePlayer, drawPlayer, playerLocation, checkBlocked } from './player/player.js'
import { drawLevel, drawGridOffset } from './level/level.js'
import { getTileMap } from './tiles/tile.js'
import { moveMonsters, drawMonsters, isMonsterThere } from './monster/monster.js'
import { displayMonsterEnd } from './main.js'

function update() {
  updateMonsters(getTileMap())
  updatePlayer(getPlayerDirection(), isKeyPressed(), getTileMap())
  resetInput()
}

function updateMonsters() {
  moveMonsters(getTileMap())
}

function draw(gameBox) {
  gameBox.innerHTML = ""
  drawLevel(gameBox, getTileMap(), playerLocation)
  drawMonsters(gameBox, playerLocation)
  stepAnimation(0)
}

function stepAnimation(step) {
  let direction = getPlayerDirection()
  if ( isMonsterThere(playerLocation) ) { return displayMonsterEnd() }
  if ( checkBlocked(direction, getTileMap()) === false || step === 0 ) { drawGridOffset(direction, step) }
  drawPlayer(direction, step)
}

export { draw, update, stepAnimation, updateMonsters }
