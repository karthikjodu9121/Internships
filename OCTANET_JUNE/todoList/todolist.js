document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoBtn = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const clearTodosBtn = document.getElementById("clear-todos");

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F39C12", "#8E44AD", "#1ABC9C", "#E74C3C"];

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    };

    const saveTodos = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getTodos = () => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    };

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const addTodoToDOM = (todo) => {
        const li = document.createElement("li");
        li.className = `list-group-item todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;
        li.style.backgroundColor = todo.color;
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-buttons">
                <button class="btn btn-success complete-todo" title="Mark as Completed"><i class="fas fa-check"></i></button>
                <button class="btn btn-primary edit-todo" title="Edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-danger delete-todo" title="Delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    };

    const addTodo = (text) => {
        const todos = getTodos();
        const newTodo = { id: Date.now(), text, completed: false, color: getRandomColor() };
        todos.push(newTodo);
        saveTodos(todos);
        addTodoToDOM(newTodo);
    };

    const updateTodo = (id, updatedText) => {
        let todos = getTodos();
        todos = todos.map(todo => todo.id === id ? { ...todo, text: updatedText } : todo);
        saveTodos(todos);
        renderTodos();
    };

    const deleteTodo = (id) => {
        let todos = getTodos();
        todos = todos.filter(todo => todo.id !== id);
        saveTodos(todos);
        renderTodos();
    };

    const toggleCompleteTodo = (id) => {
        let todos = getTodos();
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        saveTodos(todos);
        renderTodos();
    };

    const clearTodos = () => {
        localStorage.removeItem("todos");
        renderTodos();
    };

    const renderTodos = () => {
        todoList.innerHTML = "";
        loadTodos();
    };

    addTodoBtn.addEventListener("click", () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = "";
        }
    });

    todoList.addEventListener("click", (e) => {
        const id = parseInt(e.target.closest("li").dataset.id);
        if (e.target.closest(".delete-todo")) {
            deleteTodo(id);
        } else if (e.target.closest(".complete-todo")) {
            toggleCompleteTodo(id);
        } else if (e.target.closest(".edit-todo")) {
            const newText = prompt("Edit your task", e.target.closest("li").querySelector(".todo-text").textContent);
            if (newText) {
                updateTodo(id, newText);
            }
        }
    });

    clearTodosBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all todos?")) {
            clearTodos();
        }
    });

    loadTodos();
});
