const narrative = require('../narrative');
const loki = require('lokijs')

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
    
    let scene = {};

    // check if the command is a general game command
    if (context.command in narrative.commands[context.view]) {
        
    } else {
        // load current scene info
        let currentSceneName = game[context.view].currentScene;
        let currentScene = narrative.scenes[context.view][currentSceneName];

        // check if the command applies to the scene
        if (context.command in currentScene.commands) {
            let action = currentScene.commands[context.command];

            if (action.destination) {
                scene = narrative.scenes[context.view][action.destination];
                game[context.view].currentScene = scene.name;
            } else {
                scene = action;
                // do we need to save progress here? 
            }

            // update the game state
            games.update(game);

        }  else {
            scene = {
                name: 'error',
                description: 'I don\'t understand.',
                prompt: ''
            };
        }     
    }

    return scene;
}

module.exports = {
    create: create,
    findById: findById,
    move: move
};