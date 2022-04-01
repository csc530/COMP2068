const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//#region Login
/* GET login page. */
router.get('/login', (req, res, next) => {
	const renderParams = {
		title: 'Login'
	};
	res.render('auth/login', renderParams);
});

/* POST login page. */
router.post('/login',
	/** Adds username field to request body so passport can authenticate
	 * because that's where ti looks for it (and I didn't want to change up all my code) */
	(req, res, next)=>{
		req.body.username = req.body.email;
		next();
	},
	(passport.authenticate('local', {
		successRedirect: '/application/',
		failureRedirect: 'login',
		failureMessage: 'Incorrect Credentials'
	}
	))
);
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
	User.register(
		new User({username: email}),
		password,
		(err, newUser) => {
			if(err)
			{
				console.log(err);
				res.status(500);
				return res.redirect('register');
			}
			else
				req.login(newUser, err => {
					if(err)
					{
						console.log(err);
						res.status(500);
						return res.redirect('register');
					}
					else
						return res.redirect('/application/');
				});
		}
	);
});

//#endregion

module.exports = router;
