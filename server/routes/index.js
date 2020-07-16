var express = require('express');
var router = express.Router();
var game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: game.getInfo().title, resources: game.getResources().board });
});

/* GET game window page. */
router.get('/window', function(req, res, next) {
  res.render('window', { title: game.getInfo().title, resources: game.getResources().window });
});

module.exports = router;
