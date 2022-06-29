const form = document.getElementById('form'),
    taskInput = document.getElementById('taskInput'),
    tasksList = document.getElementById('tasksList'),
    btnDelete = document.querySelector('#btn-delete'),
    emptyList = document.querySelector('#emptyList'),
    openModalBtn = document.querySelector('.btn-open-modal'),
    modal = document.querySelector('.modal-task'),
    overlay = document.querySelector('.overlay'),
    container = document.querySelector('.container'),
    modalDelete = document.querySelector('.modal-delete'),
    modalDeleteSpan = document.querySelector('.modal-delete-span'),
    modalDeleteBtn = document.querySelector('[data-action="remove"]'),
    modalCancelBtn = document.querySelector('[data-action="cancel"]');

updateEmpty()
form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
openModalBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);




function addTask(e) {
    e.preventDefault();
    const tasksHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title"> ${taskInput.value}  </span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button id="btn-delete" type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;
    tasksList.insertAdjacentHTML('beforeend', tasksHTML);
    taskInput.value = '';
    updateEmpty();
    closeModal()
}
function deleteTask(e) {
    if (e.target.dataset.action === "delete") {
        const spanText = e.target.closest('.list-group-item').children[0].textContent;
        modalDeleteSpan.innerHTML = `${spanText}`;
        overlay.classList.add('overlay-active');
        modalDelete.classList.add('modal-delete-active');
    }
    const parentNode = e.target.closest('.list-group-item');
    modalDeleteBtn.addEventListener('click', () => {
        parentNode.classList.add('list-group-item-delete');
        setTimeout(() => {
            parentNode.remove()
            updateEmpty()
        }, 500)
        closeModal()
    })
}
function doneTask(e) {
    if (e.target.dataset.action === "done") {
        e.target.closest('.list-group-item').children[0].classList.toggle('task-title--done')
    } 
}
function updateEmpty() {
    const check = tasksList.children.length > 1 ? emptyList.classList.add('none') : emptyList.classList.remove('none');
    return check;
}
function openModal() {
    modal.classList.add('modal-task-active');
    overlay.classList.add('overlay-active');
    taskInput.focus();
}
function closeModal() {
    modal.classList.remove('modal-task-active');
    overlay.classList.remove('overlay-active');
    if (modalDelete.classList.contains('modal-delete-active')) { 
        modalDelete.classList.remove('modal-delete-active');
    }
}


