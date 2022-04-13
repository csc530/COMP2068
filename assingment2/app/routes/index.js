var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Job application Manager'});
});

/* GET loading page */
router.get('/loading', function(req, res, next) {
	res.render('loading', {title: 'Loading application'});
});

module.exports = router;
