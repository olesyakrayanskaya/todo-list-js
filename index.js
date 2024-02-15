'use strict';

const addTaskFormBtn = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task');
const addTaskForm = document.querySelector('.add');
const taskSection = document.querySelector('.tasks__list');

let taskTitle = null;
let taskDescription = null;

let tasksList = [];
let task = {
    key: null,
    title: null,
    description: null,
    date: null,
    isDone: false,
};

const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');

function addTask() {
    task.key = new Date();
    task.title = taskTitleInput.value;
    task.description = taskDescriptionInput.value;
    task.date = new Date();
    tasksList.push(task);
    createTaskItem();
}

function clearInputs() {
    taskTitleInput.value = null;
    taskDescriptionInput.value = null;
}

function createTaskItem() {
    let newLi = document.createElement('li');
    newLi.className = 'tasks__item task';
    taskSection.append(newLi);
    let newLiInner = document.createElement('div');
    newLiInner.className = 'task__inner';
    newLi.append(newLiInner);
    let newTaskTitle = document.createElement('h3');
    newTaskTitle.className = 'task__title';
    newTaskTitle.innerHTML = task.title;
    newLiInner.append(newTaskTitle);
    let newTaskAction = document.createElement('div');
    newTaskAction.className = 'task__action';
    newLiInner.append(newTaskAction);
    let newTaskDescription = document.createElement('p');
    newTaskDescription.className = 'task__description';
    newTaskDescription.innerHTML = task.description;
    newLi.append(newTaskDescription);
    let newTaskDate = document.createElement('span');
    newTaskDate.className = 'task__date';
    newTaskDate.innerHTML = task.date.toLocaleDateString();
    newLi.append(newTaskDate);
    let newTaskBtn = document.createElement('button');
    newTaskBtn.className = 'task__btn task__btn_noborder';
    newTaskBtn.innerHTML = 'описание';
    newTaskAction.append(newTaskBtn);
    let newTaskCheck = document.createElement('input');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.className = 'task__check';
    newTaskAction.append(newTaskCheck);
    let newTaskBtnDel = document.createElement('button');
    newTaskBtnDel.className = 'task__btn';
    newTaskBtnDel.innerHTML = 'удалить';
    newTaskAction.append(newTaskBtnDel);
}

addTaskFormBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'flex';
});

addTaskBtn.addEventListener('click', () => {
    addTaskForm.style.display = 'none';
    addTask();
    clearInputs();
});
