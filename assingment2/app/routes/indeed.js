const express = require('express');
const router = express.Router();
const passport = require('passport');
const{config, getJobsList, getJobsPDF} = require('indeed-job-scraper');
config['verbose']   = true;  //to deliver information about current processing



/* GET  jobs */
router.get('/', (req, res, next) => {
	const searchTitle = req.query.search;
	console.log(searchTitle ? searchTitle : 'Search indeed jobs');
	// res.redirect('/indeed/loading');
	const renderParams = {
		title: 'Search Indeed jobs',
		jobs: []
	};
	getJobsList({
		location: 'Canada',
		sort: 'date',
		fromdays: 3,
		// queryTitle: searchTitle ? searchTitle : null,

	}).then(jobs => {
		console.log('Jobs: ' + jobs.length);
		// console.log(jobs);
		console.log('Search: ' + searchTitle);
		renderParams.jobs = jobs;
		res.render('indeed/index', renderParams);
	});
});

/* GET loading page */
router.get('/loading', function(req, res, next) {
	res.render('loading', {title: 'Loading application'});
});

function getLocation() {
	//TODO:
}


module.exports = router;
