var express = require("express"),
router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

var Drinker = require('../models/drinker')
var emailDrinker = require('../templates/emailDrinker');

router.post("/", (req,res) => {
  Drinker.find({email: req.body.email})
  .then((result) => {
    if (result.length > 0){
      console.log("This email already exists")
      res.render("emailExists")
    } 
    else if (req.body.password != req.body.confirmPassword) {
      res.render("passwordNoMatch")
    }
    else 
    bcrypt.hash(req.body.password, 5) 
    .then((hash) => {
        Drinker.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
      .then((result) => {
        var smtpConfig = {
            service: 'Gmail',
            auth: {
                user: 'scootboboff@gmail.com',
                pass: 'scootbobironhack'
            } 
          };
          let mailOptions = {
            from: '<scootboboff@gmail.com>', // sender address
            to: `${result.email}`, // list of receivers
            subject: 'Welcome to ScootBob!', // Subject line
            replyTo: `scootboboff@gmail.com`,
            html: emailDrinker(result.firstName).html
          };  
          var transporter = nodemailer.createTransport(smtpConfig);
            transporter.sendMail(mailOptions, (err, res) => {
            err ? console.log("There was an error: " + err) : console.log("The message was sent succefully")
          })
          console.log("Succesfully made a new drinker");
          res.render("login");
        })
      .catch((err=> {
        console.log("Database Creation Error: " + err)
      }))
    })
    .catch((err)=>{
      console.log("Bcrypt Error: " + err)
    })
  })
  .catch((err=>{
    console.log("Database finding Error: " + err);
  })) 
})

  
module.exports = router