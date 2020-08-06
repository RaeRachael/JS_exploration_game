const PLAYER_MOVEMENT_SPEED = 10
var playerLocation = { x: 1, y: 1 }

function setPlayerLocation(location) {
    playerLocation = location
}

function updatePlayer(playerDirection, pressed, tileMap) {
  if (pressed === true) {
    const possibleNewlocation = {
      x: playerLocation.x + playerDirection.x,
      y: playerLocation.y + playerDirection.y
    }
    if ( tileBlocked(possibleNewlocation, tileMap) === false ) {
      playerLocation.x = possibleNewlocation.x
      playerLocation.y = possibleNewlocation.y
    }
  }
}

function tileBlocked(location, tileMap) {
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


export { drawPlayer, 
    tileBlocked, 
    updatePlayer, 
    setPlayerLocation, 
    playerLocation, 
    PLAYER_MOVEMENT_SPEED }