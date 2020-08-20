let playerDirection = { x: 0, y: 1}
let pressed = false

function keyPress() {
  window.addEventListener('keydown', useKeyPress)
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

export { getPlayerDirection, keyPress, resetInput, useKeyPress, isKeyPressed}