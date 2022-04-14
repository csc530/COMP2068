// * Load jobs synchronously using socket connection
window.location.href.replace('http', 'ws')+':8080';
const url = 'ws://localhost:8080';
const socket = new WebSocket(url);
console.dir(url);
console.dir(socket);

socket.onopen= event => {
	console.log('Connected to ' + url);
	socket.onmessage = message=>{
		console.log(message.data);
		console.log(JSON.parse(message.data));
	};
	socket.send('Hey', e=>console.log(e));
	socket.send('pizza hut');
};
