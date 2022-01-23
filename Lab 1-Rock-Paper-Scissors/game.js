//Node imports
const prompt = require("prompt");
const colours = require("colors/safe");

//setup prompt and colours module
prompt.start();
prompt.message = "";
prompt.delimiter = "";
prompt.colors = true;
colours.enable();

//create colour themes when printing to the console
colours.setTheme({
	userInput: ["green", "italic"],
	error: "red",
	warning: ["yellow", "trap"],
	prompt: ["blue", "bold",]
});
/** Colour object: colours text passed to the called property function */
const colour = {
	ui: colours.error,
	warning: colours.warninig,
	prompt: colours.prompt,
};
/** a prompt schema to hold properties validation and  */
let required = {
	"name": "name",
	required: true,
	message: colours.error("Please could you tell me you're name it would really make my day :)"),
	allowEmpty: false,
	type: "string",
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
	console.log(rules);
	return await prompt.get("start")['start'];
}

function play() {

}

function main() {
	getUserName();
}

//Starts the rock paper scissors game
 main();
