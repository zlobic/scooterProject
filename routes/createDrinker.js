var express = require("express"),
router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

var Drinker = require('../models/drinker')

router.post("/", (req,res) => {
    bcrypt.hash(req.body.password, 5) 
    .then((hash) => {
      Drinker.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      })
      .then(() =>{
       console.log("Succesfully made a new drinker");
       res.render("login");
      })
      .catch((err)=>{
      console.log("Could not create Driver: " + err);
      })
    })
    .catch((err) => {
      console.log("Hashing Error: " + err)
    })
  });

  
  module.exports = router