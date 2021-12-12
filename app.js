var createError = require('http-errors');
var express = require('express');
var path = require('path');
var busboy = require('connect-busboy')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/materials');
var authRouter = require('./routes/auth')

let connectDB = require('./models/database')

var app = express();

//app.use(express.static(__dirname + '/public/templates'));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'));
app.use(busboy())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'lalalala',
  cookie: {},
  resave: true,
  saveUninitialized: true
}))
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/materials', uploadRouter)
app.use('/scripts', express.static(__dirname + '/node_modules/pdfjs-dist/build/'))
app.use(express.static(path.join(__dirname, 'public')));

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
});

module.exports = app;
