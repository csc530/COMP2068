var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
	projects: [
		{
			title: 'title',
			description: 'some stuff about a proejct yadda yada blahblue bahebeh ghertyahg yragh',
			img: 'https://github.com/favicon.ico',
		},
	],
};

router.get('/', function (req, res, next) {
	res.render('projects', options);
});

module.exports = router;
