import { draw, update } from './game.js'
import { keyPress } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'

let lastRenderTime = 0
const gameBox = document.getElementById('game-box')

function mainLoop(currentTime) {
  const timePassedSinceRender = (currentTime - lastRenderTime)/1000
  keyPress()
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceRender < 1 / PLAYER_MOVEMENT_SPEED) return

  lastRenderTime = currentTime
  update()
  draw(gameBox)
}

window.requestAnimationFrame(mainLoop)