const form = document.getElementById('form'),
    taskInput = document.getElementById('taskInput'),
    tasksList = document.getElementById('tasksList'),
    taskTitle = document.querySelector('.task-title'),
    btns = document.querySelector('.btns'),
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
    completedTasksBlock = document.querySelector('.completed-tasks-block'),
    completedTasksArrow = document.querySelector('.completed-tasks-arrow'),
    completedTasksLists = document.querySelector('.completed-tasks-lists'),
    completedTasksCount = document.querySelector('.completed-tasks-count'),
    emptyTrashBtn = document.querySelector('.completed-tasks-empty'),
    headerTime = document.querySelector('.header__time'),
    loader = document.querySelector('.loader'),
    checkbox = document.getElementById('checkbox'),
    headerNumberTasks = document.querySelector('.header__number-tasks span');

let tasks = [],
    completedTasks = [];
if (localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));
if (localStorage.getItem('completedTasks')) completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
tasks.forEach(task => renderTask(task));
completedTasks.forEach(task=> renderCompletedTask(task))
updateEmpty();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
openModalBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
removeDoneTasksBtn.addEventListener('click', removeDoneTasks);
completedTasksBlock.addEventListener('click', completedTasksUp);
emptyTrashBtn.addEventListener('click', emptyTrash);
completedTasksLists.addEventListener('click', returnTasks);
window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('overlay-active')) closeModal();
})
// window.onload = function () {
//     window.setTimeout(() => {
//         loader.classList.remove('loader-active');
//         container.classList.add('container-animation');
//         setTimeout(() => {
//             document.querySelector('.body').classList.remove('body-hidden');
//             loader.style.display = 'none';
//         }, 400)
//     }, 1000)
// }
setInterval( () => {
    let now = new Date();
    let nowGetDay = `${now.getDate()}`; 
    let nowGetMonth = `${now.getMonth() + 1}`; 
    let nowGetYear = `${now.getFullYear()}`;
    nowGetDay < 10 ? nowGetDay = 0 + nowGetDay : nowGetDay;
    nowGetMonth < 10 ? nowGetMonth = 0 + nowGetMonth : nowGetMonth;
    headerTime.innerHTML = `${nowGetDay}.${nowGetMonth}.${nowGetYear} ${now.toLocaleTimeString()} `;
}, 1000);
function addTask(e) {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false
    }
    function pushTasks() {
        tasks.push(newTask);
        renderTask(newTask);
        taskInput.value = '';
        updateEmpty();
        updateLocalStorage();
    }
    if (checkbox.checked) { 
        pushTasks();
        taskInput.focus();
    } else {
        pushTasks();
        closeModal();
    }
}
function deleteTask(e) {
    if (e.target.dataset.action !== "delete") return;   
    disableScroll()
    let parentNode = e.target.closest('.list-group-item');
    let id = +parentNode.id;
    const spanText = parentNode.children[0].textContent;
    modalDeleteSpan.innerHTML = `${spanText}`;
    overlay.classList.add('overlay-active');
    modalDelete.classList.add('modal-delete-active');
    modalDeleteBtn.addEventListener('click', (e) => {
        tasks = tasks.filter(task => task.id !== id);
        parentNode.classList.add('list-group-item-delete');
        setTimeout(() => {
            parentNode.remove()
            updateEmpty()
        }, 500)
        closeModal();
        updateLocalStorage();
    }, { once: true });
    transition('-50%');
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
            removeDoneTasksBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                modalDone.classList.remove('modal-done-active');
                document.querySelectorAll('.task-item__buttons').forEach(item => {
                    item.style.pointerEvents = '';
                })
                removeDoneTasksBtn.style.pointerEvents = '';
            }, 2000)
        }
    } 
    updateLocalStorage()
}
function updateEmpty() {
    if (tasks.length === 0) {
        emptyListTitle.textContent = 'Список задач пуст';
        emptyList.classList.remove('none');
    } else if (tasks.length === 1) {
        emptyListTitle.textContent = 'Добавьте еще задач в свой список';
        emptyList.classList.remove('none');
    } else if (tasks.length > 1) {
        emptyList.classList.add('none')
    } else {
        emptyList.classList.remove('none')
    }
    completedTasksCount.textContent = completedTasks.length;
    headerNumberTasks.innerHTML = `${tasks.length}`;
    if (completedTasks.length >= 1) {
        completedTasksBlock.classList.add('completed-tasks-block-active');
    } else if (completedTasks.length === 0) { 
        completedTasksBlock.classList.remove('completed-tasks-block-active');
        completedTasksLists.classList.remove('completed-tasks-lists-active');
    }
}
function openModal() {
    checkbox.checked = false;
    modal.classList.add('modal-task-active');
    overlay.classList.add('overlay-active');
    setTimeout(() => {
        taskInput.focus()
    }, 200);
    disableScroll();
    transition('-50%');
}
function closeModal() {
    modal.classList.remove('modal-task-active');
    overlay.classList.remove('overlay-active');
    if (modalDelete.classList.contains('modal-delete-active')) { 
        modalDelete.classList.remove('modal-delete-active');
    }
    enableScroll();
    transition('10px');
}
function removeDoneTasks(e) {
    let newCompletedTasks = tasks.filter(task => task.done);
    tasks = tasks.filter(task => !task.done);
    for (let i = 0; i < newCompletedTasks.length; i++) { 
        completedTasks.push(newCompletedTasks[i]);
    }
    document.querySelectorAll('.task-title').forEach(item => {
        if (item.classList.contains('task-title--done')) { 
          const tasksHTML =   `<li id="${item.parentNode.id}" class="completed-tasks-list  list-group-item d-flex justify-content-between task-item">
          <span class="task-title"> ${item.parentNode.textContent} </span>
          <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action return-task">
                  Вернуть задачу
              </button> </div>  </li>`;
          item.parentNode.remove();
          completedTasksLists.insertAdjacentHTML('afterbegin', tasksHTML);
          updateLocalStorage();
          updateEmpty();
        }
    })
}
function updateLocalStorage() { 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
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
function renderCompletedTask(task) {
    const tasksHTML = `<li id="${task.id}" class="completed-tasks-list list-group-item d-flex justify-content-between task-item">
          <span class="task-title"> ${task.text} </span>
          <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action return-task">
                  Вернуть задачу
              </button>
          </div>
          </li>`;
    completedTasksLists.insertAdjacentHTML('afterbegin', tasksHTML);
}
function disableScroll() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = paddingOffset;
}
function enableScroll() {
    document.body.style.paddingRight = 0;
    document.body.style.overflow = '';
}
function transition(value) {
        btns.style.bottom = `${value}`;
}
function completedTasksUp() {
    completedTasksArrow.classList.toggle('rotate');
    completedTasksLists.classList.toggle('completed-tasks-lists-active')
}
function returnTasks(e) {
    if (e.target.dataset.action !== "done") return;   
    const parentNode = e.target.parentNode.parentNode;
    let id = +parentNode.id;
    let newCompletedTasks = completedTasks.filter(task => task.id === id);
    const task = newCompletedTasks.find(task => task.id === id);
    task.done = !task.done;
    for (let i = 0; newCompletedTasks.length > i; i++) { 
        tasks.push(newCompletedTasks[i]);
    }
    completedTasks = completedTasks.filter(task => task.id !== id);
    const taskHTML = `<li id="${parentNode.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title"> ${parentNode.children[0].textContent}  </span>
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
    parentNode.remove();
    updateLocalStorage();
    updateEmpty();
}
function emptyTrash(e) {
    completedTasks = [];
    document.querySelectorAll('.completed-tasks-list').forEach(item => item.remove());
    updateEmpty();
    updateLocalStorage();
}
if (window.screen.width <= 768) {
    openModalBtn.innerHTML = `<img src="./img/add.svg" width="20px" height="20px">`;
    document.querySelectorAll('.return-task').forEach(item =>{
        item.innerHTML = `<img src="./img/return.png" width="20px" height="20px">`
    })
} 

