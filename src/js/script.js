(function() {
  const toDoApp = document.querySelector(".ToDoApp__header");
  const newTask = document.querySelector(".ToDoApp__create");
  const unchecked =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#eeeeee" stroke-width="3"/></svg>';
  const checked =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#eeeeee" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>';
  const taskContainer = document.querySelector(".ToDoApp__main");
  const arrow = document.createElement("div");
  const clearAllBtn = document.querySelector(".ToDoApp__clear");
  const toDoTabs = document.querySelectorAll("[data-tabs]");

  const filterTask = function(z) {
    let checkItems = document.querySelectorAll("[data-status]");

    if (toDoTabs[z].checked) {
      for (let x = 0; x < checkItems.length; x++) {
        if (toDoTabs[z].dataset.tabs == "active") {
          if (checkItems[x].dataset.status == "complited") {
            checkItems[x].classList.add("hide");
          } else {
            checkItems[x].classList.remove("hide");
          }
        } else if (toDoTabs[z].dataset.tabs == "complited") {
          if (checkItems[x].dataset.status == "active") {
            checkItems[x].classList.add("hide");
          } else {
            checkItems[x].classList.remove("hide");
          }
        } else if (toDoTabs[z].dataset.tabs == "all") {
          checkItems[x].classList.remove("hide");
        }
      }
    }
  };

  //add event to tabs.s
  for (let z = 0; z < toDoTabs.length; z++) {
    toDoTabs[z].addEventListener("click", function() {
      filterTask(z);
    });
  }

  clearAllBtn.addEventListener("click", function() {
    let allComplitedTasks = document.querySelectorAll(
      "[data-status=complited]",
    );
    for (let j = 0; j < allComplitedTasks.length; j++) {
      allComplitedTasks[j].remove();
    }
  });

  const destroyTask = function() {
    this.parentElement.remove();
    updateCounter();
  }; // remove items (li)

  const createArrow = function() {
    arrow.classList.add("ToDoApp__arrow");
    arrow.innerHTML = "❯";
    toDoApp.insertBefore(arrow, newTask);
  };

  arrow.addEventListener("click", function() {
    const allTasks = document.querySelectorAll("[data-status]");
    let allTasksText = document.querySelectorAll(".task-text");
    let allCheckBox = document.querySelectorAll(".checkbox");
    let allToggleIcons = document.querySelectorAll(".toggleIcon");
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

  const updateCounter = function() {
    const counter = document.querySelector("[data-counter]");
    let activeTask = document.querySelectorAll("[data-status=active]");
    counter.innerHTML = activeTask.length;
  }; // COUNTER

  const createTask = function(text) {
    const toDoList = document.querySelector(".ToDoApp__list"); // ul.
    const createItems = document.createElement("li"); // create li - items
    createItems.setAttribute("data-status", "active"); // set data atribute for li - items
    createItems.classList.add("ToDoApp__item"); // set class name for li - items
    toDoList.appendChild(createItems); // pul (list = li) in our ul.

    const createTaskContent = function(toDoItem) {
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

      const complitedTask = function() {
        if (checkbox.checked) {
          taskText.classList.add("complited");
          toogleIcons.innerHTML = checked;
          createItems.setAttribute("data-status", "complited");
        } else {
          taskText.classList.remove("complited");
          toogleIcons.innerHTML = unchecked;
          createItems.setAttribute("data-status", "active");
        }
        updateCounter();
      };

      removeBtn.addEventListener("click", destroyTask);
      toggle.addEventListener("click", complitedTask);
    };
    createTaskContent(createItems);
  };

  newTask.addEventListener("keydown", function(key) {
    if (key.keyCode === 13) {
      if (newTask.value != "") {
        createArrow();
        createTask(newTask.value);
        updateCounter();
        if (taskContainer.classList.contains("hide")) {
          taskContainer.classList.remove("hide");
        }
        newTask.value = "";
      }
    }
  });
})();
