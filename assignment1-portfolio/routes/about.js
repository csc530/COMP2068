var express = require('express');
var router = express.Router();

/* GET users listing. */
const options = {
	title: 'About me',
	academics: 'I\'m currently in my second year of post-secondary with Lakehead Georgian for a Honours Bachelor of Computer Science. The propgram I\'m in is unique as it with a college and university, Georgian and Lakehead respectively. By the end of my education I will recieve a Honours Bachelor of Science (Computer Science) degree and a Computer Programming diploma. I really enjoyed my experience so far learning more about varying technologies, programming languages, and frameworks. If I had choose something I enjoyed most about my time in post-secondary is just oppurtunity to grow and learn about such a broad amount of disciplines I would not have know to look into.',
	personal: 'As you may have guess my name is Christofer Cousins, I currently live in Ontario, Canada, with my family. Despite the pandemic and various quarintines they really allowed me to get closer with my family and I\'m grateful for the time I got to spend with them. When I am not with my family, I enjoy gaming and exploring new technolgies. Right now I enjoy playing the Kamigawa set in Magic the Gathering and I am working with Crypto.com\'s exhcange API.',
	career: 'As of right now I\'m looking for summer co-op oppurtunities in computer science, development, or software engienering. I am excited to utilize my acquired skills and abilities in the workforce.',
	future: 'For the future, primarily I\'m focused on finishing my education and see where that will take me. A little less far out though I hope to have a summer co-op in my field.',
	blurb: 'Hey my name is Christofer Cousins a Computer Science student eager to learn more about the field and network with those in it. I enjoy problem solving (probably the reson why I love programming), playing games, learning, and volunteering with a local food bank, Umbrella of Hope. Right now I\'m in the last semester of my second year looking for a summer co-op.'
};

router.get('/', function (req, res, next) {
	res.render('about', options);
});

module.exports = router;
