const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-lists");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function onToDoSubmit(event) {
  event.preventDefault();

  // Save newTodo in toDos
  const newTodo = toDoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);

  // Save in LocalStorage
  saveToDos();

  // Paint ToDo
  paintToDo(newTodoObj);

  // Delete ToDo value in Input
  toDoInput.value = "";
}

function deleteToDo(event) {
  // Select Target List
  const li = event.target.parentElement;

  // Erase Target in toDos
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));

  // Save in LocalStorage
  saveToDos();

  // Delete in HTML
  li.remove();
}

function paintToDo(newTodoObj) {
  // Create List
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  li.classList.add("todo-list");

  // Create and Add Span in List
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;
  li.appendChild(span);

  // Create and Add Button in List
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(button);

  // Add List in toDoList
  toDoList.appendChild(li);
}

// Default Event
toDoForm.addEventListener("submit", onToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  // If localStorage is not null, save in toDos
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
