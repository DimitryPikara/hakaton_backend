require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const schedule = require('node-schedule');
const cors = require('cors');
const wifiName = require('wifi-name');

const indexRouter = require('./routes/index');
const checkWifiName = require('./middlewares/checkWifiName');
const updateGroups = require('./utils/updateGroups').updateAll;
const resGenerator = require('./utils/resGenerator');

const app = express();

const corsSettings = {
  exposedHeaders: ['Access-Control-Allow-Headers', 'X-Total -Count'],
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsSettings));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/wifi', (req, res) => {
  const allowedWifis = ['sfedu-stud', 'sfedu', 'sfedu-conf'];
  wifiName().then(name => {
    if (!allowedWifis.includes(name)) return resGenerator(res, 400, { message: 'You are not connected to sfedu wifi!' });
    resGenerator(res, 200, name);
  });
});

schedule.scheduleJob('0 * 1 08 *', updateGroups);

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
