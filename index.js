'use strict';

const addTaskFormBtn = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task');
const addTaskForm = document.querySelector('.add');
const taskSection = document.querySelector('.tasks__list');
const taskFilterBtn = document.getElementById('sort');

let tasksList = new Map();
let id = 0;

const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');

addTaskFormBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'flex';
});

addTaskBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'none';
    let task = setNewTaskData();
    if (task) {
        createTask(task);
    }
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setNewTaskData() {
    if (isValid(taskTitleInput.value) || isValid(taskDescriptionInput.value)) {
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

    let taskDescription = createTaskDescription(task);

    newTask.append(createHeader(task, taskDescription, newTask));
    newTask.append(taskDescription);
    newTask.append(createFooter(task, taskDescription));
}

function createTaskDescription(task) {
    let taskDescription = createNewNode('p', 'task__description');
    taskDescription.innerHTML = task.description;
    taskDescription.style.display = 'none';
    return taskDescription;
}

function createFooter(task) {
    let taskFooter = createNewNode('footer', 'task__footer');
    taskFooter.append(createTaskDate(task));
    return taskFooter;
}

function createTaskDate(task) {
    let taskDate = createNewNode('span', 'task__date');
    taskDate.innerHTML = `Создана ${task.date.toLocaleDateString()}`;
    return taskDate;
}

function createHeader(task, taskDescription, newTask) {
    let taskHeader = createNewNode('header', 'task__header');
    taskHeader.append(createTaskTitle(task));

    let newTaskAction = createAction(task, taskDescription, newTask);
    taskHeader.append(newTaskAction);

    return taskHeader;
}

function createTaskTitle(task) {
    let taskTitle = createNewNode('h3', 'task__title');
    if (isValid(task.title)) {
        taskTitle.innerHTML = task.title;
    } else {
        taskTitle.innerHTML = 'без заголовка';
    }

    return taskTitle;
}

function createAction(task, taskDescription, newTask) {
    let taskAction = createNewNode('div', 'task__action');

    if (isValid(task.description)) {
        taskAction.append(createDescriptionBtn(taskDescription));
    }
    taskAction.append(createCheckbox(task));
    taskAction.append(createLabel());
    taskAction.append(createDeleteTaskBtn(task, newTask));

    return taskAction;
}

function createDescriptionBtn(taskDescription) {
    let descriptionBtn = createNewNode('button', 'task__btn-desc');
    descriptionBtn.innerHTML = 'показать описание';
    descriptionBtn.addEventListener('click', () => {
        if (taskDescription.style.display == 'none') {
            taskDescription.style.display = 'block';
            descriptionBtn.innerHTML = 'скрыть описание';
        } else {
            taskDescription.style.display = 'none';
            descriptionBtn.innerHTML = 'показать описание';
        }
    });

    return descriptionBtn;
}

function createCheckbox(task) {
    let isDoneCheckbox = createNewNode('input', 'task__check');
    isDoneCheckbox.type = 'checkbox';
    isDoneCheckbox.setAttribute('id', 'done');
    isDoneCheckbox.addEventListener('change', () => {
        task.isDone = !task.isDone;
    });
    task.isDone === true
        ? isDoneCheckbox.setAttribute('checked', true)
        : isDoneCheckbox.removeAttribute('checked');

    return isDoneCheckbox;
}

function createLabel() {
    let label = createNewNode('label', 'task__label');
    label.setAttribute('for', 'done');
    label.innerHTML = '&#10003;';

    return label;
}

function createDeleteTaskBtn(task, newTask) {
    let deleteTaskBtn = createNewNode('button', 'task__btn-del');
    deleteTaskBtn.innerHTML = '&#10007;';
    deleteTaskBtn.addEventListener('click', () => {
        deleteTaskFromList(task.id);
        newTask.remove();
    });

    return deleteTaskBtn;
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

function isValid(s) {
    return s && s.trim().length > 0;
}
