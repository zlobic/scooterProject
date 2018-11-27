var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map-ride', { title: 'map-ride' });
});

module.exports = router;
