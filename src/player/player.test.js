import { updatePlayer, drawPlayer, tileBlocked } from './player';

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