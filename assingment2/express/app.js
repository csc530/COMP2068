var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var applicationRouter = require('./routes/application');

//passport related objects
const passport = require('passport');
const session = require('express-session');

const mongoose = require('mongoose');

var app = express();
// Connect to DB - mongoDB
// only for development
require('dotenv').config();
const dbString = process.env['db'] + 'assignment2';
// Use the connect method, and the two handlers to try to connect to the DB
mongoose
	.connect(dbString, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(message => console.log('Connected successfully!\n' + message.connection.db.databaseName))
	.catch(error => console.log(`Error while connecting! ${error}`));


//#region passport authentication
//Configure session and passport before all router declarations
//1. configure the app to use sessions
app.use(session({
	secret: 'w2022projectTracker',
	resave: false,
	saveUninitialized: false
}));
//2. Initialize passport
app.use(passport.initialize());
app.use(passport.session());
//3. Link passport to user model (mongoose)
const User = require('./models/user');
//passport will use the User model to create a
passport.use(User.createStrategy());
//4. Set passport to read/write user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//#endregion
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/application', applicationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
