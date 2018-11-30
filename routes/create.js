var express = require("express"),
router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var mjml = require('mjml');

var Driver  = require('../models/driver')
var emailDriver = require('../templates/emailDriver')
var tokenDriver = require('../models/tokenDriver')

var Drinker = require('../models/drinker')
var emailDrinker = require('../templates/emailDrinker');
var tokenDrinker = require('../models/tokenDrinker')

router.get('/', (req,res)=> {
  res.render('signup');
  })
  
router.post("/createDriver", (req,res) => { 
  Driver.find({email: req.body.email})
  .then((result) => {
    if (result.length > 0){
      console.log("This email already exists")
      res.render("emailExists")
    } 
    else if (req.body.password != req.body.confirmPassword) {
      res.render("passwordNoMatch")
    }
    else {
      bcrypt.hash(req.body.password, 5) 
      .then((hash) => {
        Driver.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
        })
        .then((result)=> {
          let token = new tokenDriver({
            _userId: result._id,
            token: crypto.randomBytes(16).toString('hex')
          });
          token.save()       
          var text = req.body.firstName + ", we are really excited you've decided to give us a try as a Driver. In case you have any questions, feel free to reach out to us at scootboboff@gmail.com." + ' Please verify your account by clicking on the button' 
          var url = token.token
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
            html: emailDriver(url,text).html
          };  

          var transporter = nodemailer.createTransport(smtpConfig);
            transporter.sendMail(mailOptions, (err, res) => {
            err ? console.log("There was an error: " + err) : console.log("The message was sent succefully")
          })
          res.render("login")
        })
      })
      .catch((err)=>{
        console.log("Bcrypt Error: " + err)
      })
    }
  })
  .catch((err)=>{
    console.log("Error " + err)
  })
})
 

router.post("/createDrinker", (req,res) => { 
  Drinker.find({email: req.body.email})
  .then((result) => {
    if (result.length > 0){
      console.log("This email already exists")
      res.render("emailExists")
    } 
    else if (req.body.password != req.body.confirmPassword) {
      res.render("passwordNoMatch")
    }
    else {
      bcrypt.hash(req.body.password, 5) 
      .then((hash) => {
        Drinker.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
        })
        .then((result)=> {
          let token = new tokenDrinker({
            _userId: result._id,
            token: crypto.randomBytes(16).toString('hex')
          });
          token.save()       
          var url = token.token
          var text = req.body.firstName + ", we are really excited you've decided to give us a try as a Drinker. In case you have any questions, feel free to reach out to us at scootboboff@gmail.com." + ' Please verify your account by clicking on the button' 
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
            html: emailDrinker(url,text).html
          };  
          var transporter = nodemailer.createTransport(smtpConfig);
            transporter.sendMail(mailOptions, (err, res) => {
            err ? console.log("There was an error: " + err) : console.log("The message was sent succefully")
          })
          res.render("login")
        })
      })
      .catch((err)=>{
        console.log("Bcrypt Error: " + err)
      })
    }
  })
  .catch((err)=>{
    console.log("Error " + err)
  })
})
 
    
       

 module.exports = router


