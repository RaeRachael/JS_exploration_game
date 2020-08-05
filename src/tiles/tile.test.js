const { turnIntoTiles, singleTile } = require('./tile');

// describe( 'function singleTile()', function() {

  // describe( 'tile types', function() {

    test( "creates a wall when '-' entered", function() {
      expect( singleTile("-", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: true,
        display: "black"
      })
    })

    test( "creates a floor when ' ' entered", function() {
      expect( singleTile(" ", 1, 1) ).toEqual({
          xPos: 1,
          yPos: 1,
          blocksPlayer: false,
          display: "white"
      })
    })

    test( "creates a stair up when 'S' entered", function() {
      expect( singleTile("S", 1, 1) ).toEqual({
        xPos: 1,
        yPos: 1,
        blocksPlayer: false,
        display: "yellow"
      })
    })
  // })

  // context( 'tiles made at correct location' , function() {
    test( 'create a tile at 2,2', function() {
      expect( singleTile("-", 2, 2) ).toEqual({
        xPos: 2,
        yPos: 2,
        blocksPlayer: true,
        display: "black"
      })
    })
  // })

// })