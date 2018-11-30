var express = require('express')
var router = express.Router();

Driver = require("../models/driver")
tokenDriver = require("../models/tokenDriver")

Drinker = require("../models/drinker")
tokenDrinker = require("../models/tokenDrinker")

router.post('/confirmationDriver', (req,res) => {
  tokenDriver.findOne({ token: req.body.token })
  .then((result)=> {
    if (result.token.length < 0){ console.log(" No token found")
      res.render("linkNotValid")
    }
    else { 
      Driver.findOne({ _id: result._userId}, function(err, Driver) {
        if (result.id.length > 0){
          if (result.isVerified) {
            console.log("This driver is already verified")
            res.render("login")
          } 
          else {
            Driver.isVerified =  true; 
            debugger
            Driver.save(function (err) {
              if (err) { console.log("Error: " + err)
              }
            })
            console.log("The account has been verified. Please log in.")
            res.render("login")
          }
        } 
        else {console.log("There's no such user with this ID")
        }
      })
    }
  })
  .catch((err)=>{
    console.log("Error: " + err); 
  })
})

router.post('/confirmationDrinker', (req,res) => {
  tokenDrinker.findOne({ token: req.body.token })
  .then((result)=> {
    
    if (result.token.length < 0){ console.log(" No token found")
      res.render("linkNotValid")
    }
    else { 
      Drinker.findOne({ _id: result._userId}, function(err, Drinker) {
        if (result.id.length > 0){
          if (Drinker.isVerified) {
            console.log("This driver is already verified")
            res.render("login")
          } 
          else {
            Drinker.isVerified =  true; 
            Drinker.save(function (err) {
              if (err) { console.log("Error: " + err)
              }
            })
            console.log("The account has been verified. Please log in.")
            res.render("login")
          }
        } 
        else {console.log("There's no such user with this ID")
        }
      })
    }
  })
  .catch((err)=>{
    console.log("Error: " + err); 
  })
})

module.exports = router
