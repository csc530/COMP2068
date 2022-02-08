var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
  title: 'My p[rojects',
};

router.get('/', function(req, res, next) {
  res.send('/project', options);
});

module.exports = router;
