const level = ["-----------",
"- -       -",
"- - ----- -",
"- - -     -",
"- - - -----",
"-   -    S-",
"-----------"]

turnIntoTiles(level)

function drawLevel(gameBox, tileMap, player) {
    tileMap.forEach(tile => {
        const tileDisplay = document.createElement('div')
        tileDisplay.style.gridRowStart = tile.yPos - player.y + 3
        tileDisplay.style.gridColumnStart = tile.xPos - player.x + 3
        tileDisplay.style.backgroundColor = tile.display
        gameBox.appendChild(tileDisplay)
    });
}