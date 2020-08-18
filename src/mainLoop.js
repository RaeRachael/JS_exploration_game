import { draw, update, stepAnimation } from './game.js'
import { keyPress, isKeyPressed } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { levelLoad } from './level/level.js'

let lastStepTime = 0
let step = 0
let play = true
const gameBox = document.getElementById('game-box')

function setUpLevel(levelNumber) {
  levelLoad(0)
  draw(gameBox)
}

function mainLoop(currentTime) {
  if (play === false) { return "the game is over" }
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

function displayMonsterEnd() {
  play = false
  document.body.style.color = "white"
  document.body.innerHTML = "EATEN BY A MONSTER"
}

window.requestAnimationFrame(setUpLevel)
window.requestAnimationFrame(mainLoop)

export { mainLoop, setUpLevel, displayMonsterEnd }