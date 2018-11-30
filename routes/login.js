var express = require("express"),
router = express.Router()
const bcrypt = require('bcrypt');

var Driver  = require('../models/driver')
var Drinker  = require('../models/drinker')

router.get("/", (req,res) => {
  res.render("login")
})

router.post("/loginDriver", (req,res) => {
  Driver.find({email: req.body.email}, function(err, Driver){
    if (Driver.length > 0) {
      if (Driver[0].isVerified != true) { 
        return res.render("emailNotVer")
      }
      else {
        debugger
        var password = req.body.password;
       debugger
          bcrypt.compare(password, Driver[0].password).then((match) => {
            if (match){
              debugger
            res.render("indexDriver", {loggedDriver: true});
            res.cookie('loggedIn', 'true', {signed: true});
            res.cookie('email', Driver[0].email)}
          else{
            debugger
            console.log("Wrong password")
            res.render("wrongCredentials")
          }
        })
      }
    }
    else{ 
      debugger
      console.log("No such driver exists")
      res.render("emailNotExist")
    }
  })
})

router.post("/loginDrinker", (req,res) => {
  Drinker.find({email: req.body.email}, function(err, Drinker){
    if (Drinker.length > 0) {
      if (Drinker[0].isVerified != true) { 
        return res.render("emailNotVer")
      }
      else {
        debugger
        var password = req.body.password;
       debugger
          bcrypt.compare(password, Drinker[0].password).then((match) => {
            if (match){
              debugger
            res.render("indexDrinker", {loggedDrinker: true});
            res.cookie('loggedIn', 'true', {signed: true});
            res.cookie('email', Driver[0].email)}
          else{
            debugger
            console.log("Wrong password")
            res.render("wrongCredentials")
          }
        })
      }
    }
    else{ 
      debugger
      console.log("No such drinker exists")
      res.render("emailNotExist")
    }
  })
})

module.exports = router ;
