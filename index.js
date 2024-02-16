'use strict';

const addTaskFormBtn = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task');
const addTaskForm = document.querySelector('.add');
const taskSection = document.querySelector('.tasks__list');
const taskSortBtn = document.getElementById('sort');

let tasksList = new Map();
let id = 3;

const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');

function addTask() {
    let task = {
        id: (id += 1),
        title: null,
        description: null,
        date: null,
        isDone: false,
    };
    task.title = taskTitleInput.value;
    task.description = taskDescriptionInput.value;
    task.date = new Date();
    if (taskTitleInput.value || taskDescriptionInput.value) {
        tasksList.set(id, task);
        return task;
    } else return false;
}

function clearInputs() {
    taskTitleInput.value = null;
    taskDescriptionInput.value = null;
}

function createTaskItem(task) {
    let newTask = createNewNode('li', 'tasks__item task');
    newTask.setAttribute('id', task.id);
    taskSection.append(newTask);

    let newLiHeader = createNewNode('header', 'task__header');
    newTask.append(newLiHeader);

    let newTaskTitle = createNewNode('h3', 'task__title');
    newTaskTitle.innerHTML = task.title;
    newLiHeader.append(newTaskTitle);

    let newTaskAction = createNewNode('div', 'task__action');
    newLiHeader.append(newTaskAction);

    let newTaskDescription = createNewNode('p', 'task__description');
    newTaskDescription.innerHTML = task.description;
    newTask.append(newTaskDescription);

    let newTaskFooter = createNewNode('footer', 'task__footer');
    newTask.append(newTaskFooter);

    let newTaskBtnClose = createNewNode('button', 'task__btn-close');
    newTaskBtnClose.innerHTML = 'скрыть';
    newTaskBtnClose.addEventListener('click', () => {
        newTaskDescription.style.display = 'none';
    });
    newTaskFooter.append(newTaskBtnClose);

    let newTaskDate = createNewNode('span', 'task__date');
    newTaskDate.innerHTML = task.date.toLocaleDateString();
    newTaskFooter.append(newTaskDate);

    let newTaskBtn = createNewNode('button', 'task__btn-desc');
    newTaskBtn.innerHTML = 'описание';
    newTaskBtn.addEventListener('click', () => {
        newTaskDescription.style.display = 'block';
    });
    newTaskAction.append(newTaskBtn);

    let newTaskCheck = createNewNode('input', 'task__check');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.addEventListener('change', () => {
        task.isDone = !task.isDone;
    });
    task.isDone === true
        ? newTaskCheck.setAttribute('checked', true)
        : newTaskCheck.removeAttribute('checked');
    newTaskAction.append(newTaskCheck);

    let newTaskBtnDel = createNewNode('button', 'task__btn-del');
    newTaskBtnDel.innerHTML = 'удалить';
    newTaskBtnDel.addEventListener('click', () => {
        deleteTaskFromList(task.id);
        newTask.remove();
    });
    newTaskAction.append(newTaskBtnDel);
}

function createNewNode(nodeTag, className) {
    let nodeName = document.createElement(`${nodeTag}`);
    nodeName.className = `${className}`;
    return nodeName;
}

function deleteTaskFromList(id) {
    tasksList.delete(id);
    return tasksList;
}

function filterTasks(value) {
    let filteredTasks = Array.from(tasksList.values()).filter(
        (task) => task.isDone === value
    );
    return filteredTasks;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

addTaskFormBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'flex';
});

addTaskBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'none';
    let task = addTask();
    createTaskItem(task);
    clearInputs();
});

taskSortBtn.addEventListener('change', () => {
    switch (taskSortBtn.value) {
        case 'все':
            removeAllChildNodes(taskSection);
            tasksList.forEach((task) => createTaskItem(task));
            break;
        case 'выполненные':
            let isDoneTasks = filterTasks(true);
            removeAllChildNodes(taskSection);
            isDoneTasks.forEach((task) => createTaskItem(task));
            break;
        case 'активные':
            let isActiveTasks = filterTasks(false);
            removeAllChildNodes(taskSection);
            isActiveTasks.forEach((task) => createTaskItem(task));
            break;
    }
});
