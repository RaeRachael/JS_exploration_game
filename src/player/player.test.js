import { updatePlayer, 
  drawPlayer, 
  tileBlocked, 
  playerLocation, 
  setPlayerLocation } from './player';

describe( "function tileBlocked()", function() {

  it ("returns true when looking at a blocking tile", function() {
    var tileMap = [{
      xPos: 1,
      yPos: 1,
      blocksPlayer: true,
      display: "black"
    }]
    var location = {
      x: 1,
      y: 1
    }
    expect(tileBlocked(location, tileMap)).toEqual(true)
  })

  it ("returns false when looking at a non-blocking tile", function() {
    var tileMap = [{
      xPos: 1,
      yPos: 1,
      blocksPlayer: false,
      display: "white"
    }]
    var location = {
      x: 1,
      y: 1
    }
    expect(tileBlocked(location, tileMap)).toEqual(false)
  })

})

describe( "function updatePlayer()", function() {

  describe( "tiles can be moved onto", function() {
 
    it ("moves left if 'direction was up'", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 1,
        yPos: 0,
        blocksPlayer: false,
        display: "white"
      }]
      var direction = {x:0, y:-1}
      updatePlayer(direction, true, tileMap)
      expect(playerLocation).toEqual({ x: 1, y: 0 })
    })

    it ("moves up if 'direction was left'", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 0,
        yPos: 1,
        blocksPlayer: false,
        display: "white"
      }]
      var direction = {x:-1, y:0}
      updatePlayer(direction, true, tileMap)
      expect(playerLocation).toEqual({ x: 0, y: 1 })
    })

    it ("moves down if 'direction was down'", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 1,
        yPos: 2,
        blocksPlayer: false,
        display: "white"
      }]
      var direction = {x:0, y:1}
      updatePlayer(direction, true, tileMap)
      expect(playerLocation).toEqual({ x: 1, y: 2 })
    })
    
    it ("moves right if 'direction was right'", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 2,
        yPos: 1,
        blocksPlayer: false,
        display: "white"
      }]
      var direction = {x:1, y:0}
      updatePlayer(direction, true, tileMap)
      expect(playerLocation).toEqual({ x: 2, y: 1 })
    })
  })

})