express = require('express')
router =  express.Router()

router.get('/logout', (req,res)=>{
  req.signedCookies;
  res.clearCookie("username","loggedIn");
  res.render("index");
})

module.exports = router ;
