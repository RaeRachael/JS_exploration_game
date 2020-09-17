import { getPlayerDirection, keyUp, useKeyPress, resetInput, isKeyPressed} from './input';

describe( 'function useKeyPress()', function() {

  describe( 'direction changes in response to a WASD key press', function() {

    it( "points up in response to 'w'", function() {
      resetInput()
      useKeyPress({ key: "w" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: -1 })
    })

    it( "points left in response to 'a'", function() {
      resetInput()
      useKeyPress({ key: "a" })
      expect(getPlayerDirection()).toEqual({ x: -1, y: 0 })
    })

    it( "points down in response to 's'", function() {
      resetInput()
      useKeyPress({ key: "s" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: 1 })
    })

    it( "points right in response to 'd'", function() {
      resetInput()
      useKeyPress({ key: "d" })
      expect(getPlayerDirection()).toEqual({ x: 1, y: 0 })
    })

  })

  describe( 'direction changes in response to an arrow key press', function() {

    it( "points up in response to 'up'", function() {
      resetInput()
      useKeyPress({ key: "ArrowUp" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: -1 })
    })

    it( "points left in response to 'left'", function() {
      resetInput()
      useKeyPress({ key: "ArrowLeft" })
      expect(getPlayerDirection()).toEqual({ x: -1, y: 0 })
    })

    it( "points down in response to 'down'", function() {
      resetInput()
      useKeyPress({ key: "ArrowDown" })
      expect(getPlayerDirection()).toEqual({ x: 0, y: 1 })
    })

    it( "points right in response to 'right'", function() {
      resetInput()
      useKeyPress({ key: "ArrowRight" })
      expect(getPlayerDirection()).toEqual({ x: 1, y: 0 })
    })

  })

})

describe( "function resetInput", function() {

  it( "makes pressed false", function() {
    useKeyPress({ key: "a" })
    keyUp({ key: "a" })
    resetInput()
    expect(isKeyPressed()).toEqual(false)
  })

})