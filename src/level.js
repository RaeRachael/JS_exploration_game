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
        tileDisplay.style.gridRowStart = tile.yPos
        tileDisplay.style.gridColumnStart = tile.xPos
        tileDisplay.style.backgroundColor = tile.display
        gameBox.appendChild(tileDisplay)
    });
}