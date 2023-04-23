// Variables
let todos = [];

// sekecting

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const formError = document.querySelector(".form--error");
const selectfFilter = document.querySelector(".filter-todos");
// Events
todoForm.addEventListener("submit", addNewTodo);
selectfFilter.addEventListener("change", filterTodos);
// functions

function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) {
    formError.style.display = "block";
    todoForm.style.border = "2px solid var(--mainRed)";
    return;
  }

  formError.style.display = "none";
  todoForm.style.border = "1px solid var(--primaryColor)";
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);

  createTodos(todos);
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
            <p class="todo__title"> ${todo.title}</p>
            <span class="todo__createdAt">${new Date(
              todo.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <div>
              <button class="todo__check" data-todo-id=${
                todo.id
              }><i class=" fa-solid fa-circle-check"></i> </button>
              <button class="todo__remove" data-todo-id=${
                todo.id
              }><i class=" fa-solid fa-trash"></i> </button>
            </div>
          </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtn = [... document.querySelectorAll(".todo__remove")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));
  
}

function filterTodos(e) {
  const filter = e.target.value;
  switch (filter) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default: {
      createTodos(todos);
    }
  }
}

function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  createTodos(todos);
}
