import { draw, update, checkAndDrawPlayer, updateMonsters } from './game.js'
import { keyPress, useKeyPress, isKeyPressed } from './input/input.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { loadLevelsAsTiles } from './level/level.js'
import { selectTileMap } from './tiles/tile.js'

function startup() {
  var body = document.body;
  body.addEventListener("touchstart", handleStart, false);
  // body.addEventListener("touchend", handleEnd, false);
  // body.addEventListener("touchcancel", handleCancel, false);
  // body.addEventListener("touchmove", handleMove, false);
}

function handleStart(evt) {
  var touch = evt.changedTouches[0]; 
  var relativeX = touch.pageX / window.screen.availWidth
  var relativeY = touch.pageY / window.screen.availHeight
  if ( relativeX < 0.15 && relativeY > 0.15 && relativeY < 0.85)
    useKeyPress({key: "a"})
  if ( relativeY < 0.15 && relativeX > 0.15 && relativeX < 0.85)
    useKeyPress({key: "w"})
  if ( relativeX > 0.85 && relativeY > 0.15 && relativeY < 0.85)
    useKeyPress({key: "d"})
  if ( relativeY > 0.85 && relativeX > 0.15 && relativeX < 0.85)
    useKeyPress({key: "s"})
}

document.addEventListener("DOMContentLoaded", startup);

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
    draw(gameBox)
    checkAndDrawPlayer(step)
   }
}

function updateCount() {
  if (count === 10 ) { 
    count = 0
    updateMonsters()
    // draw(gameBox)
  }
  count++
}

function updateStep() {
  step ++
  if (step === 3) { 
    step = 0
    update()
    // draw(gameBox)
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