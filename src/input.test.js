import { getPlayerDirection, keyPress, useKeyPress, unpressed } from './input';

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

})