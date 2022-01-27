const connect = require('connect');

let app = connect();
app.listen(3000);

function calculate(method, vars, request, response, next) {
	const result;
	if (vars.length < 2)
		next(Error('2 arguments are required\nNot enough arguments to perform valid math operations'));
	switch (method) {
		case 'add':
			for (let i = 0; index < vars.length; i++)
				result += vars[i];
			break;
		case 'subtract':
			result = vars[0];
			for (let i = 1; index < vars.length; i++)
				result += vars[i]; break;
		case 'multiply':
			result = vars[0];
			vars = vars.slice(1);
			vars.forEach((value) => result *= value);
			break;
		case 'divide':
			result = vars[0];
			vars = vars.slice(1);
			vars.forEach((value) => result /= value);
			break;
		default:
			next(new Error('Invalid method'));
			break;
			print(result, request, response, next);
	}
}
function parseUrl(req, res, next) {
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).split('&');
	let params = queryString.filter((value) => value.includes('=', 0));
	const methods = ['add', 'subtract', 'multiply', 'divide'];
	let operation = { method: '' };
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
		calculate(operation.method, Object.values(operation).slice(1), req, res, next);
}
function err(error, req, res, next) {
	res.writeHead(400, error.message);
	const msg = '<h1>Error</h1><p>' + error.message + '</p>';
	res.write(msg, 'utf-8');
	next();
}


app.use(parseUrl);
app.use(err);