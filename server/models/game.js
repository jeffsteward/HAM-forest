const narrative = require('../narrative');
const loki = require('lokijs')
const nlp = require('compromise');
const slugify = require('slugify')

let db = new loki(slugify(narrative.info.title, {lower: true}));
let games = db.addCollection('games', {indices: 'id'});

const modelGame = {
    id: '',
    board: {
        currentScene: narrative.info.startScene,
        history: []
    },
    window: {
        currentScene: narrative.info.startScene,
        history: []
    }
};

const modelScene = {
    description: ''
};

function create(view) {
    let game = Object.assign({}, modelGame);

    if (view === 'board') {
        game.id = (Math.floor(new Date() / 1000)).toString(36);
        game.board.currentScene = narrative.info.startScene;
        game.window.currentScene = narrative.info.startScene; 
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
    let scene = Object.assign({}, modelScene);

    // set the default description to the game error message
    scene.description = narrative.info.error;

    // parse the command; look for the VERB 
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