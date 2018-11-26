(function() {
  const toDoApp = document.querySelector(".ToDoApp__header");
  const newTask = document.querySelector(".ToDoApp__create");
  const unchecked =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#eeeeee" stroke-width="3"/></svg>';
  const checked =
  // Replace.
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#eeeeee" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>';
  const taskContainer = document.querySelector(".ToDoApp__main");
  const clearAllBtn = document.querySelector(".ToDoApp__clear");
  const showAllTabs = document.querySelector("[data-tabs=all]");
  const showActiveTabs = document.querySelector("[data-tabs=active]");
  const showCompletedTabs = document.querySelector("[data-tabs=complited]");

  const createTaskContent = function(toDoItem,text) {
    // TOGGLE
    const toggleBlock = document.createElement("div");
    toggleBlock.classList.add("check");

    const toggle = document.createElement("label");
    toggle.classList.add("toggle");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");

    const toogleIcons = document.createElement("div");
    toogleIcons.classList.add("toggleIcon");
    toogleIcons.innerHTML = unchecked; // put our icon.

    toggle.appendChild(toogleIcons);
    toggle.appendChild(checkbox);
    toggleBlock.appendChild(toggle);
    toDoItem.appendChild(toggleBlock);

    // TASK TEXT
    const taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.innerHTML = text;
    toDoItem.appendChild(taskText);
    // REMOVE BTN
    const removeBtn = document.createElement("div");
    removeBtn.classList.add("remove");
    removeBtn.innerHTML = "✕";
    toDoItem.appendChild(removeBtn);

    removeBtn.addEventListener("click", destroyTask);
  };

  const createTask = function(text) {
    const toDoList = document.querySelector(".ToDoApp__list"); // ul.
    const createItems = document.createElement("li"); // create li - items
    createItems.setAttribute("data-status", "active"); // set data atribute for li - items
    createItems.classList.add("ToDoApp__item"); // set class name for li - items
    toDoList.appendChild(createItems); // pul (list = li) in our ul.

    createTaskContent(createItems,text);
  };

  const updateCounter = function() {
    const counter = document.querySelector("[data-counter]");
    const activeTasks = document.querySelectorAll("[data-status=active]");
    counter.innerHTML = activeTasks.length;
  };

  const compliteTasks = function() {
    const toDoList = document.querySelector(".ToDoApp__list");
    toDoList.addEventListener("click", function(event) {
      if (event.target.classList.contains("checkbox")) {
        let toggleItem = event.target.closest("[data-status]");
        let fontTransformation = toggleItem.querySelector('.task-text');
        let changeToggleIcons = event.target.parentElement.querySelector(".toggleIcon");
        if (event.target.checked) {
          toggleItem.dataset.status = "complited";
          changeToggleIcons.innerHTML = checked;
          fontTransformation.classList.add('complited');
        } else {
          toggleItem.dataset.status = "active";
          changeToggleIcons.innerHTML = unchecked;
          fontTransformation.classList.remove('complited');
        }
      }
      updateCounter();
    });
  };
  const destroyTask = function() {
    this.parentElement.remove();
    updateCounter();
  }; // remove items (li)

  const createArrow = function() {
    const arrowExist = !!toDoApp.querySelector('.ToDoApp__arrow');
    if(arrowExist) {
      return;
    }
    const arrow = document.createElement("div");
    arrow.classList.add("ToDoApp__arrow");
    arrow.innerHTML = "❯";
    toDoApp.insertBefore(arrow, newTask);
    
    arrow.addEventListener("click", function() {
      const allTasks = document.querySelectorAll("[data-status]");
      const allTasksText = document.querySelectorAll(".task-text");
      const allCheckBox = document.querySelectorAll(".checkbox");
      const allToggleIcons = document.querySelectorAll(".toggleIcon");
      for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].dataset.status === "active") {
          allTasks[i].dataset.status = "complited";
          allTasksText[i].classList.add("complited");
          allToggleIcons[i].innerHTML = checked;
          allCheckBox[i].checked = true;
        } else {
          allTasks[i].dataset.status = "active";
          allTasksText[i].classList.remove("complited");
          allCheckBox[i].checked = false;
          allToggleIcons[i].innerHTML = unchecked;
        }
      }
      updateCounter();
    });
    
  };
  //add event to tabs.(FILTER)
  showAllTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      filterItems[j].classList.remove("hide");
    }
  });
  clearAllBtn.addEventListener("click", function() {
    let allComplitedTasks = document.querySelectorAll(
      "[data-status=complited]"
    );
    for (let j = 0; j < allComplitedTasks.length; j++) {
      allComplitedTasks[j].remove();
    }
  });
  showActiveTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      if (filterItems[j].dataset.status != "active") {
        filterItems[j].classList.add("hide");
      } else {
        filterItems[j].classList.remove("hide");
      }
    }
  });
  showCompletedTabs.addEventListener("click", function() {
    const filterItems = document.querySelectorAll("[data-status]");
    for (let j = 0; j < filterItems.length; j++) {
      if (filterItems[j].dataset.status != "complited") {
        filterItems[j].classList.add("hide");
      } else {
        filterItems[j].classList.remove("hide");
      }
    }
  });

  newTask.addEventListener("keydown", function(key) {
    if (key.keyCode === 13) {
      if (newTask.value != "") {
        createArrow();
        createTask(newTask.value);
        updateCounter();
        compliteTasks();
        if (taskContainer.classList.contains("hide")) {
          taskContainer.classList.remove("hide");
        }
        newTask.value = "";
      }
    }
  });



const tasks = [{
  id: 1,
  name: 'learn JavaScript',
  status: 'active'
  
},
{
  id: 2,
  name: 'learn HTML',
  status: 'completed'
}]
















})();
