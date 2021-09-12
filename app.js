// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);

  document.addEventListener('DOMContentLoaded',getTask);
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // localStorage e amar taskInput er value gula jate save thake tar function:
  storeTaskInLocalStorage(taskInput.value)


  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage:
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from local storage:
function removeTaskFromLocalStorage(taskItem)
{
  let tasks;
  // checking local storage e tasks name e kisu ase kina! mane taskInput.value gula ase kina!
  if(localStorage.getItem('tasks')===null)
  {
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    // eikhane JSON.parse er means holo amar local storage e sob json string e thake tai ami sob taskInput ke JSON.parse diye json string e convert korechi
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task)
    {
      tasks.splice(index,1);
    }

  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster:
  if(confirm('Are You Sure to remove all ?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear from local storage when i click clier tasks button:
  clearTasksFromLocalStorage()
 

  // https://jsperf.com/innerhtml-vs-removechild
}

function clearTasksFromLocalStorage(){
   localStorage.clear()


}
// Filter Tasks
function filterTasks(e) {
  // lowercase e likhlei popup korbe filtergula:
  const text = e.target.value.toLowerCase();

  // jotogula li mil thakbe sob gula jate show kore tar code:

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


// working with local storage:

function storeTaskInLocalStorage(task){
  // eikhane tast parameter ti ei holo uporer taskInput.value;
  let tasks;
  // checking local storage e tasks name e kisu ase kina! mane taskInput.value gula ase kina!
  if(localStorage.getItem('tasks')===null)
  {
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    // eikhane JSON.parse er means holo amar local storage e sob json string e thake tai ami sob taskInput ke JSON.parse diye json string e convert korechi
  }

  tasks.push(task)
  // nicher code tar maddome local storage e save thakbe:
  localStorage.setItem("tasks",JSON.stringify(tasks))
  

}

// html file e jate localStorage theke data gula jate show kore:

function getTask()
{

  let tasks;
  // checking local storage e tasks name e kisu ase kina! mane taskInput.value gula ase kina!
  if(localStorage.getItem('tasks')===null)
  {
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    // eikhane JSON.parse er means holo amar local storage e sob json string e thake tai ami sob taskInput ke JSON.parse diye json string e convert korechi
  }

  tasks.forEach(function(task){
    
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);

  })


}