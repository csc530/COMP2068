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
const themes = {
	ui: colours.error,
	warning: colours.warninig,
	prompt: colours.prompt,
};

/**
 * A function that will prompt the user for thier name
 * @returns the usser's name as a string
 */
function getUserName() {
	/** a prompt schema to hold properties validation */
	let name = {
		name: 'name',
		required: true,
		message: themes.warning("Please could you tell me you're name it would really make my day 😺"),
		allowEmpty: true,
		default: 'User',
		type: 'string',
		description: themes.prompt("User's name "),
	};
	prompt.get(name, (err, result) => {
		checkForErrors(err);
		process.stdout.write(`So your name is ${themes.ui(result.name)}.\n`);
		process.stdout.write(`Hi ${themes.ui(result.name)}`);
		console.log('nice to meet you would you like to play rock paper scissors with me?\n');
		return result;
	});
}

function checkForErrors(err) {
	if (err)
		console.log(themes.err(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace:\n${err.stack}`));
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

/**
 * This will execute the game of rock-paper-scissors
 * It will get the user's choice and compare it to the computer's choice
 * and then a winner will be decided if there is one
 */
async function play() {
	const rps = {
		name: 'choice',
		allowEmpty: false,
		required: true,
		description: themes.prompt('Choose to play (R)ock, (P)aper, or (S)cissors: '),
		message: themes.warning('Please enter either R, P, or S'),
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

/**
 * Main function the application will run to play Rock-Paper-Scissors
 */
function main() {
	const playAgainProps = {
		name: 'Play again,',
		default: false,
		type: 'boolean',
		description: themes.prompt('Do you want to play again?'),
		message: themes.warning('Play again? (Y/N)'),
	};
	let name  = getUserName();
	explainRules();
	let playAgain = true;
	while (playAgain) {
		play();
		prompt.get(playAgainProps, (err, res) => {
			checkForErrors();
			playAgain = res;
		});
	}
	console.log(themes.ui(`Good bye for ${name}`));
}

//Starts the rock paper scissors game
main();
