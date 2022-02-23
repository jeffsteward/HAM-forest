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
            socket.emit(MessageEvents.JOIN_GAME, {gameID: game.gameID});
        }

        updateWindow();
    });

    socket.on('scene-sync', data => sendCommand(data.command));
});

async function startGame() {
    const response = await fetch(`/game/start/${GameViews.WINDOW}`, {method: 'POST'});
    const start = await response.json();

    return start;
}

async function takeAction(command) {
    const body = {
        currentScene: game.scene.name,
        command: `${command}`
    };

    const response = await fetch(`/game/${game.gameID}/${GameViews.WINDOW}/commands`, 
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    const scene = await response.json();

    return scene;
}

function sendCommand(command) {
    if (command !== '') {
        // send the action on to the game MCP
        takeAction(command).then(result => {
            game.scene = result;
            updateWindow();
        });
    }
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