import { step } from "../main.js";

let playerDirection = { x: 0, y: 1}
let keyPressed = ""
let pressed = false

function setupInput(){
  document.body.addEventListener("touchstart", touchScreenPress, false)
  document.body.addEventListener("touchend", touchScreenPressEnd, false)
  window.addEventListener('keydown', useKeyPress)
  window.addEventListener('keyup', keyUp)
}

function touchScreenPress(evt) {
  var touch = evt.changedTouches[0]; 
  var relativeX = touch.pageX / window.screen.availWidth
  var relativeY = touch.pageY / window.screen.availHeight
  if ( relativeY < 0.15 && relativeX > 0.15 && relativeX < 0.85)
    useKeyPress({ key: "w" })
  if ( relativeX < 0.15 && relativeY > 0.15 && relativeY < 0.85)
    useKeyPress({ key: "a" })
  if ( relativeY > 0.85 && relativeX > 0.15 && relativeX < 0.85)
    useKeyPress({ key: "s" })
  if ( relativeX > 0.85 && relativeY > 0.15 && relativeY < 0.85)
    useKeyPress({ key: "d" }) 
}

function touchScreenPressEnd(evt){
  var touch = evt.changedTouches[0]; 
  var relativeX = touch.pageX / window.screen.availWidth
  var relativeY = touch.pageY / window.screen.availHeight
  if ( relativeY < 0.15 && relativeX > 0.15 && relativeX < 0.85)
    keyUp({ key: "w" })
  if ( relativeX < 0.15 && relativeY > 0.15 && relativeY < 0.85)
    keyUp({ key: "a" })
  if ( relativeY > 0.85 && relativeX > 0.15 && relativeX < 0.85)
    keyUp({ key: "s" })
  if ( relativeX > 0.85 && relativeY > 0.15 && relativeY < 0.85)
    keyUp({ key: "d" })
}

function useKeyPress(e) {
  console.log(e, "key")
  if ( pressed === false || (keyPressed !== e.key && step === 0) ) {
    if ( keyPressed !== e.key ){
      keyPressed =  e.key
    }
    if (e.key === "w" || e.key === "ArrowUp") {
      processKeyPress(0, -1)
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
      processKeyPress(-1, 0)
    }
    if (e.key === "s" || e.key === "ArrowDown") {
      processKeyPress(0, 1) 
    }
    if (e.key === "d" || e.key === "ArrowRight") {
      processKeyPress(1, 0) 
    }
  }
}

function getPlayerDirection() {
  return playerDirection
}

function isKeyPressed() {
  return pressed
}

function processKeyPress(x, y) {
  playerDirection = { x: x, y: y } 
  pressed = true
}

function keyUp(e) {
  if (keyPressed === e.key) {
    keyPressed = ""
  }
}

function resetInput() {
  if (keyPressed === "")
    pressed = false
}

export { getPlayerDirection, setupInput, resetInput, useKeyPress, touchScreenPress, isKeyPressed, keyUp}