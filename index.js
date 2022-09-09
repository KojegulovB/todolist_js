const addBtn = document.querySelector(".boxAdd__button");

const taskInput = document.querySelector(".boxAdd__input");

const boxTasks = document.querySelector(".boxCards");

let tasks = [];

let todoItem = [];

if(localStorage.tasks){
  tasks = JSON.parse(localStorage.getItem("tasks"))
}

function Task(text) {
  this.text = text;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
    <div class="boxCards__card ${
      task.completed ? "boxCards__card-completed" : ""
    }">
        <p class="boxCards__description">${task.text}</p>
        <div>
            <input type="checkbox" class="boxCards__checkbox" ${
              task.completed ? "checked" : ""
            } onclick="completeTask(${index})">
            <button class="boxCards__button" onclick="deleteTask(${index})">Delete</button>
        </div>
    </div>
   `;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  boxTasks.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      boxTasks.innerHTML += createTemplate(item, index);
    });
    todoItem = document.querySelectorAll(".boxCards__card");
  }
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateLocal();
  fillHtmlList();
};

addBtn.addEventListener("click", () => {
  tasks.push(new Task(taskInput.value));
  fillHtmlList();
  updateLocal();
  taskInput.value = "";
});

const deleteTask = (index) => {
  todoItem[index].classList.add("anim");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500);
};
