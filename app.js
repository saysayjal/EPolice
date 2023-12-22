require('./db');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser");
const session = require('express-session');
const flash = require('connect-flash')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var emergencynumberRouter = require('./routes/emergencynumber');
const reportRouter = require('./routes/report');
const notificationRoutes = require('./routes/notification');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: 'mykey', // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
}));
// parse application/json
app.use(bodyParser.json());



// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use((req, res, next) => {
  res.locals['error_msg'] = req.flash('error_msg');
  res.locals['success_msg'] = req.flash('success_msg');
  next();
});

app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/emergencynumber', emergencynumberRouter);
app.use('/report', reportRouter);
app.use('/notification', notificationRoutes);

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

module.exports = app;
