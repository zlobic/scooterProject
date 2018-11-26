var express = require("express")
var router = express.Router()

router.get('/', (req,res)=>{
  var cookies = req.signedCookies;
  if (cookies.loggedIn === undefined) res.redirect("index");
  else res.render("indexDrinker")
})


module.exports = router