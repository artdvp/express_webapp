const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const fs = require('file-system');

// var index = require('./routes/index');
// var users = require('./routes/users');

const app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


// add connect mongoose
mongoose.connect(process.env.DB_MONGO, () => {
  console.log('Connection has been made');
})
.catch(err => {
  console.error('App starting error: ', err.stack);
  process,exit(1);
})

// Include controller
fs.readdirSync('controllers').forEach((file) => {
  if(file.substr(-3) == '.js'){
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4444,() => {
  console.log("listening on 4444");
})

module.exports = app;
