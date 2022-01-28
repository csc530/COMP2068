const connect = require('connect');
const methods =
{
	'add': {
		name: ['add', 'addition', 'plus'],
		symbol: ' + ',
	},
	'subtract': {
		name: ['subtract', 'minus','subtraction'],
		symbol: ' - ',
	},
	'multiply': {
		name: ['multiply', 'times','multiplication'],
		symbol: ' × ',
	},
	'divide': {
		name: ['divide','division'],
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
	{
		switch(method) {
		case'add':
			for(let i = 0; i < terms.length; i++)
				result += terms[i];
			break;
		case'subtract':
			result = terms[0];
			for(let i = 1; i < terms.length; i++)
				result -= terms[i];
			break;
		case'multiply':
			result = terms[0];
			terms.slice(1).forEach((value) => result *= value);

			break;
		case'divide':
			result = terms[0];
			if(terms.slice(1).includes(0))
				return next(Error('Dividing by zero is not allowed'));
			else
				terms.slice(1).forEach((value) => result /= value);
			break;
		default:
			return next(new Error('Invalid method'));
		}
		//no next function because it's the end of the end of middleware calls
		//no chances of erros
		print(result, method, terms, request, response);
	}
}
function welcome(req, res, next) {
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
		<h1 class="display-1">Simple Calculator - webapp</h1>
		<h2 class="display-2">Instructions</h2>
		<p class="lead display-6">
		Type your desired equation in the url above. Using the following syntax:</p>
		<ol>
		<li><code><strong>?</strong></code> to start your equation after the website's URL forward slash (${req.headers.host})</li>
		<li><code><strong>method</strong>: 'math operation'</code></li>
		<ul>
			<li>The valid math operations are addtion, multiplication, subtraction, and division.</li>
			<li>This (argument) is required.</li>
		</ul>
		<li><code><strong>&</strong></code>, this is required
		<li><code>var-name=number&var-different-name=number</code></li>
		<ul>
			<li><code>var-name</code>, and subsequent var-name (including <code>var-different-name</code>), must be unique;
			if one is left blank there can only be one blank var-name and if one is name 'p' there can only be one variable named 'p'.</li>
			<li>The <code>=</code> is required.</li>
			<li>the number following the equal sign is also required.</li>
			<li>No space are allowed within the url.<small>Heavily advised against</small></li>
			<li>Each number is the value to apply the math operator on in that order. Using the first number as the base value. i.e. numerator for division, initial value for subtraction, etc.</li>
			<li>You may add as many variables,<code>var-name=number</code>, as you like</li>
		</ul>
		</ol>
		<hr />
		<pre><p>Example: <code>${req.headers.host + req.url}?method=addition&x=100&=25</code></p></pre>
		<p>This will add the variable x which is 100 and the unamed variable of value 25 together.</p>
		<p>All acceptable methods are: ${Object.values(methods).map((val)=>val.name).flat().slice(0,-1).join(', ')}
	</body>
	
	</html>`;

	res.end(msg,'utf-8');
}
function parseUrl(req, res, next) {
	let url = new URL(req.url,'http://'+req.headers.host);
	if(!url.searchParams.toString())
		return welcome(req,res,next);
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).trim().split('&');
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
