const PLAYER_MOVEMENT_SPEED = 5
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

function checkBlocked(playerDirection, tileMap){
  const possibleNewlocation = {
    x: playerLocation.x + playerDirection.x,
    y: playerLocation.y + playerDirection.y
  }
  return tileBlocked(possibleNewlocation, tileMap)
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

function drawPlayer(playerDirection, step) {
  const playerSpace = document.getElementById('player')
  if (playerDirection.x === -1 && playerDirection.y === 0) {
    playerSpace.className = `left step-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === -1) {
    playerSpace.className = `up step-${step}`
  }
  if (playerDirection.x === 1 && playerDirection.y === 0) {
    playerSpace.className = `right step-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === 1) {
    playerSpace.className = `down step-${step}`
  }
}


export { drawPlayer, 
    tileBlocked, 
    updatePlayer, 
    setPlayerLocation,
    checkBlocked, 
    playerLocation, 
    PLAYER_MOVEMENT_SPEED }