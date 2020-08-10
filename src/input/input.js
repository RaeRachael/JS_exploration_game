let playerDirection = { x: 0, y: 1}
let pressed = false
let walk = false

function getPlayerDirection() {
  return playerDirection
}

function keyPress() {
  window.addEventListener('keydown', useKeyPress)
}

function useKeyPress(e) {
  if (e.key === "w") {
    processKeyPress(0, -1, getPlayerDirection())
  }
  if (e.key === "a") {
    processKeyPress(-1, 0, getPlayerDirection())
  }
  if (e.key === "s") {
    processKeyPress(0, 1, getPlayerDirection()) 
  }
  if (e.key === "d") {
    processKeyPress(1, 0, getPlayerDirection()) 
  }
}

function processKeyPress(x, y, oldDirection) {
  if ( pressed === false ) { playerDirection = { x: x, y: y } }
  pressed = true
  if (playerDirection.x === oldDirection.x && playerDirection.y === oldDirection.y) { 
    walk = true 
  }
}


function resetInput() {
  pressed = false
  walk = false
}

export { getPlayerDirection, keyPress, resetInput, useKeyPress, pressed, walk}