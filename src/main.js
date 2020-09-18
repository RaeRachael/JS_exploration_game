import { draw, update, checkAndDrawPlayer, updateMonsters } from './game.js'
import { isKeyPressed, setupInput } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { loadLevelsAsTiles } from './level/level.js'
import { selectTileMap } from './tiles/tile.js'

let lastStepTime = 0
let step = 0
let count = 0
let play = true
const gameBox = document.getElementById('game-box')

document.addEventListener("DOMContentLoaded", startup);

function startup() {
  setupInput()
  setUpLevels()
}

function setUpLevels() {
  loadLevelsAsTiles()
  selectTileMap(1)
}


function mainLoop(currentTime) {
  if (play === false) { return "the game is over" }
  const timePassedSinceStep = (currentTime - lastStepTime)/1000
  window.requestAnimationFrame(mainLoop)
  if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED * 3))) {
    updateCount()
    lastStepTime = currentTime
    if (isKeyPressed()) {
      updateStep()
    }
    draw(gameBox)
    checkAndDrawPlayer(step)
   }
}

function updateCount() {
  if (count === 10 ) { 
    count = 0
    updateMonsters()
  }
  count++
}

function updateStep() {
  step ++
  if (step === 3) { 
    step = 0
    update()
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

window.requestAnimationFrame(mainLoop)

export { mainLoop, displayMonsterEnd, displayTreasureEnd, updateCount, startup, step }