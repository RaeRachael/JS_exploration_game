import { updatePlayer, drawPlayer, tileBlocked, playerLocation, PLAYER_MOVEMENT_SPEED } from './player/player.js';
import { drawLevel } from './level/level.js';
import { getPlayerDirection, keyPress, unpressed, pressed} from './input/input.js';
import { tileMap } from './tiles/tile.js';

let lastRenderTime = 0
const gameBox = document.getElementById('game-box')

function mainLoop(currentTime) {
  const timePassedSinceRender = (currentTime - lastRenderTime)/1000
  keyPress()
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceRender < 1 / PLAYER_MOVEMENT_SPEED) return

  lastRenderTime = currentTime
  update()
  draw()
}

function addPlayer() {
  const playerSpace = document.createElement('div')
  playerSpace.style.gridRowStart = 3
  playerSpace.style.gridColumnStart = 3
  playerSpace.classList.add('player')
  gameBox.appendChild(playerSpace)
}

function update() {
  updatePlayer(getPlayerDirection(), pressed, tileMap)
  unpressed()
}

function draw() {
  gameBox.innerHTML = ""
  drawLevel(gameBox, tileMap, playerLocation)
  addPlayer()
  drawPlayer(gameBox)
}

window.requestAnimationFrame(mainLoop)