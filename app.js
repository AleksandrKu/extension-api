'use strict';
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');

const indexRouter = require('./routes/index');
const signin = require('./routes/signin');
const cargo = require('./routes/cargo');
const app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts/signin', signin);
app.use('/cargos', cargo);
app.use('*', (req, res) => res.send('Bad rout'));

module.exports = app;
