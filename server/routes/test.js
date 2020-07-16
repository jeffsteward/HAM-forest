var express = require('express');
var router = express.Router();
var game = require('../models/game');

/* GET test animations and interactives page. */
router.get('/:view', function(req, res, next) {
  res.render('test', { title: game.getInfo().title, resources: game.getResources()[req.params.view], animation: req.query.animation, interactive: req.query.interactive, properties: req.query.properties });
});

module.exports = router;
