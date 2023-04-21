// Variables
const todos = [];

// sekecting

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const formError = document.querySelector(".form--error");
// Events
todoForm.addEventListener("submit", addNewTodo);

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

  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
            <p class="todo__title"> ${todo.title}</p>
            <span class="todo__createdAt">${new Date(
              todo.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <div>
              <button data-todo-id=${
                todo.id
              }><i class="todo__check fa-solid fa-circle-check"></i> </button>
              <button data-todo-id=${
                todo.id
              }><i class="todo__remove fa-solid fa-trash"></i> </button>
            </div>
          </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
}
