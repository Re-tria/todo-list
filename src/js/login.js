const loginForm = document.querySelector(".login-form");
const loginInput = loginForm.querySelector("input");

const greeting = document.querySelector(".greeting");

const toDoContents = document.querySelector(".todo");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();

  // Save username in localStorage
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);

  // During 1 second, loginForm slowly disappears(opacity=0)
  loginForm.style.opacity = 0;

  // After 1 second, completely disappears loginForm(display=none)
  // and paint Greeting(display)
  setTimeout(() => {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreeting(username);
  }, 1000);
}

function paintGreeting(username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello ${username}`;

  // After 3 second, completely disappears greeting(display=none)
  // and paint ToDo List
  setTimeout(() => {
    greeting.classList.add(HIDDEN_CLASSNAME);
    toDoContents.classList.remove(HIDDEN_CLASSNAME);
  }, 3000);
}

// If username is saved in localStorage, got this
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}
