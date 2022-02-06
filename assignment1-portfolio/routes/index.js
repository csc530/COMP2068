var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	const options = {
		student: {
			title: 'Student',
			txt: 'txt',
		},
		developer: {
			title: 'Aspiring Full-Stack Developer',
			txt: 'txt',
		},
		project: {
			title: 'Projects',
			txt: 'txt',
			items: [],
			img: ''
		},
		photo: {
			title: 'Photo',
			alt: 'Photo',
			src: ''
		},
	};
	res.render('index', options);
});

module.exports = router;
