// Create a simple todo list that has the following functionalities

/**
 * add a new item to the todo list
 * remove an item in the todo list
 * persist data on reload of page
 * 
    Some further requirements:
    - the input field must be reset when the add button is clicked on 
    - the todo list must show the most recent first
 */


/**
 * PSEUDOCODE
 * an initial empty todo list
 * load the list on initial page load
 * get the button
 * get the input field
 * get the list (ul)
 * write a function to add 
 * write a function to delete
 * set data to localstorage
 * add event listener to the add button
 * add event listener to the remove button
 */

// get all elements
let addButton = document.getElementById('add-button');
let newTaskField = document.getElementById('new-task');
let listElement = document.getElementById('incomplete-tasks');

// initial list setup
let todoList = JSON.parse(localStorage.getItem('tasks')) || [];
renderToDoList();


// add button event listener
addButton.addEventListener('click', addTask);

// function to add new task to the list
function addTask() {

   // get the value from the input
   let newTask = newTaskField.value;

   if (newTask.length) {
      todoList.unshift(newTask);

      renderToDoList();

      // reset the field
      newTaskField.value = "";

      addToLocalStorage();
   } else {
      alert('You need to enter a valid task!')
   }

}


// render the view for the todolist
function renderToDoList() {

   listElement.innerHTML = "";
   let listItem = "";

   // when there is no tasks in the list
   if (!todoList.length) {
      listElement.innerHTML = "<p>No tasks added</p>";
   } else {

      // render the todo list in the UI
      for (let index = 0; index < todoList.length; index++) {
         const task = todoList[index];

         listItem += `<li class="list-item">
                        <p class="task-name">${task}</p>
                        <button class="delete-button" id="${index}">Delete</button>
                     </li>
                     `;

         listElement.innerHTML = listItem;
      }
   }

   // add event listener to all delete buttons in the list
   let deleteButtons = document.querySelectorAll('.delete-button');
   for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', (removeTask))
   }
}


// function to remove task from the list
function removeTask(event) {
   const id = parseInt(event.target.id)
   todoList.splice(id, 1);

   renderToDoList();
   addToLocalStorage();
}

// function to add to local storage
function addToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(todoList))
}