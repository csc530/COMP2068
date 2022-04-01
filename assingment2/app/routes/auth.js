const express = require('express');
const router = express.Router();
const User = require('../models/user');

//#region Login
/* GET login page. */
router.get('/login', (req, res, next) => {
	const renderParams = {
		title: 'Login'
	};
	res.render('auth/login', renderParams);
});

/* POST login page. */
router.post('/login', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({
		username: email,
		password: password
	}, (err, user) => {
		if(err)
		{
			console.log(err);
			res.status(400);
			res.redirect('login');
		}
		else
		{
			req.session.user = user;
			res.redirect('/application/');
		}
	});
});
//#endregion

//#region Register
/* GET register page. */
router.get('/register', (req, res, next) => {
	const renderParams = {
		title: 'Register'
	};
	res.render('auth/register', renderParams);
});

/* POST register page. */
router.post('/register', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const user = new User({
		username: email,
		password: password,
	});
	// ? Check if they is already an account with the given email
	User.findOne({
		username: email
	}, (err, user) => {
		if(err)
		{
			console.log(err);
			res.status(400);
			res.redirect('register');
		}
		else
		{
			//there is a user with the given email
			if(user)
			{
				console.log(user);
				res.status(400);
				res.redirect('register');
			}
			else
			{
				user.save((err, user) => {
					if(err)
					{
						console.log(err);
						res.status(500);
						res.redirect('register');
					}
					else
					{
						req.session.user = user;
						res.redirect('/application/');
					}
				});
			}
		}
	});
});
//#endregion

module.exports = router;
