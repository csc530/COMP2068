var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	let stdImg;
	require('https').get('https://www.lakeheadgeorgian.ca/wp-content/uploads/2018/02/lakehead-georgian-favicon.png', res => {
		if(res.statusCode === 200 || res.statusCode === 304) stdImg = 'https://www.lakeheadgeorgian.ca/wp-content/uploads/2018/02/lakehead-georgian-favicon.png';
		else stdImg = 'local/img';
	});
	const options = {
		student: {
			title: 'Student',
			txt: '@<a href="http://">Lakehead Georgian Honours Bachelor of Science (Computer Science)</a>',
			img: stdImg,
		},
		developer: {
			title: 'Aspiring Full-Stack Developer',
			txt: '',
			img: '',
		},
		project: {
			title: 'Projects',
			txt: '',
			items: [
				{name: 'Crypto.com Exchange API', link: ''},
				{name: "Nasa's Astronmy piscture of the Day application", link: ''},
				{name: '', link: ''},
			],
			img: 'images/project.jpg',
		},
		photo: {
			title: 'A picture of me😃',
			alt: 'A photo of me',
			src: '',
		},
	};
	res.render('index', options);
});

module.exports = router;
