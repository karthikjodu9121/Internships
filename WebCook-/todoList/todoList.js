function getRandomColor() {
    let randomR = Math.floor(Math.random() * 255);
    let randomG = Math.floor(Math.random() * 255);
    let randomB = Math.floor(Math.random() * 255);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoList = document.getElementById('todoList');
        const todoItem = document.createElement('li');
        todoItem.className = 'list-group-item';
        const color = getRandomColor();
        todoItem.innerHTML = `
            <input style="color: ${color};" type="text" class="form-control-plaintext" value="${todoText}" readonly>
            <div>
                <button class="btn btn-warning btn-sm mr-2" onclick="editTodoStart(this)"><i class="fas fa-edit"></i></button>
                <button class="btn btn-primary btn-sm mr-2" onclick="markCompleted(this)"><i class="fas fa-check"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(this)"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        todoList.appendChild(todoItem);
        const id = saveTodoToLocalStorage(todoText);
        todoItem.dataset.id = id;
        todoInput.value = '';
    }
}

function editTodoStart(button) {
    const todoItem = button.closest('li');
    const input = todoItem.querySelector('input[type="text"]');
    input.readOnly = false;
    input.focus();
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.onclick = function() {
        editTodoSave(button);
    };
}

function editTodoSave(button) {
    const todoItem = button.closest('li');
    const input = todoItem.querySelector('input[type="text"]');
    input.readOnly = true;
    button.innerHTML = '<i class="fas fa-edit"></i>';
    button.onclick = function() {
        editTodoStart(button);
    };
    updateTodoInLocalStorage(todoItem.dataset.id, input.value);
}

function markCompleted(button) {
    const todoItem = button.closest('li');
    const input = todoItem.querySelector('input[type="text"]');
    todoItem.classList.toggle('completed');
    updateTodoInLocalStorage(todoItem.dataset.id, input.value, todoItem.classList.contains('completed'));
}

function deleteTodo(button) {
    const todoItem = button.closest('li');
    const todoText = todoItem.querySelector('input[type="text"]').value;
    todoItem.remove();
    deleteTodoFromLocalStorage(todoItem.dataset.id);
}

function saveTodoToLocalStorage(todoText, completed = false) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const id = new Date().getTime().toString();
    todos.push({ id, text: todoText, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
    return id;
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todoList');

    todos.forEach(({ id, text, completed }) => {
        const todoItem = document.createElement('li');
        todoItem.className = `list-group-item ${completed ? 'completed' : ''}`;
        todoItem.dataset.id = id;
        const color = getRandomColor();
        todoItem.innerHTML = `
            <input style="color: ${color};" type="text" class="form-control-plaintext todo" value="${text}" readonly>
            <div>
                <button class="btn btn-warning btn-sm mr-2" onclick="editTodoStart(this)"><i class="fas fa-edit"></i></button>
                <button class="btn btn-primary btn-sm mr-2" onclick="markCompleted(this)"><i class="fas fa-check"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(this)"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

function updateTodoInLocalStorage(id, updatedText, completed = false) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => (todo.id === id ? { ...todo, text: updatedText, completed } : todo));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoFromLocalStorage(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
}
