// @ts-nocheck
const ToDoAddBtn = document.querySelector(".to-do-add");
const ToDoList = document.querySelector(".to-do-list");
const backgroundSelector = document.querySelector(".bg-selector");
const toDoKey = "todos";
const backgroundKey = "backgroundImg";

const createToDo = (text = "", checked = false) => {
  // Create these elements
  const ToDo = document.createElement("div");
  const ToDoCheckbox = document.createElement("div");
  const ToDoCheckboxCircle = document.createElement("div");
  const Checkbox = document.createElement("input");
  const ToDoText = document.createElement("p");
  const ToDoTextEdit = document.createElement("input");
  const DeleteBtn = document.createElement("button");
  const DeleteIcon = document.createElement("i");

  //Add the following classes input and HTML.
  ToDo.classList.add("to-do");
  if (checked) ToDo.classList.add("checked");

  ToDoCheckbox.classList.add("to-do-checkbox");
  ToDoCheckboxCircle.classList.add("to-do-checkbox-circle");
  ToDoText.classList.add("to-do-text");
  ToDoText.textContent = text;
  ToDoTextEdit.type = "text";
  ToDoTextEdit.classList.add("text-edit");
  Checkbox.type = "checkbox";
  DeleteBtn.classList.add("to-do-delete");
  DeleteIcon.classList.add("fa-regular", "fa-trash-can");

  // Append the items to the element
  ToDoList.appendChild(ToDo);
  sortToDos();
  ToDo.appendChild(ToDoCheckbox);
  ToDoCheckbox.appendChild(ToDoCheckboxCircle);
  ToDoCheckbox.appendChild(Checkbox);
  ToDo.appendChild(ToDoText);
  ToDo.appendChild(ToDoTextEdit);
  ToDo.appendChild(DeleteBtn);
  DeleteBtn.appendChild(DeleteIcon);

  ToDoTextEdit.value = text;

  if (text === "") {
    ToDoText.style.display = "none";
    ToDoTextEdit.style.display = "block";
    ToDoTextEdit.focus();
  } else {
    ToDoTextEdit.style.display = "none";
    ToDoText.style.display = "block";
  }

  // When we click in the To-Do
  ToDoText.addEventListener("click", () => {
    ToDoText.style.display = "none";
    ToDoTextEdit.style.display = "block";
    ToDoTextEdit.select();
    saveToDos();
  });

  // When we write the text
  ToDoTextEdit.addEventListener("input", () => {
    ToDoText.textContent = ToDoTextEdit.value;
    saveToDos();
  });

  //When we tap on the Enter Key
  ToDoTextEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ToDoText.innerText = ToDoTextEdit.value;
      ToDoTextEdit.blur();
      saveToDos();
    }
  });
  // When we unfocus the text
  ToDoTextEdit.addEventListener("blur", () => {
    ToDoTextEdit.style.display = "none";
    ToDoText.style.display = "block";
    ToDoText.focus();
  });

  // When we click on the checkbox
  ToDoCheckbox.addEventListener("click", () => {
    // Add or remove the following class
    ToDo.classList.toggle("checked");

    sortToDos();

    saveToDos();
  });

  // When we click on the trash
  DeleteBtn.addEventListener("click", () => {
    // Remove the to do card
    ToDo.remove(ToDo);
    saveToDos();
  });

  saveToDos();
};

const saveToDos = () => {
  const ToDos = [];
  document.querySelectorAll(".to-do").forEach((todoEl) => {
    const text = todoEl.querySelector(".text-edit").value;
    const checked = todoEl.classList.contains("checked");
    ToDos.push({ text, checked });
  });
  localStorage.setItem("todos", JSON.stringify(ToDos));
};

const loadToDos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    createToDo(todo.text, todo.checked);
  });
};

//Filters the cards that are Done
const sortToDos = () => {
  //Put the To Dos in an array
  const todos = Array.from(ToDoList.children);
  // check if the cards have the checked class or not
  setTimeout(() => {
    todos
      .sort((a, b) => {
        const aChecked = a.classList.contains("checked");
        const bChecked = b.classList.contains("checked");
        // put the unchecked cards before the checked ones
        return aChecked - bChecked;
      })
      .forEach((todo) => {
        ToDoList.appendChild(todo);
      });
  }, 100);
};

// When we click on the + button
ToDoAddBtn.addEventListener("click", () => {
  createToDo();
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("page chargée");
  const savedBackground = localStorage.getItem("backgroundImg");

  if (savedBackground) {
    document.body.style.backgroundImage = `url(${savedBackground})`;
  }
});

// When we want to change background image
backgroundSelector.addEventListener("click", (e) => {
  if (e.target.classList.contains("bg-img")) {
    const backgroundImg = e.target.src;
    document.body.style.backgroundImage = `url(${backgroundImg})`;
    localStorage.setItem("backgroundImg", backgroundImg);
  }
});

loadToDos();
