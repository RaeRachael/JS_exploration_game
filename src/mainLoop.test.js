import { update, draw } from './game.js'
import { mainLoop } from './mainLoop.js'
import { keyPress } from './input/input.js'

jest.mock('./game.js', () => ({ 
  update: jest.fn(), 
  draw: jest.fn()
}) )
jest.mock('./input/input.js', () => ({ keyPress: jest.fn() }) )

describe( "function mainLoop()", function() {

  it( "calls keyPress, update and draw", function() {
    mainLoop()
    expect(keyPress.mock.calls.length).toBe(1)
    expect(update.mock.calls.length).toBe(1)
    expect(draw.mock.calls.length).toBe(1)
  })

})