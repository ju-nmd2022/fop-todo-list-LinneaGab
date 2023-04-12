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
    });
  }
  //toggle tasks
  toggle() {
    this.done = !this.done;
    this.querySelector(".task-title").classList.toggle("done");
  }
}
//custom element
customElements.define("task-item", Task);

