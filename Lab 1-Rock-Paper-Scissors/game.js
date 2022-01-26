// Node imports
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
	ui: colours.userInput,
	warning: colours.warning,
	prompt: colours.prompt,
	err: colours.error,
};

/**An array reprsenting the accepted inputs to a yes or no question using prompt */
const yesOrNo = ['yes', 'no', 'y', 'n', 'Yes', 'No'];

function checkForErrors(err)
{
	if(err)
	{
		console.error(themes.err(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace:\n${err.stack}`));
		process.exit(1);
	}
}

/**
 * @description This function will ask the user iof they would like to play rock-paper-scissors again
 * @fires the main function `play()`
 * @throws Stack overflow error
 * * If the user keeps playinng again more then memory will allow for
 * * With each 'y' to play again it will recurse another level calling the head method `play()`
 * @todo Prevent the possibility of a stack overflow error
 */
function playAgain()
{
	const query = {
		'name': 'playAgain',
		description: themes.prompt('Would you like to play again? (y/n) '),
		message: themes.warning('Play again? (Y/N)'),
		enum: yesOrNo,
		type: 'string'
	};
	prompt.get(query, (err, result) =>	{
		checkForErrors(err);
		if(result && result.playAgain && result.playAgain[0].toLowerCase() === 'y')
			play();
		else
			console.log('I\'ve enjoyed our game bye-bye!');
	});
}


/**
 * @description A function to dertermine who won given 2 arguments of rock, paper, or scissors
 * @param {string} pc The pc's choice
 * @param {string} user The user's choice
 */
function winner(pc, user)
{
	pc = pc[0].toLowerCase();
	user = user[0].toLowerCase();
	let msg;
	if (pc === user)
		msg = "It's a tie!👔";
	else
	{
		switch (pc)
		{
		case 'r':
			if (user === 's')
				msg = ('Haha, I win!');
			else
				msg = ('Darn, you beat me!\nYou win!🏅');
			break;
		case 's':
			if (user === 'r')
				msg = ('Wow! You won!\nCongratulations!🎉');
			else
				msg = ('😎\nLooks like I beat you!\nI won!');
			break;
		case 'p':
			if (user === 's')
				msg = ('Amazing! You won!🌟');
			else
				msg = ('Hehehe, winner winner.\nI\'m the winner!🥳');
			break;
		default:
			console.error(themes.error('Oops! Looks like something went wrong'));
			break;
		}
	}
	console.log(themes.ui(msg));
	playAgain();
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
	prompt.get(query, (err, result) =>	{
		checkForErrors(err);
		console.log(`I choose ${pcChoice}\n`);
		winner(result.choice, pcChoice);
	});
}

/**
 * @description This will print a message of the rules of the game rock-paper-scissors
 * then aske them if they'd like to play
 */
function explainRules()
{
	const query = {
		name: 'play',
		description: themes.prompt('Would you like to play rock-paper-scissors? '),
		message: themes.warning('Please enter (Y)es or (N)o'),
		type: 'string',
		enum: yesOrNo,
	};
	const rules = 'Here are the rules of the game.\n' +
		'Rock beats scissors\n' +
		'Scissors beats paper\n' +
		'and\n' +
		'Paper beats rock';
	prompt.get(query, (err, result) =>	{
		checkForErrors(err);
		if (result['play'][0] === 'y')
		{
			console.log(colours.inverse(rules) + '\n--------------------------------\n');
			play();
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
function main()
{
	explainRules();
}

//Starts the rock paper scissors game
main();
