const express = require('express');
const router = express.Router();
const apiKey = require
const bodyParser = require('body-parser');
const urlcodeParser = bodyParser.urlencoded({ extended: false});
const axios = require('axios');

const apiConfig = require('../config');
const key = apiConfig.apiKey; 

const url = "mongodb://localhost/video";
mongoose.connect('mongodb://localhost/scooter')

require(__dirname + '/../models/rides')
const Movie = mongoose.model('rides')

var rides = require('../models/rides');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map-ride', { title: 'map-ride' , credentials: key});
});

// app.post to request rides
router.post("/", urlcodeParser, (req, res) => {
 rides.create({
    originGeoCode: req.body.data.originGeoCode,
    destinationGeoCode: req.body.data.destinationGeoCode,
    originAdress: req.body.data.originAdress,
    destinationAdress: req.body.data.destinationAdress,
    travelDistance: req.body.data.travelDistance,
    travelDuration: req.body.data.travelDuration,
    priceOfRide: req.body.data.priceOfRide
  })
  .then((result)=>{
  console.log(result)
  })
  .catch((err)=>{
    if (err) console.log("Error: " + err)
  })
    });

module.exports = router;
