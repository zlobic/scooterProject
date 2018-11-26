
var express = require("express"),
router = express.Router()
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

var Drinker = require('../models/drinker')


router.post("/", (req,res) => {
  Drinker.find({email: req.body.email})
  .then((result) => {
    if (result.length > 0) {
      var password = req.body.password;
      bcrypt.compare(password, result[0].password)
      .then((match) => {
        if (match){
          res.cookie('loggedIn', 'true', {signed: true});
          res.cookie('email', result[0].email,{signed: true})
          res.render("indexDrinker");
          // HIER GEOCODING 
        }
        else res.render("wrongCredentials")
      })
      .catch((err)=>{
        if (err) console.log("Bcrypt Error or Internal Code Error:" + err) 
      })
    } 
    else res.render("usernameFail")
  }) 
  .catch((err) => {
    if (err) console.log("Error:" + err)
  })
})

module.exports = router