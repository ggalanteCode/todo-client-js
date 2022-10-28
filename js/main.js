const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const newTodoButton = document.getElementById("newTodoButton");
const todoError = document.getElementById("todoError");

const baseUrl = 'http://localhost:8080/api/todo/';

newTodoButton.addEventListener("click",postATodo);

getAllTodos();  //ALL'avvio

function getAllTodos() {
    axios.get(baseUrl+'alltodos')
    .then((response) => {
        todoList.innerHTML='';
        const todoArray = response.data;
        for(let i = 0; i < todoArray.length; i++) {
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = todoArray[i].testoTodo;
            todoList.appendChild(todoDiv);
            const trashImg = document.createElement('img');
            trashImg.src = './img/18200241621543238936-512.png';
            trashImg.title = 'Delete this todo';   
            trashImg.width = 20;      
            trashImg.alt = 'Delete todo';
            trashImg.setAttribute('todoId',todoArray[i].id);
            trashImg.addEventListener('click',deleteATodo); 
            todoDiv.appendChild(trashImg);  //aggiungi l'img al div del todo i-esimo
            const completed = document.createElement("img");
            if(todoArray[i].completato == true){
                completed.src = "img/6549974331557740369-512.png";
            }else{
                completed.src = "img/27471603216366515445442-512.png";
            }
            completed.title = "completed";
            completed.width = 20;
            completed.alt = "completed";
            completed.setAttribute("id",todoArray[i].id);
            completed.setAttribute("completed",todoArray[i].completed);
            completed.addEventListener("click",completeATodo);
            todoDiv.appendChild(completed);
            todoList.appendChild(todoDiv);  //aggiungi il div del todo i-esimo al div dei todo
        }
    }).catch((error) => {
        console.error(error);
    })
}

function deleteATodo(event) {   //se voglio avere dei dettagli sull'evento generato, specifico event come param
    
    let todoId = event.target.getAttribute('todoId');   //per eseguire la delete, abbiamo bisogno dell'id del todo

    axios.delete(baseUrl+'deletetodo/'+todoId)
    .then((response) => {
        getAllTodos();          //come prima cosa, ricarico la lista dei todo
    }).catch((error) => {
        console.log(error);
        todoError.innerHTML = 'todo deletion failed! ' + error.message;
    })
}

function postATodo() {

    if(todoInput.value != '') {

        const todo = {
            testoTodo : todoInput.value,
            completato : false
        };

        axios.post(baseUrl+'inserttodo',todo)
        .then((response) => {
            getAllTodos();          //come prima cosa, ricarico la lista dei todo
            todoInput.value = '';
        }).catch((error) => {
            console.log(error);
            todoError.innerHTML = 'todo insertion failed! ' + error.message;
        })
    } else {
        alert("the todo's text cannot be empty!");
    }
}

function completeATodo(event) {

    const completionAttr = {
        id : event.target.getAttribute("id"),
        completed : event.target.getAttribute("completed")
    };

    axios.put(baseUrl+'togglecompleted/'+completionAttr.id,completionAttr)
    .then((response) => {
        getAllTodos();          //come prima cosa, ricarico la lista dei todo
        if(completionAttr.completed === true) {
            event.target.src = "img/6549974331557740369-512.png";
        } else {
            event.target.src = "img/27471603216366515445442-512.png";
        }
        
    }).catch((error) => {
        console.log(error);
        todoError.innerHTML = 'todo completion failed! ' + error.message;
    })
}