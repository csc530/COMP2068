document.addEventListener('DOMContentLoaded', function () {
	const select = document.querySelector('form select#actions');
	const addAction = document.querySelector('form select#actions option#addAction');

	addAction.addEventListener('click', function (event) {
		event.preventDefault();
		addAction.selected = false;
		const action = prompt('Add action');

		if(!action)
			return;
		const option = document.createElement('option');
		option.text = action;
		option.value = action;
		select.add(option);
	});
});
