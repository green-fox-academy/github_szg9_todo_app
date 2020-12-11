'use strict';

import minimist from "minimist";
const args = minimist(process.argv);

import { TodoList } from "./todoList.js"

function checkArguments() {
    const argsArray = Object.keys(args);
    if (argsArray.includes('l') || argsArray.includes('a') || argsArray.includes('c') || argsArray.includes('r') || argsArray.length == 1 && argsArray.includes('_')) {
        return false;
    } else {
        return true;
    }
};

const toDoList = new TodoList('thingstodo.txt');

if (checkArguments()) {
    console.log("");
    console.log('Nem támogatott argumentum!');
    toDoList.printInstructions();
} else if (args.l === true) {
    toDoList.printTodoList();
} else if (args.hasOwnProperty('a')) {
    toDoList.addTask(args.a);
} else if (args.hasOwnProperty('r')) {
    toDoList.removeTask(args.r);
} else if (args.hasOwnProperty('c')) {
    toDoList.getTaskCompleted(args.c);
} else {
    toDoList.printInstructions();
};