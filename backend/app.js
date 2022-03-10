var express = require('express');
var path = require('path');
const cors = require('cors');

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const authentificationRoutes = require('./authentification/authentification_router');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     // res.setHeader("Access-Control-Max-Age", "3600");
//     // res.setHeader("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(cors());

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authentificationRoutes);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
