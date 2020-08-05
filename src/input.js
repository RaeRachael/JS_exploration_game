let playerDirection = { x: 0, y: 0}
let pressed = false

function getPlayerDirection() {
    return playerDirection
}

function keyPress() {
    window.addEventListener('keydown', printKey)

    // function printKey(e) {
    //     // console.log(e.key)
    //     if (e.key === "w") {
    //         playerDirection = { x: 0, y: -1 }
    //         pressed = true
    //     }
    //     if (e.key === "a") {
    //         playerDirection = { x: -1, y: 0 }
    //         pressed = true
    //     }
    //     if (e.key === "s") {
    //         playerDirection = { x: 0, y: 1 }
    //         pressed = true
    //     }
    //     if (e.key === "d") {
    //         playerDirection = { x: 1, y: 0 }
    //         pressed = true
    //     }
    // }
}

exports.getPlayerDirection = getPlayerDirection;
exports.keyPress = keyPress;