let game;
let animation;
let animationTimer;
let triggerTimer;
let gameboard;
let gamewindow;
let narrative;
let prompt;
let socket = io();

document.addEventListener("DOMContentLoaded", event => { 
    //start game
    startGame().then(result => {
        game = result;

        //join the game room
        socket.emit(MessageEvents.JOIN_GAME, game);

        //initialize the game board
        gameboard = document.getElementById('gameboard');

        //initialize the narrative box
        narrative = document.getElementById('narrative');

        //initialize the game window
        gamewindow = document.getElementById('gamewindow');
        gamewindow.setAttribute('src', `/window#${game.gameID}`);

        //update the game info
        document.getElementById('title').innerText = game.info.title;
        document.getElementById('description').innerText = game.info.description;
        document.getElementById('version').innerText = `v${game.info.version}`;

        //initialize the prompt box
        prompt = document.getElementById('prompt-box');
        prompt.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                sendCommand(prompt.value);
            }
        }, false);

        //start the narrative (after a dramatic pause)
        setTimeout(updateBoard, 3000);
    });
});

async function startGame() {
    const response = await fetch(`/game/start/${GameViews.BOARD}`, {method: 'POST'});
    const start = await response.json();

    return start;
}

async function takeAction(command) {
    const body = {
        currentScene: game.scene.name,
        command: `${command}`
    };

    const response = await fetch(`/game/${game.gameID}/${GameViews.BOARD}/commands`, 
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
        // record the action in the narrative box
        let description = document.createElement('p');
        description.innerHTML = `> ${command}`;
        narrative.appendChild(description);

        // clear out the prompt box
        prompt.value = '';

        // send the action on to the game MCP
        takeAction(command).then(result => {
            game.scene = result;
            updateBoard();

            if (game.scene.sync) {
                sendMessage({action: 'scene-sync', packet: {command: command}});
            }
        });
    }
}

function sendMessage(message) {
    let data = {
        gameID: game.gameID,
        action: message.action,
        packet: message.packet
    };
    
    socket.emit(MessageEvents.TAKE_ACTION, data);
}

function updateBoard() {
    // trigger actions
    if (game.scene.trigger) {
        let trigger = game.scene.trigger;
        if (trigger.on === GameViews.BOARD) {
            if (trigger.action === TriggerTypes.FADE_OUT_AND_IN) {
                setTimeout(() => {
                    gameboard.setAttribute('style', 'animation: fade-out-in 15s ease 1 forwards');
                    gameboard.addEventListener('animationend', (e) => {
                        gameboard.removeAttribute('style');
                    })
                }, trigger.startDelay);
            }
        } else {
            triggerTimer = setTimeout(() => {
                sendMessage(trigger);
            }, trigger.startDelay);

        }
    }

    // add the description to the narrative
    if (game.scene.description) {
        let description = document.createElement('p');
        description.innerHTML = game.scene.description;
        narrative.appendChild(description);
    }

    // add the interactive to the narrative
    if (game.scene.interactive) {
        let interactiveContainer = document.createElement('p');
        let properties;
        if (game.scene.interactive.properties) {
            properties = game.scene.interactive.properties.toString();
        }

        // create an instance of the interactive
        let interactiveFactory = new Function('i', 'p', `return new ${game.scene.interactive.name}(i, p)`);
        interactiveFactory(interactiveContainer, properties);

        narrative.appendChild(interactiveContainer);
    }
    
    // scroll to the bottom of the narrative window so all new content is in view
    narrative.scrollTop = narrative.scrollHeight;

    // update the prompt
    prompt.readOnly = false;
    if (game.scene.prompt) {
        prompt.value = game.scene.prompt;
        prompt.readOnly = true;
    }
    prompt.focus();

    // update the animation
    if (animationTimer > 0) {
        clearTimeout(animationTimer);
    }
    if (typeof animation === 'object') {
        animation.remove();
    }
    if (game.scene.animation) {
        animationTimer = setTimeout(() => {
            let animationFactory = new Function(`return new p5(${game.scene.animation.name})`);
            animation = animationFactory();
        }, game.scene.animation.startDelay);
    }
}