const prompt = require('prompt');
const colours = require('colors/safe');
prompt.start();
colours.enable();

colours.setTheme({
    userInput: ['green', 'italic'],
    error: 'red',
    warning: ['yellow', 'trap'],
    prompt: ['blue', 'bold', ]
});
const cUi = colours.userInput;
const cError = colours.error;
const cWarning = colours.warninig;
const cPrompt = colours.prompt;
prompt.message = '';
prompt.delimiter = "";
prompt.colors = true;

let required = {
    'name': 'name',
    required: true,
    message: colours.error("Please could you tell me you're name it would really make my day :)"),
    allowEmpty: false,
    type: 'string',
    description: colours.prompt("User's name: "),
};
prompt.get(required, (err, result) => {
    if(err)
        console.error(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace: \n\n${err.stack}`);
    process.stdout.write(`So your name is ${cUi(result.name)}.\nHi ${cUi(result.name)} nice to meet you would you like to play rock paper scissors with me?\n`);
});

