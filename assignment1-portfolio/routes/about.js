var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
	title: 'About me',
};

router.get('/', function (req, res, next) {
	res.render('about', options);
});

module.exports = router;
