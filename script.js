document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Superior
    const dateDisplay = document.getElementById('date-display');
    const hoje = new Date();
    dateDisplay.innerHTML = `<i class="fa-regular fa-calendar"></i> ${hoje.toLocaleDateString('pt-BR')}`;

    // 2. Navegação Lateral
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const titleDisplay = document.getElementById('current-view-title');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            views.forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById(targetId);
            if(targetView) targetView.classList.add('active');

            titleDisplay.innerText = button.innerText.trim();
        });
    });

    // 3. Sistema de Tarefas (LocalStorage)
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const clearBtn = document.getElementById('clear-todos-btn');

    let todos = JSON.parse(localStorage.getItem('tarefas_painel')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.completed) li.classList.add('completed');
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
                <span>${todo.text}</span>
            `;
            todoList.appendChild(li);
        });
    }

    function saveTodos() {
        localStorage.setItem('tarefas_painel', JSON.stringify(todos));
        renderTodos();
    }

    addTodoBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            saveTodos();
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodoBtn.click();
    });

    todoList.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const index = e.target.getAttribute('data-index');
            todos[index].completed = e.target.checked;
            saveTodos();
        }
    });

    clearBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
    });

    renderTodos();
});
