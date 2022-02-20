var express = require('express');
var router = express.Router();

const options = {
	title: 'A website for my family',
	msg: 'A small page with a brief description about me and my family.',
};
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', options``);
});

module.exports = router;
