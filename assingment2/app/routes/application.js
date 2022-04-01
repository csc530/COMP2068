var express = require('express');
var router = express.Router();
const Application = require('./../models/application');
/* GET home page. */
router.get('/', function (req, res, next) {
	const renderParams = {
		title: 'Job Application Manager',
	};
	Application.find((err, applications) => {
		if(err)
			return console.log(err);
		renderParams.data = applications;
		res.render('applications/application', renderParams);
	});
});

/* GET Add */
router.get('/add', function (req, res, next) {
	const renderParams = {
		title: 'Add Application',
	};
	res.render('applications/add', renderParams);
});

module.exports = router;
