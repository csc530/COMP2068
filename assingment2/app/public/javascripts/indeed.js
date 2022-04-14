// * Load jobs synchronously using socket connection
document.addEventListener('DOMContentLoaded', () => {
	const search = document.getElementById('search');
	const form = document.getElementById('form');
	const tbody = document.querySelector('table#results tbody');


	// * loading preloader elements
	const loadingTxt = document.querySelector('section#loading h1.loader__text');
	const loadingSection = document.querySelector('section#loading');

	window.location.href.replace('http', 'ws')+':8080';
	const url = 'ws://localhost:8080';
	const socket = new WebSocket(url);

	socket.onopen= event => {
		console.log('Connected to ' + url);
		socket.onmessage = message=>{
			const jobs = JSON.parse(message.data);
			updateTable(jobs);
		};
	};

	form.addEventListener('submit', event => {
		event.preventDefault();
		const data = search.value.trim();
		console.log(data);
		const rows = document.querySelectorAll('table#results tbody tr');
		console.log(rows);
		// ? deleate the rows; of previous query
		rows.forEach(row=> row.remove());
		loadingSection.classList.remove('is-hidden');
		loadingTxt.textContent = `Searching Indeed for '${data}'`;
		socket.send(data);
	});

	function updateTable(jobs){
		loadingSection.classList.add('is-hidden');
		for(let i = 0; i < jobs.length; i++) {
			const job = jobs[i];
			const row = document.createElement('tr');
			const title = document.createElement('td');
			const snippet = document.createElement('td');
			const salary = document.createElement('td');
			const postedDate = document.createElement('td');
			const actions = document.createElement('td');

			const add = document.createElement('button');
			const view = document.createElement('a');
			

			const info = [title, snippet, salary, postedDate];

			title.textContent = job['job-title'];
			snippet.textContent = job['job-snippet'];
			salary.textContent = job['job-salary'];
			postedDate.textContent = job['pos-date'];


			info.forEach(item => row.appendChild(item));
			tbody.appendChild(row);
		}
	}

});
