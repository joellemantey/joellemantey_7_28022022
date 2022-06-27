var express = require('express');
var path = require('path');
const cors = require('cors');

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const authentificationRoutes = require('./authentification/authentification_router');

var postsRouter = require('./Post/posts_router');

var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authentificationRoutes);

app.use('/posts', postsRouter);

app.use('/users', usersRouter)

module.exports = app;
