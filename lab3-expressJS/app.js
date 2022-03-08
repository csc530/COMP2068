var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ? controllers
var indexRouter = require('./routes/index');
var momRouter = require('./routes/christene');
const dadRouter = require('./routes/marc');
const meRouter = require('./routes/chris');
const sis1Router = require('./routes/lydea');
const sis2Router = require('./routes/samantha');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ? add routers
app.use('/', indexRouter);
app.use('/Christene', momRouter);
app.use('/Marc', dadRouter);
app.use('/Christofer', meRouter);
app.use('/Lydea', sis1Router);
app.use('/Samantha', sis2Router);

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
