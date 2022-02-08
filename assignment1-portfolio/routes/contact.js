var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
  title: 'Contact me',
};

router.get('/', function(req, res, next) {
  res.render('contact', options);
});
router.post('/', function(req, res, next) {
    const {fName, lName, email, msg} = req.body;
    //TODO: send email to me
});
module.exports = router;
