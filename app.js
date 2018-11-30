var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var hbs = require('hbs');
var mjml = require('mjml');

var app = express();

require("./models/driver")
require("./models/drinker")

mongoose.connect('mongodb://localhost/scooter',  (err) => {
err ? console.log("Not connected to the database, cause: " + err) : console.log("Succesfully connected to MongoDB")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(cookieParser('secret'))


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/create", require('./routes/create'));
app.use("/login", require('./routes/login'));
app.use("/drivers", require('./routes/drivers'));
app.use("/drinkers", require('./routes/drinkers'));
app.use("/index", require('./routes/index'));
app.use("/indexDriver", require('./routes/indexDriver'));
app.use("/indexDrinker", require('./routes/indexDrinker'));
app.use("/aboutUs", require('./routes/aboutUs'));
app.use("/contactUs", require('./routes/contactUs'));
app.use("/logout", require('./routes/logout'));
app.use("/introduction", require('./routes/introduction'));
app.use("/confirmation", require('./routes/confirmation'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000,"127.0.0.1", (err=>{
  err ? console.log("Could not connect to the server: " + err) : console.log("Succesfully connected to the server")
}))

module.exports = app;
