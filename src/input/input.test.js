import { getPlayerDirection, keyPress, useKeyPress, resetInput, pressed, walk } from './input';

describe( 'function useKeyPress()', function() {

  describe( 'direction changes in response to a key press', function() {

    it( "points up in response to 'w'", function() {
      useKeyPress({ key: "w" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: -1 })
    })

    it( "points left in response to 'a'", function() {
      useKeyPress({ key: "a" })
      expect(getPlayerDirection()).toEqual({ x: -1, y: 0 })
    })

    it( "points down in response to 's'", function() {
      useKeyPress({ key: "s" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: 1 })
    })

    it( "points right in response to 'd'", function() {
      useKeyPress({ key: "d" })
      expect(getPlayerDirection()).toEqual({ x: 1, y: 0 })
    })

  })

  describe( 'walk property', function() {
    it( "walk is true if current direction is called", function() {
      useKeyPress({ key: "a" })
      useKeyPress({ key: "a" })
      expect(walk).toEqual(true)
    })

  })

})

describe( "function resetInput", function() {

  it( "makes pressed false", function() {
    useKeyPress({ key: "a" })
    resetInput()
    expect(pressed).toEqual(false)
  })

  it( "makes walk false", function() {
    useKeyPress({ key: "a" })
    useKeyPress({ key: "a" })
    resetInput()
    expect(walk).toEqual(false)
  })

})