const connect = require('connect');

let app = connect();
app.listen(3000);

function calculate(request, response, next) {
	// will post contents from anonymous function; just easier beacuse ide knows the class of params
}

app.use((req, res, next) => {
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).split('&');
	let params = queryString.filter((value) => value.includes('=', 0));
	const methods =  ["add", "subtract", "multiply", "divide"];
	let operation = {};
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
	console.log(operation);
	res.end();
});