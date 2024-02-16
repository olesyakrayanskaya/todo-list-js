'use strict';

const addTaskFormBtn = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task');
const addTaskForm = document.querySelector('.add');
const taskSection = document.querySelector('.tasks__list');

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
    let newTask = document.createElement('li');
    newTask.className = 'tasks__item task';
    newTask.setAttribute('id', task.id);
    taskSection.append(newTask);
    let newLiHeader = document.createElement('header');
    newLiHeader.className = 'task__header';
    newTask.append(newLiHeader);
    let newTaskTitle = document.createElement('h3');
    newTaskTitle.className = 'task__title';
    newTaskTitle.innerHTML = task.title;
    newLiHeader.append(newTaskTitle);
    let newTaskAction = document.createElement('div');
    newTaskAction.className = 'task__action';
    newLiHeader.append(newTaskAction);
    let newTaskDescription = document.createElement('p');
    newTaskDescription.className = 'task__description';
    newTaskDescription.innerHTML = task.description;
    newTask.append(newTaskDescription);
    let newTaskFooter = document.createElement('footer');
    newTaskFooter.className = 'task__footer';
    newTask.append(newTaskFooter);
    let newTaskBtnClose = document.createElement('button');
    newTaskBtnClose.className = 'task__btn-close';
    newTaskBtnClose.innerHTML = 'скрыть';
    newTaskBtnClose.addEventListener('click', () => {
        newTaskDescription.style.display = 'none';
    });
    newTaskFooter.append(newTaskBtnClose)
    let newTaskDate = document.createElement('span');
    newTaskDate.className = 'task__date';
    newTaskDate.innerHTML = task.date.toLocaleDateString();
    newTaskFooter.append(newTaskDate);
    let newTaskBtn = document.createElement('button');
    newTaskBtn.className = 'task__btn-desc';
    newTaskBtn.innerHTML = 'описание';
    newTaskBtn.addEventListener('click', () => {
        newTaskDescription.style.display = 'block';
    });
    newTaskAction.append(newTaskBtn);
    let newTaskCheck = document.createElement('input');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.className = 'task__check';
    newTaskCheck.addEventListener('change', () => {
        task.isDone = !task.isDone;
    });
    newTaskAction.append(newTaskCheck);
    let newTaskBtnDel = document.createElement('button');
    newTaskBtnDel.className = 'task__btn-del';
    newTaskBtnDel.innerHTML = 'удалить';
    newTaskBtnDel.addEventListener('click', () => {
        deleteTaskFromList(task.id);
        newTask.remove();
    });
    newTaskAction.append(newTaskBtnDel);
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

function deleteTaskFromList(id) {
    tasksList.delete(id);
    return tasksList;
}
