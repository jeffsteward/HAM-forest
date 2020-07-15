const narrative = require('../narrative');
const loki = require('lokijs')
const nlp = require('compromise');

let db = new loki('art-forest');
let games = db.addCollection('games', {indices: 'id'});

const model = {
    id: '',
    board: {
        currentScene: 'intro',
        history: []
    },
    window: {
        currentScene: 'intro',
        history: []
    }
};

function create(view) {
    let game = Object.assign({}, model);

    if (view === 'board') {
        game.id = (Math.floor(new Date() / 1000)).toString(36);
        game.board.currentScene = 'intro';
        game.window.currentScene = 'intro'; 
        games.insert(game);
    }

    return {
        gameID: game.id,
        info: narrative.info,
        scene: narrative.scenes[view][game.board.currentScene]
    };
}

function findById(id) {
    return games.find({id: id})[0];    
}

function move(context) {
    let game = this.findById(context.id);

    // add the command to the running game history 
    game[context.view].history.push(context.command);
    games.update(game);

    // start building the scene
    // assume the command is invalid until proven otherwise
    let scene = {
        description: narrative.info.error
    };

    let command = nlp(context.command);
    let verb = command.firstTerms().text();

    // check if the command is a general game command
    if (narrative.commands[context.view].includes(context.command )) {
        scene.description = narrative.info[context.command];

    } else {
        // load current scene info
        let currentSceneName = game[context.view].currentScene;
        let currentScene = narrative.scenes[context.view][currentSceneName];

        // check if the command applies to the scene
        if (verb in currentScene.commands) {
            let currentSceneCommand = currentScene.commands[verb];
            let targets = currentSceneCommand.targets;
            let matchList = Object.keys(targets);
            let targetName = '';

            if (matchList.toString() === '*') {
                targetName = matchList.toString();
            } else {
                targetName = command.lookup(matchList).text();
            }

            if (targetName !== "") {
                let action = targets[targetName];

                if (action.destination) {
                    scene = narrative.scenes[context.view][action.destination];
                    game[context.view].currentScene = scene.name;
                } else {
                    scene = action;
                    // do we need to save progress here? 
                }
            }

            // update the game state
            games.update(game);

        }    
    }

    return scene;
}

module.exports = {
    create: create,
    findById: findById,
    move: move
};