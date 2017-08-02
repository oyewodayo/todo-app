/* 
Created by Oyewo Temidayo
github--www.github.com/oyewodayo
twitter--www.twitter.com/oyewodayo
facebook--www.facebook.com/oyewodayo

----- This was made with a pure Javascript. If you refresh after you add a task if will be clear of the screen

*/


//Add a task
var taskInput = document.getElementById("newtask"); //to get text input tag
var addButton = document.getElementsByTagName("button")[0]; //Add button
var incompleteTasksHolder = document.getElementById("incompletetasks"); //Listing of incomplete added task
var completedTasksHolder= document.getElementById("completedtasks"); //completed-tasks

// Function to  create a list of tassk
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input"); 
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  // Assigning attributes to created task tags 
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  


  label.innerText = taskString;
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task
var addTask = function() {

  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
 

  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}

//Delete existing task
var deleteTask = function() {
  console.log("Delete task...");
 //Append the task list item to the #completedtasks
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
 //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//To avoid repetition a bind for Task and event function is created
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list items event");
  //Select taskListItem of children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  editButton.onclick = editTask; //bind editTask to edit button
  deleteButton.onclick = deleteTask;//bind deleteTask to delete button
  checkBox.onchange = checkBoxEventHandler;//bind checkBoxEventHandler to checkbox
}


//We can simply add eventListener for click events
//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//Cyle over incompleteTaskHolder ul list items
  //for each list item

for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  //bind events to list completedtask
}

//Cyle over completedTaskHandler ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); //bind events to list Incompletetask
}

































