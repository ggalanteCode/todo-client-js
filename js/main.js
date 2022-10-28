const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const newTodoButton = document.getElementById('newTodoButton');
const todoError = document.getElementById('todoError');

const todoUrl = 'http://localhost:8080/api/todo/';

newTodoButton.addEventListener('click',postTodo);

getAllTodos();  //ALL'avvio

function getAllTodos() {
    axios.get(todoUrl)
    .then((response) => {
        
    }).catch((error) => {

    })
}

function deleteATodo() {

}

function postATodo() {

}

function completeATodo() {
    
}