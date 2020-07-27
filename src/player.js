const PLAYER_MOVEMENT_SPEED = 10
const playerLocation = { x: 1, y: 1 }

function updatePlayer() {
    const playerDirection = getPlayerDirection()

    if (pressed === true) {
        console.log(pressed)
        const possibleNewlocation = {
            x: playerLocation.x + playerDirection.x,
            y: playerLocation.y + playerDirection.y
        }
        console.log( tileBlocked(possibleNewlocation), "print" )
        if ( tileBlocked(possibleNewlocation) === false ) {
            console.log( tileBlocked(possibleNewlocation), "print" )
            playerLocation.x = possibleNewlocation.x
            playerLocation.y = possibleNewlocation.y
            console.log(playerLocation)
        }
    }
}

function tileBlocked(location) {
    console.log(location, "blocked")
    var output
    tileMap.forEach(function(tile) {
        if (tile.xPos === location.x && tile.yPos === location.y) {
            console.log(tile, "selected")
            output = tile.blocksPlayer
        }
    });
    return output
}

function drawPlayer(gameBox) {
    const playerSpace = document.createElement('div')
    playerSpace.style.gridRowStart = 3
    playerSpace.style.gridColumnStart = 3
    playerSpace.classList.add('player')
    gameBox.appendChild(playerSpace)
}