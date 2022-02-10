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
			img: 'Kaya,_Bane_of_the_Dead.jpg'
		},
		photo: {
			title: 'Photo',
			alt: 'Photo',
			src: 'Kaya,_Bane_of_the_Dead.jpg'
		},
	};
	res.render('index', options);
});

module.exports = router;
