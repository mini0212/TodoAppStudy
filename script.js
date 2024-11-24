// 변수 및 상수 생성
const list = document.getElementById('list');
const createButton = document.getElementById('create-button');

let todos = [];

// todo 생성 버튼 액션
createButton.addEventListener('click', createNewTodo);

// 새 todo 생성
function createNewTodo() {
	console.log('todo 생성');

	const item = {
		id: new Date().getTime(),
		text: '',
		isComplete: false,
	};

	// 배열 처음에 새로운 아이템 추가
	todos.unshift(item);

	// 요소 생성
	const { itemElement, inputElement } = createTodoElement(item);

	// 리스트 요소 안에 방금 생성한 아이템 요소 추가(가장 첫번째로)
	list.prepend(itemElement);

	// Remove disable attribute
	inputElement.removeAttribute('disabled');
	// focus on input element
	inputElement.focus();
}

function createTodoElement(item) {
	console.log('todo 요소 생성');

	const itemElement = document.createElement('div');
	itemElement.classList.add('item');

	const checkboxElement = document.createElement('input');
	checkboxElement.type = 'checkbox';
	checkboxElement.checked = item.isComplete;

	if (item.isComplete) {
		itemElement.classList.add('complete');
	}

	const inputElement = document.createElement('input');
	inputElement.type = 'text';
	inputElement.value = item.text;
	inputElement.setAttribute('disabled', '');

	const actionElement = document.createElement('div');
	actionElement.classList.add('actions');

	const editButton = document.createElement('button');
	editButton.classList.add('material-icons');
	editButton.innerText = 'edit';

	const removeButton = document.createElement('button');
	removeButton.classList.add('material-icons', 'remove-button');
	removeButton.innerText = 'remove_circle';

	actionElement.appendChild(editButton);
	actionElement.appendChild(removeButton);

	itemElement.appendChild(checkboxElement);
	itemElement.appendChild(inputElement);
	itemElement.appendChild(actionElement);

	// 요소별 이벤트 리스너 추가
	inputElement.addEventListener('input', () => {
        console.log('input');
		item.text = inputElement.value;
	});

	checkboxElement.addEventListener('change', () => {
		item.isComplete = checkboxElement.checked;
        console.log('change');
		if (item.isComplete) {
			itemElement.classList.add('complete');
		} else {
			itemElement.classList.remove('complete');
		}
	});

	inputElement.addEventListener('blur', () => {
        console.log('blur');
		inputElement.setAttribute('disabled', '');
	});

	editButton.addEventListener('click', () => {
        console.log('edit');
		inputElement.removeAttribute('disabled');
		inputElement.focus();
	});

    removeButton.addEventListener('click', () => {
        console.log('remove');
        todos = todos.filter(t => t.id !== item.id);
        itemElement.remove();
    });

	return {
		itemElement,
		inputElement,
		editButton,
		removeButton,
	};
}
