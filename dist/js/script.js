(function() {
  const taskInput = document.querySelector(".ToDoList__write-task");
  const tasks = document.querySelector(".ToDoList__tasks");
  const taskContainer = document.querySelector("[data-container]");

  const createNewTask = function() {
    const createTask = document.createElement("div");
    const taskText = document.createElement("div");
    taskText.classList.add("ToDoList__task-text");
    createTask.classList.add("ToDoList__task");
    taskText.innerHTML = taskInput.value;
    taskInput.value = "";
    createTask.appendChild(taskText);
    tasks.appendChild(createTask);
    createCheckBtns(createTask, taskText);
    createRemoveBtns(createTask);
  };
  const createCheckBtns = function(task, taskTekst) {
    const checkBlock = document.createElement("div");
    checkBlock.classList.add("ToDoList__check");
    const checkedTask = document.createElement('span');
    checkedTask.classList.add('ToDoList__check-task');
    task.insertBefore(checkBlock, taskTekst);
    checkBlock.appendChild(checkedTask);
    
    checkedTask.addEventListener('click', function() {
      if(task.classList.contains('checked')) {
        checkedTask.classList.remove('statusCheck');
        task.classList.remove('checked');
      } else {
        checkedTask.classList.add('statusCheck');
        task.classList.add('checked');
      }
    });
  };
  const createRemoveBtns = function(task) {
    const removeBlock = document.createElement("div");
    removeBlock.classList.add("ToDoList__remove-task");
    removeBlock.innerHTML = '<img class="remove-icon" src="img/delete.svg" alt="cross-icon">';
    task.appendChild(removeBlock);

    removeBlock.addEventListener("click", function() {
      this.parentElement.remove();
    });
  };
  taskInput.addEventListener("keydown", function(key) {
    if (key.keyCode === 13) {
      createNewTask();
      if (taskContainer.classList.contains("hide")) {
        taskContainer.classList.remove("hide");
      }
    }
  });
})();
