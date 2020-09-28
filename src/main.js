import { draw, updatePlayer, checkAndDrawPlayer, updateMonsters } from './game.js'
import { isKeyPressed, setupInput } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { loadLevelsAsTiles } from './level/level.js'
import { selectTileMap } from './tiles/tile.js'

let lastStepTime = 0
let step = 0
let count = 0
let play = true
let pause = false
let pauseTime = 0
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
  if (pause) {
    gameBox.innerHTML = "paused"
    if (pauseTime === 0) { pauseTime = currentTime }
    if (currentTime - pauseTime > 500) { 
      pause = false
      pauseTime = 0
    }
  } else {
    if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED * 3))) {
      increaseCount()
      lastStepTime = currentTime
      if (isKeyPressed()) {
        increaseStep()
      }
      draw(gameBox)
      checkAndDrawPlayer(step)
    }
  }
}

function increaseCount() {
  count++
  if (count === 11 ) { 
    count = 0
    updateMonsters()
  }
}

function increaseStep() {
  step ++
  if (step === 3) { 
    step = 0
    updatePlayer()
  }
}

function displayTransition() {
  pause = true
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

export { mainLoop, displayMonsterEnd, displayTreasureEnd, increaseCount, startup, step, displayTransition }