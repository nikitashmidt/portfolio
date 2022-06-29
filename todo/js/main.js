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
        // 
        modalDeleteBtn.addEventListener('click', () => {
        e.target.closest('.list-group-item').classList.add('list-group-item-delete');
        setTimeout(() => {
            e.target.closest('.list-group-item').remove()
            updateEmpty()
        }, 500)
        closeModal()
        })
    }
  
}
function doneTask(e) {
    if (e.target.dataset.action === "done") {
        e.target.closest('.list-group-item').children[0].classList.toggle('task-title--done');
        if (e.target.closest('.list-group-item').children[0].classList.contains('task-title--done')) {
            modalDone.classList.add('modal-done-active');
            modalDoneSpan.textContent = e.target.parentNode.parentNode.children[0].textContent;
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
               }, 400)
            }, 2500)
        }
    } 
}
function updateEmpty() {
    if (tasksList.children.length === 1) {
        emptyListTitle.textContent = 'Список пуст';
        emptyList.classList.remove('none');
    } else if (tasksList.children.length === 2) {
        emptyListTitle.textContent = 'Добавьте еще задач в свой список';
        emptyList.classList.remove('none');
    } else if (tasksList.children.length > 2) {
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
function removeDoneTasks(e) {
    document.querySelectorAll('.task-title--done').forEach(item => {
        item.parentNode.classList.add('list-group-item-delete');
        setTimeout(() => {
            item.parentNode.closest('.list-group-item').remove()
            updateEmpty()
        }, 500)
    })
}

