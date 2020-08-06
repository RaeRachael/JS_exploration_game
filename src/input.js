let playerDirection = { x: 0, y: 0}
let pressed = false

function getPlayerDirection() {
  return playerDirection
}

function keyPress() {
  window.addEventListener('keydown', useKeyPress)
}

function useKeyPress(e) {
// console.log(e.key)
  if (e.key === "w") {
    playerDirection = { x: 0, y: -1 }
    pressed = true
  }
  if (e.key === "a") {
    playerDirection = { x: -1, y: 0 }
    pressed = true
  }
  if (e.key === "s") {
    playerDirection = { x: 0, y: 1 }
    pressed = true
  }
  if (e.key === "d") {
    playerDirection = { x: 1, y: 0 }
    pressed = true
  }
}


function unpressed() {
  pressed = false
}

export { getPlayerDirection, keyPress, unpressed, useKeyPress, pressed}