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
	prompt: ['blue', 'bold'],
});

/** Colour object: colours text passed to the called property function */
const colour = {
	ui: colours.error,
	warning: colours.warninig,
	prompt: colours.prompt,
};


function getUserName() {
	/** a prompt schema to hold properties validation and  */
	let required = {
		name: 'name',
		required: true,
		message: colours.error("Please could you tell me you're name it would really make my day 😺"),
		allowEmpty: false,
		type: 'string',
		description: colours.prompt("User's name "),
	};
	prompt.get(required, (err, result) => {
		checkForErrors(err);
		process.stdout.write(`So your name is ${colour.ui(result.name)}.\n`);
		process.stdout.write(`Hi ${colour.ui(result.name)}`);
		console.log('nice to meet you would you like to play rock paper scissors with me?\n');
	});
}

function checkForErrors(err) {
	if (err)
		console.log(colours.err(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace:\n${err.stack}`));
	process.exit(1);
}

async function explainRules() {
	const rules =
		'Rock beats scissors\n' +
		'Scissors beats paper\n' +
		'and\n' +
		'Paper beats rock';
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
	const rps = {
		name: 'choice',
		allowEmpty: false,
		required: true,
		description: 'Choose to play (R)ock, (P)aper, or (S)cissors: ',
		message: 'Please enter either R, P, or S',
		type: 'string',
		enum: [
			'rock',
			'paper',
			'Scissors',
			's',
			'p',
			'r',
			'R',
			'P',
			'S',
			'Rock',
			'Paper',
			'Scissors',
		],
	};
	const pcChoice = randomRPS();
	const {choice} = await prompt.get(rps)['choice'];
}

/**
 * A function to randomly pick rock paper or scissors
 * @returns a string of either rock, paper, or scissors
 */
function randomRPS() {
	//Math.random() function to generate a number as computerSelection:
	//0 - .34 => PAPER,.35 - .67 => SCISSORS, .68 - 1 => ROCK
	const num = Math.random();
	if (num < 0.35) return 'paper';
	else if (num < 0.68) return 'scissors';
	else return 'rock';
}

function main() {
	getUserName();
	explainRules();
	let playAgain = true;
	while (playAgain) {
		playAgain = play();
	}
}

//Starts the rock paper scissors game
main();
