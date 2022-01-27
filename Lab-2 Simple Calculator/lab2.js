const connect = require('connect');

let app = connect();
app.listen(3000);

function calculate(request, response, next) {
	// will post contents from anonymous function; just easier beacuse ide knows the class of params
}
function parseUrl(req, res, next) {
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).split('&');
	let params = queryString.filter((value) => value.includes('=', 0));
	const methods = ['add', 'subtract', 'multiply', 'divide'];
	let operation = {method: ''};
	for (let i = 0; i < params.length; i++) {
		//the name will be first element then the value
		let elems = params[i].split('=');
		Object.defineProperty(operation, elems[0], {
			//controls whether or not the property other than the value and writable can be edited or deleted
			configurable: false,
			enumerable: true,
			value: elems[1],
			//if value of the property is editable/changeable
			writable: true
		});
	}

	if (!methods.includes(operation.method))
		next(new Error('Method "' + operation.method + '" does not exist.'));
	else
		next();
}
function err(error, req, res, next) {
	res.writeHead(400, error.message);
	const msg = '<h1>Error</h1><p>'+error.message+'</p>';
	console.log('fhdgfhytdr');
	//res.end();
	next();
}


app.use(parseUrl);
app.use(err);
app.use(function(req, res, next) {
	res.end('<h1>Welcome</h1>','utf-8');
	res.end();
});
