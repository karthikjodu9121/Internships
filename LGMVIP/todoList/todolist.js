document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load todos from localStorage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const addTodo = (text) => {
        const todo = {
            text,
            completed: false,
            id: Date.now().toString()
        };
        todos.push(todo);
        saveTodos();
        renderTodo(todo);
    };

    function genColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const renderTodo = (todo) => {
        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.textContent = todo.text;
        span.style.fontWeight = "bold";
        span.style.color = genColor();
        

        const buttonContainer = document.createElement("div");

        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-complete me-2";
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.addEventListener("click", () => toggleComplete(todo.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-delete";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));

        buttonContainer.append(completeButton, deleteButton);

        li.append(span, buttonContainer);
        todoList.appendChild(li);
    };

    const toggleComplete = (id) => {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    };

    const deleteTodo = (id) => {
        const index = todos.findIndex(t => t.id === id);
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    const renderTodos = () => {
        todoList.innerHTML = "";
        todos.forEach(renderTodo);
    };

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = todoInput.value.trim();
        if (text !== "") {
            addTodo(text);
            todoInput.value = "";
        }
    });

    // Initial render
    renderTodos();
});
