document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from local storage on page load
    loadTasks();
  
    // Add a new task on form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        saveTask(taskText, true); // Save to local storage with a "not completed" status
        taskInput.value = ""; // Clear input field
      }
    });
  
    // Function to load tasks from local storage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        addTask(task.text, task.completed);
      });
    }
  
    // Function to add a task to the DOM
    function addTask(taskText, isCompleted = false) {
      const listItem = document.createElement("li");
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      if (isCompleted) {
        taskSpan.classList.add("completed");
      }
      listItem.appendChild(taskSpan);
  
      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";
  
      // Complete Button
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.classList.add("complete");
      completeButton.addEventListener("click", () => {
        taskSpan.classList.toggle("completed");
        const completed = taskSpan.classList.contains("completed");
        updateTaskStatus(taskText, completed);
        if (completed) {
          saveCompletedTask(taskText); // Save to completed tasks when marked complete
        }
      });
      actionsDiv.appendChild(completeButton);
  
      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => {
        listItem.remove();
        deleteTask(taskText);
      });
      actionsDiv.appendChild(deleteButton);
  
      listItem.appendChild(actionsDiv);
      taskList.appendChild(listItem);
    }
  
    // Save a new task to local storage
    function saveTask(taskText, isCompleted) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: isCompleted });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Save completed task to a separate array
    function saveCompletedTask(taskText) {
      let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      if (!completedTasks.find(task => task.text === taskText)) {
        completedTasks.push({ text: taskText });
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
      }
    }
  
    // Update task status in local storage
    function updateTaskStatus(taskText, isCompleted) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const task = tasks.find(t => t.text === taskText);
      if (task) {
        task.completed = isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  
    // Delete a task from local storage
    function deleteTask(taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = tasks.filter(t => t.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  