const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodeMailer = require('nodemailer');

/* GET users listing. */
const options = {
	title: 'Contact me',
};

router.get('/', function (req, res, next) {
	const{fName, lName, email, msg, subject} = req.body;
	res.render('contact', options);
});
router.post('/', function (req, res, next) {
	const{fName, lName, email, msg, subject} = req.body;
	console.log(fName + ' -  ' + lName + ' -  ' + email + ' -  ' + msg + ' -  ' + subject);
	const name =
	(fName && lName) ? fName.toLocaleUpperCase()[0] + fName.slice(1).toLocaleLowerCase() + lName.toLocaleUpperCase()[0] + lName.slice(1).toLocaleLowerCase() : 'Anonymous Null';
	const senderEmail = process.env.SENDEREMAIL;
	const myEmail = process.env.MYEMAIL;
	const pss = process.env.PSS;
	console.log('send: ' + senderEmail + ', my email:'+myEmail + ', pss:'+pss);
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
		if(error) {
			console.log(error);
		} else{
			console.log('Email sent: ' + data.response);
		}
	});
	res.location('/contact');
});
module.exports = router;
