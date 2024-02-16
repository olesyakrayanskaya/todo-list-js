'use strict';

const addTaskFormBtn = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task');
const addTaskForm = document.querySelector('.add');
const taskSection = document.querySelector('.tasks__list');
const taskFilterBtn = document.getElementById('sort');

let tasksList = new Map();
let id = 3;

const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');

function setNewTaskData() {
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

function createTask(task) {

    let newTask = createNewNode('li', 'tasks__item task');
    newTask.setAttribute('id', task.id);
    taskSection.append(newTask);

    let taskDescription = createNewNode('p', 'task__description');
    taskDescription.innerHTML = task.description;

    newTask.append(createHeader(task, taskDescription, newTask));
    newTask.append(taskDescription);
    newTask.append(createFooter(task, taskDescription));
}

function createFooter(task, taskDescription) {

    let taskFooter = createNewNode('footer', 'task__footer');

    let btnClose = createNewNode('button', 'task__btn-close');
    btnClose.innerHTML = 'скрыть';
    btnClose.addEventListener('click', () => {
        taskDescription.style.display = 'none';
    });
    taskFooter.append(btnClose);

    let taskDate = createNewNode('span', 'task__date');
    taskDate.innerHTML = `Создана ${task.date.toLocaleDateString()}`;
    taskFooter.append(taskDate);

    return taskFooter;
}

function createHeader(task, taskDescription, newTask) {

    let taskHeader = createNewNode('header', 'task__header');

    let taskTitle = createNewNode('h3', 'task__title');
    taskTitle.innerHTML = task.title;
    taskHeader.append(taskTitle);

    let newTaskAction = createAction(task, taskDescription, newTask);
    taskHeader.append(newTaskAction);

    return taskHeader;
}

function createAction(task, taskDescription, newTask) {

    let taskAction = createNewNode('div', 'task__action');

    let descriptionBtn = createNewNode('button', 'task__btn-desc');
    descriptionBtn.innerHTML = 'описание';
    descriptionBtn.addEventListener('click', () => {
        taskDescription.style.display = 'block';
    });
    taskAction.append(descriptionBtn);

    let isDoneCheckbox = createNewNode('input', 'task__check');
    isDoneCheckbox.type = 'checkbox';
    isDoneCheckbox.addEventListener('change', () => {
        task.isDone = !task.isDone;
    });
    task.isDone === true
        ? isDoneCheckbox.setAttribute('checked', true)
        : isDoneCheckbox.removeAttribute('checked');
    taskAction.append(isDoneCheckbox);

    let deleteTaskBtn = createNewNode('button', 'task__btn-del');
    deleteTaskBtn.innerHTML = 'удалить';
    deleteTaskBtn.addEventListener('click', () => {
        deleteTaskFromList(task.id);
        newTask.remove();
    });
    taskAction.append(deleteTaskBtn);

    return taskAction;
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
    let task = setNewTaskData();
    createTask(task);
    clearInputs();
});

taskFilterBtn.addEventListener('change', () => {
    switch (taskFilterBtn.value) {
        case 'все':
            removeAllChildNodes(taskSection);
            tasksList.forEach((task) => createTask(task));
            break;
        case 'выполненные':
            let isDoneTasks = filterTasks(true);
            removeAllChildNodes(taskSection);
            isDoneTasks.forEach((task) => createTask(task));
            break;
        case 'активные':
            let isActiveTasks = filterTasks(false);
            removeAllChildNodes(taskSection);
            isActiveTasks.forEach((task) => createTask(task));
            break;
    }
});
