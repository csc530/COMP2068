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
	error: ['red', 'bold'],
	warning: ['yellow', 'underline'],
	prompt: 'blue',
});

/** Colour object: colours text passed to the called property function */
const themes = {
	ui: colours.error,
	warning: colours.warning,
	prompt: colours.prompt,
};

function checkForErrors(err)
{
	if (err)
	{
		console.log(themes.err(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace:\n${err.stack}`));
		process.exit(1);
	}
}


/**
 *  * A function to dertermine who won given 2 arguments of rock, paper, or scissors
 * @param {string} pc The pc's choice
 * @param {string} user The user's choice
 */
function winner(pc, user)
{
	pc = pc[0].toLowerCase();
	user = user[0].toLowerCase();
	if (pc === user)
		console.log(themes.ui("It's a tie!👔"));
	else
	{
		switch (pc)
		{
		case 'r':
			if(user === 's')
				console.log('Haha, I win!');
			else
				console.log('Darn, you beat me!\nYou win!🏅');
			break;
		case 's':
			if(user === 'r')
				console.log('Wow! You won!\nCongratulations!🎉');
			else
				console.log('😎\nLooks like I beat you!\nI won!');
			break;
		case 'p':
			if(user ==='s')
				console.log('Amazing! You won!🌟');
			else
				console.log('Hehehe, winner winner.\nI\'m the winner!🥳');
			break;
		default:
			console.error('Oops! Looks like something went wrong');
			break;
		}
	}
	return '';
}
/**
 * This will execute the game of rock-paper-scissors
 * It will get the user's choice and compare it to the computer's choice
 * and then a winner will be decided if there is one
 */
function play()
{
	const query = {
		name: 'choice',
		allowEmpty: false,
		required: true,
		description: themes.prompt('Choose to play (R)ock, (P)aper, or (S)cissors: '),
		message: themes.warning('Please enter either R, P, or S'),
		type: 'string',
		enum: [
			'rock',
			'paper',
			'scissors',
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
	prompt.get(query, (err, result) =>
	{
		checkForErrors(err);
		console.log(themes.ui(`I choose ${pcChoice}\n`));
		return winner(result.choice, pcChoice);
	});
}

function explainRules()
{
	const query = {
		name: 'play', description: themes.prompt('Would you like to play rock-paper-scissors? '),
		message: themes.warning('Please enter (Y)es or (N)o'),
		type: 'string',
		enum: ['yes', 'no', 'y', 'n', 'Yes', 'No'],
	};
	const rules = 'Here are the rules of the game.\n' +
		'Rock beats scissors\n' +
		'Scissors beats paper\n' +
		'and\n' +
		'Paper beats rock';
	prompt.get(query, (err, result) =>
	{
		checkForErrors(err);
		if (result['play'][0] === 'y')
		{
			console.log(rules + '\n--------------------------------\n');
			return play();
		}
		else
			console.log('That\'s ok 😃\nbye bye!');
	});
}


/**
 * A function to randomly pick rock paper or scissors
 * @returns a string of either rock, paper, or scissors
 */
function randomRPS()
{
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
//TODO: Chain together all prompts so they're result calls the next apprpriate method mighyt cause some recursion byt eh 🤷
function main()
{
	const playAgainProps = {
		name: 'Play again,',
		default: false,
		type: 'boolean',
		description: themes.prompt('Do you want to play again?'),
		message: themes.warning('Play again? (Y/N)'),
	};
	explainRules();
	//	let playAgain = true;
	//	while (playAgain) {
	//		play();
	//		prompt.get(playAgainProps, (err, res) => {
	///			checkForErrors();
	//			playAgain = res;
	//		});
	//	}
	//	console.log(themes.ui(`Good bye for ${name}`));
}

//Starts the rock paper scissors game
main();
