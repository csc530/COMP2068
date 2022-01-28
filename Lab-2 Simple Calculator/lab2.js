const connect = require('connect');
const methods =
{
	'add': {
		name: ['add', 'addition', 'plus'],
		symbol: ' + ',
	},
	'subtract': {
		name: ['subtract', 'minus'],
		symbol: ' - ',
	},
	'multiply': {
		name: ['multiply', 'times',],
		symbol: ' × ',
	},
	'divide': {
		name: ['divide',],
		symbol: ' ÷ '
	},
	findMethod: function (val) {
		let keys = Object.keys(this);
		let names = Object.values(this)
			.map((val) => val.name)
			.slice(0, -1);
		for(let i = 0; i < names.length; i++) {
			for(let j = 0; j < names[i].length; j++) {
				const name = names[i][j];
				if(name === val)
					return keys[i];
			}
		}
		return null;
	}
};
let app = connect();
app.listen(3000);
function print(result, operation, terms, req, res) {
	terms = terms.map((value) => value = '<strong>' + String(value) + '</strong>');
	let termsList = [];
	terms.forEach((term) => termsList.push(`<li class="display-6 list-group-item" col-1>${term}</li>`));
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
		<h1 class="display-1">Simple Calculator🧮 </h1>
		<h2 class="display-4">Operation: <strong>${operation.toUpperCase()}</strong></h2>
		<h2 class="display-4">Terms: <small>(in order)</small></h2>
		<ol class="list-group">
			${termsList.join('\n')}
		</ol>
		<h2 class="display-4">Result: ${result}</h2>
		<h2 class="display-4">Whole expression:</h2>
		<pre>
			<p class="lead display-5 text-center">${terms.join(methods[operation].symbol)} = ${result}</p>
		</pre>
	</body>
	
	</html>`;
	res.end(msg, 'utf8');
}
function calculate(operation, request, response, next) {
	const method = methods.findMethod(operation.method);
	//converts array (elements) to Number (type)
	const terms = Object.values(operation).slice(1).map(Number);
	let result = Number(0);
	if(terms.length < 2)
		next(Error('2 arguments are required. Not enough arguments to perform valid math operations'));
	else
		switch(method) {
		case'add':
			for(let i = 0; i < terms.length; i++)
				result += terms[i];
				//no next function because it's the end of the end of middleware calls
				//no chances of erros
			print(result, method, terms, request, response);
			break;
		case'subtract':
			result = terms[0];
			for(let i = 1; i < terms.length; i++)
				result -= terms[i];
				//no next function because it's the end of the end of middleware calls
				//no chances of erros
			print(result, method, terms, request, response);
			break;
		case'multiply':
			result = terms[0];
			terms.slice(1).forEach((value) => result *= value);
			//no next function because it's the end of the end of middleware calls
			//no chances of erros
			print(result, method, terms, request, response);

			break;
		case'divide':
			result = terms[0];
			if(terms.slice(1).includes(0))
				next(Error('Dividing by zero is not allowed'));
			else{
				terms.slice(1).forEach((value) => result /= value);
				//no next function because it's the end of the end of middleware calls
				//no chances of erros
				print(result, method, terms, request, response);
			}
			break;
		default:
			next(new Error('Invalid method'));
			break;
		}
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
	if(!methods.findMethod(operation.method)) {
		if(operation.method)
			next(new Error('Method "' + operation.method + '" does not exist.'));
		else
			next(new Error('No math operator/method was entered'));
	}
	else
		calculate(operation, req, res, next);
}

function err(error, req, res, next) {
	res.writeHead(400, error.message);
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
		<h1 class="display-1">Error⚠</h1>
		<h2 class="lead display-5 text-center">${error.message}</h2>
		<p class="lead display-6">Please review your url query and try again.</p>
		<hr />
		<details class="display-6">${error.stack}</details>
	</body>
	
	</html>`;
	res.write(msg, 'utf8');
	res.end();
}

function calculator(req, res, next) {
	parseUrl(req, res, next);
}
app.use(calculator);
app.use(err);
