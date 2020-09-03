let playerDirection = { x: 0, y: 1}
let pressed = false

function setupInput(){
  document.body.addEventListener("touchstart", touchScreenPress, false);
  window.addEventListener('keydown', useKeyPress)
}

function touchScreenPress(evt) {
  var touch = evt.changedTouches[0]; 
  var relativeX = touch.pageX / window.screen.availWidth
  var relativeY = touch.pageY / window.screen.availHeight
  if ( relativeY < 0.15 && relativeX > 0.15 && relativeX < 0.85)
    processKeyPress(0, -1)
  if ( relativeX < 0.15 && relativeY > 0.15 && relativeY < 0.85)
    processKeyPress(-1, 0)
  if ( relativeY > 0.85 && relativeX > 0.15 && relativeX < 0.85)
    processKeyPress(0, 1) 
  if ( relativeX > 0.85 && relativeY > 0.15 && relativeY < 0.85)
    processKeyPress(1, 0) 
}

function useKeyPress(e) {
  if (e.key === "w") {
    processKeyPress(0, -1)
  }
  if (e.key === "a") {
    processKeyPress(-1, 0)
  }
  if (e.key === "s") {
    processKeyPress(0, 1) 
  }
  if (e.key === "d") {
    processKeyPress(1, 0) 
  }
}

function getPlayerDirection() {
  return playerDirection
}

function isKeyPressed() {
  return pressed
}

function processKeyPress(x, y) {
  if ( pressed === false ) { playerDirection = { x: x, y: y } }
  pressed = true
}

function resetInput() {
  pressed = false
}

export { getPlayerDirection, setupInput, resetInput, useKeyPress, touchScreenPress, isKeyPressed}