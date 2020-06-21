const express = require('express');
const router = express.Router();
const narrative = require('../narrative');

const model = {
    gameID: '',
    title: '',
    scene: ''
};

router.post('/start/:view', function(req, res, next) {
    let view = req.params.view;
    let game = model;
    
    if (req.params.view === 'gameBoard') {
        game.gameID = (Math.floor(new Date() / 1000)).toString(36);
    }
    
    game.info = narrative.info;
    game.scene = narrative.scenes[view].intro;

    res.json(game);
});

router.post('/:id/commands/:view', function(req, res, next) {
    let view = req.params.view;
    let command = req.body.command;

    res.json(narrative.scenes[view][command]);
});

module.exports = router;