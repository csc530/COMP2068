var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
	title: 'My projects',
	projects: [
		{
			title: 'Crypto.com Exchange API',
			lang: 'JavaScript',
			description: 'An exploration and use of the crypto.com exchange spot API. With overarching concpets of nodeJS, websocket and HTTPS API requests, etc.',
			link: 'https://github.com/csc530/crypto.com-exhcange-API',
			status: 'in progress',
			img: 'https://crypto.com/static/97d76b3f915718114e9259313d3da5fc/436b0/crypto-com-logo.png',
			alt: 'Crypto.com\'s logo'
		},
		{
			title: "Nasa's Astronmy piscture of the Day application",
			lang: 'Java',
			description: 'A javaFX application exploring the use of REST API. The API I built a desktop application for is NASA\'s Astronmy picture of the day API. I built this application as my Final assignment for advanced object-oriented programming course.',
			link: 'https://github.com/csc530/advOOP-assignment2',
			status: 'complete'
		},
		{
			title: 'Content managment website',
			lang: 'PHP',
			description: 'A content management site to create multi-paged websites in an easy and intuitive way. I built this webapp as my final assigment for server side scripting with PHP course. If you would like to recreate the project first, download the repository as a zip file. And configure a mySQl DB with the tables found in the sql folder. Finally change the DB connection string in "connect.php" (found in the pages directory) to your local connectiona and host the website on a local or remote server that can compile PHP.',
			status: 'Inactive',
			link: 'https://github.com/csc530/website-maker'
		},
		{
			title: 'Family tree app - (private)',
			lang: 'Kotlin',
			description: 'The purpose of the application will be to create a family tree for the user, whether it be for themselves or a friend.  The primary use of the app is to have a record of your family [tree] from generations before and to come. It can also contain information about each member, such as biographies, accomplishments, etc. Moreover, it will help identify the relationships between more distant or obscure family members and their proper titles. For example, if they’re your second cousin or great-aunt. Furthermore, it will make sharing information and history about your family easier. Hopefully, it is stored in the cloud, so it’s always backed up and allow for synchronous changes of a family tree from multiple family members/devices. It allows you to see the new additions or unfortunate losses in your family as they occur. This app is created as the contionus and final assignment for my Mobile and Pervasive Computing course.',
			status: 'started',
			link: 'https://csc530.github.io/Family-Tree/'
		},
	],
};
options.projects.forEach((project, i) => (project.index = i));
router.get('/', function (req, res, next) {
	res.render('projects', options);
});

module.exports = router;
