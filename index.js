const newTaskForm = document.getElementById("new-task");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


newTaskForm.addEventListener("submit", createTask)

listTasks()

const actualTaskLabel = document.querySelectorAll(".tasks__task")

function createTask(e) {
  e.preventDefault();
  const newTaskInput = document.getElementById("new-task__input")

  tasks.push({ description: newTaskInput.value, isChecked: false })

  saveTask(tasks)
  listTasks(tasks)
  document.getElementById("new-task__input").value = ""
}

function saveTask(tasks) {
  const tasksJSON = JSON.stringify(tasks)

  localStorage.setItem("tasks", tasksJSON)
}

function listTasks() {
  const taskCard = document.getElementById("tasks__group")

  taskCard.innerHTML = "";

  tasks.forEach((actualElement, index) => {
    taskCard.innerHTML += `
    <li class="tasks__task">
      <input class="tasks__checkbox" type="checkbox" id="tasks__checkbox" ${actualElement.isChecked ? "checked" : ""} onchange="${() => handleChange(index)}">
      <label contenteditable class="tasks__label" id="tasks__label" oninput="${(event) => handleTask(event, index)}">
        ${actualElement.description.charAt(0).toUpperCase() + actualElement.description.substr(1)}
      </label>
    </li>
  `
  })
}

const handleTask = (event, index) => {
  const labelText = event.target.textContent
  if (labelText === "") {
    tasks.splice(index, 1)
    saveTask(tasks)
    listTasks()
  } else {
    tasks[index].description = labelText
    saveTask(tasks)
  }
}

const handleChange = (index) => {
  tasks[index].isChecked = !tasks[index].isChecked
  saveTask(tasks)
}

actualTaskLabel.forEach((actualTask, index) => {
  actualTask.querySelector("label").addEventListener("input", (event) => handleTask(event, index))
  actualTask.querySelector("input").addEventListener("change", () => handleChange(index))
})
