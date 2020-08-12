import { draw, update, stepAnimation } from './game.js'
import { keyPress, isKeyPressed } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'

let lastStepTime = 0
let step = 0
const gameBox = document.getElementById('game-box')

function setUp() {
  draw(gameBox)
}

function mainLoop(currentTime) {
  const timePassedSinceStep = (currentTime - lastStepTime)/1000
  keyPress()
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED * 3))) {
    lastStepTime = currentTime
    if (isKeyPressed() === true) {
      step ++
      if (step === 3) { 
        step = 0
        update()
        draw(gameBox)
      }
    }
    stepAnimation(step)
   }
}

window.requestAnimationFrame(setUp)
window.requestAnimationFrame(mainLoop)

export { mainLoop, setUp }