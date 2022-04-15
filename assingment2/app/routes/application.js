var express = require('express');
var router = express.Router();

const User = require('./../models/user');
const Application = require('./../models/application');

//? create reusable middleware function
function authenticate(req, res, next) {
	if(req.isAuthenticated())
		return next();
	else
		res.redirect('/auth/login');
}

// ? add authentication first to router to protect all of the routes pages; needs to be authenticated to see anything pertaining to applications
router.use(authenticate);

/* GET home page. */
router.get('/', function (req, res, next) {
	const renderParams = {
		title: 'Job Application Manager',
		applications: [],
		user: req.user
	};
	Application.find(
		{uid: req.user.id.toString()},
		(err, applications) => {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			else{
				renderParams.applications = applications;
				res.render('application/index', renderParams);
			}
		}
	);
});

/* GET add application */
router.get('/add', (req, res, next) => {
	const renderParams = {
		title: 'Create new application',
		user: req.user
	};
	res.render('application/add', renderParams);
});
/* POST add application */
router.post('/add', (req, res, next) => {
	const uid = req.user._id.toString();
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
	}, (err, application) => {
		if(err || !application) {
			console.log(`Error: ${err}`);
			res.status(400);
			//redirect back with status code 400 displaying error
			res.redirect('add');
		}
		else{
			res.status(200);
			res.redirect('/application');
		}
	});
});

/* GET edit application */
router.get('/edit/:id', (req, res, next) => {
	const id = req.params.id;
	const renderParams = {
		title: 'Edit application',
		user: req.user
	};
	Application.findById(id, (err, application) => {
		if(err || !application) {
			console.log(`Error: ${err}`);
			res.status(400);
			//redirect back with status code 400 displaying error
			res.redirect('/application');
		}
		else{
			renderParams.application = application;
			res.render('application/edit', renderParams);
		}
	});
});
/* POST edit application */
router.post('/edit/:id', (req, res, next) => {
	const id = req.params.id;
	const values = req.body;
	const jobTitle = values.jobTitle.toString().trim();
	const postedDate = values.postedDate;
	const action = values.action;
	const applicationDate = values.applicationDate;
	Application.findByIdAndUpdate(id, {
		jobTitle: jobTitle,
		applicationDate: applicationDate,
		postedDate: postedDate,
		action: action
	}, (err, application) => {
		if(err || !application) {
			console.log(`Error: ${err}`);
			res.status(400);
			//redirect back with status code 400 displaying error
			res.redirect('/application');
		}
		else{
			res.status(200);
			res.redirect('/application');
		}
	});
});

/* GET delete application */
router.get('/delete/:id', (req, res, next) => {
	const id = req.params.id;
	Application.findByIdAndRemove(id, (err, application) => {
		if(err || !application) {
			console.log(`Error: ${err}`);
			res.status(400);
			//redirect back with status code 400 displaying error
			res.redirect('/application');
		}
		else{
			res.status(200);
			res.redirect('/application');
		}
	});
});

module.exports = router;
