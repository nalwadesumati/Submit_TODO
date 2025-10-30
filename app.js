const cl = console.log;




const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const todoItemControl = document.getElementById("todoItem");
const addTodoBtn = document.getElementById("addTodoBtn");
const updateTodoBtn = document.getElementById("updateTodoBtn");




let todoArr = [
    {
        "todoItem": "html",
        "todoId": "5c7b61be-7d8b-44f2-82b6-c704d5d6955c"
    },
    {
        "todoItem": "javascript",
        "todoId": "9ae7bbea-424c-4019-8f3f-fa49b347adb1"
    }
]

const uuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    })
};


const createLists = (arr) => {
    let result = "";
    arr.forEach((todo) => {
        result += `<li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
      <strong>${todo.todoItem}</strong>
      <div>
      <i class="fa-solid fa-pen-to-square text-success" onclick="onEdit(this)"></i>
      <i class="fa-solid fa-trash text-danger" onClick="onRemove(this)"></i>
      </div>
      </li> `;
    })
    todoList.innerHTML = result;
};
createLists(todoArr);
let EDIT_ID;

const onEdit = (ele) => {

    EDIT_ID = ele.closest("li").id;
    cl(EDIT_ID);

    let EDIT_OBJ = todoArr.find(todo => {
        return todo.todoId === EDIT_ID;
    })
    cl(EDIT_OBJ);

    todoItemControl.value = EDIT_OBJ.todoItem

    updateBtn.classList.remove("d-none")
    addBtn.classList.add("d-none");

}

const onRemove = (ele) => {
    Swal.fire({
        title: "Are you sure?",
        text: "ARE YOU SURE TO REMOVE TO-DO ITEM!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            cl(ele);
            let removeId = ele.closest('li').id;
            cl(removeId);

            let getIndex = todoArr.findIndex(todo => todo.todoId === removeId);
            cl(getIndex);

            cl(getIndex);
            todoArr.splice(getIndex, 1)
            ele.closest('li').remove();

            Swal.fire({
                title: "Deleted!",
                text: "Your To-do item has been removed successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

        }
    });
};





const onTodoSubmit = (eve) => {
    eve.preventDefault();

    let todoObj = {
        todoItem: todoItemControl.value,
        todoId: uuid()
    }
    cl(todoObj);
    todoForm.reset();
    todoArr.push(todoObj);
    cl(todoArr);
    createLists(todoArr);

}

const onTodoUpdate = () => {
    let updateId = EDIT_ID;
    cl(updateId);

    let updateObj = {
        todoItem: todoItemControl.value,
        todoId: updateId
    }
    cl(updateObj);
    todoForm.reset();

    let getIndex = todoArr.findIndex(todo => {
        return todo.todoId === updateId
    })
    cl(getIndex);
    todoArr[getIndex] = updateObj;

    let li = document.getElementById(updateId);
    cl(li.firstElementChild);
    li.firstElementChild.textContent = updateObj.todoItem

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");

    Swal.fire({
        title: 'Updated!',
        text: 'Your to-do item has been successfully updated.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
    Swal.fire({
        title: "Updated!",
        text: "Your to-do item has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
    });


}





todoForm.addEventListener("submit", onTodoSubmit);
updateBtn.addEventListener("click", onTodoUpdate);
