let prompt = require('prompt');
prompt.start();
console.dir(prompt.start);
prompt.message = '';
prompt.delimiter = "";
prompt.colors = true;

prompt.get({'name': 'name', required: true},(err,result)=>{
    if(err)
    console.error(`Something has gone wrong.\n${err.name}: ${err.message}\nStack Trace: \n\n${err.stack}`);
    process.stdout.write(`So your name is ${result.name}.\nHi ${result.name} nice to meet you would you like to play rock paper scissors with me?`);
});