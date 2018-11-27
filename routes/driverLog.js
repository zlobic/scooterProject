var express = require("express"),
router = express.Router()
const bcrypt = require('bcrypt');

var Driver  = require('../models/driver')

router.post("/", (req,res) => {
  Driver.find({email: req.body.email})
  .then((result) => {
    if (result.length > 0) {
      if (!result.isVerified) { 
        return res.render("emailNotVer")
      }
      else {
        var password = req.body.password;
        bcrypt.compare(password, result[0].password)
        .then((match) => {
          if (match){
            res.send({ token: generateToken(Driver), user: user.toJSON() });
            res.cookie('loggedIn', 'true', {signed: true});
            res.cookie('email', result[0].email)
            res.render("indexDriver", {info: result[0].firstName});
          }
          else console.log("Wrong password")
          res.render("emailNotExist");
        })
        .catch((err)=> {
          if (err) console.log("Bcrypt Error or Internal Code Error:" + err) 
        })
      }
    }
    else console.log("This e-mail does not exist in the database")
    res.render("emailNotExist");
  })
  .catch((err) => {
    if (err) console.log("Error:" + err)
  })
})

module.exports = router