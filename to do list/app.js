//Selectors
    //shift+alt + down arrow makes duplicates
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');  //the list element
const filterOption = document.querySelector('.filter-todo');    //the select element



//Event listeners
document.addEventListener('DOMContentLoaded', getTodos())    //check if loaded and execute the function
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck); //the actual ul 
filterOption.addEventListener('click', filterTodo);


//Functions

    //creates the to do div in the list, also the done and delete buttons 
function addToDo(event){
    //prevent the submitting of the form
    event.preventDefault()

    //ToDo DIV
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo');

    //Create LI
    const newToDo = document.createElement('li')
    newToDo.innerText = toDoInput.value;    //gets the input value and saves in the li
    newToDo.classList.add('todo-item')
    //append LI to the DIV
    toDoDiv.appendChild(newToDo)

    //add todo to local storage
    saveLocalTodos(toDoInput.value);

    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-circle"></i>' ;  //this works to add a element, innerText would just render as text
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash" ></i>' ; 
    trashButton.classList.add('trash-btn');
    toDoDiv.appendChild(trashButton);

    //append the div to list
    toDoList.appendChild(toDoDiv);
    
    //Clear input fiels
    toDoInput.value = '';
}

function deleteCheck (e){
    const item = e.srcElement; //shows you what you clicked, e.target did not work for me here

    //Delete the todo
    if(item.classList[0] === 'trash-btn'){  //check class of item
        const todo = item.parentElement; //select the clicked elem parent
        todo.classList.add('fall')  //add a animation before delete
        removeLocalTodos(todo); //remove from local storage
        //Create an event listener that will wait for the animation to end
        todo.addEventListener('transitionend', function() {
            todo.remove();    //delete the parent, the li item
        } )
  
    }

    //CheckMark
    if(item.classList[0] === 'complete-btn'){ 
        const todo = item.parentElement;
        todo.classList.toggle('completed')  //toggle the completed class
    }
 }


 //Filter to view
function filterTodo(e){
    //get all the nodes
    const todos = toDoList.childNodes;

    //take all nodes and appy the function to all
    todos.forEach (function (todo) {
        switch (e.target.value) {
            //when i click all display all
            case "all" : todo.style.display = 'flex';
                console.log('all case')
                break;
            //when i click completed show completed ones
            case "completed":
                console.log('completed case')
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex'
                }else {
                    todo.style.display = 'none'
                }
                break;
            //when i click uncompleted show uncompleted ones
            case "uncompleted" : 
                console.log('uncompleted case')
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex'
                }else {
                    todo.style.display = 'none'
                }
                break;
        }
    });

}


//save the todo to local storage
function saveLocalTodos(todo){
    let todos;
    //check if todos already in storage
    if(localStorage.getItem('todos') === null){
        //if not create array
        todos = [];
    }else{
        //if yes get back the local array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //push my new todo in the array
    todos.push(todo);
    //save it back in local storage
    localStorage.setItem('todos',JSON.stringify(todos) )
}

function getTodos(){
    let todos;
        //check if todos already in storage
        if(localStorage.getItem('todos') === null){
            //if not create array
            todos = [];
        }else{
            //if yes get back the local array
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    //recreate the elements and append them back to see them
    todos.forEach((todo)=>{
    //ToDo DIV
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo');

    //Create LI
    const newToDo = document.createElement('li')
    newToDo.innerText = todo;    
    newToDo.classList.add('todo-item')
    //append LI to the DIV
    toDoDiv.appendChild(newToDo)

    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-circle"></i>' ;  //this works to add a element, innerText would just render as text
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash" ></i>' ; 
    trashButton.classList.add('trash-btn');
    toDoDiv.appendChild(trashButton);

    //append the div to list
    toDoList.appendChild(toDoDiv);
    })
}


function removeLocalTodos(todo){
    let todos;
    //check if todos already in storage
    if(localStorage.getItem('todos') === null){
        //if not create array
        todos = [];
    }else{
        //if yes get back the local array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //get the inner text of the todo = the div
    const todoIndex = todo.children[0].innerText;
    //use the text to get the index 
    //then use the index to say where to start the cut and how many items, 1 here
    todos.splice(todos.indexOf(todoIndex), 1)

    //push back the modified array to local storage
    localStorage.setItem('todos', JSON.stringify(todos))
}





