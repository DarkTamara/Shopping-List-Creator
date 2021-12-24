//Selectors
    //shift+alt + down arrow makes duplicates
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');



//Event listeners
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck); //the actual ul 



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
        todo.remove();    //delete the parent, the li item
    }

    //CheckMark
    if(item.classList[0] === 'complete-btn'){ 
        const todo = item.parentElement;
        todo.classList.toggle('completed')  //toggle the completed class
    }
 }
