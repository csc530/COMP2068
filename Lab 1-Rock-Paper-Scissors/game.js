const prompt = require('prompt');
const colours = require('colors/safe');
prompt.start();
prompt.message = '';
prompt.delimiter = "";
prompt.colors = true;

let required = {
    'name': 'name',
    required: true,
    message: "Please could you tell me you're name it would really make my day :)",
    allowEmpty: false,
    type: 'string',
    description: "User's name"
};
prompt.get(required, (err, result) => {
    if(err)
        console.error(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace: \n\n${err.stack}`);
    process.stdout.write(`So your name is ${result.name}.\nHi ${result.name} nice to meet you would you like to play rock paper scissors with me?`);
});