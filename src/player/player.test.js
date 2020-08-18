/**
 * @jest-environment jsdom
 */

import { updatePlayer, 
  drawPlayer, 
  isTileBlocking,
  checkBlocked, 
  playerLocation, 
  setPlayerLocation,
  checkMonster } from './player';
import { setLevelNumber, getLevelNumber } from '../level/level.js'
import { isMonsterThere } from '../monster/monster.js'

jest.mock('../level/level.js', () => ({ 
  setLevelNumber: jest.fn(),
  getLevelNumber: jest.fn()
 }) )
 jest.mock('../monster/monster.js', () => ({
  isMonsterThere: jest.fn()
 }) )

describe( "function isTileBlocking()", function() {

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
    expect(isTileBlocking(location, tileMap)).toEqual(true)
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
    expect(isTileBlocking(location, tileMap)).toEqual(false)
  })

})

describe( "function checkBlocked()", function() {

  it ("returns true when looking at a blocking tile", function() {
    setPlayerLocation({ x: 1, y: 1 })
    var tileMap = [{
      xPos: 1,
      yPos: 0,
      blocksPlayer: true,
      display: "white"
    }]
    var direction = { x:0, y:-1 }
    expect(checkBlocked(direction, tileMap)).toEqual(true)
  })

  it ("returns false when looking at a non-blocking tile", function() {
    setPlayerLocation({ x: 1, y: 1 })
    var tileMap = [{
      xPos: 1,
      yPos: 0,
      blocksPlayer: false,
      display: "white"
    }]
    var direction = { x:0, y:-1 }
    expect(checkBlocked(direction, tileMap)).toEqual(false)
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

  describe( "player can't move onto a blocked tile", function() {

    it ("location doesn't change", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 2,
        yPos: 1,
        blocksPlayer: true,
        display: "black"
      }]
      var direction = {x:1, y:0}
      updatePlayer(direction, true, tileMap)
      expect(playerLocation).toEqual({ x: 1, y: 1 })
    })

  })

  describe( "player doesn't move if key is not pressed", function() {

    it ("location doesn't change", function() {
      setPlayerLocation({ x: 1, y: 1 })
      var tileMap = [{
        xPos: 2,
        yPos: 1,
        blocksPlayer: false,
        display: "white"
      }]
      var direction = {x:1, y:0}
      updatePlayer(direction, false, tileMap)
      expect(playerLocation).toEqual({ x: 1, y: 1 })
    })

  })

})

describe( "function drawPlayer()", function() {

  describe( "playerSpace has the correct class codes for css display", function() {

    document.body.innerHTML = '<div id="player" />';
    let playerSpace = document.getElementById("player")

    describe( "should look in the direction of most recent key press", function() {

      it( "faces up", function() {
        drawPlayer({ x: 0, y: -1 }, 1)
        expect(playerSpace.classList[0]).toEqual("up")
      })

      it( "faces left", function() {
        drawPlayer({ x: -1, y: 0 }, 1)
        expect(playerSpace.classList[0]).toEqual("left")
      })

      it( "faces down", function() {
        drawPlayer({ x: 0, y: 1 }, 1)
        expect(playerSpace.classList[0]).toEqual("down")
      })

      it( "faces right", function() {
        drawPlayer({ x: 1, y: 0 }, 1)
        expect(playerSpace.classList[0]).toEqual("right")
      })

    })

    describe( "should be on the correct step", function() {

      it( "on step 1", function() {
        drawPlayer({ x: 0, y: -1 }, 1)
        expect(playerSpace.classList[1]).toEqual("step-1")
      })

      it( "on step 2", function() {
        drawPlayer({ x: 0, y: -1 }, 2)
        expect(playerSpace.classList[1]).toEqual("step-2")
      })

      it( "on step 3", function() {
        drawPlayer({ x: 0, y: -1 }, 3)
        expect(playerSpace.classList[1]).toEqual("step-3")
      })

    })

  })

})

describe( "function interactionWithTile()", function() {

  it ("stepping onto stairs make up incease levelNumber", function() {
    setPlayerLocation({ x: 1, y: 1 })
    var tileMap = [{
      xPos: 2,
      yPos: 1,
      blocksPlayer: false,
      display: "yellow",
      levelChange: 1
    }]
    var direction = {x:1, y:0}
    getLevelNumber.mockReturnValueOnce(0)
    updatePlayer(direction, true, tileMap)
    expect(setLevelNumber.mock.calls[0]).toEqual([1])
  })

})

describe( "function checkMonster", function() {
  it( "calls isMonsterThere", function() {
    checkMonster({ x: 0, y: 1 })
    expect(isMonsterThere.mock.calls.length).toBe(1)
  })
})