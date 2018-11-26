var express = require('express')
var router = express.Router();

router.get('/', (req,res) =>{
  res.render('forDrinkers');
})

module.exports = router