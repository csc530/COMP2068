const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodeMailer = require('nodemailer');

/* GET users listing. */
let options = {
	title: 'Contact me',
};

router.get('/', function (req, res, next) {
	Object.assign(options,req.body);
	res.render('contact', options);
});
router.post('/', function (req, res, next) {
	let{fName, lName, email, msg, subject} = req.body;
	const name ='From: '+ (fName && lName) ? fName.toLocaleUpperCase()[0] + fName.slice(1).toLocaleLowerCase() + lName.toLocaleUpperCase()[0] + lName.slice(1).toLocaleLowerCase() : 'Anony Mous';
	if(!subject) subject = 'No subject';
	const senderEmail = process.env.SENDEREMAIL;
	const myEmail = process.env.MYEMAIL;
	const pss = process.env.PSS;
	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		//change to production URL
		secure:false,
		requireTLS:true,
		auth: {
			type: 'LOGIN',
			user: senderEmail,
			pass: pss,
		}
	});

	const mailMessage = {
		from: senderEmail,
		to: `${email}, ${myEmail}`,
		subject: `${name} - ${subject}`,
		text: msg
	};

	transporter.sendMail(mailMessage, function(error, data){
		console.log(error);
		if(error)
			res.redirect('/contact/failure');
		else
			res.redirect('/contact/success');
		res.end();
	});
});

router.get('/success', function (req, res, next) {
	options.title ='success';
	res.render('success', options);
});
router.get('/failure', function (req, res, next) {
	options.title ='failure';
	res.render('failure', options);
});
module.exports = router;
