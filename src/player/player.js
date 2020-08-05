const PLAYER_MOVEMENT_SPEED = 10
const playerLocation = { x: 1, y: 1 }

function updatePlayer() {
    const playerDirection = getPlayerDirection()

    if (pressed === true) {
        const possibleNewlocation = {
            x: playerLocation.x + playerDirection.x,
            y: playerLocation.y + playerDirection.y
        }
        if ( tileBlocked(possibleNewlocation) === false ) {
            playerLocation.x = possibleNewlocation.x
            playerLocation.y = possibleNewlocation.y
            console.log(playerLocation)
        }
    }
}

function tileBlocked(location) {
    var output
    tileMap.forEach(function(tile) {
        if (tile.xPos === location.x && tile.yPos === location.y) {
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


exports.drawPlayer = drawPlayer;
exports.tileBlocked = tileBlocked;
exports.updatePlayer = updatePlayer;