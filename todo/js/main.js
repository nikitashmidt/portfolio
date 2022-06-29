const form = document.getElementById('form'),
    taskInput = document.getElementById('taskInput'),
    tasksList = document.getElementById('tasksList'),
    taskTitle = document.querySelector('.task-title'),
    btnDelete = document.querySelector('#btn-delete'),
    emptyList = document.querySelector('#emptyList'),
    emptyListTitle = document.querySelector('.empty-list__title'),
    openModalBtn = document.querySelector('.btn-open-modal'),
    modal = document.querySelector('.modal-task'),
    overlay = document.querySelector('.overlay'),
    container = document.querySelector('.container'),
    modalDelete = document.querySelector('.modal-delete'),
    modalDeleteSpan = document.querySelector('.modal-delete-span'),
    modalDeleteBtn = document.querySelector('[data-action="remove"]'),
    modalCancelBtn = document.querySelector('[data-action="cancel"]'),
    removeDoneTasksBtn = document.querySelector('#removeDoneTasks'),
    modalDone = document.querySelector('.modal-done'),
    modalDoneSpan = modalDone.querySelector('.modal-done-span'),
    modalDoneSvg = modalDone.querySelector('.modal-done-svg'),
    modalDoneCircle = modalDone.querySelector('.modal-done-circle');

let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(task => renderTask(task))

updateEmpty();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
openModalBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
removeDoneTasksBtn.addEventListener('click', removeDoneTasks);


function addTask(e) {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false
    }
    tasks.push(newTask);
    renderTask(newTask);
    taskInput.value = '';
    updateEmpty();
    closeModal()
    updateLocalStorage()
}
function deleteTask(e) {
    if (e.target.dataset.action !== "delete") return;
    const parentNode = e.target.closest('.list-group-item');
    const id = +parentNode.id;
    tasks = tasks.filter(task => task.id !== id)
    const spanText = parentNode.children[0].textContent;
    modalDeleteSpan.innerHTML = `${spanText}`;
    overlay.classList.add('overlay-active');
    modalDelete.classList.add('modal-delete-active');
    modalDeleteBtn.addEventListener('click', () => {
       parentNode.classList.add('list-group-item-delete');
        setTimeout(() => {
           parentNode.remove()
           updateEmpty()
        }, 500)
        closeModal()
    })
    updateLocalStorage()
}
function doneTask(e) {
    if (e.target.dataset.action === "done") {
        const parentNode = e.target.closest('.list-group-item');
        const id = +parentNode.id;
        const task = tasks.find(task => task.id === id);
        task.done = !task.done;
        parentNode.children[0].classList.toggle('task-title--done');
        if (parentNode.children[0].classList.contains('task-title--done')) {
            modalDone.classList.add('modal-done-active');
            modalDoneSpan.textContent = parentNode.children[0].textContent;
            document.querySelectorAll('.task-item__buttons').forEach(item => {
                item.style.pointerEvents = 'none';
            })
            modalDoneCircle.classList.add('modal-done-circle-active');
            modalDoneSvg.classList.add('modal-done-svg-active');
            removeDoneTasksBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                modalDone.classList.remove('modal-done-active');
                document.querySelectorAll('.task-item__buttons').forEach(item => {
                    item.style.pointerEvents = '';
                })
                removeDoneTasksBtn.style.pointerEvents = '';
                setTimeout(() => {
                    modalDoneCircle.classList.remove('modal-done-circle-active');
                    modalDoneSvg.classList.remove('modal-done-svg-active');
               }, 300)
            }, 2000)
        }
    } 
    updateLocalStorage()
}
function updateEmpty() {
    if (tasks.length === 0) {
        emptyListTitle.textContent = 'Список пуст';
        emptyList.classList.remove('none');
    } else if (tasks.length === 1) {
        emptyListTitle.textContent = 'Добавьте еще задач в свой список';
        emptyList.classList.remove('none');
    } else if (tasks.length > 1) {
        emptyList.classList.add('none')
    } else {
        emptyList.classList.remove('none')
    }
}
function openModal() {
    modal.classList.add('modal-task-active');
    overlay.classList.add('overlay-active');
    setTimeout(() => {
        taskInput.focus()
    }, 200);
}
function closeModal() {
    modal.classList.remove('modal-task-active');
    overlay.classList.remove('overlay-active');
    if (modalDelete.classList.contains('modal-delete-active')) { 
        modalDelete.classList.remove('modal-delete-active');
    }
}
// function removeDoneTasks(e) {
//     const task = tasks.find(task => task.id === );
//     task.done = !task.done;
//     console.log(tasks)
// updateLocalStorage()
// }
function updateLocalStorage() { 
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}"> ${task.text}  </span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button id="btn-delete" type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
        </li>`;
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    
}