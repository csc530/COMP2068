const express = require('express');
const router = express.Router();
const passport = require('passport');
// *  websocket package for server side websocket
const{config, getJobsList, getJobsPDF} = require('indeed-job-scraper');
const{WebSocketServer} = require('ws');
config['verbose']   = true;  //to deliver information about current processing
require('ws');


const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws) {
	ws.on('message', function message(msg) {
		ws.send('received:'+ msg);
		console.log(msg.toString());
		getJobsList({
			location: 'Canada',
			sort: 'date',
			fromdays: 3,
		})
			.then(jobs =>	{
				console.log('jobs received');
				ws.send(JSON.stringify(jobs));
			});
	});

	ws.send('something');
});


/* GET  jobs */
router.get('/', (req, res, next) => {
	const searchTitle = req.query.search;
	console.log(searchTitle ? searchTitle : 'Search indeed jobs');
	// res.redirect('/indeed/loading');
	const renderParams = {
		title: 'Search Indeed jobs',
		jobs: []
	};
	res.render('indeed/index', renderParams);

});

/* GET loading page */
router.get('/loading', function(req, res, next) {
	res.render('loading', {title: 'Loading application'});
});

function getLocation() {
	//TODO:
}


module.exports = router;
