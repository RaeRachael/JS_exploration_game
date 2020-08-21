import { turnIntoTiles, createTile } from './tile.js';
import { addMonster } from '../monster/monster.js';

jest.mock('../monster/monster.js', () => ({ addMonster: jest.fn() }) )

describe( 'function createTile()', function() {

  describe( 'tile types', function() {

    it( "creates a wall when '-' entered", function() {
      expect( createTile("-", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: true,
        display: "black",
        text: ""
      })
    })

    it( "creates a floor when ' ' entered", function() {
      expect( createTile(" ", 1, 1) ).toEqual({
          xPos: 1,
          yPos: 1,
          blocksPlayer: false,
          display: "white",
          text: ""
      })
    })

    it( "creates a stair up when 'S' entered", function() {
      expect( createTile("S", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "yellow",
        levelChange: 1,
        text: "up"
      })
    })

    it( "creates a stair up when 'D' entered", function() {
      expect( createTile("D", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "yellow",
        levelChange: -1,
        text: "down"
      })
    })

    it( "creates a locked door when '|' entered", function() {
      expect( createTile("|", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: true,
        display: "brown",
        text: "locked"
      })
    })

    it( "creates a Floor plus key when 'k' entered", function() {
      expect( createTile("k", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "white",
        text: "key"
      })
    })

    it( "creates a Floor by defualt", function() {
      expect( createTile("wrefegrgsre", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "white",
        text: ""
      })
    })

    it( "calls addMonster for a monster tile, and returns a Floor", function() {
      expect( createTile("X", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "white",
        text: ""
      })
      expect(addMonster.mock.calls.length).toBe(1)
    })

  })

  describe( 'tiles made at correct location' , function() {

    it( 'create a tile at 2,2', function() {
      expect( createTile("-", 2, 2) ).toEqual({
        xPos: 2,
        yPos: 2,
        blocksPlayer: true,
        display: "black",
        text: ""
      })
    })

  })

})

describe( 'function turnIntoTiles()', function() {

  var levelData = [" -","DS"]
  var expectedOutput = [{
    xPos: 0,
    yPos: 0,
    blocksPlayer: false,
    display: "white",
    text: ""
  },{
    xPos: 1,
    yPos: 0,
    blocksPlayer: true,
    display: "black",
    text: ""
  },{
    xPos: 0,
    yPos: 1,
    blocksPlayer: false,
    display: "yellow",
    levelChange: -1,
    text: "down"
  },{
    xPos: 1,
    yPos: 1,
    blocksPlayer: false,
    display: "yellow",
    levelChange: 1,
    text: "up"
  }]

  it( 'returns an array of tile on the level', function() {
    expect( turnIntoTiles(levelData)).toEqual(expectedOutput)
  })
})

