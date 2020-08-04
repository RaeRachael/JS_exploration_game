
var tileMap = []

function turnIntoTiles(levelData) {
    for (var y = 0; y < levelData.length; y ++) {
        for ( var x = 0; x <levelData[0].length; x ++) {
            tileMap.push(singleTile(levelData[y][x], x, y))
        }
    }
    console.log(tileMap)
}

function singleTile(string, x, y) {
    switch(string) {
        case "-":
            return {
                xPos: x,
                yPos: y,
                blocksPlayer: true,
                display: "black"
            }
        case " ":
            return {
                xPos: x,
                yPos: y,
                blocksPlayer: false,
                display: "white"
            }
        case "S":
            return {
                xPos: x,
                yPos: y,
                blocksPlayer: false,
                display: "yellow"
            }
        default:
            // code block
    }
}

exports.singleTile = singleTile;
exports.turnIntoTiles = turnIntoTiles;