var express = require("express"),
router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

var Driver  = require('../models/driver')

router.post("/", (req,res) => {
  bcrypt.hash(req.body.password, 5) 
  .then((hash) => {
    Driver.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    })
    .then((result) =>{
      console.log(result);
      console.log("Succesfully made a new driver");
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