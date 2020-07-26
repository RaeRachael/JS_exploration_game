const PLAYER_MOVEMENT_SPEED = 5
const playerLocation = { x: 3, y: 3 }

function updatePlayer() {
    const playerDirection = getPlayerDirection()

    if (pressed === true) {
        console.log(pressed)
        playerLocation.x += playerDirection.x
        playerLocation.y += playerDirection.y
        console.log(playerLocation)
    }
}

function drawPlayer(gameBox) {
    const playerSpace = document.createElement('div')
    playerSpace.style.gridRowStart = playerLocation.y
    playerSpace.style.gridColumnStart = playerLocation.x
    playerSpace.classList.add('player')
    gameBox.appendChild(playerSpace)
}