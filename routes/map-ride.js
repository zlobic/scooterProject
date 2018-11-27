var express = require('express');
var router = express.Router();
var apiKey = require


const apiConfig = require('../config');
const key = apiConfig.apiKey; 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map-ride', { title: 'map-ride' , credentials: key});
});

module.exports = router;
