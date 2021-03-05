//UI VARS   
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//loading event listeners
loadEventListeners();

function loadEventListeners(){
    //load from dom event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //add clear all
    clearBtn.addEventListener('click',clearAll);
    //add delete task
    taskList.addEventListener('click',deleteTask);
    //filer
    filter.addEventListener('keyup',filterTasks);
}

//adding task
function addTask(e){

    if(taskInput.value === '') {
        alert('Add a task');
      }
    else{

        //Creating li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        
        //creating text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create new link
        const link = document.createElement('a');
        //creating delete 
        link.className= 'delete-item secondary-content';
        //adding delete icon
        link.innerHTML = '<i class="fas fa-minus-circle red-text"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    
        //store in local storage
        storeTaskInLocalStorage(taskInput.value);
    }

    //clear input
    taskInput.value = '';
    e.preventDefault();
}

//storing in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//dom content loader
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Creating li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        
        //creating text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link
        const link = document.createElement('a');
        //creating delete 
        link.className= 'delete-item secondary-content';
        //adding delete icon
        link.innerHTML = '<i class="fas fa-minus-circle red-text"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })
}

//clearalltasks
function clearAll(e){
    if(confirm('Are you sure?')){
        while( taskList.firstChild ){
            taskList.removeChild( taskList.firstChild );            
        }
    }

    localStorage.clear();
    e.preventDefault();
}

//clearspecifictask
function deleteTask(e){

    if(confirm('Are you sure?')){
        if(e.target.parentElement.classList.contains('delete-item')){
            e.target.parentElement.parentElement.remove();
        }
    
        const item = e.target.parentElement.parentElement.firstChild.textContent;
        removeTaskFromLocalStorage(item);
    }

    e.preventDefault();
}

//remove from dom
function removeTaskFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(item, index){
        if(item === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//filtertasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
   
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}