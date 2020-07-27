let lastRenderTime = 0
const gameBox = document.getElementById('game-box')


function mainLoop(currentTime) {
    const timePassedSinceRender = (currentTime - lastRenderTime)/1000
    KeyPress()
    window.requestAnimationFrame(mainLoop)

    if (timePassedSinceRender < 1 / PLAYER_MOVEMENT_SPEED) return

    lastRenderTime = currentTime


    update()
    draw()
}

function update() {
    // console.log("update")
    updatePlayer()
    pressed = false
}

function draw() {
    gameBox.innerHTML = ""
    // console.log("draw")
    drawLevel(gameBox, tileMap, playerLocation)
    drawPlayer(gameBox)
}

window.requestAnimationFrame(mainLoop)