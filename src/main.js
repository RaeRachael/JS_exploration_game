import { draw, update, stepAnimation, updateMonsters } from './game.js'
import { keyPress, isKeyPressed } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { loadLevelsAsTiles } from './level/level.js'
import { selectTileMap } from './tiles/tile.js'

let lastStepTime = 0
let step = 0
let count = 0
let play = true
const gameBox = document.getElementById('game-box')

function setUpLevels() {
  loadLevelsAsTiles()
  selectTileMap(1)
}


function mainLoop(currentTime) {
  if (play === false) { return "the game is over" }
  const timePassedSinceStep = (currentTime - lastStepTime)/1000
  keyPress()
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED * 3))) {
    updateCount()
    lastStepTime = currentTime
    if (isKeyPressed() === true) {
      updateStep()
    }
    stepAnimation(step)
   }
}

function updateCount() {
  if (count === 5 ) { 
    count = 0
    updateMonsters()
    draw(gameBox)
  }
  count++
}

function updateStep() {
  step ++
  if (step === 3) { 
    step = 0
    update()
    draw(gameBox)
  }
}

function displayMonsterEnd() {
  play = false
  document.body.style.color = "white"
  document.body.innerHTML = "EATEN BY A MONSTER"
}

function displayTreasureEnd() {
  play = false
  document.body.style.color = "white"
  document.body.innerHTML = "YOU GOT THE TREASURE"
}

window.requestAnimationFrame(setUpLevels)
window.requestAnimationFrame(mainLoop)

export { mainLoop, setUpLevels, displayMonsterEnd, displayTreasureEnd, updateCount }