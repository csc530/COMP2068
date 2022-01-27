const connect = require('connect');

let app = connect();
app.listen(3000);

function calculate(request, response, next) {
	// will post contents from anonymous function; just easier beacuse ide knows the class of params
}

app.use((req, res, next) => {
    //gets each of the parameters from the url
	let params = req.url.substring(req.url.indexOf('?') + 1).split('&');
    console.log(params);
	res.end();
});