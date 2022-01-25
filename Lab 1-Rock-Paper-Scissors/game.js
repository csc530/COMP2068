//Node imports
// const prompt = require("/usr/local/lib/node_modules/prompt/lib/prompt.js");
const prompt = require('prompt');
const colours = require('colors/safe');

//setup prompt and colours module
prompt.start();
prompt.message = '';
prompt.delimiter = '';
prompt.colors = true;
colours.enable();

//create colour themes when printing to the console
colours.setTheme({
	userInput: ['green', 'italic'],
	error: 'red',
	warning: ['yellow', 'trap'],
	prompt: ['blue', 'bold',]
});

/** Colour object: colours text passed to the called property function */
const colour = {
	ui: colours.error,
	warning: colours.warninig,
	prompt: colours.prompt,
};
/** a prompt schema to hold properties validation and  */
let required = {
	'name': 'name',
	required: true,
	message: colours.error("Please could you tell me you're name it would really make my day :)"),
	allowEmpty: false,
	type: 'string',
	description: colours.prompt("User's name "),
};
function getUserName() {
	prompt.get(required, (err, result) => {
		checkForErrors(err);
		process.stdout.write(`So your name is ${colour.ui(result.name)}.\nHi ${colour.ui(result.name)} nice to meet you would you like to play rock paper scissors with me?\n`);
	});
}
function checkForErrors(err) {
	if (err)
		console.error(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace: \n\n${err.stack}`);
	process.exit(1);
}

async function explainRules() {
	const rules = 'Rock beats scissors' +
		'\nScissors beats paper' +
		'\nand' +
		'\nPaper beats rock';
	console.log(rules);
	return await prompt.get('start')['start'];
}

async function play() {
	const playAgain = {
		name: 'Play again,',
		default: false,
		type: 'boolean',
		description: 'Do you want to play again?',
		message: 'Play again? (Y/N)',
	};
	const rps = null;
	const choice = rps();
	const userChoice = prompt.get({name: 'rps'});
}

function main() {
	getUserName();
	explainRules();
	let playAgain = true;
	while (playAgain)
		playAgain = play();
}

//Starts the rock paper scissors game
main();
