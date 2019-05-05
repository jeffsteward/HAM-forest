var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Art Forest' });
});

router.get('/forest', function(req, res, next) {
  res.render('forest', { title: 'Art Forest | The Forest' });
});

router.get('/controller', function(req, res, next) {
  res.render('controller', { title: 'Controller | The Forest' });
});

module.exports = router;
