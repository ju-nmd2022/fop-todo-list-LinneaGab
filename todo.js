//course material has also been used as a reference

class Task extends HTMLElement {
  constructor(title) {
    super();
    this.title = title;
    this.done = false;

    document.querySelector(".task-list").appendChild(this);
  }

  connectedCallback() {
    this.classList.add("task");
    // Googled how to use variables in strings
    this.innerHTML = `
      <p class="task-title">${this.title}</p>
      <div class="task-buttons">
        <button id="done-button" class="task-button">✅</button>
        <button id="delete-button" class="task-button">❎</button>
      </div>
    `;

    this.querySelector("#done-button").addEventListener("click", () => {
      this.toggle();
    });

    this.querySelector("#delete-button").addEventListener("click", () => {
      this.remove();
      saveTasks();
    });
  }
  //toggle tasks
  toggle() {
    this.done = !this.done;
    this.querySelector(".task-title").classList.toggle("done");
    saveTasks();
  }
}
//custom element
customElements.define("task-item", Task);

//save tasks to local storage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      title: task.querySelector(".task-title").innerText,
      done: task.querySelector(".task-title").classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks from local storage
function loadTasks() {
  //get tasks from local storage
  const TASKS = JSON.parse(localStorage.getItem("tasks"));
  if (TASKS) {
    //create tasks from data
    TASKS.forEach((task) => {
      const TASK = new Task(task.title);
      if (task.done) {
        //apply done status
        TASK.toggle();
      }
    });
  }
}

//adding tasks
function loadHandler() {
  const INPUT = document.querySelector("#inputbox");
  INPUT.focus();
  loadTasks();
  //add tasks with button
  document.querySelector("#add-button").addEventListener("click", () => {
    if (INPUT.value === "") return;
    new Task(INPUT.value);
    INPUT.value = "";
    INPUT.focus();

    saveTasks();
  });
  //add tasks with enter key, used ChatGPT
  INPUT.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector("#add-button").click();
    }
  });
}

window.addEventListener("load", loadHandler);
