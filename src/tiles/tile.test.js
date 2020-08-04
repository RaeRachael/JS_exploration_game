const { turnIntoTiles, singleTile } = require('./tile');
// const { TestResult } = require('@jest/types');
// const { exportAllDeclaration } = require('@babel/types');

console.log( singleTile )

describe( 'function turnIntoTiles', function() {

  test( "creates a wall when '-' entered", function() {
    expect( singleTile("-", 1, 1) ).toEqual({
      xPos: 1,
      yPos: 1,
      blocksPlayer: true,
      display: "black"
    })
  })

})