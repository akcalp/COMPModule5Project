//Defining UI Variables
const form = document.getElementById("todo-form");
const todoList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-todos");
const deleteBtn = document.querySelector(".delete-todo");
const todoInput = document.getElementById("todo");


//loading events right away
loadEventListeners();

//event listeners
function loadEventListeners() {
    //DOM Load for Local Storage
    document.addEventListener("DOMContentLoaded", getTodos);
    //form listener
    form.addEventListener("submit", addTodo);
    //clear all to-dos
    clearBtn.addEventListener("click", clearTodos);
    //delete selected to-dos
    deleteBtn.addEventListener("click", deleteTodo);

}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //local storage can only store strings so, parsing it to str
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(todo));
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.opacity = "1";
        checkbox.className = "delete-item right";
        checkbox.style.position = "relative";
        checkbox.style.pointerEvents = "auto";

        //listening for checkbox change
        checkbox.addEventListener("change", function () {
            if (checkbox.checked === true) {
                //copy li to append to the end of li
                const checkedLi = li;
                //remove original li
                li.remove();
                //append copied li to the end of the list and style
                todoList.append(checkedLi);
                checkedLi.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
        });
            // //append checkbox to li
            li.appendChild(checkbox);
            //append li as first element in ul
            todoList.prepend(li);
    });
}


//creating error message
function showError(error) {
    //creating error element
    const errorDiv = document.createElement("div");
    //getting elements
    const card = document.querySelector(".card-content");
    const heading = document.querySelector(".card-title");

    //styling error element
    errorDiv.className = "error red lighten-3 center-align";
    errorDiv.style.padding = "10px";
    errorDiv.style.color = "#8b0000";
    errorDiv.style.borderRadius = "25px";
    errorDiv.style.fontSize = "16px";

    //    create text node and append
    errorDiv.appendChild(document.createTextNode(error));

    //insert error
    card.insertBefore(errorDiv, heading);
    //clear after 3 sec
    setTimeout(clearError, 3000)

}

//removing error
function clearError() {
    document.querySelector(".error").remove()
}


//adding todo
function addTodo(e) {
    // show error if textbox empty
    if (todoInput.value === "") {
        showError("Add a To-Do");
    } else {

        //creating li and appending input value
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(todoInput.value));


        //creating input type checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.opacity = "1";
        checkbox.className = "delete-item right";
        checkbox.style.position = "relative";

        checkbox.style.pointerEvents = "auto";

        //listening for checkbox change
        checkbox.addEventListener("change", function () {
            if (checkbox.checked === true) {
                //copy li to append to the end of li
                const checkedLi = li;
                //remove original li
                li.remove();
                //append copied li to the end of the list and style
                todoList.append(checkedLi);
                checkedLi.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
        });
        //append checkbox to li
        li.appendChild(checkbox);
        //append li as first element in ul
        todoList.prepend(li);

        storeTodoInLS(todoInput.value);

        //clear input
        todoInput.value = "";

    }
    e.preventDefault();
}


//Local Storage
function storeTodoInLS(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //local storage can only store strigns so, parsing it to str
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


//delete checked todo
function deleteTodo(e) {

    //selecting all lis and check if any li is checked and remove checked
    document.querySelectorAll(".collection-item").forEach(function (todo) {
        if (todo.style.textDecoration === "line-through") {
            todo.remove();

        //    Remove from Local Storage
            deleteTodoInLS(e.target);
        }
    });
    e.preventDefault()
}

function deleteTodoInLS(todoItem) {
    //couldn't select the li to remove when selecting parent it select div itself when selecting target it selects
    // just checkbox
    console.log(todoItem);

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //local storage can only store strigns so, parsing it to str
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo,index) {
        if (todoItem.textContent === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

//clear all li
function clearTodos(e) {
    //will run until ul doesnt have a child
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    e.preventDefault();
}
