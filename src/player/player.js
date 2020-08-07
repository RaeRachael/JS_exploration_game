const PLAYER_MOVEMENT_SPEED = 1
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

function drawPlayer(playerDirection, step) {
  console.log(document.getElementsByClassName('player')[0], "pre")
  const playerSpace = document.getElementsByClassName('player')[0]
  console.log([playerDirection.x, playerDirection.y] == [-1, 0])
  if (playerDirection.x === -1 && playerDirection.y === 0) {
    playerSpace.id = `left-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === -1) {
    playerSpace.id = `up-${step}`
  }
  if (playerDirection.x === 1 && playerDirection.y === 0) {
    playerSpace.id = `right-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === 1) {
    playerSpace.id = `down-${step}`
  }
}


export { drawPlayer, 
    tileBlocked, 
    updatePlayer, 
    setPlayerLocation, 
    playerLocation, 
    PLAYER_MOVEMENT_SPEED }