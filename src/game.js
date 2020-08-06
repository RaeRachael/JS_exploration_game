let lastRenderTime = 0
const gameBox = document.getElementById('game-box')
import { updatePlayer, drawPlayer, tileBlocked, playerLocation, PLAYER_MOVEMENT_SPEED } from './player/player.js';
import { drawLevel } from './level.js';
import { getPlayerDirection, keyPress, unpressed, pressed} from './input.js';
import { tileMap } from './tiles/tile.js';


function mainLoop(currentTime) {
    const timePassedSinceRender = (currentTime - lastRenderTime)/1000
    keyPress()
    window.requestAnimationFrame(mainLoop)
    if (timePassedSinceRender < 1 / PLAYER_MOVEMENT_SPEED) return

    lastRenderTime = currentTime
    update()
    draw()
}

function update() {
    updatePlayer(getPlayerDirection(), pressed, tileMap)
    unpressed()
}

function draw() {
    gameBox.innerHTML = ""
    drawLevel(gameBox, tileMap, playerLocation)
    drawPlayer(gameBox)
}

window.requestAnimationFrame(mainLoop)