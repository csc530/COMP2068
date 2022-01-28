const connect = require('connect');
/**
 * contains the name of each method the calculator can perform
 * and the associated symbol of such
 */
const methods =
{
	'add': {
		name: ['add', 'addition', 'plus'],
		symbol: ' + ',
	},
	'subtract': {
		name: ['subtract', 'minus', 'subtraction'],
		symbol: ' - ',
	},
	'multiply': {
		name: ['multiply', 'times', 'multiplication'],
		symbol: ' × ',
	},
	'divide': {
		name: ['divide', 'division'],
		symbol: ' ÷ '
	},
	/**
	 * function to determine if the string is one of the name of a method
	 * @param {string} val the string to check
	 * @returns null if the string is not one of the name of a method, or returns the property name of the method it was found in
	 */
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

//creates the app
let app = connect();
//docks app to port 300
app.listen(3000);

/**
 * This will print an html page of the completed math function to the ServerResponse object
 * @param {Number} result The result of the math function
 * @param {string} operation The math operation that was completed
 * @param {Array.<Number>} terms the values of the math operation
 * @param {ServerResonse} res The Server response to send back to the user
 */
function print(result, operation, terms, res) {
	res.writeHead(200, 'All done!');
	//wraps each terms in HTML
	terms = terms.map((value) => value = '<strong>' + String(value) + '</strong>');
	let termsList = [];
	//creates an HTML list for each term
	terms.forEach((term) => termsList.push(`<li class="display-6 list-group-item" col-1>${term}</li>`));
	//html page to print
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

/**
 * @param {Object} operation An object holding the math operation to perform, 'method', and the terms to execute it on, as subsequent properties
 * @param {ServerResponse} response The Server response to send back to the user
 * @param {connect.NextFunction} next The next function to execute in case of success or failure
 * @returns void
 */
function calculate(operation, response, next) {
	//gets standard name of method
	const method = methods.findMethod(operation.method);
	//converts array (elements) to Number (type)
	const terms = Object.values(operation).slice(1).map(Number);
	let result = Number(0);
	//validates there are enough arguments to do the math
	if(terms.length < 2)
		next(Error('2 arguments are required. Not enough arguments to perform valid math operations'));
	else{
		//performs correct math operation according to method var
		switch(method) {
		case'add':
			for(let i = 0; i < terms.length; i++)
				result += terms[i];
			break;
		case'subtract':
			//sets the initail value as the first url var and subtracts the rest from it
			result = terms[0];
			for(let i = 1; i < terms.length; i++)
				result -= terms[i];
			break;
		case'multiply':
			//sets the initail value as the first url var so it doesn't just multiuply by zero
			result = terms[0];
			terms.slice(1).forEach((value) => result *= value);
			break;
		case'divide':
			//sets the divisor value as the first url var so it doesn't just divide by zero
			result = terms[0];
			//check if the divisor is zero
			if(terms.slice(1).includes(0))
				return next(Error('Dividing by zero is not allowed'));
			else
				terms.slice(1).forEach((value) => result /= value);
			break;
		default:
			//if something weird happens throw an error
			return next(new Error('Invalid method'));
		}
		//print the result of math
		print(result, method, terms, response);
	}
}

/**
 * Will display an html page describing how to use this nodejs webapp
 * @param {connect.IncomingMessage} req The incomming message from the server
 * @param {ServerResponse} res The Server response to send back to the user
 */
function welcome(req, res) {
	res.writeHead(200, 'Learn to use simple calculator');
	//html page to display
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
		<p>All acceptable methods are: ${Object.values(methods).map((val) => val.name).flat().slice(0, -1).join(', ')}
	</body>
	
	</html>`;

	res.end(msg, 'utf-8');
}

/**
 * This will parse the url and determine to show home page or try to perform a math function
 * @param {connect.IncomingMessage} req The incomming Server request
 * @param {ServerResonse} res The Server response to be sent back to the user
 * @param {connect.NextFunction} next The next function to execute in case of success or failure
 * @returns void
 */
function parseUrl(req, res, next) {
	//creates a URL object to easily identify they have an searchparams
	let url = new URL(req.url, 'http://' + req.headers.host);
	//if there are no search parameters display the home page
	if(!url.searchParams.toString())
		return welcome(req, res, next);
	//gets each of the parameters from the url
	let queryString = req.url.substring(req.url.indexOf('?') + 1).trim().split('&');
	let params = queryString.filter((value) => value.includes('=', 0));
	let operation = {method: ''};
	//add operator the operation object then each subsequent search parameter variable
	for(let i = 0; i < params.length; i++) {
		//the name will be first element then the value
		let elems = params[i].split('=');
		//add property to the operation object
		Object.defineProperty(operation, elems[0], {
			//controls whether or not the property other than the value and writable can be edited or deleted
			configurable: false,
			enumerable: true,
			value: elems[1],
			//if value of the property is editable/changeable
			writable: true
		});
	}
	//if the method is invalid, display error
	if(!methods.findMethod(operation.method)) {
		if(operation.method)
			next(new Error('Method "' + operation.method + '" does not exist.'));
		else
			next(new Error('No math operator/method was entered'));
	}
	else //if the math operation method is valid, try to execute the math operation
		calculate(operation, res, next);
}
/**
 * This is used to handle any and all errors displaying them to the user
 * @param {Error} error The error that occurred
 * @param {connect.IncomingMessage} req The incomming Server request that caused the error
 * @param {ServerResponse} res The respose to send back to the client of the error
 * @param {connect.NextFunction} next The next function to execute after handling the error
 */
function err(error, req, res, next) {
	//write in response header an error occured
	res.writeHead(400, error.message);
	//HTLML message of the error
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
	res.end(msg, 'utf8');
}

/**
 * This is the main function that will power the simple calculator
 * @param {connect.IncomingMessage} req The server request
 * @param {ServerResponse} res The server response to the Server's request
 * @param {connect.NextFunction} next The next function to execute
 */
function calculator(req, res, next) {
	parseUrl(req, res, next);
}

//attaches the middleware to the server
app.use(calculator);
app.use(err);
