import { getPlayerDirection, resetInput, isKeyPressed } from './input/input.js'
import { drawPlayer, playerLocation, checkBlocked, movePlayer } from './player/player.js'
import { drawLevel, drawGridOffset, isTileTreasure } from './level/level.js'
import { getTileMap } from './tiles/tile.js'
import { moveMonsters, drawMonsters, isMonsterThere } from './monster/monster.js'
import { displayMonsterEnd, displayTreasureEnd } from './main.js'

function updatePlayer() {
  movePlayer(getPlayerDirection(), isKeyPressed(), getTileMap())
  resetInput()
}

function updateMonsters() {
  moveMonsters(getTileMap())
}

function draw(gameBox) {
  gameBox.innerHTML = ""
  drawLevel(gameBox, getTileMap(), playerLocation)
  drawMonsters(gameBox, playerLocation)
}

function checkAndDrawPlayer(step) {
  let direction = getPlayerDirection()
  if ( checkCurrentTile() !== "normal" ) return
  drawPlayerWalk(direction, step, checkBlocked(direction, getTileMap()))
}

function checkCurrentTile() {
  if ( isMonsterThere(playerLocation) ) { return displayMonsterEnd() }
  if ( isTileTreasure(playerLocation) ) { return displayTreasureEnd() }
  return "normal"
}

function drawPlayerWalk(direction, step, blocked) {
  blocked ? drawGridOffset("blocked") : drawGridOffset(direction, step)
  drawPlayer(direction, step)
}

export { draw, updatePlayer, checkAndDrawPlayer, updateMonsters }
