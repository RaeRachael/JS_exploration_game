import { draw, update, stepAnimation } from './game.js'
import { keyPress } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'

let lastRenderTime = 0
let lastStepTime = 0
let step = 0
const gameBox = document.getElementById('game-box')

function mainLoop(currentTime) {
  const timePassedSinceRender = (currentTime - lastRenderTime)/1000
  const timePassedSinceStep = (currentTime - lastStepTime)/1000
  keyPress()
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED * 3))) {
    lastStepTime = currentTime
    step ++
    if (step === 3) { step = 0 }
    stepAnimation(step)
   }
  if (timePassedSinceRender < 1 / PLAYER_MOVEMENT_SPEED) return {}

  lastRenderTime = currentTime
  lastStepTime = currentTime
  step = 0
  update()
  draw(gameBox)
}

window.requestAnimationFrame(mainLoop)

export { mainLoop }