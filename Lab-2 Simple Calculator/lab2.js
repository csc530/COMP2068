const connect = require('connect');
const methods =
{
	'add': {
		name: ['add', 'addition', 'plus'],
		symbol: '+',
	},
	'subtract': {
		name: ['subtract', 'minus'],
		symbol: '-',
	},
	'multiply': {
		name: ['multiply', 'times',],
		symbol: '×',
	},
	'divide': {
		name: ['divide',],
		symbol: '÷'
	}
};
let app = connect();
app.listen(3000);
function print(result, operation, terms, req, res) {
	terms.forEach((value, index) => terms[index] = '<li><strong>' + String(value) + '</strong></li>');
	const msg = `
	<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset='utf-8'>
		<meta http-equiv='X-UA-Compatible' content='IE=edge'>
		<title>Simple calculator</title>
		<meta name='viewport' content='width=device-width, initial-scale=1'>
		<!-- CSS only -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
			integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	</head>
	
	<body class="container">
		<h1>Simple Calculator</h1>
		<h2>Operation: <strong>${operation.toUpperCase()}</strong></h2>
		<h2>Terms:</h2>
		<ol>
		${terms.join('\n')}
		</ol>
		<h2>Result: ${result}</h2>
		<h2>Whole expression:</h2>
		<p class="lead text-center">${terms.join(op)}</p>
	</body>
	
	</html>
	`;
	res.end(msg, 'utf8');
}
function calculate(operation, request, response, next) {
	const method = operation.method;
	//converts array (elements) to Number (type)
	const terms = Object.values(operation).slice(1).map(Number);
	let result = Number(0);
	if(terms.length < 2)
		next(Error('2 arguments are required\nNot enough arguments to perform valid math operations'));
	switch(method) {
	case'add':
		for(let i = 0; i < terms.length; i++)
			result += terms[i];
		break;
	case'subtract':
		result = terms[0];
		for(let i = 1; i < terms.length; i++)
			result += terms[i]; break;
	case'multiply':
		result = terms[0];
		terms.slice(1).forEach((value) => result *= value);
		break;
	case'divide':
		result = terms[0];
		terms.slice(1).forEach((value) => result /= value);
		break;
	default:
		next(new Error('Invalid method'));
		break;
	}
	//no next function because it's the end of the end of middleware calls
	//no chances of erros
	print(result, operation.method, terms, request, response);
}
function parseUrl(req, res, next) {
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).split('&');
	let params = queryString.filter((value) => value.includes('=', 0));
	let operation = {method: ''};
	for(let i = 0; i < params.length; i++) {
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
	var validMethodNames = [];
	//gets value form methods object name and symbols
	Object.values(methods)
		//creates an array from just the name properties
		.map((value) => value.name)
		//adds the names from each valid method to `validMethodNames` var
		.forEach((value) => validMethodNames = validMethodNames.concat(value));
	if(!validMethodNames.includes(operation.method))
		next(new Error('Method "' + operation.method + '" does not exist.'));
	else
		calculate(operation, req, res, next);
}
function err(error, req, res) {
	console.log('uhjkvfg867\niuf\n');
	res.writeHead(400, error.message);
	const msg = '<h1>Error</h1><p>' + error.message + '</p>';
	res.write(msg, 'utf-8');
	res.end();
}


app.use(parseUrl);
app.use(err);
