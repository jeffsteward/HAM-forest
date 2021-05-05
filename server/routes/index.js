var express = require('express');
var router = express.Router();
var game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `${game.getInfo().title}: Game Board`, resources: game.getResources().board, language: game.getInfo().language });
});

/* GET game window page. */
router.get('/window', function(req, res, next) {
  res.render('window', { title: `${game.getInfo().title}: Game Window`, resources: game.getResources().window, language: game.getInfo().language });
});

module.exports = router;
