var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Art Forest' });
});

router.get('/field', function(req, res, next) {
  res.render('forest', { layout: 'forest-layout', title: 'Art Forest | The Open Field' });
});

router.get('/controller', function(req, res, next) {
  res.render('controller', { layout: 'controller-layout', title: 'Art Forest | The Grafting Bench' });
});

module.exports = router;
