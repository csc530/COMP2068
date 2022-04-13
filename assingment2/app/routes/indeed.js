const express = require('express');
const router = express.Router();
const passport = require('passport');
const{getJobsList, getJobsPDF} = require('indeed-job-scraper');


router.get('/', (req, res, next) => {
	const renderParams = {
		title: 'Search Indeed jobs',
		jobs: []
	};
	getJobsList({
		location: 'Canada',
		sort: 'date',
		fromdays: 3,

	}).then(jobs => {
		console.log('Jobs: ' + jobs.length);
		console.log(jobs);
		renderParams.jobs = jobs;
		res.render('indeed/index', renderParams);
	});
});


function getLocation() {
	//TODO:
}


module.exports = router;
