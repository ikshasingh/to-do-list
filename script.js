document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const totalCount = document.getElementById('total-count');
    let todos = [];

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        renderTodos();
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();

        todoInput.value = '';
        todoInput.focus();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        emptyState.style.display = todos.length === 0 ? 'block' : 'none';
        totalCount.textContent = todos.length;

        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = 'todo-item';
            if (todo.completed) {
                todoItem.classList.add('completed');
            }

            todoItem.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="delete-btn" data-id="${todo.id}">×</button>
                </div>
            `;

            todoList.appendChild(todoItem);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteTodo);
        });
    }

    function deleteTodo(e) {
        const id = Number(e.target.getAttribute('data-id'));
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
