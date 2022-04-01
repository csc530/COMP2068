
var express = require('express');
var router = express.Router();

const User = require('./../models/user');
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
		res.render('application/index', renderParams);
	});
});

/* GET add application */
router.get('/add', (req, res, next)=>{
	const renderParams = {
		title: 'Create new application'
	};
	console.log(req.session.user);
	res.render('application/add', renderParams);
});
/* POST add application */
router.post('/add',(req, res, next)=>{
	const uid = req.sessionID;//TODO replace with req.user.id
	const values = req.body;
	const jobTitle = values.jobTitle.toString().trim();
	console.log(jobTitle);
	const postedDate = values.postedDate;
	const action = values.action;
	const applicationDate = values.applicationDate;
	Application.create({
		jobTitle: jobTitle,
		applicationDate: applicationDate,
		postedDate: postedDate,
		action: action,
		uid: uid
	}, (err, application)=>{
		if(err)
		{
			console.log(`Error: ${err}`);
			res.status(400);
			//redirect back with status code 400 displaying error
			res.redirect('add');
		}
		else
			res.redirect('add');
	});
});
module.exports = router;
