const GAMEWINDOW = 'gameWindow';
let game = {};
let animation;
let socket = io();

document.addEventListener("DOMContentLoaded", event => { 
    //start game
    startGame().then(result => {
        game = result;    

        //join the game room
        game.gameID = window.location.hash.replace("#","");
        if (game.gameID) {
            socket.emit("join-game", {gameID: game.gameID});
        }

        updateWindow();
    });
});

async function startGame() {
    const response = await fetch(`/game/start/${GAMEWINDOW}`, {method: 'POST'});
    const start = await response.json();

    return start;
}

function updateWindow() {
    // update the animation
    if (typeof animation === 'object') {
        animation.remove();
    }
    if (game.scene.animation) {
        setTimeout(() => {
            let animationFactory = new Function(`return new p5(${game.scene.animation.name})`);
            animation = animationFactory();
        }, game.scene.animation.startDelay);
    }
}