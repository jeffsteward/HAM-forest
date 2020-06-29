const express = require('express');
const router = express.Router();
const game = require('../models/game');

router.post('/start/:view', function(req, res, next) {
    let view = req.params.view;
    let newGame = game.create(view);
    
    res.json(newGame);
});

router.post('/:id/:view/commands', function(req, res, next) {
    let context = {
        id: req.params.id,
        view: req.params.view,
        command: req.body.command
    };

    let nextScene = game.move(context);

    res.json(nextScene);
});

module.exports = router;