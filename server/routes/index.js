var express = require('express');
var router = express.Router();
var narrative = require('../narrative');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: narrative.info.title, resources: narrative.resources.gameBoard });
});

/* GET game window page. */
router.get('/window', function(req, res, next) {
  res.render('window', { title: narrative.info.title, resources: narrative.resources.gameWindow });
});

module.exports = router;
