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
        const offsetTileY = tile.yPos - player.y
        const offsetTileX = tile.xPos - player.x
        if (offsetTileY > -3 && offsetTileY < 3 && offsetTileX > -3 && offsetTileX < 3) {
            const tileDisplay = document.createElement('div')
            tileDisplay.style.gridRowStart = tile.yPos - player.y + 3
            tileDisplay.style.gridColumnStart = tile.xPos - player.x + 3
            tileDisplay.style.backgroundColor = tile.display
            gameBox.appendChild(tileDisplay)
        }
    });
}