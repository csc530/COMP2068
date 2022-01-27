const connect = require('connect');

let app = connect();
app.listen(3000);

function calculate(request, response, next) {
}

app.use(calculate);