var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cron = require('node-cron');
const categorieDatafetch = require('./cron-service/categorie_data')

const categoriesfetch = require('./fetchcategories')
const resetcron = require('./cron-service/reset_cronstatus')
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

cron.schedule("*/5 * * * *",categorieDatafetch);
cron.schedule("*/5 * * * *",resetcron);

module.exports = app;
