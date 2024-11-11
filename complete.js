document.addEventListener("DOMContentLoaded", () => {
    const completedTaskList = document.getElementById("completed-task-list");
    
    // Load completed tasks from local storage
    loadCompletedTasks();
  
    // Function to load completed tasks from local storage
    function loadCompletedTasks() {
      const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      completedTasks.forEach(task => {
        addCompletedTask(task.text);
      });
    }
  
    // Function to add a completed task to the DOM
    function addCompletedTask(taskText) {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
      completedTaskList.appendChild(listItem);
    }
  });
  